import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export const DemandeSpecifiqueContext = createContext<[]>([]);
export const DemandeSpecifiqueUpdateContext = createContext<
  Dispatch<SetStateAction<[]>>
>(() => []);

interface INotionContextProps {
  children: React.ReactNode;
}

const DemandeSpecifiqueContextProvider = (props: INotionContextProps) => {
  const [notionData, setNotionData] = useState<[]>([]);

  useEffect(() => {
    const handleDemandeSpecifique = () => {
      fetch("http://localhost:3000/api/demandeSpecifique")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setNotionData(data.results);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  
    return () => {
      handleDemandeSpecifique()
    }
  }, [])
  

  return (
    <DemandeSpecifiqueContext.Provider value={notionData}>
      <DemandeSpecifiqueUpdateContext.Provider value={setNotionData}>
        {props.children}
      </DemandeSpecifiqueUpdateContext.Provider>
    </DemandeSpecifiqueContext.Provider>
  );
};

export default DemandeSpecifiqueContextProvider;
