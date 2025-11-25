"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, Plus, MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function MyProductsPage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const user = session.user;
  const { data: products, isLoading } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://gadget-galaxy-server-ten.vercel.app/api/products/myProducts?email=${user.email}`
      );
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(
        `https://gadget-galaxy-server-ten.vercel.app/api/products/${id}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myProducts"]);
      toast.success("Product Deleted Successfully!");
    },
    onError: () => {
      toast.error("something went wrong!");
    },
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Products</h1>
          <p className="text-muted-foreground">
            Manage your inventory and track sales.
          </p>
        </div>
        <Link href="/dashboard/add-product">
          <Button className="gap-2 bg-foreground ">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      </div>

      {/* Table Card */}
      <Card className="border border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Showing {products.length} products from your store.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-20 hidden sm:table-cell">
                    Image
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((product) => {
                  const image = product?.images[0];
                  return (
                    <TableRow
                      key={product._id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      {/* Image Cell (Hidden on very small screens) */}
                      <TableCell className="hidden sm:table-cell">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-border bg-background">
                          <Image
                            src={image}
                            alt={product.name}
                            fill
                            sizes="200px"
                            className="object-cover p-1 "
                          />
                        </div>
                      </TableCell>

                      {/* Name Cell */}
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="text-foreground">
                            {product.name}
                          </span>
                          <span className="text-xs text-muted-foreground sm:hidden">
                            {product.status}
                          </span>
                        </div>
                      </TableCell>

                      {/* Category Cell */}
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {product.category}
                      </TableCell>

                      {/* Status Cell */}
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={
                            product.status === "Out of Stock"
                              ? "destructive"
                              : "secondary"
                          }
                          className="font-normal"
                        >
                          {product.status}
                        </Badge>
                      </TableCell>

                      {/* Price Cell */}
                      <TableCell className="font-bold text-foreground">
                        ${product.price}
                      </TableCell>

                      {/* Actions Cell */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <Link href={`/products/${product._id}`}>
                              <DropdownMenuItem className="cursor-pointer gap-2">
                                <Eye className="w-4 h-4" /> View Details
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem
                              onClick={() => handleDelete(product._id)}
                              className="cursor-pointer gap-2 text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
