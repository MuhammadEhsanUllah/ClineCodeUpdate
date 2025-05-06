import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Gates from "@/pages/gates";
import Fences from "@/pages/fences";
import Features from "@/pages/features";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import Gallery from "@/pages/gallery";
import Parts from "@/pages/parts";
import Extras from "@/pages/extras";
// import FenceAndGates from "@/pages/fence-and-gates";/
import CustomGate from "@/pages/custom-gate";
import CustomFence from "@/pages/custom-fence";
import Cart from "@/pages/cart";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CartProvider } from "./hooks/use-cart";
import { ApiKeyProvider } from "./hooks/use-api-key";
import ApiKeyDialog from "./components/api-key-dialog";

function Router() {
  const [location] = useLocation();
  return (
    <>
      {/* Conditionally render Header and Footer based on the current route */}
      {!["/login", "/signup"].includes(location) && <Header />}

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Home} />
        <Route path="/gates" component={Gates} />
        <Route path="/fences" component={Fences} />
        <Route path="/features" component={Features} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/parts" component={Parts} />
        <Route path="/extras" component={Extras} />
        {/* <Route path="/fence-and-gates" component={FenceAndGates} /> */}
        <Route path="/custom-gate" component={CustomGate} />
        <Route path="/custom-fence" component={CustomFence} />
        <Route path="/cart" component={Cart} />
        <Route component={NotFound} />
      </Switch>
      {!["/login", "/signup"].includes(location) && <Footer />}
      {/* <Footer /> */}
    </>
  );
}

function App() {
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ApiKeyProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Router />
            <Toaster />
            <ApiKeyDialog
              open={apiKeyDialogOpen}
              onOpenChange={setApiKeyDialogOpen}
            />

            {/* API Key Settings Button - Fixed Position */}
            {/* <button
              onClick={() => setApiKeyDialogOpen(true)}
              className="fixed right-4 bottom-4 bg-slate-800 text-white p-2 rounded-full shadow-lg hover:bg-slate-700 transition-colors"
              title="Configure API Key"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
              </svg>
            </button> */}
          </div>
        </CartProvider>
      </ApiKeyProvider>
    </QueryClientProvider>
  );
}

export default App;

// import { useState } from "react";
// import { Switch, Route } from "wouter";
// import { queryClient } from "./lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import NotFound from "@/pages/not-found";
// import Home from "@/pages/home";
// import Gates from "@/pages/gates";
// import Fences from "@/pages/fences";
// import Features from "@/pages/features";
// import Gallery from "@/pages/gallery";
// import Parts from "@/pages/parts";
// import Extras from "@/pages/extras";
// import FenceAndGates from "@/pages/fence-and-gates";
// import CustomGate from "@/pages/custom-gate";
// import CustomFence from "@/pages/custom-fence";
// import Cart from "@/pages/cart";
// import Header from "@/components/layout/header";
// import Footer from "@/components/layout/footer";
// import { CartProvider } from "./hooks/use-cart";
// import { ApiKeyProvider } from "./hooks/use-api-key";
// import ApiKeyDialog from "./components/api-key-dialog";

// import { GoogleOAuthProvider } from "@react-oauth/google";

// function Router() {
//   return (
//     <>
//       <Header />
//       <Switch>
//         <Route path="/" component={Home} />
//         <Route path="/gates" component={Gates} />
//         <Route path="/fences" component={Fences} />
//         <Route path="/features" component={Features} />
//         <Route path="/gallery" component={Gallery} />
//         <Route path="/parts" component={Parts} />
//         <Route path="/extras" component={Extras} />
//         <Route path="/fence-and-gates" component={FenceAndGates} />
//         <Route path="/custom-gate" component={CustomGate} />
//         <Route path="/custom-fence" component={CustomFence} />
//         <Route path="/cart" component={Cart} />
//         <Route component={NotFound} />
//       </Switch>
//       <Footer />
//     </>
//   );
// }

// function App() {
//   const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);

//   return (
//     <GoogleOAuthProvider clientId="836682989482-6silfmiankdfmd7ma2mmu41i1fqgqekm.apps.googleusercontent.com">
//       <QueryClientProvider client={queryClient}>
//         <ApiKeyProvider>
//           <CartProvider>
//             <div className="flex flex-col min-h-screen">
//               {/* 🟰 Google Login Section */}

//               {/* 🛒 Full App Router */}
//               <Router />

//               {/* 🔔 Toast Notifications */}
//               <Toaster />

//               {/* 🔑 API Key Dialog */}
//               <ApiKeyDialog
//                 open={apiKeyDialogOpen}
//                 onOpenChange={setApiKeyDialogOpen}
//               />

//               {/* ⚙️ API Key Settings Button */}
//               <button
//                 onClick={() => setApiKeyDialogOpen(true)}
//                 className="fixed right-4 bottom-4 bg-slate-800 text-white p-2 rounded-full shadow-lg hover:bg-slate-700 transition-colors"
//                 title="Configure API Key"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
//                 </svg>
//               </button>
//             </div>
//           </CartProvider>
//         </ApiKeyProvider>
//       </QueryClientProvider>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;
