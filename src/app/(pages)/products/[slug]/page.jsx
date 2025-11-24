"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Star,
  Truck,
  ShieldCheck,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  BatteryMedium,
  Signal,
  Zap,
} from "lucide-react";

import { useSession } from "next-auth/react";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const { data: product, isLoading } = useQuery({
    queryKey: ["singleProductView", slug],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://gadget-galaxy-server-ten.vercel.app/api/products/${slug}`
      );
      return data;
    },
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl font-medium text-muted-foreground">
          Loading details...
        </h1>
      </div>
    );
  }

  // Active Image Logic
  const imageToShow = activeImage || product?.images?.[0];

  return (
    <div className="min-h-screen bg-background font-sans text-muted-foreground">
      <main className="container mx-auto px-4 py-10">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* --- LEFT SIDE: Image Gallery (Span 5) --- */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Main Image */}
            <div className="relative aspect-4/5 bg-card rounded-3xl overflow-hidden border border-border shadow-sm group">
              {imageToShow ? (
                <Image
                  src={imageToShow}
                  fill
                  sizes="1000px"
                  priority
                  alt={product?.name || "Product Image"}
                  className="object-cover p-8 group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted">
                  No Image
                </div>
              )}
              {/* Category Badge on Image */}
              <Badge className="absolute top-5 left-5 bg-foreground backdrop-blur-md text-muted px-3 py-1 text-xs uppercase tracking-wider border-none">
                {product?.category}
              </Badge>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto p-2 scrollbar-hide w-full ">
              {product?.images?.map((img, ind) => {
                const isActive = imageToShow === img;
                return (
                  <div
                    key={ind}
                    onClick={() => setActiveImage(img)}
                    className={`
                      relative w-20 h-20 shrink-0 cursor-pointer rounded-2xl overflow-hidden border bg-muted transition-all duration-300
                      ${
                        isActive
                          ? "ring-2 ring-slate-900 ring-offset-2 border-transparent"
                          : "border-transparent hover:border-border"
                      }
                    `}
                  >
                    <Image
                      src={img}
                      fill
                      priority
                      sizes="10px"
                      alt="thumbnail"
                      className="object-cover p-2"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- RIGHT SIDE: Product Info (Span 7) --- */}
          <div className="lg:col-span-7 flex flex-col gap-8 pt-2">
            {/* 1. Header Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1 bg-amber-100 text-amber-700 hover:bg-amber-200 border-none font-medium"
                >
                  {product?.status}
                </Badge>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-current" /> {product?.rating}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {product?.name}
              </h1>
              <p className="text-3xl font-bold text-foreground">
                ${product?.price?.toLocaleString()}
              </p>
            </div>

            {/* 2. Description */}
            <p className="text-muted-foreground leading-relaxed text-lg font-light max-w-2xl">
              {product?.description}
            </p>

            {/* 3. Specs Grid (Icons based on Object) */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted-background rounded-2xl p-4 text-center border border-border transition-all hover:border-gray-300 hover:shadow-sm">
                <BatteryMedium className="w-6 h-6 mx-auto mb-2 text-foreground" />
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                  Battery
                </p>
                <p className="font-semibold text-sm text-foreground">
                  {product?.specs?.battery}
                </p>
              </div>
              <div className="bg-muted-background rounded-2xl p-4 text-center border border-border transition-all hover:border-gray-300 hover:shadow-sm">
                <Signal className="w-6 h-6 mx-auto mb-2 text-foreground" />
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                  Network
                </p>
                <p className="font-semibold text-sm text-foreground">
                  {product?.specs?.connectivity}
                </p>
              </div>
              <div className="bg-muted-background rounded-2xl p-4 text-center border border-border transition-all hover:border-gray-300 hover:shadow-sm">
                <Zap className="w-6 h-6 mx-auto mb-2 text-foreground" />
                <p className="text-xs font-bold text-muted-foreground uppercase mb-1">
                  Charging
                </p>
                <p className="font-semibold text-sm text-foreground">
                  {product?.specs?.charging}
                </p>
              </div>
            </div>

            <Separator />

            {/* 4. Selectors & Actions */}
            <div className="space-y-6">
              {/* Color Selector */}
              <div>
                <span className="text-sm font-bold text-foreground mb-3 block">
                  Select Finish
                </span>
                <div className="flex gap-3">
                  {product?.colors?.map((color, idx) => (
                    <button
                      key={idx}
                      style={{ backgroundColor: color }}
                      className={`
                        w-12 h-12 rounded-full border-2 border-border shadow-sm 
                        hover:scale-110 transition-transform focus:outline-none
                        ${
                          idx === 0
                            ? "ring-2 ring-slate-900 ring-offset-2"
                            : "ring-1 ring-gray-200"
                        }
                      `}
                      title={color}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity Input */}
                <div className="flex items-center justify-between border border-border rounded-full px-5 h-14 w-full sm:w-40 hover:border-gray-400 transition-colors bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-400 hover:text-black transition p-2"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-bold text-lg w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-400 hover:text-black transition p-2"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <Button className="flex-1 h-14 rounded-full text-lg font-bold gap-2 bg-primary   text-secondary transition-all shadow-sm cursor-pointer">
                  Add to Cart <ShoppingBag className="w-5 h-5" />
                </Button>

                {/* Wishlist */}
                <Button
                  variant="outline"
                  className="h-14 w-14 cursor-pointer rounded-full border-border hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Heart className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* 5. Trust Badges */}
            <div className="flex gap-6 text-sm text-muted-foreground pt-2">
              <span className="flex items-center gap-2 font-medium">
                <Truck className="w-5 h-5 text-foreground" /> Free Shipping
              </span>
              <span className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-5 h-5 text-foreground" /> Official
                Warranty
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
