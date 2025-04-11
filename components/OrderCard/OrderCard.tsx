import { useOrders } from "@/contexts/Orders.context";
import s from "./OrderCard.module.scss";
import { Order } from "@/dtos/Order.dto";
import { ORDER_STATE_IN_PROGRESS, ORDER_STATE_PENDING } from "../constants";

export type OrderProps = {
  order: Order;
};

export default function OrderCard(props: OrderProps) {
  console.log("order", props.order.items);
  const { moveNextState } = useOrders();
  const renderButtonOptions = (state: string) => {
    switch (state) {
      case ORDER_STATE_PENDING:
        return (
          <button
            className={`${s["pk-order-card__buttons"]} ${s["pending"]}`}
            onClick={() => moveNextState(props.order)}
          >
            Comenzar
          </button>
        );
      case ORDER_STATE_IN_PROGRESS:
        return (
          <div className={`${s["pk-order-card__buttons"]} ${s["pending"]}`}>
            <button className={s["pk-card__buttons"]}>!</button>
            <button
              className={s["pk-button"]}
              onClick={() => moveNextState(props.order)}
            >
              Listo
            </button>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className={s["pk-order-card"]}>
      <div className={s["pk-order-card__title"]}>
        <h3>Orden: {props.order.id}</h3>
      </div>
      <div className={s["pk-order-card__items"]}>
        <p>{props.order.items.length} items</p>
        <p>{props.order.estimatedtime} min</p>
      </div>
      <div className={s["pk-order-card__buttons"]}>
        {renderButtonOptions(props.order.state)}
      </div>
    </div>
  );
}
