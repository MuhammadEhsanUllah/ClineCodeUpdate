import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Check,
  Shield,
  Lock,
  Clock,
  Smartphone,
  Drill,
  ThumbsUp,
  Zap,
} from "lucide-react";
import CTASection from "@/components/cta-section";

export default function Features() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Product Features & Benefits
          </h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            Discover the innovative features and exceptional benefits that set
            our gates and fences apart
          </p>
        </div>
      </section>

      {/* Key Features Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="security" className="w-full">
            <div className="text-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-6">
                Key Features
              </h2>
              <TabsList className="inline-flex">
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="smart">Smart Technology</TabsTrigger>
                <TabsTrigger value="design">Design & Customization</TabsTrigger>
                <TabsTrigger value="installation">Installation</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="security" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">
                    Advanced Security Features
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Our gates and fences are engineered with security as a top
                    priority, providing peace of mind for you and your family.
                  </p>

                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Shield className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-heading font-semibold text-slate-900">
                          Tamper-Resistant Hardware
                        </h4>
                        <p className="text-slate-600">
                          Special security bolts and tamper-resistant hardware
                          protect against unauthorized access attempts.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Lock className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-heading font-semibold text-slate-900">
                          Advanced Locking Systems
                        </h4>
                        <p className="text-slate-600">
                          Multi-point locking systems and heavy-duty locks that
                          exceed industry security standards.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-heading font-semibold text-slate-900">
                          Anti-Climb Design
                        </h4>
                        <p className="text-slate-600">
                          Our fences incorporate anti-climb features to prevent
                          unauthorized scaling.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <img
                    src="./secGate.jpg"
                    alt="Security gate features"
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="smart" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                    src="./tgate.jpg"
                    alt="Smart gate technology"
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">
                    Smart Technology Integration
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Control and monitor your gate from anywhere with our smart
                    technology options and integrations.
                  </p>

                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Smartphone className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-heading font-semibold text-slate-900">
                          Mobile App Control
                        </h4>
                        <p className="text-slate-600">
                          Open, close, and monitor your gate from anywhere using
                          our intuitive mobile application.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-heading font-semibold text-slate-900">
                          Voice Assistant Compatibility
                        </h4>
                        <p className="text-slate-600">
                          Compatible with popular voice assistants like Alexa,
                          Google Assistant, and Siri.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-heading font-semibold text-slate-900">
                          Scheduled Operations
                        </h4>
                        <p className="text-slate-600">
                          Set schedules for automatic opening and closing based
                          on your daily routine.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="design" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">
                    Customization Options
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Personalize your gate or fence to match your property's
                    style with our extensive design options.
                  </p>

                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="h-6 w-6 text-primary mr-3 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-slate-900">
                          Multiple Style Options
                        </h4>
                        <p className="text-slate-600">
                          Choose from modern, traditional, or custom designs to
                          complement your home's architecture.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 text-primary mr-3 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-slate-900">
                          Premium Material Selection
                        </h4>
                        <p className="text-slate-600">
                          Select from aluminum, steel, wrought iron, or wood
                          materials in various finishes.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 text-primary mr-3 flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-slate-900">
                          Decorative Elements
                        </h4>
                        <p className="text-slate-600">
                          Add custom finials, scrolls, and other decorative
                          elements to create a unique look.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <img
                    src="./fgate.jpg"
                    alt="Gate customization options"
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="installation" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                    src="./home.jpg"
                    alt="Gate installation"
                    className="rounded-lg shadow-lg w-full"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">
                    Easy Installation Process
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Our products are designed for straightforward installation
                    with comprehensive support.
                  </p>

                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Drill className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-heading font-semibold text-slate-900">
                          DIY Installation Guides
                        </h4>
                        <p className="text-slate-600">
                          Detailed step-by-step instructions, videos, and
                          support for DIY installations.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <ThumbsUp className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-heading font-semibold text-slate-900">
                          Professional Installation Network
                        </h4>
                        <p className="text-slate-600">
                          Access to our nationwide network of certified
                          installation professionals.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-heading font-semibold text-slate-900">
                          Pre-Configured Components
                        </h4>
                        <p className="text-slate-600">
                          Pre-assembled and pre-configured components that
                          reduce installation time and complexity.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Warranty & Support */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
              Warranty & Support
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto">
              We stand behind our products with industry-leading warranties and
              exceptional customer support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4">
                  10-Year Warranty
                </h3>
                <p className="text-slate-600 mb-6">
                  All our products come with a comprehensive 10-year warranty
                  covering structural defects and finish.
                </p>
                <Button variant="outline">View Warranty Details</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4">
                  24/7 Technical Support
                </h3>
                <p className="text-slate-600 mb-6">
                  Our dedicated support team is available around the clock to
                  assist with any questions or issues.
                </p>
                <Button variant="outline">Contact Support</Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-xl mb-4">
                  30-Day Returns
                </h3>
                <p className="text-slate-600 mb-6">
                  Not completely satisfied? Return your unused product within 30
                  days for a full refund.
                </p>
                <Button variant="outline">Return Policy</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
