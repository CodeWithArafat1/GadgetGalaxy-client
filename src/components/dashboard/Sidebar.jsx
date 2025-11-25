"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Settings,
  Menu,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader
} from "@/components/ui/sheet"; 
import { Button } from "@/components/ui/button";
import { useState } from "react";

const sidebarLinks = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Add Product", path: "/dashboard/add-product", icon: PlusCircle },
  { name: "My Products", path: "/dashboard/my-products", icon: Package },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];


const SidebarContent = ({ onClick }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
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
              onClick={onClick} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};


export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex w-64 bg-background border-r border-border h-screen sticky top-0 flex-col">
      <SidebarContent />
    </aside>
  );
};


export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="p-0 w-72">
     
        <SheetHeader className="sr-only">
            <SheetTitle>Mobile Menu</SheetTitle>
        </SheetHeader>
        
       
        <SidebarContent onClick={() => setOpen(false)} />
        
      </SheetContent>
    </Sheet>
  );
};