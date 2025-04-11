import { Order } from "@/dtos/Order.dto";
import { EventEmitter } from "events";
import { getRandomId, getRandomInterval } from "./utils";
import { Item } from "@/dtos/Item.dto";
import { mockItems } from "@/mocks/items";

export class OrderOrchestrator {
  private interval: NodeJS.Timeout | undefined;
  private maxOrders: number = getRandomInterval(10, 30);
  private eventEmitter = new EventEmitter();

  private emit(order: Order) {
    this.eventEmitter.emit("order", order);
  }

  public run() {
    this.interval = setInterval(() => {
      const getRandomItems = (items: Item[]) => {
        const count = getRandomInterval(1, items.length);
        return Array.from({ length: count }, () => {
          const item = items[Math.floor(Math.random() * items.length)];
          if (item.id === "1") {
            const ingredientCount = getRandomInterval(1, mockBurguerIngredients.length);
            item.ingredients = Array.from({ length: ingredientCount }, () => mockBurguerIngredients[Math.floor(Math.random() * mockIngredients.length)]);
          }
          return item;
        });
      };

      this.emit({
        id: getRandomId(),
        state: "PENDING",
        items: getRandomItems(mockItems),
        estimatedtime: getRandomInterval(5, 15),
        date: new Date(),
      });
      this.maxOrders--;
      if (this.maxOrders <= 0) {
        clearInterval(this.interval);
      }
    }, 8000); // Increased interval to 5000ms (5 seconds) for slower order creation
    return this.eventEmitter;
  }
}
