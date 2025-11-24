"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Add Product", path: "/dashboard/add-product", icon: PlusCircle },
  { name: "My Products", path: "/dashboard/my-products", icon: Package },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background border-r border-border h-screen sticky top-0 flex flex-col">
      {/* Logo Area */}
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">
          GadgetGalaxy
        </h2>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
          Admin Panel
        </p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-muted-foreground  hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
