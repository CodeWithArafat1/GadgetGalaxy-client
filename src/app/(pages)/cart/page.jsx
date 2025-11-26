"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function CartPage() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const shipping = 15;

  const queryClient = useQueryClient();

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cartItems", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axios.get(
        `https://gadget-galaxy-server-ten.vercel.app/api/products/myCart?email=${user?.email}`
      );

      return data;
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(
        `https://gadget-galaxy-server-ten.vercel.app/api/products/myCart/${id}`
      );
      if (data.deletedCount) {
        toast.success("Cart has been removed!");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]);
    },
  });

  if (status === "loading" && isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground flex items-center gap-2">
          <ShoppingBag className="w-8 h-8" /> Shopping Cart
          <span className="text-lg font-normal text-muted-foreground">
            ({cartItems?.length} items)
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- LEFT SIDE: Cart Items List (Span 8) --- */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems?.map((item) => (
              <Card
                key={item._id}
                className="flex flex-col sm:flex-row items-center p-4 gap-6 shadow-sm border-border"
              >
                {/* Image */}
                <div className="relative w-32 h-32 shrink-0 bg-muted/30 rounded-xl overflow-hidden border border-border">
                  <Image
                    src={item.image}
                    fill
                    priority
                    sizes="500px"
                    className="object-cover p-2 mix-blend-multiply dark:mix-blend-normal"
                    alt={item.name}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <h3 className="font-bold text-lg text-foreground">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.category} | Color: {item.color}
                  </p>
                  <p className="font-bold text-primary text-lg mt-2">
                    ${item.price}
                  </p>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="outline"
                      className=" text-center font-medium text-sm"
                    >
                      <strong>Qty:</strong> {item.quantity}
                    </Button>
                  </div>

                  <Button
                    variant="link"
                    onClick={() => deleteMutation.mutate(item._id)}
                    className="flex items-center text-red-500 text-sm cursor-pointer gap-1"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </Button>
                </div>
              </Card>
            ))}

            {/* Continue Shopping Link */}
            <div className="pt-4">
              <Link
                href="/products"
                className="text-primary hover:underline flex items-center gap-2 font-medium"
              >
                <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* --- RIGHT SIDE: Order Summary (Span 4) --- */}
          <div className="lg:col-span-4">
            <Card className="sticky top-24 shadow-md border-border bg-card">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">$00</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping Estimate</span>
                  <span className="font-medium text-foreground">
                    ${shipping}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax Estimate</span>
                  <span className="font-medium text-foreground">$0.00</span>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Order Total</span>
                  <span>$00</span>
                </div>

                {/* Promo Code (Optional) */}
                <div className="mt-6">
                  <p className="text-xs font-medium mb-2 text-muted-foreground">
                    Have a promo code?
                  </p>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" className="bg-background" />
                    <Button variant="outline">Apply</Button>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full h-12 text-lg font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-lg">
                  Checkout <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
