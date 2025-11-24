"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SkeletonProductCard } from "@/components/shared/skeleton/SkeletonLoader";

export default function ProductsPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/api/products");
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="container mx-auto px-4 py-10 grow">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">All Products</h1>
            <p className="text-muted-foreground">
              Browse our collection of premium gadgets
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search gadgets..."
                className="pl-10 bg-white"
              />
            </div>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Optional: Category Tabs (Visual Only) */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-2 scrollbar-hide">
          {["All", "Laptops", "Phones", "Audio", "Wearables", "Gaming"].map(
            (cat) => (
              <Button
                key={cat}
                variant={cat === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {cat}
              </Button>
            )
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <>
              {Array.from({ length: 8 }).map((_, ind) => (
                <SkeletonProductCard key={ind} />
              ))}
            </>
          ) : (
            <>
              {products.map((product) => (
                <ProductCard key={product._id} prod={product} />
              ))}
            </>
          )}
        </div>
        {products?.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-500">
              No products found matching
            </h2>
            <Button variant="link">Clear Search</Button>
          </div>
        )}
      </main>
    </div>
  );
}
