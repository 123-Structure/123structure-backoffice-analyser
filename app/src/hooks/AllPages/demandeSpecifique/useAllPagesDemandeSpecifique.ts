import { useContext } from "react";
import { AllPagesDemandeSpecifiqueContext } from "../../../context/AllPages/AllPagesDemandeSpecifique.context";

export const useAllPagesDemandeSpecifique = () => {
  return useContext(AllPagesDemandeSpecifiqueContext);
};
