import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function DesignSection() {
  const features = [
    {
      title: "Customizable Dimensions",
      description: "Perfect fit for any entrance size",
    },
    {
      title: "Premium Materials",
      description: "Choose from aluminum, steel, or wooden options",
    },
    {
      title: "Smart Integration",
      description: "Optional automation and smart home connectivity",
    },
  ];

  return (
    <section
      id="design-gate"
      className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Design Your Perfect Gate
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Our custom gate designer allows you to create the perfect entrance
              for your property. Choose from various styles, materials, and
              features to match your home's aesthetic.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-white rounded-full p-1 mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-white/80">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="bg-white text-primary hover:bg-slate-100"
            >
              Start Designing Now
            </Button>
          </div>

          <div className="relative">
            <img
              src="https://cdn11.bigcommerce.com/s-ardd7gpavo/images/stencil/1280x1280/y/sliding%20security%20gate__23431.original.png"
              alt="Gate Designer Tool"
              className="rounded-lg shadow-2xl"
            />

            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <span className="font-heading font-medium text-slate-900">
                  Easy 3-Step Process
                </span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-heading font-medium text-slate-900">
                  Free Design Consultation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
