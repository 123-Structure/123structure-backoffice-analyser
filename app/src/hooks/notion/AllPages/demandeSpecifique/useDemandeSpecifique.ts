import { useContext } from "react";
import DemandeSpecifiqueContext from "../../../../context/AllPages/DemandeSpecifique.context";

export const useDemandeSpecifique = () => {
  return useContext(DemandeSpecifiqueContext);
};
