"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MockOrder } from "@/data/mock-orders";

interface RevenueChartProps {
  orders: MockOrder[];
}

export function RevenueChart({ orders }: RevenueChartProps) {
  const revenueByDay = orders
    .filter((o) => o.status !== "cancelled")
    .reduce<Record<string, number>>((acc, order) => {
      const day = order.createdAt.slice(0, 10);
      acc[day] = (acc[day] ?? 0) + order.totalEUR;
      return acc;
    }, {});

  const data = Object.entries(revenueByDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, revenue]) => ({
      date: new Date(date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "short",
      }),
      revenue,
    }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v} €`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            fontSize: 12,
          }}
          formatter={(value) => [`${value} €`, "Revenus"]}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#10b981"
          strokeWidth={2}
          fill="url(#revenueGradient)"
          dot={{ r: 3, fill: "#10b981", strokeWidth: 0 }}
          activeDot={{ r: 5, fill: "#10b981" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
