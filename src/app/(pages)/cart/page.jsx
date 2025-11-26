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
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingBag,
  MoreHorizontalIcon,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import CartSkeleton from "@/components/shared/skeleton/CartSkeleton";

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

  const subTotal = cartItems?.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

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
            <Table>
              <TableCaption>A list of your recent carts.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              {isLoading  ? (
                <TableBody>
                  {[...Array(4)].map((_, i) => <CartSkeleton key={i} />)}
                </TableBody>
              ) : (
                <TableBody>
                  {cartItems?.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">
                        <Image
                          width={100}
                          height={100}
                          sizes="400px"
                          alt={item.name}
                          src={item.image}
                          priority
                          className="object-cover w-full"
                        />
                      </TableCell>
                      <TableCell className="font-bold">{item.name}</TableCell>
                      <TableCell>x{item.quantity}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="default">
                              <MoreHorizontalIcon />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuGroup>
                              <DropdownMenuItem
                                onClick={() => deleteMutation.mutate(item._id)}
                                className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" /> Delete
                              </DropdownMenuItem>

                              <Link href={`/products/${item.productId}`}>
                                <DropdownMenuItem className="cursor-pointer gap-2">
                                  <Eye className="w-4 h-4" /> View Details
                                </DropdownMenuItem>
                              </Link>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>

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
                  <span className="font-medium text-foreground">
                    ${subTotal}
                  </span>
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
                  <span>${subTotal ? subTotal + shipping : 0}</span>
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
                <Button className="w-full h-12 text-lg font-bold cursor-pointer shadow-lg">
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
