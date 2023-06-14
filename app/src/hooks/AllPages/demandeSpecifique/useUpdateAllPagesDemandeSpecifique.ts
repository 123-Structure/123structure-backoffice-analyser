import { useContext } from "react";
import { AllPagesDemandeSpecifiqueUpdateContext } from "../../../context/AllPages/AllPagesDemandeSpecifique.context";

export const useUpdateAllPagesDemandeSpecifique = () => {
  return useContext(AllPagesDemandeSpecifiqueUpdateContext);
};
