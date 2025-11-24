"use client";
import Link from "next/link";
import {
  X,
  LogOut,
  User,
  Home,
  ShoppingBag,
  Info,
  Phone,
  PlusCircle,
  Package,
} from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAppContext } from "@/providers/AppContexts";
import { signOut, useSession } from "next-auth/react";

const NavMobile = () => {
  const { setUser, isOpen, setIsOpen } = useAppContext();
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${isOpen ? "flex" : "hidden"}`}
      onClick={() => setIsOpen(false)}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-80 h-full bg-background shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Header Section --- */}
        <div className="p-6 border-b border-border bg-muted">
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-bold text-foreground tracking-tight">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2  rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* User Profile Card */}
          {user ? (
            <div className="flex items-center gap-3 bg-muted p-3 rounded-xl border border-border shadow-sm">
              <Avatar className="h-10 w-10 border border-border">
                <AvatarImage src={user?.image} />
                <Image
                  width={10}
                  height={10}
                  alt="profile"
                  priority
                  src={user?.image}
                />
              </Avatar>
              <div className="overflow-hidden">
                <h4 className="font-bold text-sm text-foreground truncate">
                  {user.name}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          ) : (
            <Link
              onClick={() => setIsOpen(false)}
              href="/login"
              className="cursor-pointer"
            >
              <Button className='w-full cursor-pointer'>
                Login / Register
              </Button>
            </Link>
          )}
        </div>

        {/* --- Navigation Links (Scrollable) --- */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {/* General Links */}
          <Link
            onClick={() => setIsOpen(false)}
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground  rounded-lg font-medium transition-colors"
          >
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/products"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground  rounded-lg font-medium transition-colors"
          >
            <ShoppingBag className="w-5 h-5" /> All Products
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/about"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground  rounded-lg font-medium transition-colors"
          >
            <Info className="w-5 h-5" /> About Us
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/contact"
            className="flex items-center gap-3 px-4 py-3 text-muted-foreground  rounded-lg font-medium transition-colors"
          >
            <Phone className="w-5 h-5" /> Contact
          </Link>
        </div>

        {/* --- Footer Section --- */}
        <div className="p-4 border-t border-border">
          {user ? (
            <Button
              onClick={() => {
                setIsOpen(false);
                signOut({ callbackUrl: "/login" });
              }}
              variant="destructive"
              className="w-full h-11 rounded-xl shadow-muted-foreground text-foreground shadow-sm"
            >
              <LogOut className="w-4 h-4 mr-2" /> Log Out
            </Button>
          ) : (
            <p className="text-center text-xs text-slate-400">
              © {new Date().getFullYear()} GadgetGalaxy
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavMobile;
