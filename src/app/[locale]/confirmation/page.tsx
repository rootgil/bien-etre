"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, ShoppingBag } from "lucide-react";

interface OrderSummary {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  productName: string;
  quantity: number;
  displayedPrice: string;
  city: string;
  country: string;
}

export default function ConfirmationPage() {
  const t = useTranslations("confirmation");
  const locale = useLocale();
  const [order, setOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("bienetre_last_order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center py-20 px-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border border-[#E2DDD6]"
        >
          {/* Success icon */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 bg-[#7C9A7E]/15 rounded-full flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-[#7C9A7E]" />
            </motion.div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="font-playfair text-3xl font-bold text-[#3D5A40] mb-3">
              {t("title")}
            </h1>
            <p className="text-[#3D5A40]/60 leading-relaxed">{t("subtitle")}</p>
          </div>

          {/* Order summary */}
          {order && (
            <div className="bg-[#FAF8F5] rounded-2xl p-6 mb-8">
              <h2 className="font-semibold text-[#3D5A40] mb-4 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#7C9A7E]" />
                {t("orderSummary")}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#3D5A40]/60">{t("product")}</span>
                  <span className="font-medium text-[#3D5A40]">{order.productName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#3D5A40]/60">{t("quantity")}</span>
                  <span className="font-medium text-[#3D5A40]">{order.quantity}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-[#E2DDD6] pt-3">
                  <span className="font-semibold text-[#3D5A40]">{t("total")}</span>
                  <span className="font-bold text-xl text-[#3D5A40]">{order.displayedPrice}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#E2DDD6]">
                <h3 className="text-sm font-semibold text-[#3D5A40] mb-3">{t("customerInfo")}</h3>
                <div className="space-y-1 text-sm text-[#3D5A40]/60">
                  <p>{order.firstName} {order.lastName}</p>
                  <p>{order.email}</p>
                  <p>{order.phone}</p>
                  <p>{order.city}</p>
                </div>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${locale}`}
              className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#3D5A40]/20 text-[#3D5A40] py-3 px-6 rounded-xl font-semibold text-sm hover:border-[#7C9A7E] hover:text-[#7C9A7E] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("backHome")}
            </Link>
            <Link
              href={`/${locale}/produits`}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#3D5A40] text-white py-3 px-6 rounded-xl font-semibold text-sm hover:bg-[#7C9A7E] transition-all"
            >
              {t("continueShopping")}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
