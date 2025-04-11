import { BaseItem, Item } from "@/dtos/Item.dto";

//TODO add image
export const mockBaseItems: Item[] = [
  {
    id: "1",
    name: "Burguer",
    price: {
      currency: "EUR",
      amount: 9.9,
    },
    type: "burguer",
    config: {
      removeIngredients: [],
    },
  },
  {
    id: "2",
    name: "Fries",
    price: {
      currency: "EUR",
      amount: 3.5,
    },
    type: "fries",
    config: {
      style: "normal",
    },
  },
  {
    id: "3",
    name: "Dessert",
    price: {
      currency: "EUR",
      amount: 4.5,
    },
    type: "dessert",
    config: {
      glutenFree: false,
    },
  },
  {
    id: "4",
    name: "Drink",
    price: {
      currency: "EUR",
      amount: 2.5,
    },
    type: "drink",
    config: {
      variante: "agua",
    },
  },
  {
    id: "5",
    name: "Sause",
    price: {
      currency: "EUR",
      amount: 0.9,
    },
    type: "sause",
    config: {
      flavor: "ketchup",
    },
  },
];
