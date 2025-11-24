import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Globe,
  Users,
  Zap,
  Award,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main>
        {/* 1. Hero Section */}
        <section className="py-20 md:py-32 bg-background text-center px-4">
          <div className="container mx-auto max-w-3xl space-y-6">
            <Badge
              variant="outline"
              className="border-border text-foreground px-4 py-1"
            >
              Established 2024
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
              We bridge the gap between <br />
              <span className="text-primary">Imagination & Technology.</span>
            </h1>
            <p className="text-lg text-foreground leading-relaxed">
              At GadgetGalaxy, we believe technology should be accessible,
              intuitive, and inspiring. We curate the world best gadgets to
              elevate your everyday life.
            </p>
          </div>
        </section>

        {/* 2. Our Story Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-square md:aspect-4/3 rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Our Team"
                fill
                sizes="1000px"
                priority
                className="object-cover"
              />
            </div>
            {/* Text */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Journey</h2>
              <p className="text-foreground leading-relaxed">
                GadgetGalaxy started as a small passion project in a garage. We
                were frustrated with the lack of reliable, premium tech stores
                that offered genuine products with excellent support.
              </p>
              <p className="text-foreground leading-relaxed">
                Today, we are a team of tech enthusiasts serving thousands of
                customers worldwide. We do not just sell products; we sell
                experiences. Every item in our catalog is handpicked and tested
                by our experts.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-600" /> Authentic
                  Products
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-600" /> 24/7
                  Support
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-600" /> Global
                  Warranty
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-green-600" /> Fast
                  Shipping
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Stats Section */}
        <section className="bg-muted border-2 rounded-3xl p-8 md:p-12 overflow-hidden relative text-center md:text-left border-border py-16 ">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">10k+</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest">
                Happy Customers
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">500+</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest">
                Premium Products
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest">
                Global Brands
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">4.9</div>
              <div className="text-sm text-slate-400 uppercase tracking-widest">
                Average Rating
              </div>
            </div>
          </div>
        </section>

        {/* 4. Team Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet the Minds</h2>
            <p className="text-slate-500">
              The passionate people behind GadgetGalaxy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="group text-center space-y-4">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-border group-hover:border-border transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
                  fill
                  sizes="1000px"
                  priority
                  className="object-cover"
                  alt="CEO"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Alex Johnson</h3>
                <p className="text-sm text-primary font-medium">
                  Founder & CEO
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="group text-center space-y-4">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-border group-hover:border-border transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                  fill
                  sizes="1000px"
                  priority
                  className="object-cover"
                  alt="CTO"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Sarah Williams</h3>
                <p className="text-sm text-primary font-medium">
                  Head of Design
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="group text-center space-y-4">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-border group-hover:border-border transition-colors">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
                  fill
                  sizes="1000px"
                  priority
                  className="object-cover"
                  alt="Manager"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Michael Brown</h3>
                <p className="text-sm text-primary font-medium">
                  Product Manager
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* 5. Values / CTA Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center max-w-2xl space-y-8">
            <div className="flex justify-center gap-6 mb-8 text-slate-300">
              <Globe className="w-12 h-12" />
              <Award className="w-12 h-12" />
              <Zap className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold">
              Ready to upgrade your lifestyle?
            </h2>
            <p className="text-foreground">
              Join thousands of satisfied customers and experience the future of
              technology today.
            </p>

            <Link href="/products">
              <Button size="lg" className="rounded-full px-8 h-12 text-lg">
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
