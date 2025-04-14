import { Order } from "@/dtos/Order.dto";
import { OrderOrchestrator } from "@/lib";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type OrdersContextProps = {
  orders: Array<Order>;
  pickup: (order: Order) => void;
  moveNextState: (order: Order) => void;
};

export const OrdersContext = createContext<OrdersContextProps>(
  // @ts-ignore
  {}
);

export type OrdersProviderProps = {
  children: ReactNode;
};

export function OrdersProvider(props: OrdersProviderProps) {
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    listener.on("order", (order) => {
      setOrders((prev) => [...prev, order]);
    });
  }, []);

  const moveNextState = (order: Order) => {
    setOrders((prev) => {
      const index = prev.findIndex((o) => o.id === order.id);
      if (index === -1) return prev;
      const newOrders = [...prev];
      const newOrder = { ...order };
      switch (order.state) {
        case "PENDING":
          newOrder.state = "IN_PROGRESS";
          break;
        case "IN_PROGRESS":
          newOrder.state = "READY";
          break;
        case "READY":
          newOrder.state = "DELIVERED";
          break;
        default:
          return prev;
      }
      newOrders[index] = newOrder;
      return newOrders;
    });
  };

  const pickup = (order: Order) => {
    alert(
      "necesitamos eliminar del kanban a la orden recogida! Rapido! antes que nuestra gente de tienda se confunda!"
    );
  };

  const context = {
    orders,
    pickup,
    moveNextState,
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
