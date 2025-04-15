import { Item } from "./Item.dto";

export type Order = {
  id: string;
  //TODO: change to OrderStatusDto
  state: "PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED";
  items: Array<Item>;
  estimatedtime: number;
  date: Date;
  storeId: number;
};
