import { Card, CardContent } from "@/components/ui/card";

export default function CompanyIntro() {
  const stats = [
    { value: "5,000+", label: "Gates Installed" },
    { value: "48", label: "States Served" },
    { value: "99%", label: "Satisfaction Rate" },
    { value: "100%", label: "American Made" },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">Securing American Homes</h2>
          <p className="text-lg text-slate-600">
            We began with a simple promise: design custom-sized automatic gates and fences of the highest quality, deliver them directly to fellow Americans for free, and provide enjoyable, easy-to-follow DIY installation guides.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all">
              <CardContent className="p-6 text-center">
                <div className="text-primary text-4xl font-bold font-heading mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
