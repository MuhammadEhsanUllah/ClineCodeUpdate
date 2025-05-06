import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

type ApiKeyContextType = {
  apiKey: string | null;
  setApiKey: (key: string) => void;
  isLoading: boolean;
};

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if we have a stored API key in localStorage
    const storedKey = localStorage.getItem("API_KEY");
    if (storedKey) {
      setApiKey(storedKey);
    }
    setIsLoading(false);
  }, []);

  const handleSetApiKey = (key: string) => {
    // Store the API key in localStorage
    localStorage.setItem("API_KEY", key);
    setApiKey(key);
  };

  return (
    <ApiKeyContext.Provider
      value={{
        apiKey,
        setApiKey: handleSetApiKey,
        isLoading,
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error("useApiKey must be used within an ApiKeyProvider");
  }
  return context;
}
