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
    name: "Patatas fritas",
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
    name: "Postre",
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
    name: "Bebida",
    price: {
      currency: "EUR",
      amount: 2.5,
    },
    type: "drink",
    config: {
      variant: "agua",
    },
  },
  {
    id: "5",
    name: "Salsa",
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
