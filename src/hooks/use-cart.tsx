import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

// Define cart item types
export interface CartItem {
  id: number;
  type: "gate" | "fence" | "extra";
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  configuration?: {
    width?: number;
    kitType?: string;
    panels?: string;
    style?: string;
    pickets?: string;
    ironwood?: string;
    access?: string;
    height?: number;
    length?: number;
  };
}

// Shopping cart state interface
interface CartState {
  items: CartItem[];
  shipping: {
    method: "standard" | "expedite";
    price: number;
  };
  upgrades: {
    expediteManufacturing: boolean;
    liftgateDelivery: boolean;
  };
  shipping_info?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  requests?: string;
  images?: string[];
}

// Define action types
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_ITEM"; payload: { id: number; updates: Partial<CartItem> } }
  | { type: "CLEAR_CART" }
  | { type: "SET_SHIPPING_METHOD"; payload: "standard" | "expedite" }
  | {
      type: "TOGGLE_UPGRADE";
      payload: "expediteManufacturing" | "liftgateDelivery";
    }
  | {
      type: "UPDATE_SHIPPING_INFO";
      payload: Partial<CartState["shipping_info"]>;
    }
  | { type: "UPDATE_REQUESTS"; payload: string }
  | { type: "ADD_IMAGE"; payload: string }
  | { type: "REMOVE_IMAGE"; payload: string };

// Initial state
const initialCartState: CartState = {
  items: [],
  shipping: {
    method: "standard",
    price: 0,
  },
  upgrades: {
    expediteManufacturing: false,
    liftgateDelivery: false,
  },
  shipping_info: {
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
  requests: "",
  images: [],
};

// Cart reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item
        ),
      };

    case "CLEAR_CART":
      return {
        ...initialCartState,
        shipping_info: state.shipping_info, // Preserve shipping info
      };

    case "SET_SHIPPING_METHOD":
      return {
        ...state,
        shipping: {
          ...state.shipping,
          method: action.payload,
        },
      };

    case "TOGGLE_UPGRADE":
      return {
        ...state,
        upgrades: {
          ...state.upgrades,
          [action.payload]:
            !state.upgrades[action.payload as keyof typeof state.upgrades],
        },
      };

    case "UPDATE_SHIPPING_INFO":
      return {
        ...state,
        shipping_info: {
          ...state.shipping_info,
          ...action.payload,
        },
      };

    case "UPDATE_REQUESTS":
      return {
        ...state,
        requests: action.payload,
      };

    case "ADD_IMAGE":
      return {
        ...state,
        images: [...(state.images || []), action.payload],
      };

    case "REMOVE_IMAGE":
      return {
        ...state,
        images: (state.images || []).filter(
          (image) => image !== action.payload
        ),
      };

    default:
      return state;
  }
};

// Create context
interface CartContextType {
  cart: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  setShippingMethod: (method: "standard" | "expedite") => void;
  toggleUpgrade: (
    upgrade: "expediteManufacturing" | "liftgateDelivery"
  ) => void;
  updateShippingInfo: (info: Partial<CartState["shipping_info"]>) => void;
  updateRequests: (requests: string) => void;
  addImage: (image: string) => void;
  removeImage: (image: string) => void;
  cartTotal: number;
  itemCount: number;
  savingsTotal: number;
  upgradesTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Create provider component
export function CartProvider({ children }: { children: ReactNode }) {
  // Load saved cart from localStorage if available
  const [cart, dispatch] = useReducer(cartReducer, initialCartState, () => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("standardGatesCart");
      return savedCart ? JSON.parse(savedCart) : initialCartState;
    }
    return initialCartState;
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("standardGatesCart", JSON.stringify(cart));
    }
  }, [cart]);

  // Calculate cart totals
  const cartTotal = cart.items.reduce((total, item) => total + item.price, 0);

  const savingsTotal = cart.items.reduce((total, item) => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return total + (item.originalPrice - item.price);
    }
    return total;
  }, 0);

  const itemCount = cart.items.length;

  // Calculate upgrades cost
  const upgradesTotal =
    (cart.upgrades.expediteManufacturing ? 500 : 0) +
    (cart.upgrades.liftgateDelivery ? 85 : 0);

  // Define cart actions
  const addItem = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };

  const updateItem = (id: number, updates: Partial<CartItem>) => {
    dispatch({ type: "UPDATE_ITEM", payload: { id, updates } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const setShippingMethod = (method: "standard" | "expedite") => {
    dispatch({ type: "SET_SHIPPING_METHOD", payload: method });
  };

  const toggleUpgrade = (
    upgrade: "expediteManufacturing" | "liftgateDelivery"
  ) => {
    dispatch({ type: "TOGGLE_UPGRADE", payload: upgrade });
  };

  const updateShippingInfo = (info: Partial<CartState["shipping_info"]>) => {
    dispatch({ type: "UPDATE_SHIPPING_INFO", payload: info });
  };

  const updateRequests = (requests: string) => {
    dispatch({ type: "UPDATE_REQUESTS", payload: requests });
  };

  const addImage = (image: string) => {
    dispatch({ type: "ADD_IMAGE", payload: image });
  };

  const removeImage = (image: string) => {
    dispatch({ type: "REMOVE_IMAGE", payload: image });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        setShippingMethod,
        toggleUpgrade,
        updateShippingInfo,
        updateRequests,
        addImage,
        removeImage,
        cartTotal,
        itemCount,
        savingsTotal,
        upgradesTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
