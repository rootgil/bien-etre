"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGeo } from "@/hooks/useGeo";
import type { Product } from "@/types";

const COUNTRIES = [
  { code: "GN", fr: "Guinée", en: "Guinea" },
  { code: "CI", fr: "Côte d'Ivoire", en: "Côte d'Ivoire" },
  { code: "GH", fr: "Ghana", en: "Ghana" },
  { code: "SN", fr: "Sénégal", en: "Senegal" },
  { code: "ML", fr: "Mali", en: "Mali" },
  { code: "BF", fr: "Burkina Faso", en: "Burkina Faso" },
  { code: "CM", fr: "Cameroun", en: "Cameroon" },
  { code: "FR", fr: "France", en: "France" },
  { code: "BE", fr: "Belgique", en: "Belgium" },
  { code: "CH", fr: "Suisse", en: "Switzerland" },
  { code: "CA", fr: "Canada", en: "Canada" },
  { code: "US", fr: "États-Unis", en: "United States" },
  { code: "OTHER", fr: "Autre pays", en: "Other country" },
];

const FormSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z.string().min(6).max(20),
  email: z.string().email(),
  address: z.string().min(5).max(200),
  city: z.string().min(1),
  country: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(100),
  message: z.string().max(500).optional(),
});

type FormValues = z.infer<typeof FormSchema>;

interface OrderFormProps {
  product: Product;
}

export default function OrderForm({ product }: OrderFormProps) {
  const t = useTranslations("orderForm");
  const locale = useLocale() as "fr" | "en";
  const router = useRouter();
  const { geo, getPriceForProduct } = useGeo();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema) as never,
    defaultValues: {
      quantity: 1,
      country: geo.countryCode ?? "",
    },
  });

  const quantity = watch("quantity") || 1;
  const displayedPrice = getPriceForProduct(product.priceEUR * quantity);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          productId: product.id,
          productName: product.name[locale],
          currency: geo.currency,
          displayedPrice: getPriceForProduct(product.priceEUR * (data.quantity || 1)),
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      // Store order summary in sessionStorage for confirmation page
      sessionStorage.setItem(
        "bienetre_last_order",
        JSON.stringify({
          ...data,
          productName: product.name[locale],
          currency: geo.currency,
          displayedPrice: getPriceForProduct(product.priceEUR * (data.quantity || 1)),
          timestamp: Date.now(),
        })
      );

      router.push(`/${locale}/confirmation`);
    } catch {
      toast.error(t("required"), {
        description: locale === "fr"
          ? "Une erreur est survenue. Veuillez réessayer."
          : "An error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
            {t("firstName")} <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("firstName")}
            placeholder="Jean"
            className="border-[#E2DDD6] focus:border-[#7C9A7E] focus:ring-[#7C9A7E]/20"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
            {t("lastName")} <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("lastName")}
            placeholder="Diallo"
            className="border-[#E2DDD6] focus:border-[#7C9A7E] focus:ring-[#7C9A7E]/20"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
            {t("phone")} <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("phone")}
            type="tel"
            placeholder={t("phonePlaceholder")}
            className="border-[#E2DDD6] focus:border-[#7C9A7E] focus:ring-[#7C9A7E]/20"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
            {t("email")} <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("email")}
            type="email"
            placeholder="jean@example.com"
            className="border-[#E2DDD6] focus:border-[#7C9A7E] focus:ring-[#7C9A7E]/20"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
          {t("address")} <span className="text-red-500">*</span>
        </label>
        <Input
          {...register("address")}
          placeholder="123 Rue de la Paix, Conakry"
          className="border-[#E2DDD6] focus:border-[#7C9A7E] focus:ring-[#7C9A7E]/20"
        />
        {errors.address && (
          <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* City + Country */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
            {t("city")} <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("city")}
            placeholder="Conakry"
            className="border-[#E2DDD6] focus:border-[#7C9A7E] focus:ring-[#7C9A7E]/20"
          />
          {errors.city && (
            <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
            {t("country")} <span className="text-red-500">*</span>
          </label>
          <Select
            defaultValue={geo.countryCode || ""}
            onValueChange={(val) => setValue("country", val ?? "")}
          >
            <SelectTrigger className="border-[#E2DDD6]">
              <SelectValue placeholder={t("selectCountry")} />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c[locale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>
          )}
        </div>
      </div>

      {/* Product (auto) + Quantity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
            {t("product")}
          </label>
          <Input
            value={product.name[locale]}
            disabled
            className="bg-[#F0ECE6] border-[#E2DDD6] text-[#3D5A40]/70"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
            {t("quantity")} <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("quantity")}
            type="number"
            min={1}
            max={100}
            className="border-[#E2DDD6] focus:border-[#7C9A7E] focus:ring-[#7C9A7E]/20"
          />
          {errors.quantity && (
            <p className="mt-1 text-xs text-red-500">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
          {t("message")}
        </label>
        <Textarea
          {...register("message")}
          placeholder={t("messagePlaceholder")}
          rows={3}
          className="border-[#E2DDD6] focus:border-[#7C9A7E] resize-none"
        />
      </div>

      {/* Total preview */}
      <div className="bg-[#7C9A7E]/10 rounded-xl p-4 flex items-center justify-between">
        <span className="text-sm text-[#3D5A40]/70">
          {quantity} × {product.name[locale]}
        </span>
        <span className="text-xl font-bold text-[#3D5A40]">{displayedPrice}</span>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#3D5A40] hover:bg-[#7C9A7E] text-white py-6 rounded-xl font-semibold text-base transition-all duration-300 shadow-lg shadow-[#3D5A40]/20"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            {t("submit")}
          </>
        )}
      </Button>
    </form>
  );
}
