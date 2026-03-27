import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Bien-être Shop — Produits naturels pour votre bien-être",
    template: "%s | Bien-être Shop",
  },
  description:
    "Découvrez notre sélection de produits bien-être naturels. Livraison en Guinée, Côte d'Ivoire et au Ghana.",
  keywords: ["bien-être", "santé", "produits naturels", "Guinée", "Côte d'Ivoire", "Ghana"],
  openGraph: {
    type: "website",
    siteName: "Bien-être Shop",
    locale: "fr_FR",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${cormorant.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
