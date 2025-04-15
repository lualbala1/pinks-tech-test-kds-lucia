import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import {
  ORDER_STATE_IN_PROGRESS,
  ORDER_STATE_PENDING,
  ORDER_STATE_READY,
} from "../constants";
import { useStore } from "@/contexts/Store.context";
import { mockStores } from "@/mocks/stores";

export default function Kanban() {
  const { orders } = useOrders();
  const { selectedStore } = useStore();
  const filterOrders = (state: string) => {
    const storeId = selectedStore?.id ?? mockStores[0].id;
    return orders.filter((i) => i.state === state && i.storeId === storeId);
  };
  
  return (
    <section className={s["pk-kanban"]}>
      <Column title={`Pendiente`} orders={filterOrders(ORDER_STATE_PENDING)} state={ORDER_STATE_PENDING}/>
      <Column
        title="En preparación"
        orders={filterOrders(ORDER_STATE_IN_PROGRESS)}
        state={ORDER_STATE_IN_PROGRESS}
      />
      <Column title="Listo" orders={filterOrders(ORDER_STATE_READY)} state={ORDER_STATE_READY} />
    </section>
  );
}
