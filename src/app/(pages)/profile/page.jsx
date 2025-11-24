"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogOut, Mail, User, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-10 px-4">
      <Card className="w-full max-w-md shadow-lg border border-border bg-card">
        <CardHeader className="flex flex-col items-center pb-2">
          <Avatar className="w-24 h-24 border-4 border-border shadow-md mb-4">
            
            <Image
              width={100}
              height={100}
              src={user?.image}
              alt="User Image"
            />
            <AvatarFallback className="text-2xl bg-muted text-foreground">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-bold text-foreground">
            {user?.name || "User Name"}
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            GadgetGalaxy Member
          </p>

          <div className="mt-2 px-3 py-1 bg-muted text-green-600 text-xs font-bold rounded-full border border-border flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Active Account
          </div>
        </CardHeader>

        <div className="px-6 py-2">
          <Separator />
        </div>

        <CardContent className="space-y-4 mt-2">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-muted border border-border">
            <div className="p-2 bg-background rounded-full text-foreground shadow-sm">
              <Mail className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-foreground font-medium uppercase">
                Email Address
              </p>
              <p className="text-sm font-semibold text-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-lg bg-muted border border-border">
            <div className="p-2 bg-background rounded-full text-foreground shadow-sm">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-foreground font-medium uppercase">
                Account Type
              </p>
              <p className="text-xs font-mono font-semibold text-foreground">
                Google / Credentials
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-2">
          <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full bg-red-500 hover:bg-red-600 h-11 text-md"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>

          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full h-11 border-gray-200">
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
