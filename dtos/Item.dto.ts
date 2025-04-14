import { Ingredient } from "./Ingredients.dto";

export interface BaseItem {
  id: string;
  name: string;
  image?: string;
  price: {
    currency: string;
    amount: number;
  };
}

export interface Burguer extends BaseItem {
  type: "burguer";
  config: {
    removeIngredients?: Ingredient[];
  };
}
export interface Drink extends BaseItem {
  type: "drink";
  config: {
    variant: DrinkType;
  };
}

export interface Dessert extends BaseItem {
  type: "dessert";
  config: {
    glutenFree: boolean;
  };
}

export interface Sause extends BaseItem {
  type: "sause";
  config: {
    flavor: SauceType;
  };
}
export interface Fries extends BaseItem {
  type: "fries";
  config: {
    style: FriesType;
  };
}

export type Item = Burguer | Drink | Dessert | Sause | Fries;
export type DrinkType = "agua" | "refresco" | "cerveza";
export type FriesType = "normal" | "smoked";
export type SauceType = "ketchup" | "mostaza" | "BBQ" | "mayo" | "picante";
