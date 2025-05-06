import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tag?: string;
}

export default function ProductGallery() {
  // Filter categories
  const categories = ["All Gates", "Driveway", "Garden"];
  const [activeCategory, setActiveCategory] = useState("All Gates");

  // Sample product data
  const products: Product[] = [
    {
      id: 1,
      name: "Modern Arched Gate",
      description: "Elegant design with premium materials",
      price: 1299,
      image: "./gate.jpg",
      category: "Driveway",
      tag: "POPULAR",
    },
    {
      id: 2,
      name: "Security Sliding Gate",
      description: "Maximum security with modern aesthetic",
      price: 1599,
      image: "./gate.jpg",
      category: "Driveway",
    },
    {
      id: 3,
      name: "Classic Wrought Iron",
      description: "Timeless design with modern functionality",
      price: 1899,
      image: "./gate.jpg",
      category: "Garden",
      tag: "BESTSELLER",
    },
    {
      id: 4,
      name: "Smart Security Gate",
      description: "App-controlled with advanced security",
      price: 2199,
      image: "./gate.jpg",
      category: "Driveway",
    },
  ];

  // Filter products by category
  const filteredProducts =
    activeCategory === "All Gates"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section id="gallery" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-2">
              Featured Gate Designs
            </h2>
            <p className="text-slate-600">
              Browse our most popular custom gate designs
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div
              className="inline-flex rounded-md shadow-sm mt-4 md:mt-0"
              role="group"
            >
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`${
                    index === 0
                      ? "rounded-r-none"
                      : index === categories.length - 1
                      ? "rounded-l-none"
                      : "rounded-none border-l-0"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.tag && (
                  <Badge
                    className={`absolute top-2 right-2 ${
                      product.tag === "BESTSELLER"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {product.tag}
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {product.name}
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  {product.description}
                </p>
                {/* <div className="flex justify-between items-center">
                  <span className="text-primary font-heading font-bold">
                    ${product.price}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary hover:bg-primary hover:text-white"
                  >
                    View Details
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/gates">
            <Button>View All Designs</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
