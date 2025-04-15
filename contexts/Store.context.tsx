import { StoreDto } from "@/dtos/Store.dto";
import { mockStores } from "@/mocks/stores";
import { createContext, useContext, useEffect, useState } from "react";

export type StoreContextType = {
  stores: Array<StoreDto>;
  selectedStore: StoreDto | null;
  setSelectedStore: (store: StoreDto) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [stores] = useState<Array<StoreDto>>(mockStores);
  /*
  const [selectedStore, setSelectedStore] = useState<StoreDto>(() => {
    const store = localStorage.getItem("selectedStore");
    return store ? JSON.parse(store) : mockStores[0];
  });*/
  const [selectedStore, setSelectedStore] = useState<StoreDto>(mockStores[0]);
/*
  useEffect(() => {
    localStorage.setItem("selectedStore", JSON.stringify(selectedStore));
  }, [selectedStore]);
*/
  return (
    <StoreContext.Provider
      value={{
        stores,
        selectedStore,
        setSelectedStore,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
