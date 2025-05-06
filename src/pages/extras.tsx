import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CTASection from "@/components/cta-section";
// import { useEffect } from "react";

interface Extra {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  manual?: string;
}

export default function Extras() {
  // Sample extras data based on the image
  const extras: Extra[] = [
    {
      id: 1,
      name: "DoorBird Intercom",
      description:
        "IP controlled gate station. Equipped with camera, keypad, and app enabled access.",
      price: 399,
      image: "./gate.jpg",
      manual: "DoorBird Intercom Manual",
    },
    {
      id: 2,
      name: "Deluxe Keypad",
      description: "A wired metal keypad with a lit pad and aluminum housing.",
      price: 199,
      image: "./gate.jpg",
      manual: "Deluxe Keypad Manual",
    },
    {
      id: 3,
      name: "Wireless Keypad",
      description:
        "Easily programmed black plastic wireless keypad. 500 ft range. Up to 25 codes. Requires 2 AA Batteries.",
      price: 99,
      image: "./gate.jpg",
    },
    {
      id: 4,
      name: "Extra Remote",
      description:
        "Single push button remote for opening and closing your automated gate.",
      price: 49,
      image: "./home.jpg",
      manual: "Extra Remote Manual",
    },
    {
      id: 5,
      name: "Exit Wand",
      description:
        "Electromagnetic sensor that detects vehicles in motion to open your gate automatically.",
      price: 149,
      image: "./home.jpg",
      manual: "Exit Wand Manual",
    },
    {
      id: 6,
      name: "Mountable Solar Panel",
      description:
        "10 Watt solar panel with mounting hardware that will replace the standard plug-in power source that operates your gate.",
      price: 199,
      image: "./gate.jpg",
      manual: "Mountable Solar Panel Manual",
    },
    {
      id: 7,
      name: "Deluxe Keypad Pedestal",
      description:
        "Convenient in-ground mountable pedestal for mounting entry and exit accessories.",
      price: 99,
      image: "./gate.jpg",
      manual: "Deluxe Keypad Pedestal Manual",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Extra Access
          </h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            Enhance your gate experience with the latest StandardGates
            compatible accessories
          </p>
        </div>
      </section>

      {/* Extras Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {extras.map((extra) => (
              <Card
                key={extra.id}
                className="mb-8 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                  <div className="flex justify-center">
                    <div className="w-32 h-32 overflow-hidden bg-slate-100 rounded-lg flex items-center justify-center">
                      <img
                        src={extra.image}
                        alt={extra.name}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-heading font-semibold text-xl mb-2">
                      {extra.name}
                    </h3>
                    <p className="text-slate-600 mb-3">{extra.description}</p>
                    {extra.manual && (
                      <a
                        href="#"
                        className="text-sm text-primary hover:underline block"
                      >
                        {extra.manual}
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col items-center md:items-end">
                    <div className="text-primary font-heading font-bold text-xl mb-3">
                      ${extra.price}
                    </div>
                    <Button>Add To Cart</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-12 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <img
              src="./home.jpg"
              alt="Gallery preview"
              className="w-full h-60 object-cover rounded-lg"
            />
            <img
              src="./gate.jpg"
              alt="Gallery preview"
              className="w-full h-60 object-cover rounded-lg"
            />
            <img
              src="./gate.jpg"
              alt="Gallery preview"
              className="w-full h-60 object-cover rounded-lg"
            />
          </div>
          <div className="text-center">
            <Button className="bg-green-500 hover:bg-green-600">
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Shipping Information */}
      <section className="py-12 border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-4">
            FREE SHIPPING*
          </h2>
          <p className="text-slate-600 text-sm max-w-4xl mx-auto">
            For orders of gate/fencing to be shipped to Alaska and Hawaii, a fee
            rate of $199-$599 for non-freight shipments will be applied.
            Shipping to other states within the US is complimentary with orders
            of gate/fence over $399. Fence and gate orders below this threshold,
            accessories/parts will still be eligible for free shipping. All
            orders are shipped via FedEx/UPS. All express or freight deliveries
            have a flat-rate charge and will contact you on the day of delivery.
            Please be advised that it is your responsibility to unload your
            delivery safely on your premises. If you refuse delivery of the
            freight because of damage and missing items before signing the proof
            of delivery slip. Failure to do so may result in you being held
            responsible for any replacement or repairs needed.
          </p>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
