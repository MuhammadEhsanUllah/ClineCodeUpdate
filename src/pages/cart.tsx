import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";
import { Upload, Check } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Cart() {
  const {
    cart,
    removeItem,
    cartTotal,
    savingsTotal,
    toggleUpgrade,
    updateShippingInfo,
    updateRequests,
    addImage,
  } = useCart();

  const [billingMatchesShipping, setBillingMatchesShipping] = useState(true);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...files]);
      console.log(imageFiles);
      console.log(cartTotal);

      // You would typically upload these to a server and get back URLs
      // For this demo, we'll just create object URLs
      files.forEach((file) => {
        const imageUrl = URL.createObjectURL(file);
        addImage(imageUrl);
      });
    }
  };

  // Handle shipping info updates
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateShippingInfo({ [name]: value });
  };

  // Estimate shipping weeks
  const getShippingEstimate = () => {
    if (cart.upgrades.expediteManufacturing) {
      return "1 week";
    }
    return "2-3 weeks";
  };

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="bg-green-500 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">
                DIY Install Savings: ${savingsTotal || 2990}
              </h3>
              <p className="text-sm">Standard professional installation cost</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-b-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-center mb-4">SHOPPING CART</h1>
          <p className="text-center text-gray-600 mb-8">
            Call at any time for support: (800) 835-0793
          </p>

          {cart.items.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-medium mb-4">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">
                Add some products to your cart to continue shopping
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/gates">
                  <Button className="bg-primary hover:bg-primary/90">
                    Browse Gates
                  </Button>
                </Link>
                <Link href="/fences">
                  <Button className="bg-primary hover:bg-primary/90">
                    Browse Fences
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b pb-4"
                  >
                    <div className="w-16 h-16 mr-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {item.configuration?.width &&
                          `${item.configuration.width}ft Wide, `}
                        {item.configuration?.kitType &&
                          `${item.configuration.kitType} Kit, `}
                        {item.configuration?.panels &&
                          `${item.configuration.panels} Panels, `}
                        {item.configuration?.style &&
                          `${item.configuration.style} Style, `}
                        {item.configuration?.pickets &&
                          `${item.configuration.pickets} Pickets, `}
                        {item.configuration?.access &&
                          `${item.configuration.access} Access`}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end">
                        {item.originalPrice && (
                          <span className="text-gray-500 line-through mr-2">
                            ${item.originalPrice}
                          </span>
                        )}
                        <span className="font-semibold text-lg">
                          ${item.price}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  {/* Add More Items Buttons */}
                  <div className="flex gap-4">
                    <Link href="/fences">
                      <Button className="w-full bg-amber-500 hover:bg-amber-600">
                        Add Fences
                      </Button>
                    </Link>
                    <Link href="/extras">
                      <Button className="w-full bg-amber-500 hover:bg-amber-600">
                        Add Extras
                      </Button>
                    </Link>
                  </div>

                  {/* Requests Section */}
                  <div>
                    <h3 className="font-bold text-lg uppercase mb-2">
                      REQUESTS
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Optional. May change price or be denied.
                    </p>
                    <Textarea
                      placeholder="Enter any special requests here..."
                      className="w-full"
                      value={cart.requests}
                      onChange={(e) => updateRequests(e.target.value)}
                    />
                  </div>

                  {/* Images Section */}
                  <div>
                    <h3 className="font-bold text-lg uppercase mb-2">IMAGES</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Optional. If you want us to see something.
                    </p>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                      >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                          Choose images to upload
                        </p>
                        <p className="text-xs text-gray-400">
                          or drag and drop them here
                        </p>
                      </label>
                    </div>

                    {/* Preview uploaded images */}
                    {cart.images && cart.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {cart.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Uploaded ${index + 1}`}
                              className="w-full h-20 object-cover rounded-md"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Upgrades Section */}
                  <div>
                    <h3 className="font-bold text-lg uppercase mb-4">
                      UPGRADES
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Further improve your experience.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 border-b pb-4">
                        <div className="pt-0.5">
                          <Checkbox
                            id="expedite-manufacturing"
                            checked={cart.upgrades.expediteManufacturing}
                            onCheckedChange={() =>
                              toggleUpgrade("expediteManufacturing")
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor="expedite-manufacturing"
                            className="font-medium text-base cursor-pointer"
                          >
                            Expedite Manufacturing - $500
                          </label>
                          <p className="text-sm text-gray-600">
                            Upgrade to 1 week manufacturing lead time.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="pt-0.5">
                          <Checkbox
                            id="liftgate-delivery"
                            checked={cart.upgrades.liftgateDelivery}
                            onCheckedChange={() =>
                              toggleUpgrade("liftgateDelivery")
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="liftgate-delivery"
                            className="font-medium text-base flex items-center cursor-pointer"
                          >
                            Liftgate Delivery - $85{" "}
                            <Check className="w-4 h-4 ml-2 text-amber-500" />
                          </label>
                          <p className="text-sm text-gray-600">
                            Truck (liftgate) makes unloading freight much easier
                            but may require multiple people.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Shipping Section */}
                  <div>
                    <h3 className="font-bold text-lg uppercase mb-4">
                      SHIPPING
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Est. Ships In: {getShippingEstimate()}
                    </p>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={cart.shipping_info?.email || ""}
                            onChange={handleShippingInfoChange}
                            placeholder="your@email.com"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Phone
                          </label>
                          <PhoneInput
                            country={"us"}
                            value={cart.shipping_info?.phone || ""}
                            // onChange={(phone) =>
                            //   setFormData({ ...formData, phone })
                            // }
                            inputClass="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {/* {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                          </p>
                        )} */}
                        </div>
                      </div>

                      {/* <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={cart.shipping_info?.phone || ''}
                          onChange={handleShippingInfoChange}
                          placeholder="(800) 835-0793"
                        />
                      </div> */}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            First Name
                          </label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={cart.shipping_info?.firstName || ""}
                            onChange={handleShippingInfoChange}
                            placeholder="Standard"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Last Name
                          </label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={cart.shipping_info?.lastName || ""}
                            onChange={handleShippingInfoChange}
                            placeholder="Gates"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Street
                        </label>
                        <Input
                          id="street"
                          name="street"
                          value={cart.shipping_info?.street || ""}
                          onChange={handleShippingInfoChange}
                          placeholder="23 Las Colinas Ln #110"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          City
                        </label>
                        <Input
                          id="city"
                          name="city"
                          value={cart.shipping_info?.city || ""}
                          onChange={handleShippingInfoChange}
                          placeholder="San Jose"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            State
                          </label>
                          <Input
                            id="state"
                            name="state"
                            value={cart.shipping_info?.state || ""}
                            onChange={handleShippingInfoChange}
                            placeholder="CA"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="zipCode"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Zip Code
                          </label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={cart.shipping_info?.zipCode || ""}
                            onChange={handleShippingInfoChange}
                            placeholder="95110"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing Section */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg uppercase">BILLING</h3>
                      <div className="flex items-center">
                        <Checkbox
                          id="same-as-shipping"
                          checked={billingMatchesShipping}
                          onCheckedChange={(checked) =>
                            setBillingMatchesShipping(!!checked)
                          }
                          className="mr-2"
                        />
                        <label
                          htmlFor="same-as-shipping"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          Same as Ship{" "}
                          <Check className="w-4 h-4 inline-block text-amber-500 ml-1" />
                        </label>
                      </div>
                    </div>

                    {/* If billing doesn't match shipping, show billing form */}
                    {!billingMatchesShipping && (
                      <div className="mt-4 space-y-4">
                        {/* Billing form fields would go here - similar to shipping */}
                        <p className="text-gray-600 text-sm">
                          Billing information form would appear here.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-6 text-lg font-semibold rounded-md">
                    Save & Continue
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
