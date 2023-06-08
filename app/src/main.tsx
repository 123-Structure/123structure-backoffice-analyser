import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import DemandeSpecifiqueContextProvider from "./context/DemandeSpecifique.context.tsx";
import DemandeAbandonneeContextProvider from "./context/DemandeAbandonnee.context.tsx";
import DevisCommandeContextProvider from "./context/DevisCommande.context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DemandeSpecifiqueContextProvider>
      <DemandeAbandonneeContextProvider>
        <DevisCommandeContextProvider>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <App />
          </MantineProvider>
        </DevisCommandeContextProvider>
      </DemandeAbandonneeContextProvider>
    </DemandeSpecifiqueContextProvider>
  </React.StrictMode>
);
