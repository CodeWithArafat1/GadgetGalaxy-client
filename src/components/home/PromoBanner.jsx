import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const PromoBanner = () => {
  return (
    <section className="container mx-auto px-4 my-20">
      <div className="bg-muted rounded-3xl p-8 md:p-12 overflow-hidden relative text-center md:text-left  border-border border-2">
        {/* Background Shape (Optional Subtle Decoration) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-muted blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />

        <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-primary text-muted text-xs font-bold tracking-wide rounded-full">
              LIMITED TIME OFFER
            </span>
            {/* Text Color: Dark for Light Background */}
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
              Enhance Your <br />{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600">Gaming Experience</span>
            </h2>
            <p className="text-muted-foreground max-w-md font-medium">
              Get up to 50% off on premium gaming headsets and mechanical
              keyboards. Offer ends this Sunday.
            </p>

            {/* Button: Dark to pop against Light BG */}
            <Button
              size="lg"
              className="mt-4 bg-black text-white hover:bg-gray-800 rounded-full px-8"
            >
              <Link href="/products">Grab the Deal</Link>
            </Button>
          </div>

          {/* Image Area */}
          <div className="relative h-64 md:h-80 w-full flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-xl">
              <Image
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                src="https://i.pinimg.com/1200x/f5/b5/8d/f5b58d7203547efcb3f134743cf19bbe.jpg"
                width={1000}
                height={1000}
                alt="Gaming Setup"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
