import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    alternates: {
      languages: {
        fr: "/fr",
        en: "/en",
      },
    },
    description: t("subtitle"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </div>
      <Toaster position="top-right" richColors />
    </NextIntlClientProvider>
  );
}
