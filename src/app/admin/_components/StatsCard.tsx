import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: "emerald" | "blue" | "amber" | "red";
}

const colorMap = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
  },
  red: {
    bg: "bg-red-50",
    icon: "text-red-600",
    badge: "bg-red-100 text-red-700",
  },
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "emerald",
}: StatsCardProps) {
  const c = colorMap[color];

  return (
    <div className="rounded-xl border border-zinc-100 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">{title}</p>
          <p className="mt-1 text-3xl font-bold text-zinc-900">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>
          )}
        </div>
        <div className={`rounded-lg p-2.5 ${c.bg}`}>
          <Icon className={`h-5 w-5 ${c.icon}`} />
        </div>
      </div>
    </div>
  );
}
