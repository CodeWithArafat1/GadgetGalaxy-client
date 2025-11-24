import { Laptop, Smartphone, Watch, Headphones, Camera, Gamepad2 } from "lucide-react";

const categories = [
  { icon: Smartphone, label: "Phones" },
  { icon: Laptop, label: "Laptops" },
  { icon: Watch, label: "Smartwatch" },
  { icon: Headphones, label: "Audio" },
  { icon: Camera, label: "Camera" },
  { icon: Gamepad2, label: "Gaming" },
];

const Categories = () => {
  return (
    <section className="py-10 container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-8 text-center md:text-left">Browse by Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center justify-center p-6 bg-muted border border-border rounded-xl shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group"
          >
            <cat.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
            <span className="font-medium text-sm text-muted-foreground group-hover:text-primary">{cat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;