// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Link } from "wouter";
// import CTASection from "@/components/cta-section";

// export default function FenceAndGates() {
//   const customOptions = [
//     {
//       id: 1,
//       title: "Custom Gate",
//       description:
//         "Design your perfect entrance gate with our interactive customization tool.",
//       image: "./home.jpg",
//       features: [
//         "Choose from multiple styles and materials",
//         "Customize dimensions to fit your space",
//         "Add automation and security features",
//         "Preview your design in real-time",
//       ],
//       cta: "Design Your Gate",
//       link: "/custom-gate",
//     },
//     {
//       id: 2,
//       title: "Custom Fence",
//       description:
//         "Create the perfect fence for your property with our easy-to-use fence designer.",
//       image: "./home.jpg",
//       features: [
//         "Select from various fence styles",
//         "Customize height and width",
//         "Choose material and finish options",
//         "Calculate exact pricing for your project",
//       ],
//       cta: "Design Your Fence",
//       link: "/custom-fence",
//     },
//   ];

//   const gateFenceCategories = [
//     {
//       id: 1,
//       name: "Driveway Gates",
//       description: "Secure and enhance your property entrance",
//       image: "./home.jpg",
//       link: "/gates",
//     },
//     {
//       id: 2,
//       name: "Garden Gates",
//       description: "Beautiful entryways for your garden spaces",
//       image: "./home.jpg",
//       link: "/gates?category=garden",
//     },
//     {
//       id: 3,
//       name: "Privacy Fences",
//       description: "Create a secluded and private outdoor space",
//       image: "./home.jpg",
//       link: "/fences",
//     },
//     {
//       id: 4,
//       name: "Decorative Fences",
//       description: "Add style and character to your property",
//       image: "./home.jpg",
//       link: "/fences",
//     },
//   ];

//   return (
//     <main>
//       {/* Hero Section */}
//       <section className="bg-primary text-white py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
//             Custom Fence & Gates
//           </h1>
//           <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
//             Design your perfect gate or fence with our interactive customization
//             tools
//           </p>
//         </div>
//       </section>

//       {/* Custom Design Options */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {customOptions.map((option) => (
//               <Card
//                 key={option.id}
//                 className="overflow-hidden hover:shadow-xl transition-all"
//               >
//                 <img
//                   src={option.image}
//                   alt={option.title}
//                   className="w-full h-64 object-cover"
//                 />
//                 <CardContent className="p-6">
//                   <h3 className="font-heading font-bold text-2xl mb-3">
//                     {option.title}
//                   </h3>
//                   <p className="text-slate-600 mb-4">{option.description}</p>

//                   <h4 className="font-heading font-semibold text-lg mb-2">
//                     Features:
//                   </h4>
//                   <ul className="mb-6 space-y-2">
//                     {option.features.map((feature, i) => (
//                       <li key={i} className="flex items-start text-sm">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>

//                   <Link href={option.link}>
//                     <Button className="w-full bg-primary hover:bg-primary/90">
//                       {option.cta}
//                     </Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Browse Categories */}
//       <section className="py-16 bg-slate-100">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
//               Browse Our Collections
//             </h2>
//             <p className="text-slate-600 max-w-3xl mx-auto">
//               Explore our range of pre-designed gates and fences, perfect for
//               any property
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {gateFenceCategories.map((category) => (
//               <Link key={category.id} href={category.link}>
//                 <a className="block">
//                   <Card className="overflow-hidden hover:shadow-lg transition-all h-full">
//                     <img
//                       src={category.image}
//                       alt={category.name}
//                       className="w-full h-48 object-cover"
//                     />
//                     <CardContent className="p-4">
//                       <h3 className="font-heading font-semibold text-lg mb-1">
//                         {category.name}
//                       </h3>
//                       <p className="text-slate-600 text-sm">
//                         {category.description}
//                       </p>
//                     </CardContent>
//                   </Card>
//                 </a>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
//               Why Choose Our Custom Solutions
//             </h2>
//             <p className="text-slate-600 max-w-3xl mx-auto">
//               Our custom design process offers numerous advantages over standard
//               options
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <Card>
//               <CardContent className="p-6">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-primary"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="font-heading font-semibold text-xl mb-3 text-center">
//                   Perfect Fit
//                 </h3>
//                 <p className="text-slate-600 text-center">
//                   Custom designed to your exact specifications and property
//                   dimensions, ensuring a perfect fit every time.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-6">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-primary"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="font-heading font-semibold text-xl mb-3 text-center">
//                   Premium Quality
//                 </h3>
//                 <p className="text-slate-600 text-center">
//                   Built with the highest quality materials and craftsmanship,
//                   backed by our comprehensive warranty.
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-6">
//                 <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6 text-primary"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="font-heading font-semibold text-xl mb-3 text-center">
//                   Expert Support
//                 </h3>
//                 <p className="text-slate-600 text-center">
//                   Dedicated design consultants to guide you through every step
//                   of the customization process.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       <CTASection />
//     </main>
//   );
// }
