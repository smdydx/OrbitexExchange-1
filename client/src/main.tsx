import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { WagmiProvider } from "wagmi";
import { config } from "./lib/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </WagmiProvider>
);
