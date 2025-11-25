"use client";

// ১. ইমপোর্ট আপডেট করুন (Named Import)
import { Sidebar, MobileSidebar } from "@/components/dashboard/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-slate-500" />
      </div>
    );
  }

  if (status === "unauthenticated") return null;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-background border-b border-border h-16 flex items-center justify-between px-4 lg:hidden">
          <span className="font-bold text-foreground">GadgetGalaxy</span>

          <MobileSidebar />
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
