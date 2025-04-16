import { ORDER_STATE_DELIVERED, ORDER_STATE_IN_PROGRESS, ORDER_STATE_PENDING, ORDER_STATE_READY } from "@/components/constants";
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
  pickup: (orderId: string) => void;
  moveNextState: (order: Order) => void;
  deliveredOrders: Array<Order>;
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
  const [deliveredOrders, setDeliveredOrders] = useState<Array<Order>>([]);
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
        case ORDER_STATE_PENDING:
          newOrder.state = ORDER_STATE_IN_PROGRESS;
          break;
        case ORDER_STATE_IN_PROGRESS:
          newOrder.state = ORDER_STATE_READY;
          break;
        case ORDER_STATE_READY:
          newOrder.state = ORDER_STATE_DELIVERED;
          break;
        default:
          return prev;
      }
      newOrders[index] = newOrder;
      return newOrders;
    });
  };

  const pickup = (orderId: string) => {
    setOrders((prev) => {
      const newOrders = [...prev];
      const index = newOrders.findIndex((o) => o.id === orderId);
      if (index === -1) return newOrders;
      const updatedOrder = { ...newOrders[index] };
      updatedOrder.state = ORDER_STATE_DELIVERED;
      setDeliveredOrders((prevDelivered) => [...prevDelivered, updatedOrder]);

      newOrders.slice(index, 1);
      return newOrders;
    });

    setTimeout(() => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    }, 500);
  };

  const context = {
    orders,
    pickup,
    moveNextState,
    deliveredOrders,
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
