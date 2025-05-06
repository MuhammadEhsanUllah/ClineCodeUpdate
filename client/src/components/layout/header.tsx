import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import CartIcon from "@/components/cart-icon";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/gates", label: "Gates" },
  { href: "/fences", label: "Fences" },
  // { href: "/fence-and-gates", label: "Fence & Gates" },
  { href: "/parts", label: "Parts" },
  { href: "/extras", label: "Extras" },
  { href: "/features", label: "Features" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const [location] = useLocation();

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-2xl font-bold font-heading text-primary">
                SecureGates
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "font-heading text-slate-800 hover:text-primary transition-all font-medium cursor-pointer",
                    location === item.href && "text-primary"
                  )}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href=""
              className="hidden md:block flex items-center space-x-2 cursor-pointer"
            >
              {" "}
              <div style={{ textAlign: "center" }}>
                {/* <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Logo"
                  className="h-8 w-8 rounded-full"
                /> */}
              </div>
            </Link>
            <Link href="/login">
              <Button className="hidden md:block">Get Started</Button>
            </Link>
            <CartIcon />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col mt-8 space-y-4">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <div
                        className={cn(
                          "font-heading text-slate-800 hover:text-primary transition-all font-medium px-3 py-2 rounded-md cursor-pointer",
                          location === item.href && "bg-slate-100 text-primary"
                        )}
                      >
                        {item.label}
                      </div>
                    </Link>
                  ))}
                  {/* <Link
                    href=""
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    {" "}
                    <div style={{ textAlign: "center" }}>
                      <Login />
                    </div>
                  </Link> */}
                  <Link href="/login">
                    <Button className="w-full mt-4">Get Started</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
