import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CTASection() {
  const benefits = [
    { value: "100%", label: "Made in USA" },
    { value: "10yr", label: "Warranty" },
    { value: "Free", label: "Shipping" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Abstract Design Elements */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full"></div>
          <div className="absolute right-40 top-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute left-10 bottom-10 w-32 h-32 bg-white/10 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Property?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Get started with your custom gate design today and join
                thousands of satisfied homeowners across America.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/gates">
                  <Button
                    variant="outline"
                    className="bg-white text-primary hover:bg-slate-100"
                  >
                    Design Your Gate
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="bg-white text-primary hover:bg-slate-100"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                >
                  <div className="text-3xl font-heading font-bold mb-2">
                    {benefit.value}
                  </div>
                  <div className="text-white/90">{benefit.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
