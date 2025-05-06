import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import CTASection from "@/components/cta-section";

export default function CustomFence() {
  // Configuration state
  const [width, setWidth] = useState(8);
  const [postType, setPostType] = useState("One");
  const [fenceStyle, setFenceStyle] = useState("Arch");
  const [picketStyle, setPicketStyle] = useState("Single");
  const [picketSpacing, setPicketSpacing] = useState("Normal");
  const [ironworkStyle, setIronworkStyle] = useState("Vertical");

  // Calculate price based on selections (per linear foot)
  const calculatePrice = () => {
    let basePrice = 85;

    // Add price for style upgrades
    if (fenceStyle === "Finial") basePrice += 15;
    if (picketStyle === "Double") basePrice += 10;
    if (picketSpacing === "Privacy") basePrice += 12;
    if (postType === "Two") basePrice += 8;

    return basePrice;
  };

  const pricePerFoot = calculatePrice();
  const totalPrice = pricePerFoot * width;

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            CUSTOM FENCE
          </h1>
          <p className="text-white/90 text-md max-w-2xl mx-auto">
            8ft Wide, Single Pickets, +10.0ft
          </p>
        </div>
      </section>

      {/* Fence Designer */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
            {/* Fence Preview */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="relative">
                  {/* Fence Image */}
                  <img
                    src="./fence.jpg"
                    alt="Fence Preview"
                    className="w-full rounded-lg"
                  />

                  {/* Dimensions */}
                  <div className="flex justify-center mt-4">
                    <div className="text-center border-t border-slate-300 pt-2 px-6">
                      <div className="text-sm text-slate-500">Width</div>
                      <div className="font-medium">{width}' 0"</div>
                    </div>
                    <div className="text-center border-t border-slate-300 pt-2 px-6">
                      <div className="text-sm text-slate-500">Height</div>
                      <div className="font-medium">6' 0"</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Preview */}
              <div className="grid grid-cols-3 gap-2">
                <img
                  src="./fence.jpg"
                  alt="Example Fence"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <img
                  src="./fence.jpg"
                  alt="Example Fence"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <img
                  src="./fence.jpg"
                  alt="Example Fence"
                  className="w-full h-24 object-cover rounded-lg"
                />
              </div>
              <div className="text-center mt-4">
                <Button className="bg-green-500 hover:bg-green-600">
                  View Full Gallery
                </Button>
              </div>
            </div>

            {/* Configuration Options */}
            <div className="lg:col-span-4">
              <div className="space-y-8">
                {/* Width Configuration */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <label className="flex items-center justify-between mb-3">
                    <span className="text-lg font-medium text-slate-900">
                      Width
                    </span>
                    <span className="font-medium">{width}' 0"</span>
                  </label>
                  <Slider
                    defaultValue={[width]}
                    max={20}
                    min={4}
                    step={1}
                    onValueChange={(value) => setWidth(value[0])}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>4'</span>
                    <span>20'</span>
                  </div>
                </div>

                {/* Posts */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">
                    Posts
                  </h3>
                  <RadioGroup
                    value={postType}
                    onValueChange={setPostType}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="One"
                        id="post-one"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="post-one"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-yellow-50 p-4 hover:bg-yellow-100 hover:text-yellow-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>One</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="Two"
                        id="post-two"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="post-two"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-50 p-4 hover:bg-slate-100 hover:text-slate-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>Two</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Style */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">
                    Style
                  </h3>
                  <RadioGroup
                    value={fenceStyle}
                    onValueChange={setFenceStyle}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="None"
                        id="style-none"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="style-none"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-50 p-4 hover:bg-slate-100 hover:text-slate-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>None</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="Arch"
                        id="style-arch"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="style-arch"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-yellow-50 p-4 hover:bg-yellow-100 hover:text-yellow-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>Arch</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="Finial"
                        id="style-finial"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="style-finial"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-50 p-4 hover:bg-slate-100 hover:text-slate-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>Finial</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Pickets */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">
                    Pickets
                  </h3>
                  <RadioGroup
                    value={picketStyle}
                    onValueChange={setPicketStyle}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="None"
                        id="picket-none"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="picket-none"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-50 p-4 hover:bg-slate-100 hover:text-slate-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>None</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="Single"
                        id="picket-single"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="picket-single"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-yellow-50 p-4 hover:bg-yellow-100 hover:text-yellow-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>Single</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="Double"
                        id="picket-double"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="picket-double"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-50 p-4 hover:bg-slate-100 hover:text-slate-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>Double</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Picket Spacing */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">
                    Spacing
                  </h3>
                  <RadioGroup
                    value={picketSpacing}
                    onValueChange={setPicketSpacing}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="None"
                        id="spacing-none"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="spacing-none"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-50 p-4 hover:bg-slate-100 hover:text-slate-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>None</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="Normal"
                        id="spacing-normal"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="spacing-normal"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-yellow-50 p-4 hover:bg-yellow-100 hover:text-yellow-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>Normal</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="Privacy"
                        id="spacing-privacy"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="spacing-privacy"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-50 p-4 hover:bg-slate-100 hover:text-slate-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>Privacy</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Ironwork */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">
                    Ironwork
                  </h3>
                  <RadioGroup
                    value={ironworkStyle}
                    onValueChange={setIronworkStyle}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="None"
                        id="iron-none"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="iron-none"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-50 p-4 hover:bg-slate-100 hover:text-slate-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>None</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="Vertical"
                        id="iron-vertical"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="iron-vertical"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-yellow-50 p-4 hover:bg-yellow-100 hover:text-yellow-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>Vertical</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="DIY"
                        id="iron-diy"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="iron-diy"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-slate-50 p-4 hover:bg-slate-100 hover:text-slate-900 peer-data-[state=checked]:border-yellow-500 peer-data-[state=checked]:bg-yellow-100 peer-data-[state=checked]:text-yellow-900 cursor-pointer"
                      >
                        <span>DIY</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Add to Cart */}
                <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-6">
                  <div>
                    <div className="text-3xl font-bold text-primary">
                      ${totalPrice}
                    </div>
                    <div className="text-sm text-slate-500">
                      ${pricePerFoot} per linear foot
                    </div>
                  </div>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-2">
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mb-8">
            DESCRIPTION
          </h2>

          <div className="max-w-4xl mx-auto text-slate-700 space-y-4">
            <p>
              Every StandardGates side fence is first custom designed by you,
              and then our team of experienced craftspeople will use heavy duty
              steel to handcraft it to the highest industry standards. You have
              various options on both design elements and durability features
              with a long history of products and designs under our belts. When
              you place your fence order, you will be provided with professional
              design assistance as well as a thorough installation guide so that
              you can enjoy your fence installation in no time and with a
              reliable partner.
            </p>
            <p>
              Call us anytime if you have questions during the installation or
              ordering process.
            </p>
          </div>

          <h2 className="font-heading text-3xl font-bold text-slate-900 text-center mt-12 mb-8">
            FEATURES
          </h2>

          <div className="max-w-4xl mx-auto text-slate-700 space-y-4">
            <p>
              <strong>Fence / Frame:</strong> Made with black powder-coat over
              an environmentally friendly hot galvanizing process under color.
            </p>
            <p>
              <strong>Width / Base:</strong> If the size you need isn't an even
              1' length, let us know. Unless requested otherwise, all fence are
              6'0 tall when 2 inches above the ground.
            </p>
            <p>
              <strong>Posts / Type:</strong> Posts are set at 8' 0" centers to
              purchase the posts ordered here.
            </p>
            <p>
              <strong>Style / Arch:</strong> True round steel varying at 4
              inches apart.
            </p>
            <p>
              <strong>Pickets / Single:</strong> True round steel varying at 4
              inches apart.
            </p>
            <p>
              <strong>Ironwork / Vertical:</strong> High strength between spans.
            </p>
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
