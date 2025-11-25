"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const user = session.user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: async (product) => {
      setLoading(true);
      const { data } = await axios.post(
        `https://gadget-galaxy-server-ten.vercel.app/api/products`,
        product
      );
      if (data.insertedId) {
        toast.success("product created successfully");
        setLoading(false);
      }
      console.log(data);
      return data;
    },
  });

  const onSubmit = async (data) => {
    const colorsArray = data.colors
      .split(",")
      .map((color) => color.trim())
      .filter((color) => color !== "");

    const imagesArray = data.images
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url !== "");

    const formattedProduct = {
      name: data.name,
      price: Number(data.price),
      rating: Number(data.rating),
      status: data.status,
      category: data.category,
      description: data.description,
      specs: {
        battery: data.specs.battery,
        connectivity: data.specs.connectivity,
        charging: data.specs.charging,
      },
      colors: colorsArray,
      images: imagesArray,
      email: data.email,
    };
    mutate(formattedProduct);
  };

  return (
    <div className="flex justify-center py-10 px-4 bg-muted/40 min-h-screen">
      <Card className="w-full container mx-auto shadow-lg border border-border bg-card text-card-foreground">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-2xl font-bold text-foreground">
            Add New Product
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill in the details to create a new product entry.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* --- Basic Info --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Sony WH-1000XM5"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  className={
                    errors.name
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.name && (
                  <span className="text-xs text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">User Email *</Label>
                <Input
                  id="email"
                  readOnly
                  type="email"
                  placeholder="user@example.com"
                  defaultValue={user.email}
                  {...register("email", {})}
                />
                {errors.email && (
                  <span className="text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="349"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 1, message: "Must be positive" },
                  })}
                  className={
                    errors.price
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.price && (
                  <span className="text-xs text-red-500">
                    {errors.price.message}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (0-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  placeholder="4.9"
                  {...register("rating", {
                    min: 0,
                    max: { value: 5, message: "Max 5" },
                  })}
                />
                {errors.rating && (
                  <span className="text-xs text-red-500">
                    {errors.rating.message}
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  placeholder="e.g. Audio"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className={
                    errors.category
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {errors.category && (
                  <span className="text-xs text-red-500">
                    {errors.category.message}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  placeholder="e.g. Best Seller"
                  {...register("status")}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Detailed product description..."
                className={`min-h-[100px] ${
                  errors.description
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-xs text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* --- Specs (Nested Object) --- */}

            <div className="p-4 bg-secondary/50 rounded-lg border border-border space-y-4">
              <h3 className="font-bold text-foreground">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Battery Life</Label>
                  <Input
                    placeholder="e.g. 30 Hours"
                    {...register("specs.battery")}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Connectivity</Label>
                  <Input
                    placeholder="e.g. v5.2 / 5G"
                    {...register("specs.connectivity")}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Charging Type</Label>
                  <Input
                    placeholder="e.g. USB-C"
                    {...register("specs.charging")}
                    className="bg-background"
                  />
                </div>
              </div>
            </div>

            {/* --- Arrays (Colors & Images) --- */}
            <div className="space-y-4">
              {/* Colors */}
              <div className="space-y-2">
                <Label>Colors (Hex Codes, comma separated)</Label>
                <Input placeholder="#000000, #C0C0C0" {...register("colors")} />
                <p className="text-xs text-muted-foreground">
                  Separate multiple colors with a comma.
                </p>
              </div>

              {/* Images */}
              <div className="space-y-2">
                <Label>Image URLs (One per line) *</Label>
                <Textarea
                  placeholder={`https://example.com/img1.jpg\nhttps://example.com/img2.jpg`}
                  className={`min-h-[100px] font-mono text-sm ${
                    errors.images
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                  {...register("images", {
                    required: "At least one image URL is required",
                  })}
                />
                {errors.images && (
                  <span className="text-xs text-red-500">
                    {errors.images.message}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}

            <Button
              type="submit"
              size="lg"
              className="w-full text-lg"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Add Product"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
