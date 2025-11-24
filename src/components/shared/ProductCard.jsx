import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";

const ProductCard = ({ prod }) => {
  return (
    <div className="">
      <Card className="w-full bg-card rounded-md p-0">
        <CardHeader className="p-0 relative">
          <Image
            src={prod.images[0]}
            alt={prod.name}
            width={500}
            height={500}
            priority
            className="w-full object-cover h-60 rounded-md"
          />
          {prod.sale && (
            <Badge className="absolute top-4 right-4 bg-red-500">SALE</Badge>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">{prod.category}</p>
            <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
              <Star className="w-4 h-4 fill-current" /> {prod?.rating}
            </div>
          </div>
          <div className="flex justify-between items-center my-3">
            <h3 className="line-clamp-1 font-bold text-lg leading-none mb-2 ">{prod.name}</h3>
            <p className="line-clamp-1  font-bold text-xl text-primary">${prod.price}</p>
          </div>
          <p className="line-clamp-2  text-foreground">{prod.description}</p>
        </CardContent>

        <CardFooter className="pb-5">
          <Link
            className="w-full cursor-pointer rounded-md"
            href={`/products/${prod._id}`}
          >
            <Button className="w-full cursor-pointer" variant="default">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCard;
