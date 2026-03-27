"use client";

import { useState } from "react";
import { MOCK_ORDERS } from "@/data/mock-orders";
import type { MockOrder, OrderStatus } from "@/data/mock-orders";
import { ShoppingCart, CheckCircle, Search } from "lucide-react";
import Link from "next/link";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

const STATUS_COLORS: Record<OrderStatus, { bg: string; text: string; dot: string }> = {
  pending: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  confirmed: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-400" },
  shipped: { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-400" },
  delivered: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
  cancelled: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-400" },
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ALL_STATUSES = Object.keys(STATUS_LABELS) as OrderStatus[];
const ALL_COUNTRIES = [...new Set(MOCK_ORDERS.map((o) => o.country))].sort();

export default function OrdersPage() {
  const [orders, setOrders] = useState<MockOrder[]>(MOCK_ORDERS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "">("");
  const [filterCountry, setFilterCountry] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function updateStatus(id: string, status: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    showToast(`Statut mis à jour → ${STATUS_LABELS[status]}`);
  }

  const filtered = orders.filter((o) => {
    const matchSearch =
      !search ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || o.status === filterStatus;
    const matchCountry = !filterCountry || o.country === filterCountry;
    return matchSearch && matchStatus && matchCountry;
  });

  const total = orders.length;
  const delivered = orders.filter((o) => o.status === "delivered").length;
  const pending = orders.filter((o) => o.status === "pending" || o.status === "confirmed").length;
  const revenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.totalEUR, 0);

  return (
    <div>
      <header className="flex h-16 items-center border-b border-zinc-100 bg-white px-6">
        <h1 className="text-lg font-semibold text-zinc-800">Commandes</h1>
      </header>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-zinc-800 px-4 py-3 text-sm text-white shadow-xl">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-zinc-100 bg-white p-4">
            <p className="text-xs font-medium text-zinc-500">Total commandes</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{total}</p>
          </div>
          <div className="rounded-xl border border-zinc-100 bg-white p-4">
            <p className="text-xs font-medium text-zinc-500">Chiffre d&apos;affaires</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{revenue} €</p>
            <p className="text-xs text-zinc-400">Hors annulées</p>
          </div>
          <div className="rounded-xl border border-zinc-100 bg-white p-4">
            <p className="text-xs font-medium text-zinc-500">Livrées</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{delivered}</p>
          </div>
          <div className="rounded-xl border border-zinc-100 bg-white p-4">
            <p className="text-xs font-medium text-zinc-500">En attente</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{pending}</p>
            <p className="text-xs text-zinc-400">Pending + confirmées</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              placeholder="Nom client, n° commande…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-100 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as OrderStatus | "")}
            className="rounded-lg border border-zinc-100 bg-white px-3 py-2 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Tous les statuts</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="rounded-lg border border-zinc-100 bg-white px-3 py-2 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <option value="">Tous les pays</option>
            {ALL_COUNTRIES.map((c) => (
              <option key={c} value={c}>{COUNTRY_NAMES[c] ?? c}</option>
            ))}
          </select>
          {(search || filterStatus || filterCountry) && (
            <button
              onClick={() => { setSearch(""); setFilterStatus(""); setFilterCountry(""); }}
              className="rounded-lg border border-zinc-100 px-3 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50 transition-colors"
            >
              Réinitialiser
            </button>
          )}
          <span className="ml-auto text-xs text-zinc-400">
            {filtered.length} / {total} commandes
          </span>
        </div>

        {/* Orders table */}
        <div className="overflow-hidden rounded-xl border border-zinc-100 bg-white">
          <div className="border-b border-zinc-100 px-4 py-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-zinc-700">Toutes les commandes</h2>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-500">
              {MOCK_ORDERS.length} commandes (simulation)
            </span>
          </div>
          <div className="overflow-x-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-16 text-zinc-400">
                <ShoppingCart className="h-8 w-8" />
                <p className="text-sm">Aucune commande trouvée</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50/60">
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">N° commande</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">Client</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">Pays</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">Date</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">Produits</th>
                    <th className="px-4 py-3 text-right font-medium text-zinc-500">Total</th>
                    <th className="px-4 py-3 text-left font-medium text-zinc-500">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order, i) => {
                    const sc = STATUS_COLORS[order.status];
                    return (
                      <tr
                        key={order.id}
                        className={`${i < filtered.length - 1 ? "border-b border-zinc-50" : ""} hover:bg-zinc-50 transition-colors`}
                      >
                        <td className="px-4 py-3">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="font-mono text-xs text-emerald-600 hover:underline"
                          >
                            {order.id}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-zinc-800">{order.customerName}</p>
                            <p className="text-xs text-zinc-400">{order.customerEmail}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-zinc-600">
                          {COUNTRY_NAMES[order.country] ?? order.country}
                        </td>
                        <td className="px-4 py-3 text-zinc-500 text-xs whitespace-nowrap">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-0.5">
                            {order.items.map((item, idx) => (
                              <p key={idx} className="text-xs text-zinc-500">
                                {item.quantity}× {item.productName}
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-zinc-800">
                          {order.totalEUR} €
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                            className={`rounded-full px-2.5 py-1 text-xs font-medium border-0 outline-none cursor-pointer focus:ring-2 focus:ring-offset-1 focus:ring-emerald-500/30 ${sc.bg} ${sc.text}`}
                          >
                            {ALL_STATUSES.map((s) => (
                              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <p className="text-xs text-zinc-400 text-center">
          Données de simulation - les vraies commandes proviennent de Google Sheets via Apps Script.
        </p>
      </div>
    </div>
  );
}
