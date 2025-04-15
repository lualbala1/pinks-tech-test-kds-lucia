import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useOrders } from "./Orders.context";
import { getRandomInterval } from "@/lib/utils";
import { RiderDto } from "@/dtos/Rider.dto";
import { ORDER_STATE_READY } from "@/components/constants";

export type RidersContextProps = {
  riders: Array<RiderDto>;
};

export const RidersContext = createContext<RidersContextProps>(
  // @ts-ignore
  {}
);

export type RidersProviderProps = {
  children: ReactNode;
  notifyRider: boolean;
};

export function RidersProvider(props: RidersProviderProps) {
  const [riders, setRiders] = useState<Array<RiderDto>>([]);
  const [assignedOrders, setAssignedOrders] = useState<string[]>([]);
  const { orders, pickup } = useOrders();

  useEffect(() => {
    orders.forEach((order) => {
      // Check if the order is already assigned to a rider
      const alreadyAssigned = assignedOrders.includes(order.id);

      // If the order is already assigned, skip it
      if (!alreadyAssigned) {
        setAssignedOrders((prev) => [...prev, order.id]);

        setTimeout(() => {
          setRiders((prev) => [
            ...prev,
            {
              orderWanted: order.id,
              storeId: order.storeId,
              pickup,
              orderReady: order.state === ORDER_STATE_READY,
            },
          ]);
        }, getRandomInterval(4000, 10000));
      }
    });
  }, [orders]);

  useEffect(() => {
    // Update the orderReady property for each rider when orders change
    setRiders(
      (prevRiders) =>
        prevRiders
          .map((rider) => {
            const matchingOrder = orders.find(
              (o) => o.id === rider.orderWanted
            );
            if (!matchingOrder) {
              // If the order has been deleted, remove the rider
              return null;
            }
            return {
              ...rider,
              orderReady: matchingOrder.state === ORDER_STATE_READY,
            };
          })
          .filter((rider) => rider !== null) // Remove null entries
    );
  }, [orders]);

  const context = { riders };
  return (
    <RidersContext.Provider value={context}>
      {props.children}
    </RidersContext.Provider>
  );
}

export const useRiders = () => useContext(RidersContext);
