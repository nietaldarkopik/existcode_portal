import { NavLink } from "react-router-dom";
import { Briefcase, LayoutDashboard, LogOut, Mail, Newspaper, Palette, Search, ShoppingCart, Tag } from "lucide-react";
import { cn } from "@existcode/ui";
import { adminLogout } from "@existcode/api-client";
import { apiClient } from "../app/apiClient";
import { clearAuthToken } from "../app/authToken";
import { useAuthStore } from "../app/authStore";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/jasa", label: "Jasa", icon: Briefcase, end: false },
  { to: "/harga", label: "Harga", icon: Tag, end: false },
  { to: "/blog", label: "Blog", icon: Newspaper, end: false },
  { to: "/news", label: "News", icon: Newspaper, end: false },
  { to: "/orders", label: "Order", icon: ShoppingCart, end: false },
  { to: "/contact-messages", label: "Pesan Kontak", icon: Mail, end: false },
  { to: "/theme", label: "Tema Website", icon: Palette, end: false },
  { to: "/seo", label: "SEO", icon: Search, end: false }
];

export function Sidebar() {
  const setUser = useAuthStore((s) => s.setUser);
  const setStatus = useAuthStore((s) => s.setStatus);

  async function handleLogout() {
    await adminLogout(apiClient).catch(() => undefined);
    clearAuthToken();
    setUser(null);
    setStatus("unauthenticated");
  }

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-neutral-800 bg-neutral-900/60 p-4">
      <p className="mb-6 px-2 font-heading text-lg font-semibold text-neutral-50">Existcode Admin</p>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent-500/15 text-accent-300"
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
              )
            }
          >
            <Icon className="size-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
      >
        <LogOut className="size-4" />
        Keluar
      </button>
    </aside>
  );
}
