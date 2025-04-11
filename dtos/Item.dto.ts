import { Ingredient } from "./Ingredients.dto";

export interface Item {
  id: string;
  name: string;
  image?: string;
  price: {
    currency: string;
    amount: number;
  };
  ingredients?: Ingredient[];
}
