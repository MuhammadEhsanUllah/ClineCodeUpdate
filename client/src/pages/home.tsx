import HeroSection from "@/components/hero-section";
import CompanyIntro from "@/components/company-intro";
import MapSection from "@/components/map-section";
import ProductGallery from "@/components/product-gallery";
import DesignSection from "@/components/design-section";
import TestimonialSection from "@/components/testimonial-section";
import CTASection from "@/components/cta-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CompanyIntro />
      <MapSection />
      <ProductGallery />
      <DesignSection />
      <TestimonialSection />
      <CTASection />
    </main>
  );
}
