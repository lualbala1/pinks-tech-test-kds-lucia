import { StoreDto } from "@/dtos/Store.dto";
import s from "./StoreSelector.module.scss";
import { useEffect, useState } from "react";
import { mockStores } from "@/mocks/stores";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { useStore } from "@/contexts/Store.context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};
export default function StoreSelector() {
  const [showStoreSelector, setShowStoreSelector] = useState<boolean>(false);
  /*
  const [selectedStore, setSelectedStore] = useState<StoreDto>(() => {
    const store = localStorage.getItem("selectedStore");
    return store ? JSON.parse(store) : mockStores[0];
  });*/
const {selectedStore, setSelectedStore } = useStore();
/*
  useEffect(() => {
    localStorage.setItem("selectedStore", JSON.stringify(selectedStore));
  }, [selectedStore]);*/
  return (
    <>
      <button
        onClick={() => setShowStoreSelector(true)}
        className={s["pk-store-selector"]}
      >
        📍 {selectedStore?.name}
      </button>
      <Modal
        open={showStoreSelector}
        onClose={() => setShowStoreSelector(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Selecciona una tienda</h2>
          <Select
            id="store-selector"
            value={selectedStore?.id}
            onChange={(e: SelectChangeEvent<number>) => {
              setSelectedStore(
                mockStores.find(
                  (store) => store.id === Number(e.target.value)
                ) ?? mockStores[0]
              );
              setShowStoreSelector(false);
            }}
            label="Tienda"
          >
            {mockStores.map((store) => (
              <MenuItem key={store.id} value={store.id}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Modal>
    </>
  );
}
