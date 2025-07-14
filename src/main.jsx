import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@/components/theme-provider.js";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </StrictMode>
);
