"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, LogOut } from "lucide-react";
import Image from "next/image";
import { useAppContext } from "@/providers/AppContexts";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { data: session } = useSession();
  const { setIsOpen } = useAppContext();
  const user = session?.user;
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
            G
          </div>
          <span className="text-xl font-bold tracking-tight">GadgetGalaxy</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-primary transition-colors"
          >
            All Products
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {/* Cart Icon (Optional Design) */}
          <button className="relative text-muted-foreground hover:text-primary transition">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-[10px] font-bold text-background w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-10 rounded-full cursor-pointer h-10">
                  <Image
                    src={user?.image}
                    width={100}
                    height={100}
                    alt="profile"
                    className="rounded-full"
                  />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer ">
                    <Button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full bg-red-500 hover:bg-red-600 h-11 text-md"
                    >
                      <LogOut className="w-4 text-white h-4 mr-2" /> Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}

          {/* Mobile Menu Button (Icon Only) */}
          <button
            onClick={() => {
              setIsOpen(true);
              toast.success("Log out successfully!");
            }}
            className="md:hidden text-muted-foreground"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
