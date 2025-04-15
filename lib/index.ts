import { Order } from "@/dtos/Order.dto";
import { EventEmitter } from "events";
import { getOrderItems, getRandomId, getRandomInterval } from "./utils";
import { mockBaseItems } from "@/mocks/items";

export class OrderOrchestrator {
  private interval: NodeJS.Timeout | undefined;
  private maxOrders: number = getRandomInterval(10, 30);
  private eventEmitter = new EventEmitter();

  private emit(order: Order) {
    this.eventEmitter.emit("order", order);
  }

  public run() {
    this.interval = setInterval(() => {

      this.emit({
        id: getRandomId(),
        state: "PENDING",
        items: getOrderItems(mockBaseItems),
        estimatedtime: getRandomInterval(5, 15),
        date: new Date(),
        storeId: Math.floor(Math.random() * 6) + 1,
      });
      this.maxOrders--;
      if (this.maxOrders <= 0) {
        clearInterval(this.interval);
      }
    }, 8000); // Increased interval to 5000ms (5 seconds) for slower order creation
    return this.eventEmitter;
  }
}
