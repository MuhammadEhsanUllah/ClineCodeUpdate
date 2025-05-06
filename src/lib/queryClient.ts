import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Base URL for external APIs
const API_BASE_URL = "https://api.example.com";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// For real API requests
export async function apiRequest(
  method: string,
  endpoint: string,
  data?: unknown | undefined
): Promise<Response> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Include API key if needed
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Check for API key in localStorage first, then fallback to environment variable
  const storedApiKey = localStorage.getItem("API_KEY");
  if (storedApiKey) {
    headers["Authorization"] = `Bearer ${storedApiKey}`;
  } else if (import.meta.env.VITE_API_KEY) {
    // Fallback to environment variable if available
    headers["Authorization"] = `Bearer ${import.meta.env.VITE_API_KEY}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  await throwIfResNotOk(res);
  return res;
}

// For mock data when no external API is available or during development
export async function getMockData(endpoint: string) {
  // Return mock data based on the endpoint
  const mockData = {
    "/products": [
      {
        id: 1,
        name: "Modern Arched Gate",
        description: "Elegant design with premium materials",
        price: 1299,
        image: "./fence.jpg",
        category: "Driveway",
        tag: "POPULAR",
        features: [
          "Aluminum construction",
          "Custom sizing",
          "Swing or sliding options",
        ],
      },
      {
        id: 2,
        name: "Security Sliding Gate",
        description: "Maximum security with modern aesthetic",
        price: 1599,
        image: "./fence.jpg",
        category: "Driveway",
        features: [
          "Steel construction",
          "Smart lock compatibility",
          "Remote control included",
        ],
      },
    ],
    "/testimonials": [
      {
        id: 1,
        text: "The quality of my new gate exceeded all expectations. Installation was straightforward and the customer service was excellent.",
        name: "John D.",
        location: "California",
        initials: "JD",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
      },
      {
        id: 2,
        text: "We've received so many compliments on our new entrance gate. Worth every penny for the security and curb appeal it provides.",
        name: "Sarah M.",
        location: "Texas",
        initials: "SM",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
      },
    ],
  };

  // Extract the endpoint path and return the corresponding mock data
  const path = endpoint.split("?")[0];
  return mockData[path as keyof typeof mockData] || [];
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      // Try to fetch from real API first
      const endpoint = queryKey[0] as string;
      const url = `${API_BASE_URL}${endpoint}`;

      const headers: HeadersInit = {};

      // Check for API key in localStorage first, then fallback to environment variable
      const storedApiKey = localStorage.getItem("API_KEY");
      if (storedApiKey) {
        headers["Authorization"] = `Bearer ${storedApiKey}`;
      } else if (import.meta.env.VITE_API_KEY) {
        // Fallback to environment variable if available
        headers["Authorization"] = `Bearer ${import.meta.env.VITE_API_KEY}`;
      }

      const res = await fetch(url, {
        headers,
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      if (!res.ok) {
        // If API request fails, return mock data as fallback
        console.warn(`API request failed, using mock data for ${endpoint}`);
        return await getMockData(endpoint);
      }

      return await res.json();
    } catch (error) {
      // If there's any error (like network error or API not available)
      // Return mock data as fallback
      console.warn(`Using mock data due to error: ${error}`);
      return await getMockData(queryKey[0] as string);
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
