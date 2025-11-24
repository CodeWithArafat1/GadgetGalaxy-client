"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "../shared/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SkeletonProductCard } from "../shared/skeleton/SkeletonLoader";

const FeaturedProducts = () => {
  const { data: latestProduct, isLoading } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: async () => {
      const { data } = await axios("https://gadget-galaxy-server-ten.vercel.app/api/products/latest");
      return data;
    },
  });

  return (
    <section className="py-20 px-2 bg-background container mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Trending Gadgets
          </h2>
          <p className="text-muted-foreground mt-2">Top picks for this week</p>
        </div>
        <Button variant="link" className="hidden sm:block">
          <Link href="/products">View All</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <>
            {Array.from({ length: 8 }).map((_, ind) => (
              <SkeletonProductCard key={ind} />
            ))}
          </>
        ) : (
          <>
            {latestProduct?.map((prod) => (
              <ProductCard key={prod._id} prod={prod} />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
