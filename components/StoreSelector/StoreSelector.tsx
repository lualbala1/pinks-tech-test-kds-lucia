import { StoreDto } from "@/dtos/Store.dto";
import s from "./StoreSelector.module.scss";
import { useEffect, useState } from "react";
import { mockStores } from "@/mocks/stores";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { useStore } from "@/contexts/Store.context";

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid white",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
  maxHeight: "80vh",
  backgroundColor: "#e6e6e6",
};
export default function StoreSelector() {
  const [showStoreSelector, setShowStoreSelector] = useState<boolean>(false);
  const { selectedStore, setSelectedStore } = useStore();

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
        <Box sx={modalStyle}>
          <h2>Selecciona un restaurante</h2>
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
            className={s["pk-store-selector__select"]}
          >
            {mockStores.map((store) => (
              <MenuItem key={store.id} value={store.id} className={s["pk-store-selector__select__item"]}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Modal>
    </>
  );
}
