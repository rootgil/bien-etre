import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";
import { Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Connexion admin - Bien-être",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-emerald-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg">
            <Leaf className="h-7 w-7 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Bien-être</h1>
            <p className="mt-1 text-sm text-zinc-400">Espace d&apos;administration</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <h2 className="mb-1 text-lg font-semibold text-white">
            Connexion administrateur
          </h2>
          <p className="mb-6 text-sm text-zinc-400">
            Accès réservé aux administrateurs autorisés.
          </p>
          <Suspense fallback={<div className="h-40 animate-pulse rounded-lg bg-white/5" />}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-500">
          Accès sécurisé · Sessions chiffrées · Bien-être &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
