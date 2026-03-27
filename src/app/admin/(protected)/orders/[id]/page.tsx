"use client";

import { useState } from "react";
import { MOCK_ORDERS } from "@/data/mock-orders";
import type { OrderStatus } from "@/data/mock-orders";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  MapPin,
  Mail,
  Calendar,
  Package,
  CheckCircle,
} from "lucide-react";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

const STATUS_COLORS: Record<OrderStatus, { bg: string; text: string }> = {
  pending: { bg: "bg-amber-50", text: "text-amber-700" },
  confirmed: { bg: "bg-blue-50", text: "text-blue-700" },
  shipped: { bg: "bg-indigo-50", text: "text-indigo-700" },
  delivered: { bg: "bg-emerald-50", text: "text-emerald-700" },
  cancelled: { bg: "bg-red-50", text: "text-red-700" },
};

const COUNTRY_NAMES: Record<string, string> = {
  SN: "Sénégal",
  CI: "Côte d'Ivoire",
  GN: "Guinée",
  FR: "France",
  BE: "Belgique",
  ML: "Mali",
  GH: "Ghana",
  NG: "Nigeria",
  MA: "Maroc",
};

const ALL_STATUSES = Object.keys(STATUS_LABELS) as OrderStatus[];

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const original = MOCK_ORDERS.find((o) => o.id === orderId);
  const [status, setStatus] = useState<OrderStatus>(original?.status ?? "pending");
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  if (!original) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-zinc-400">
        <Package className="h-10 w-10" />
        <p className="text-sm">Commande introuvable</p>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </button>
      </div>
    );
  }

  const sc = STATUS_COLORS[status];

  return (
    <div>
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Retour
          </button>
          <span className="text-zinc-300">/</span>
          <h1 className="text-sm font-semibold text-zinc-800">
            Commande{" "}
            <span className="font-mono text-emerald-600">{original.id}</span>
          </h1>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${sc.bg} ${sc.text}`}>
          {STATUS_LABELS[status]}
        </span>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-3 text-sm text-white shadow-xl">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}

      <div className="p-6 space-y-6 max-w-3xl">
        {/* Info cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Customer */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Client</p>
            <div className="flex items-center gap-2 text-sm text-zinc-700">
              <User className="h-4 w-4 text-zinc-400 shrink-0" />
              <span className="font-medium">{original.customerName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Mail className="h-4 w-4 text-zinc-400 shrink-0" />
              <span>{original.customerEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <MapPin className="h-4 w-4 text-zinc-400 shrink-0" />
              <span>{COUNTRY_NAMES[original.country] ?? original.country}</span>
            </div>
          </div>

          {/* Order meta */}
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Informations
            </p>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Calendar className="h-4 w-4 text-zinc-400 shrink-0" />
              <span>
                {new Date(original.createdAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="text-sm text-zinc-600">
              <span className="text-zinc-400">Devise client :</span>{" "}
              <span className="font-medium">{original.currency}</span>
            </div>

            {/* Status selector */}
            <div>
              <p className="mb-1.5 text-xs font-medium text-zinc-500">Modifier le statut</p>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value as OrderStatus);
                  showToast(`Statut → ${STATUS_LABELS[e.target.value as OrderStatus]} (simulation)`);
                }}
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Order items */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-zinc-100 px-5 py-4">
            <p className="text-sm font-semibold text-zinc-700">Articles commandés</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-50 bg-zinc-50">
                <th className="px-5 py-3 text-left font-medium text-zinc-500">Produit</th>
                <th className="px-5 py-3 text-center font-medium text-zinc-500">Qté</th>
                <th className="px-5 py-3 text-right font-medium text-zinc-500">Prix unitaire</th>
                <th className="px-5 py-3 text-right font-medium text-zinc-500">Sous-total</th>
              </tr>
            </thead>
            <tbody>
              {original.items.map((item, i) => (
                <tr
                  key={i}
                  className={i < original.items.length - 1 ? "border-b border-zinc-50" : ""}
                >
                  <td className="px-5 py-3 font-medium text-zinc-800">{item.productName}</td>
                  <td className="px-5 py-3 text-center text-zinc-600">{item.quantity}</td>
                  <td className="px-5 py-3 text-right text-zinc-600">{item.priceEUR} €</td>
                  <td className="px-5 py-3 text-right font-semibold text-zinc-800">
                    {item.quantity * item.priceEUR} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-5 py-4">
            <span className="text-sm font-medium text-zinc-500">Total</span>
            <span className="text-lg font-bold text-zinc-900">{original.totalEUR} €</span>
          </div>
        </div>

        <p className="text-xs text-zinc-400 text-center">
          Données de simulation. Le changement de statut n&apos;est pas persisté.
        </p>
      </div>
    </div>
  );
}
