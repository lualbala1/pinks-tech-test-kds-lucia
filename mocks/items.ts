import { Item } from "@/dtos/Item.dto";

//TODO add image
export const mockItems: Item[] = [
    {
      id: "1",
      name: "Burguer",
      price: {
        currency: "EUR",
        amount: 9.9,
      },
    },
    {
      id: "2",
      name: "Fries",
      price: {
        currency: "EUR",
        amount: 3.5,
      },
    },
    {
      id: "3",
      name: "Dessert",
      price: {
        currency: "EUR",
        amount: 4.5,
      },
    },
    {
      id: "4",
      name: "Drink",
      price: {
        currency: "EUR",
        amount: 2.5,
      },
    },
    {
      id: "5",
      name: "Sause",
      price: {
        currency: "EUR",
        amount: 0.9,
      },
    },
  ];
  