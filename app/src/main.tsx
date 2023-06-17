import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import AllPagesDemandeSpecifiqueContextProvider from "./context/AllPages/AllPagesDemandeSpecifique.context.tsx";
import AllPagesDemandeAbandonneeContextProvider from "./context/AllPages/AllPagesDemandeAbandonnee.context.tsx";
import AllPagesDevisCommandeContextProvider from "./context/AllPages/AllPagesDevisCommande.context.tsx";
import CurrentMonthDemandeSpecifiqueContextProvider from "./context/CurrentMonth/CurrentMonthDemandeSpecifique.context.tsx";
import CurrentMonthDemandeAbandonneeContextProvider from "./context/CurrentMonth/CurrentMonthDemandeAbandonnee.context.tsx";
import CurrentMonthDevisCommandeContextProvider from "./context/CurrentMonth/CurrentMonthDevisCommande.context.tsx";
import CurrentMonthByCategoryDemandeSpecifiqueContextProvider from "./context/CurrentMonthByCategory/CurrentMonthByCategoryDemandeSpecifique.context.tsx";
import CurrentMonthByCategoryDemandeAbandonneeContextProvider from "./context/CurrentMonthByCategory/CurrentMonthByCategoryDemandeAbandonnee.context.tsx";
import CurrentMonthByCategoryDevisCommandeContextProvider from "./context/CurrentMonthByCategory/CurrentMonthByCategoryDevisCommande.context.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AllPagesDemandeSpecifiqueContextProvider>
      <AllPagesDemandeAbandonneeContextProvider>
        <AllPagesDevisCommandeContextProvider>
          <CurrentMonthDemandeSpecifiqueContextProvider>
            <CurrentMonthDemandeAbandonneeContextProvider>
              <CurrentMonthDevisCommandeContextProvider>
                <CurrentMonthByCategoryDemandeSpecifiqueContextProvider>
                  <CurrentMonthByCategoryDemandeAbandonneeContextProvider>
                    <CurrentMonthByCategoryDevisCommandeContextProvider>
                      <MantineProvider withGlobalStyles withNormalizeCSS>
                        <App />
                      </MantineProvider>
                    </CurrentMonthByCategoryDevisCommandeContextProvider>
                  </CurrentMonthByCategoryDemandeAbandonneeContextProvider>
                </CurrentMonthByCategoryDemandeSpecifiqueContextProvider>
              </CurrentMonthDevisCommandeContextProvider>
            </CurrentMonthDemandeAbandonneeContextProvider>
          </CurrentMonthDemandeSpecifiqueContextProvider>
        </AllPagesDevisCommandeContextProvider>
      </AllPagesDemandeAbandonneeContextProvider>
    </AllPagesDemandeSpecifiqueContextProvider>
  </React.StrictMode>
);
