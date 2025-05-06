import { Button } from "@/components/ui/button";
import { Link } from "wouter";
// import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight">
              Premium Custom Gates <br />
              <span className="text-secondary">Made in America</span>
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Design custom-sized automatic gates and fences built to the
              highest industry standards, delivered directly to your home at no
              extra cost.
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
              <Link href="/gallery">
                <Button
                  variant="outline"
                  className="bg-white text-primary hover:bg-slate-100"
                >
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="./gate.jpg"
              alt="Modern security gate"
              className="rounded-lg shadow-2xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-md shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-heading font-medium text-slate-900">
                  Easy Installation
                </span>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-md shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-heading font-medium text-slate-900">
                  Quality American Made
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full h-auto"
        >
          <path
            fill="#F7F9FC"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
