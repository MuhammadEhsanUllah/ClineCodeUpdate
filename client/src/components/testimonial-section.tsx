import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  location: string;
  initials: string;
  bgColor: string;
  textColor: string;
}

export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "The design process was incredibly simple, and the installation guide made it easy for me to set up my new gate. Excellent quality and fantastic customer support.",
      name: "Michael Johnson",
      location: "Denver, Colorado",
      initials: "MJ",
      bgColor: "bg-primary/20",
      textColor: "text-primary"
    },
    {
      id: 2,
      text: "I love how my custom gate transformed the front of my home. The quality is outstanding, and I was able to match it perfectly to my home's style. Highly recommended!",
      name: "Sarah Rodriguez",
      location: "Austin, Texas",
      initials: "SR",
      bgColor: "bg-secondary/20",
      textColor: "text-secondary"
    },
    {
      id: 3,
      text: "As a DIY enthusiast, I was impressed with how well-designed the installation process was. The gate is sturdy, operates smoothly, and looks fantastic. Worth every penny.",
      name: "David Patel",
      location: "Seattle, Washington",
      initials: "DP",
      bgColor: "bg-accent/20",
      textColor: "text-cyan-500"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Hear from homeowners who have enhanced their property with our custom gates
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${testimonial.bgColor} rounded-full flex items-center justify-center`}>
                    <span className={`${testimonial.textColor} font-heading font-bold`}>{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="font-heading font-medium text-slate-900">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
