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

export const AllPagesDevisCommandeContext = createContext<IGetAllPages>({
  type: "",
  length: 0,
  period: {
    start: "00/00/0000",
    end: "00/00/0000",
  },
});
export const AllPagesDevisCommandeUpdateContext = createContext<
  Dispatch<SetStateAction<IGetAllPages>>
>(() => {});

const AllPagesDevisCommandeContextProvider = (props: INotionContextProps) => {
  const [notionData, setNotionData] = useState<IGetAllPages>({
    type: "",
    length: 0,
    period: {
      start: "00/00/0000",
      end: "00/00/0000",
    },
  });

  useEffect(() => {
    const handleDevisCommande = () => {
      fetch("http://localhost:3000/api/devisCommande")
        .then((response) => response.json())
        .then((data) => {
          setNotionData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    return () => {
      handleDevisCommande();
    };
  }, []);

  return (
    <AllPagesDevisCommandeContext.Provider value={notionData}>
      <AllPagesDevisCommandeUpdateContext.Provider value={setNotionData}>
        {props.children}
      </AllPagesDevisCommandeUpdateContext.Provider>
    </AllPagesDevisCommandeContext.Provider>
  );
};

export default AllPagesDevisCommandeContextProvider;
