
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import PromoBanner from "@/components/home/PromoBanner";
import Services from "@/components/home/Services";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <FeaturedProducts />
      <PromoBanner />
      <Services />
      <Categories />
     
    </div>
  );
}
