import { useOrders } from "@/contexts/Orders.context";
import s from "./OrderCard.module.scss";
import { Order } from "@/dtos/Order.dto";
import {
  emojiMap,
  ORDER_STATE_IN_PROGRESS,
  ORDER_STATE_PENDING,
  ORDER_STATE_READY,
} from "../constants";
import { useEffect, useState } from "react";
import { Item } from "@/dtos/Item.dto";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export type OrderProps = {
  order: Order;
};

export default function OrderCard(props: OrderProps) {
  const { moveNextState } = useOrders();
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);
  const { deliveredOrders } = useOrders();
  const isDelivered = deliveredOrders.some(
    (deliveredOrder) => deliveredOrder.id === props.order.id
  );
  useEffect(() => {
    setShowOrderDetails(false);
  }, [props.order]);

  const renderButtonOptions = (state: string) => {
    switch (state) {
      case ORDER_STATE_PENDING:
        return (
          <button
            className={`${s["pk-order-card__buttons"]}`}
            onClick={() => moveNextState(props.order)}
          >
            Empezar
          </button>
        );
      case ORDER_STATE_IN_PROGRESS:
        return (
          <button
            style={{ fontSize: "1rem" }}
            onClick={() => moveNextState(props.order)}
            className={s["pk-order-card__buttons"]}
          >
            Listo ✅
          </button>
        );
      case ORDER_STATE_READY:
        return (
          <div className={`${s["pk-order-card__buttons"]} ${s["ready"]}`}>
            Notificando
            <span className={s["pk-order-card__notification"]} />
          </div>
        );
      default:
        return null;
    }
  };

  const renderSpecificDetails = (item: Item) => {
    switch (item.type) {
      case "dessert":
        return item.config.glutenFree ? <p>Gluten Free</p> : null;
      case "sause":
        return <p>Sabor: {item.config.flavor}</p>;
      case "fries":
        return <p>Estilo: {item.config.style}</p>;

      case "drink":
        return <p>Variante: {item.config.variant}</p>;
      case "burguer":
        return item.config.removeIngredients &&
          item.config.removeIngredients.length > 0 ? (
          <p className={s["pk-order-card__details__list__infoText"]}>
            <HiOutlineExclamationCircle /> Sin:{" "}
            {item.config.removeIngredients?.join(", ")}
          </p>
        ) : null;
    }
  };
  return (
    <div
      className={s["pk-order-card"]}
      onClick={() => setShowOrderDetails((prev) => !prev)}
    >
      <div className={s["pk-order-card__title"]}>
        <h3>Orden: {props.order.id}</h3>
      </div>
      <div className={s["pk-order-card__items"]}>
        <p>{props.order.items.length} items</p>
        <p>{props.order.estimatedtime} min</p>

        {isDelivered && <p>{new Date(props.order.date).toDateString()}</p>}
      </div>
      <div className={s["pk-order-card__buttons"]}>
        {renderButtonOptions(props.order.state)}
      </div>
      {showOrderDetails && (
        <div className={s["pk-order-card__details"]}>
          <h3>Detalles</h3>
          <ul className={s["pk-order-card__details__list"]}>
            {props.order.items
              .sort((a, b) => Number(a.id) - Number(b.id))
              .map((item, index) => (
                <>
                  <li key={index}>
                    <strong>
                      {emojiMap[item.type]} {item.name}
                    </strong>
                    {renderSpecificDetails(item)}
                  </li>
                </>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
