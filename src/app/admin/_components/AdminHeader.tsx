import { Shield, User } from "lucide-react";

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6 shadow-sm">
      <h1 className="text-lg font-semibold text-zinc-800">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          <Shield className="h-3 w-3" />
          Admin
        </span>
        <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5">
          <User className="h-4 w-4 text-zinc-500" />
          <span className="text-sm font-medium text-zinc-700">admin</span>
        </div>
      </div>
    </header>
  );
}
