"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, MessageCircle, Mail, Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

type ContactValues = z.infer<typeof ContactSchema>;

export default function ContactClient() {
  const t = useTranslations("contact");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactValues) => {
    setIsSubmitting(true);
    // In dev / without backend, just simulate success
    await new Promise((r) => setTimeout(r, 1000));
    console.log("[CONTACT]", data);
    setSuccess(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <div className="bg-white border-b border-[#E2DDD6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="font-playfair text-4xl font-bold text-[#3D5A40] mb-3">{t("title")}</h1>
          <p className="text-[#3D5A40]/60 text-lg">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#3D5A40] rounded-2xl p-8 text-white">
              <h2 className="font-playfair text-2xl font-bold mb-6">Bien-être Shop</h2>
              <div className="space-y-4">
                <a
                  href="https://wa.me/224600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-[#7C9A7E] transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">{t("whatsapp")}</p>
                    <p className="text-sm font-medium">+224 600 000 000</p>
                  </div>
                </a>
                <a
                  href="mailto:contact@bienetre-shop.com"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-[#7C9A7E] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">{t("emailLabel")}</p>
                    <p className="text-sm font-medium">contact@bienetre-shop.com</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-[#7C9A7E]/10 rounded-2xl p-6">
              <p className="text-sm text-[#3D5A40]/70 leading-relaxed">
                🌿 Guinée · Côte d&apos;Ivoire · Ghana
                <br />
                <span className="block mt-2">
                  {t("subtitle")}
                </span>
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-10 border border-[#E2DDD6] text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-[#7C9A7E] mx-auto mb-4" />
                <h2 className="font-playfair text-2xl font-bold text-[#3D5A40] mb-2">
                  {t("successTitle")}
                </h2>
                <p className="text-[#3D5A40]/60">{t("successText")}</p>
              </motion.div>
            ) : (
              <div className="bg-white rounded-3xl p-8 border border-[#E2DDD6] shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
                      {t("name")} *
                    </label>
                    <Input
                      {...register("name")}
                      className="border-[#E2DDD6] focus:border-[#7C9A7E]"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">Requis</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
                      {t("email")} *
                    </label>
                    <Input
                      {...register("email")}
                      type="email"
                      className="border-[#E2DDD6] focus:border-[#7C9A7E]"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">Email invalide</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#3D5A40] mb-1.5">
                      {t("message")} *
                    </label>
                    <Textarea
                      {...register("message")}
                      rows={5}
                      className="border-[#E2DDD6] focus:border-[#7C9A7E] resize-none"
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">10 caractères min.</p>}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#3D5A40] hover:bg-[#7C9A7E] text-white py-5 rounded-xl font-semibold transition-all"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? t("submitting") : t("submit")}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
