import { Order } from "./Order.dto";

export type Rider = {
  orderWanted: string;
  pickup: (order?: string) => void;
  orderReady: boolean;
};
