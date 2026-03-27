import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration - Bien-être",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        .admin-root,
        .admin-root h1, .admin-root h2, .admin-root h3,
        .admin-root h4, .admin-root h5, .admin-root h6,
        .admin-root p, .admin-root span, .admin-root button,
        .admin-root input, .admin-root select, .admin-root textarea,
        .admin-root label, .admin-root td, .admin-root th {
          font-family: Inter, system-ui, -apple-system, sans-serif !important;
          --font-playfair: "Inter";
          --font-cormorant: "Inter";
          --font-dm-sans: "Inter";
        }
      `}</style>
      <div className="admin-root">
        {children}
      </div>
    </>
  );
}
