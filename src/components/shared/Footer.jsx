"use client";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { GrLinkedin } from "react-icons/gr";


const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }
  return (
    <footer className=" py-12 border-t bg-background   overflow-hidden relative  md:text-left border border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold ">GadgetGalaxy</h3>
            <p className=" text-sm leading-relaxed">
              Your one-stop destination for the latest tech innovations. Quality
              products, best prices.
            </p>
            <div className="flex gap-4">
              {/* Social Icons (Placeholders) */}
              <Link href='https://www.facebook.com/ArafatNill69' target="_blank" className="p-2 hover:text-white rounded-full hover:bg-primary  transition cursor-pointer">
                <Facebook size={18} />
              </Link>
              <Link href='https://x.com/ArafatNill37290' target="_blank" className="p-2 hover:text-white rounded-full hover:bg-primary  transition cursor-pointer">
                <FaXTwitter size={18} />
              </Link>
              <Link href='https://www.linkedin.com/in/arafatnill/' target="_blank" className="p-2 hover:text-white rounded-full hover:bg-primary  transition cursor-pointer">
               <GrLinkedin size={18} />

              </Link>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold  mb-4">Shop</h4>
            <ul className="space-y-2 text-sm ">
              <li className=" cursor-pointer">Laptops</li>
              <li className=" cursor-pointer">Phones</li>
              <li className=" cursor-pointer">Wearables</li>
              <li className=" cursor-pointer">Audio</li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold  mb-4">Support</h4>
            <ul className="space-y-2 text-sm ">
              <li className=" cursor-pointer">Contact Us</li>
              <li className=" cursor-pointer">FAQs</li>
              <li className=" cursor-pointer">Shipping</li>
              <li className=" cursor-pointer">Returns</li>
            </ul>
          </div>

          {/* Newsletter (Optional) */}
          <div>
            <h4 className="font-bold  mb-4">Stay Updated</h4>
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="text-sm p-3 rounded  focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button className="h-11 cursor-pointer  py-2 rounded font-medium  transition">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          © 2024 GadgetGalaxy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
