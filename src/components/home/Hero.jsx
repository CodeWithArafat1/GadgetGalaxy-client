import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            🚀 New Arrival: iPhone 16 Pro Max
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary">
            Experience the <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600">
              Future of Tech
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
            Explore the latest gadgets, accessories, and premium electronics
            designed to elevate your lifestyle. Quality meets innovation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto lg:ml-auto">
          {/* Abstract Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl -z-10" />

          {/* Mockup Image Card */}
          <div className="relative bg-card border border-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 max-w-sm">
            <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
              <Image src="https://i.pinimg.com/736x/1c/62/86/1c628630545671a69c8155284132f498.jpg" width={1000} height={100} alt="name"/>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-xl">Apple Vision Pro</h3>
              <p className="text-sm text-muted-foreground">
                Spatial computing is here.
              </p>
              <div className="flex items-center justify-between font-bold">
                <span>$3,499</span>
                <Button size="sm">Buy</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
