import OrderCard from "../OrderCard";
import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";
export type ColumnProps = {
  orders: Array<Order>;
  title: string;
  state: string;
};

export default function Column(props: ColumnProps) {
  const getBackGroundColor = (state: string) => {
    switch (state) {
      case "PENDING":
        return `${s["pk-column"]} ${s["pending"]}`;
      case "IN_PROGRESS":
        return `${s["pk-column"]} ${s["in-progress"]}`;
      case "READY":
        return `${s["pk-column"]} ${s["ready"]}`;
      default:
        return "";
    }
  };
  return (
    <div className={getBackGroundColor(props.state)}>
      <div className={s["pk-column__title"]}>
        <h3>{props.title} </h3>
      </div>
      <div className={s["pk-column__content"]}>
        {props.orders.map((order) => (
            <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
