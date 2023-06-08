import { createContext, Dispatch, SetStateAction, useState } from "react";

export const DemandeAbandonneeContext = createContext<[]>([]);
export const DemandeAbandonneeUpdateContext = createContext<
  Dispatch<SetStateAction<[]>>
>(() => []);

interface INotionContextProps {
  children: React.ReactNode;
}

const DemandeAbandonneeContextProvider = (props: INotionContextProps) => {
  const [notionData, setNotionData] = useState<[]>([]);

  return (
    <DemandeAbandonneeContext.Provider value={notionData}>
      <DemandeAbandonneeUpdateContext.Provider value={setNotionData}>
        {props.children}
      </DemandeAbandonneeUpdateContext.Provider>
    </DemandeAbandonneeContext.Provider>
  );
};

export default DemandeAbandonneeContextProvider;
