import { useStore } from "@/contexts/Store.context";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import s from "./OrderHistory.module.scss";
import { Box, Modal } from "@mui/material";
import { modalStyle } from "../StoreSelector/StoreSelector";
import { useOrders } from "@/contexts/Orders.context";
import OrderCard from "../OrderCard";
export default function OrderHistory() {
  const [showOrderHistory, setShowOrderHistory] = useState<boolean>(false);
  const { selectedStore } = useStore();
  const { deliveredOrders } = useOrders();
  const filteredOrders = deliveredOrders.filter(
    (order) => order.storeId === selectedStore?.id
  );
  
  return (
    <>
      <button
        className={s["pk-order-history"]}
        onClick={() => setShowOrderHistory(true)}
      >
        <FaRegClock size={20} />
      </button>
      {
        <Modal
          open={showOrderHistory}
          onClose={() => setShowOrderHistory(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <h2>Pedidos entregados</h2>
            <div className={s["pk-order-history__orderList"]}>
              {filteredOrders.length === 0 ? (
                <div className={s["pk-order-history__list__empty"]}>
                  No hay pedidos entregados
                </div>
              ) : (
                <>
                  {filteredOrders.map((order) => (
                    <div>
                      <OrderCard key={order.id} order={order} />
                    </div>
                  ))}
                </>
              )}
            </div>
          </Box>
        </Modal>
      }
    </>
  );
}
