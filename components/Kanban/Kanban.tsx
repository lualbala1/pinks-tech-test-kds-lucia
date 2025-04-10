import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import {
  ORDER_STATE_IN_PROGRESS,
  ORDER_STATE_PENDING,
  ORDER_STATE_READY,
} from "../constants";

export default function Kanban() {
  const { orders } = useOrders();
  const filterOrders = (state: string) => {
    return orders.filter((i) => i.state === state);
  };
  return (
    <section className={s["pk-kanban"]}>
      <Column title="Pendiente" orders={filterOrders(ORDER_STATE_PENDING)} />
      <Column
        title="En preparación"
        orders={filterOrders(ORDER_STATE_IN_PROGRESS)}
      />
      <Column title="Listo" orders={filterOrders(ORDER_STATE_READY)} />
    </section>
  );
}
