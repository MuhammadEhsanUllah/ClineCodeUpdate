// import Map from "./ui/map";

export default function MapSection() {
  // Sample marker data
  // const markers = [
  //   { id: 1, lat: 30, lng: 25 },
  //   { id: 2, lat: 45, lng: 40 },
  //   { id: 3, lat: 35, lng: 70 },
  //   { id: 4, lat: 60, lng: 80 },
  //   { id: 5, lat: 50, lng: 30 },
  //   { id: 6, lat: 40, lng: 60 },
  //   { id: 7, lat: 70, lng: 50 },
  //   { id: 8, lat: 25, lng: 55 },
  //   { id: 9, lat: 55, lng: 75 },
  //   { id: 10, lat: 65, lng: 35 },
  //   { id: 11, lat: 20, lng: 65 },
  //   { id: 12, lat: 75, lng: 45 },
  // ];

  // Latest installation
  // const latestInstallation = {
  //   id: 13,
  //   lat: 40,
  //   lng: 30,
  //   city: "Houston",
  //   state: "TX",
  //   product: "Custom Dual Swing Gate",
  //   completedAgo: "2 hours ago",
  // };

  return (
    <section className="py-12 bg-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">
            Our Growing Community
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers across the United States who
            have chosen SecureGates for their home security needs.
          </p>
        </div>

        {/* <Map markers={markers} latestInstallation={latestInstallation} /> */}
      </div>
    </section>
  );
}
