import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Leaf, Share2, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white" style={{ background: "linear-gradient(135deg, #2A3E2C 0%, #3D5A40 60%, #2A3E2C 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#7C9A7E] rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-playfair text-xl font-semibold">
                Bien-être Shop
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#7C9A7E] transition-colors"
                aria-label="Instagram"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#7C9A7E] transition-colors"
                aria-label="Facebook"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-5 text-[#C9A84C]">{t("quickLinks")}</h3>
            <ul className="space-y-3">
              {[
                { href: `/${locale}`, label: nav("home") },
                { href: `/${locale}/produits`, label: nav("products") },
                { href: `/${locale}/a-propos`, label: nav("about") },
                { href: `/${locale}/contact`, label: nav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-[#C9A84C] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-5 text-[#C9A84C]">{t("legal")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${locale}/confidentialite`}
                  className="text-white/70 text-sm hover:text-[#C9A84C] transition-colors"
                >
                  {t("privacy")}
                </Link>
              </li>
            </ul>
            <p className="mt-8 text-white/40 text-xs leading-relaxed">
              {t("poweredBy")}
            </p>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-xs">
            © {currentYear} Bien-être Shop. {t("rights")}
          </p>
          <div className="flex items-center gap-2 text-white/30 text-xs">
            <span>🌿</span>
            <span>Guinée · Côte d&apos;Ivoire · Ghana</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
