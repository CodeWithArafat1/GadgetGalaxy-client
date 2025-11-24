import { Truck, ShieldCheck, RefreshCw, Headset } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On all orders over $50",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% protected payments",
  },
  {
    icon: RefreshCw,
    title: "30 Days Return",
    description: "Money back guarantee",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Dedicated support team",
  },
];

const Services = () => {
  return (
    <section className="py-16 bg-muted border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;