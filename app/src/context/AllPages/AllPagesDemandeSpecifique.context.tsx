import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IGetAllPages } from "../../data/interfaces/IGetAllPages";

interface INotionContextProps {
  children: React.ReactNode;
}

export const AllPagesDemandeSpecifiqueContext = createContext<IGetAllPages>({
  type: "",
  length: 0,
  period: {
    start: "00/00/0000",
    end: "00/00/0000",
  },
});

export const AllPagesDemandeSpecifiqueUpdateContext = createContext<
  Dispatch<SetStateAction<IGetAllPages>>
>(() => {});

const AllPagesDemandeSpecifiqueContextProvider = (
  props: INotionContextProps
) => {
  const [notionData, setNotionData] = useState<IGetAllPages>({
    type: "",
    length: 0,
    period: {
      start: "00/00/0000",
      end: "00/00/0000",
    },
  });

  useEffect(() => {
    const handleDemandeSpecifique = () => {
      fetch("http://localhost:3000/api/demandeSpecifique")
        .then((response) => response.json())
        .then((data) => {
          setNotionData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    return () => {
      handleDemandeSpecifique();
    };
  }, []);

  return (
    <AllPagesDemandeSpecifiqueContext.Provider value={notionData}>
      <AllPagesDemandeSpecifiqueUpdateContext.Provider value={setNotionData}>
        {props.children}
      </AllPagesDemandeSpecifiqueUpdateContext.Provider>
    </AllPagesDemandeSpecifiqueContext.Provider>
  );
};

export default AllPagesDemandeSpecifiqueContextProvider;
