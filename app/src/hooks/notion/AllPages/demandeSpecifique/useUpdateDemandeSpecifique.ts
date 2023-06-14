import { useContext } from "react";
import { DemandeSpecifiqueUpdateContext } from "../../../../context/AllPages/DemandeSpecifique.context";

export const useUpdateDemandeSpecifique = () => {
  return useContext(DemandeSpecifiqueUpdateContext);
};
