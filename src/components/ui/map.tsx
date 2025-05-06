// import { useEffect, useRef } from "react";
// import { Card } from "@/components/ui/card";

// interface MapMarker {
//   id: number;
//   lat: number;
//   lng: number;
//   city?: string;
//   state?: string;
//   product?: string;
//   completedAgo?: string;
// }

// interface MapProps {
//   markers: MapMarker[];
//   latestInstallation?: MapMarker;
// }

// export default function Map({ markers, latestInstallation }: MapProps) {
//   const mapContainerRef = useRef<HTMLDivElement>(null);
//   const markersRef = useRef<HTMLDivElement[]>([]);

//   // Animation for markers
//   useEffect(() => {
//     const animateMarkers = () => {
//       markersRef.current.forEach((marker, index) => {
//         if (marker) {
//           setTimeout(() => {
//             marker.classList.add("animate-pulse");
//           }, index * 100);
//         }
//       });
//     };

//     animateMarkers();
//     const interval = setInterval(animateMarkers, 3000);

//     return () => clearInterval(interval);
//   }, [markers.length]);

//   return (
//     <Card className="p-4 md:p-8 relative overflow-hidden h-[500px]">
//       {/* USA Map Background */}
//       <div className="absolute inset-0 opacity-90">
//         <img
//           src="/uk.jpg"
//           alt="USA Map"
//           className="w-full h-full object-cover opacity-20"
//         />

//         {/* Map Markers */}
//         {markers.map((marker, index) => (
//           <div
//             key={marker.id}
//             ref={(el) => {
//               if (el) markersRef.current[index] = el;
//             }}
//             className="absolute w-3 h-3 bg-primary rounded-full shadow-md"
//             style={{
//               top: `${marker.lat}%`,
//               left: `${marker.lng}%`,
//               transform: "translate(-50%, -50%)",
//             }}
//           />
//         ))}

//         {/* Latest Installation Highlight */}
//         {latestInstallation && (
//           <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-xs">
//             <div className="font-heading font-medium text-slate-900 mb-2">
//               Latest Installation
//             </div>
//             <div className="text-sm text-slate-600">
//               <span className="font-semibold">
//                 {latestInstallation.city}, {latestInstallation.state}
//               </span>{" "}
//               - {latestInstallation.product}
//             </div>
//             <div className="mt-2 text-xs text-green-500 font-medium">
//               Completed {latestInstallation.completedAgo}
//             </div>
//           </div>
//         )}
//       </div>
//     </Card>
//   );
// }
