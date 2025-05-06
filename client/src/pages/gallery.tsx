import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CTASection from "@/components/cta-section";

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
}

export default function Gallery() {
  // Sample gallery data
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Modern Arched Entrance Gate",
      image: "./gate.jpg",
      category: "Driveway",
      description:
        "Elegant arched gate design with premium aluminum construction",
    },
    {
      id: 2,
      title: "Contemporary Sliding Gate",
      image: "./gate.jpg",
      category: "Driveway",
      description: "Space-saving sliding gate with modern aesthetic",
    },
    {
      id: 3,
      title: "Ornamental Garden Gate",
      image: "./gate.jpg",
      category: "Garden",
      description: "Decorative wrought iron garden gate with intricate details",
    },
    {
      id: 4,
      title: "Smart Security Entrance",
      image: "./gate.jpg",
      category: "Driveway",
      description: "App-controlled gate with advanced security features",
    },
    {
      id: 5,
      title: "Horizontal Wood Privacy Fence",
      image: "./gate.jpg",
      category: "Fence",
      description: "Modern horizontal slat fencing for privacy and style",
    },
    {
      id: 6,
      title: "Classic Wrought Iron Fence",
      image: "./gate.jpg",
      category: "Fence",
      description: "Traditional wrought iron fence with decorative elements",
    },
    {
      id: 7,
      title: "Commercial Security Gate",
      image: "./home.jpg",
      category: "Commercial",
      description: "Heavy-duty commercial entrance security gate",
    },
    {
      id: 8,
      title: "Residential Double Swing Gate",
      image: "./gate.jpg",
      category: "Driveway",
      description: "Classic double swing gate for residential driveways",
    },
    {
      id: 9,
      title: "Garden Arbor Gate",
      image: "./home.jpg",
      category: "Garden",
      description: "Decorative garden entrance with climbing plant support",
    },
  ];

  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Inspiration Gallery
          </h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            Browse our collection of custom gates and fences to inspire your
            next project
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="driveway">Driveway Gates</TabsTrigger>
                <TabsTrigger value="garden">Garden Gates</TabsTrigger>
                <TabsTrigger value="fence">Fences</TabsTrigger>
                <TabsTrigger value="commercial">Commercial</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems.map((item) => (
                  <GalleryCard
                    key={item.id}
                    item={item}
                    onClick={() => openModal(item)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="driveway">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems
                  .filter((item) => item.category === "Driveway")
                  .map((item) => (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      onClick={() => openModal(item)}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="garden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems
                  .filter((item) => item.category === "Garden")
                  .map((item) => (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      onClick={() => openModal(item)}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="fence">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems
                  .filter((item) => item.category === "Fence")
                  .map((item) => (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      onClick={() => openModal(item)}
                    />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="commercial">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryItems
                  .filter((item) => item.category === "Commercial")
                  .map((item) => (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      onClick={() => openModal(item)}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Design Process Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
              Our Design Process
            </h2>
            <p className="text-slate-600">
              From initial concept to final installation, our streamlined
              process ensures a seamless experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  Consultation
                </h3>
                <p className="text-slate-600">
                  Discuss your requirements, preferences, and property
                  specifications with our design experts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  Custom Design
                </h3>
                <p className="text-slate-600">
                  Our designers create custom gate or fence designs tailored to
                  your specifications.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  Manufacturing
                </h3>
                <p className="text-slate-600">
                  Your design is precision-crafted in our American manufacturing
                  facilities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center mx-auto mb-4">
                  4
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  Installation
                </h3>
                <p className="text-slate-600">
                  We provide detailed DIY instructions or professional
                  installation services.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button>Start Your Design</Button>
          </div>
        </div>
      </section>

      <CTASection />

      {/* Modal Dialog for Gallery Item */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-heading font-bold text-2xl text-slate-900">
                  {selectedItem.title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="mb-6">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <div className="mb-6">
                <p className="text-slate-600 mb-4">
                  {selectedItem.description}
                </p>
                <div className="flex items-center">
                  <span className="font-medium text-slate-900 mr-2">
                    Category:
                  </span>
                  <span className="text-primary">{selectedItem.category}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                <Button>Get This Design</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="relative pb-[66%]">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-heading font-semibold text-lg mb-1">
          {item.title}
        </h3>
        <div className="text-sm text-primary mb-2">{item.category}</div>
        <p className="text-slate-600 text-sm">{item.description}</p>
      </CardContent>
    </Card>
  );
}
