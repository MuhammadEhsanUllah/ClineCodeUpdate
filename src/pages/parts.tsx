// import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CTASection from "@/components/cta-section";

interface Part {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  manual?: string;
}

export default function Parts() {
  // Sample parts data
  const parts: Part[] = [
    {
      id: 1,
      name: "Battery Backup",
      description:
        "Provides power to operate your gate during electrical outages.",
      price: 249,
      image: "./home.jpg",
      manual: "Battery Backup Manual",
    },
    {
      id: 2,
      name: "Motor Unit Replacement Kit",
      description: "Complete replacement motor for gate automation systems.",
      price: 399,
      image: "./home.jpg",
      manual: "Motor Replacement Guide",
    },
    {
      id: 3,
      name: "Control Board",
      description: "Replacement control board for automated gate systems.",
      price: 189,
      image: "./home.jpg",
      manual: "Control Board Installation Manual",
    },
    {
      id: 4,
      name: "Motion Safety Sensor",
      description:
        "Safety sensor that detects motion and prevents gate operation when obstructed.",
      price: 129,
      image: "./fence.jpg",
      manual: "Safety Sensor Manual",
    },
    {
      id: 5,
      name: "Gate Hinge Set",
      description: "Heavy-duty hinges for swing gates with adjustable tension.",
      price: 59,
      image: "./fence.jpg",
    },
    {
      id: 6,
      name: "Weatherproof Junction Box",
      description: "Sealed junction box for electrical connections.",
      price: 35,
      image: "./gate.jpg",
    },
    {
      id: 7,
      name: "Chain Kit",
      description: "Replacement chain kit for sliding gates.",
      price: 89,
      image: "./fence.jpg",
    },
    {
      id: 8,
      name: "Loop Detector",
      description: "Vehicle detection system for automatic gate operation.",
      price: 149,
      image: "./gate.jpg",
      manual: "Loop Detector Manual",
    },
    {
      id: 9,
      name: "Remote Control",
      description: "Additional or replacement remote control for gate systems.",
      price: 39,
      image: "./gate.jpg",
    },
    {
      id: 10,
      name: "Photocell Sensors",
      description:
        "Safety photocell sensors that prevent gate closure when beam is interrupted.",
      price: 79,
      image: "./gate.jpg",
      manual: "Photocell Sensors Manual",
    },
    {
      id: 11,
      name: "Gate Wheels",
      description: "Heavy-duty gate wheels for sliding gates.",
      price: 49,
      image: "./fence.jpg",
    },
    {
      id: 12,
      name: "Gate Lock",
      description: "Electric lock for additional gate security.",
      price: 129,
      image: "./gate.jpg",
      manual: "Electric Lock Manual",
    },
  ];

  // Group parts by category for filtering (you could add proper categories if needed)
  const motorParts = parts.filter(
    (part) =>
      part.name.toLowerCase().includes("motor") ||
      part.name.toLowerCase().includes("control") ||
      part.name.toLowerCase().includes("battery")
  );

  const safetySensors = parts.filter(
    (part) =>
      part.name.toLowerCase().includes("sensor") ||
      part.name.toLowerCase().includes("safety") ||
      part.name.toLowerCase().includes("detector")
  );

  const accessories = parts.filter(
    (part) =>
      part.name.toLowerCase().includes("remote") ||
      part.name.toLowerCase().includes("lock") ||
      part.name.toLowerCase().includes("hinge") ||
      part.name.toLowerCase().includes("wheel")
  );

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Replacement Parts
          </h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            Genuine replacement parts and accessories for your gate and fence
            systems
          </p>
        </div>
      </section>

      {/* Parts Catalog */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-3xl font-bold text-slate-900">
                Available Parts
              </h2>
              <TabsList>
                <TabsTrigger value="all">All Parts</TabsTrigger>
                <TabsTrigger value="motors">Motors & Controls</TabsTrigger>
                <TabsTrigger value="sensors">Safety Sensors</TabsTrigger>
                <TabsTrigger value="accessories">Accessories</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {parts.map((part) => (
                  <PartCard key={part.id} part={part} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="motors">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {motorParts.map((part) => (
                  <PartCard key={part.id} part={part} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sensors">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {safetySensors.map((part) => (
                  <PartCard key={part.id} part={part} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accessories">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accessories.map((part) => (
                  <PartCard key={part.id} part={part} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">
            Need Help Finding the Right Part?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8">
            Our technical support team is available to help you identify the
            exact part you need for your gate system.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90">
              Contact Support
            </Button>
            <Button variant="outline">View Installation Guides</Button>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}

function PartCard({ part }: { part: Part }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="p-4 flex items-center">
        <div className="w-24 h-24 mr-4 overflow-hidden bg-slate-100 rounded flex items-center justify-center">
          <img
            src={part.image}
            alt={part.name}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-lg mb-1">
            {part.name}
          </h3>
          <p className="text-sm text-slate-600 mb-1 line-clamp-2">
            {part.description}
          </p>
          {part.manual && (
            <a
              href="#"
              className="text-xs text-primary hover:underline block mb-2"
            >
              {part.manual}
            </a>
          )}
        </div>
      </div>
      <CardContent className="pt-0 pb-4 px-4 flex justify-between items-center">
        <span className="text-primary font-heading font-bold">
          ${part.price}
        </span>
        <Button size="sm">Add to Cart</Button>
      </CardContent>
    </Card>
  );
}
