import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Cog,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SITE } from "@/lib/site";

const NAV_ITEMS = [
  { to: "/admin", icon: LayoutDashboard, label: "Machinery" },
] as const;

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen bg-[#0c0c0f]">
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/[0.06] bg-[#111116] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo area */}
        <div className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-5">
          <div className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-orange-600 text-xs font-bold text-white">
            M
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Admin Panel</p>
            <p className="text-[10px] uppercase tracking-widest text-white/40">
              {SITE.shortName}
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-md p-1 text-white/40 hover:text-white lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-white/[0.08] text-white shadow-sm shadow-orange-500/10"
                    : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
                }`}
              >
                <item.icon
                  className={`size-[18px] ${active ? "text-orange-400" : "text-white/30 group-hover:text-white/50"}`}
                />
                {item.label}
                {active && (
                  <ChevronRight className="ml-auto size-4 text-orange-400/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User card */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/20 text-xs font-semibold text-orange-400">
              {user?.email?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-xs font-medium text-white/80">
                {user?.email ?? "Admin"}
              </p>
              <p className="text-[10px] text-white/30">Administrator</p>
            </div>
            <button
              onClick={handleSignOut}
              className="rounded-md p-1.5 text-white/30 transition-colors hover:bg-white/[0.06] hover:text-red-400"
              title="Sign out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/[0.06] bg-[#0c0c0f]/80 px-4 backdrop-blur-xl lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-white/50 hover:bg-white/[0.06] hover:text-white lg:hidden"
          >
            <Menu className="size-5" />
          </button>
          <h1 className="text-sm font-medium text-white/60">
            {SITE.name}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <Link
              to="/"
              className="rounded-md px-3 py-1.5 text-xs text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/70"
            >
              View Site →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
