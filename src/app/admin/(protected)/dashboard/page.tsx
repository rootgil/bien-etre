import { AdminHeader } from "../../_components/AdminHeader";
import { StatsCard } from "../../_components/StatsCard";
import { RevenueChart } from "../../_components/RevenueChart";
import { OrdersChart } from "../../_components/OrdersChart";
import { getAllProducts } from "@/lib/products";
import { getOrderStats, MOCK_ORDERS } from "@/data/mock-orders";
import {
  Euro,
  ShoppingCart,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";

const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée",
  cancelled: "Annulée",
};

const STATUS_COLORS: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  pending: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-400" },
  confirmed: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-400" },
  shipped: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    dot: "bg-indigo-400",
  },
  delivered: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
  },
  cancelled: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-400" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const products = getAllProducts();
  const stats = getOrderStats();
  const recentOrders = MOCK_ORDERS.slice(0, 5);
  const inStockCount = products.filter((p) => p.stock).length;
  const conversionRate =
    stats.total > 0
      ? Math.round((stats.delivered / stats.total) * 100)
      : 0;

  return (
    <div>
      <AdminHeader title="Tableau de bord" />

      <div className="p-6 space-y-8">
        {/* KPI Cards */}
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Vue d&apos;ensemble
          </h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatsCard
              title="Chiffre d'affaires"
              value={`${stats.revenue} €`}
              subtitle="Commandes non annulées"
              icon={Euro}
              color="emerald"
            />
            <StatsCard
              title="Commandes"
              value={stats.total}
              subtitle={`${stats.delivered} livrées`}
              icon={ShoppingCart}
              color="blue"
            />
            <StatsCard
              title="Produits en stock"
              value={`${inStockCount} / ${products.length}`}
              subtitle="Catalogue actif"
              icon={Package}
              color="amber"
            />
            <StatsCard
              title="Taux de livraison"
              value={`${conversionRate}%`}
              subtitle="Commandes livrées / total"
              icon={TrendingUp}
              color="emerald"
            />
          </div>
        </section>

        {/* Charts */}
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Analytiques
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-xl border border-zinc-100 bg-white p-5">
              <p className="mb-4 text-sm font-semibold text-zinc-700">Revenus par jour (€)</p>
              <RevenueChart orders={MOCK_ORDERS} />
            </div>
            <div className="rounded-xl border border-zinc-100 bg-white p-5">
              <p className="mb-4 text-sm font-semibold text-zinc-700">Répartition des statuts</p>
              <OrdersChart orders={MOCK_ORDERS} />
            </div>
          </div>
        </section>

        {/* Status breakdown */}
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Statut des commandes
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white p-4">
              <Clock className="h-5 w-5 text-amber-500" />
              <div>
                <p className="text-2xl font-bold text-zinc-900">
                  {stats.pending}
                </p>
                <p className="text-xs text-zinc-400">En attente / confirmée</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white p-4">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-2xl font-bold text-zinc-900">
                  {stats.delivered}
                </p>
                <p className="text-xs text-zinc-400">Livrées</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-white p-4">
              <XCircle className="h-5 w-5 text-red-400" />
              <div>
                <p className="text-2xl font-bold text-zinc-900">
                  {stats.cancelled}
                </p>
                <p className="text-xs text-zinc-400">Annulées</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent orders */}
        <section>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Commandes récentes
          </h2>
          <div className="overflow-hidden rounded-xl border border-zinc-100 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/60">
                  <th className="px-4 py-3 text-left font-medium text-zinc-500">
                    Commande
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-zinc-500">
                    Client
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-zinc-500">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-zinc-500">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-zinc-500">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => {
                  const sc = STATUS_COLORS[order.status];
                  return (
                    <tr
                      key={order.id}
                      className={`${i < recentOrders.length - 1 ? "border-b border-zinc-50" : ""} hover:bg-zinc-50`}
                    >
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-mono text-xs text-emerald-600 hover:underline"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-zinc-800">
                        {order.customerName}
                      </td>
                      <td className="px-4 py-3 text-zinc-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-zinc-800">
                        {order.totalEUR} €
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${sc.bg} ${sc.text}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${sc.dot}`}
                          />
                          {STATUS_LABELS[order.status]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
