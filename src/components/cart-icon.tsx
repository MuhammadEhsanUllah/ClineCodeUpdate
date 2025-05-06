import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useLocation } from "wouter";
// import { Link, useLocation } from 'wouter';
import { Button } from "@/components/ui/button";

export default function CartIcon() {
  const { itemCount } = useCart();
  const [_, navigate] = useLocation();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-slate-800 hover:text-primary transition-all"
      onClick={() => navigate("/cart")}
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
