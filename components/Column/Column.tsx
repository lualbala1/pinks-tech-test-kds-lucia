import OrderCard from "../OrderCard";
import s from "./Column.module.scss";
import { Order } from "@/dtos/Order.dto";
import { FaHamburger } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";
export type ColumnProps = {
  orders: Array<Order>;
  title: string;
  state: string;
  onClick?: (order: Order) => void;
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
        <FaRegListAlt />
      </div>
      <div className={s["pk-column__content"]}>
        {props.orders.map((order) => (
          <div onClick={() => props.onClick && props.onClick(order)}>
            <OrderCard order={order} />
          </div>
        ))}
      </div>
    </div>
  );
}
