import { useOrders } from "@/contexts/Orders.context";
import s from "./OrderCard.module.scss";
import { Order } from "@/dtos/Order.dto";
import { emojiMap, ORDER_STATE_IN_PROGRESS, ORDER_STATE_PENDING } from "../constants";
import { useState } from "react";
import { Item } from "@/dtos/Item.dto";
import { IoReturnDownForward } from "react-icons/io5";

export type OrderProps = {
  order: Order;
};

export default function OrderCard(props: OrderProps) {
  console.log("order", props.order.items);
  const { moveNextState } = useOrders();
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);
  const renderButtonOptions = (state: string) => {
    switch (state) {
      case ORDER_STATE_PENDING:
        return (
          <button
            className={`${s["pk-order-card__buttons"]} ${s["pending"]}`}
            onClick={() => moveNextState(props.order)}
          >
            Empezar
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
        if (
          item.config.removeIngredients &&
          item.config.removeIngredients.length > 0
        ) {
          return <p> Sin: {item.config.removeIngredients?.join(",")}</p>;
        }
    }
  };
  return (
    <div
      className={s["pk-order-card"]}
      onClick={() => setShowOrderDetails(!showOrderDetails)}
    >
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
      {showOrderDetails && (
        <div className={s["pk-order-card__details"]}>
          <h3>Detalles</h3>
          <ul>
            {props.order.items.sort((a,b)=> Number(a.id) - Number(b.id)).map((item, index) => (
              <>
              <li key={index}>
                <strong>{emojiMap[item.type]} {item.name}</strong>
                {renderSpecificDetails(item)}
                
              </li>
              <hr />
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
