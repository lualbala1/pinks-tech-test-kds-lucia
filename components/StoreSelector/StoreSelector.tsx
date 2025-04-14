import { StoreDto } from "@/dtos/Store.dto";
import s from "./StoreSelector.module.scss";
import { useState } from "react";
import { stores } from "@/mocks/stores";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
};
export default function StoreSelector() {
  const [showStoreSelector, setShowStoreSelector] = useState<boolean>(false);
  const [selectedStore, setSelectedStore] = useState<StoreDto>(stores[0]);
  return (
    <>
      <button
        onClick={() => setShowStoreSelector(true)}
        className={s["pk-store-selector"]}
      >
        📍 {selectedStore.name}
      </button>
      <Modal
        open={showStoreSelector}
        onClose={() => setShowStoreSelector(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Select
            id="store-selector"
            value={selectedStore.id}
            onChange={(e: SelectChangeEvent<number>) => {
              setSelectedStore(stores.find(
                (store) => store.id === Number(e.target.value)
              )?? stores[0]);
            }}
            label="Tienda"
          >
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </Select>
        </Box>
      </Modal>
    </>
  );
}
