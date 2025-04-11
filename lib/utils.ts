import { allIngredients } from "@/dtos/Ingredients.dto";
import { DrinkType, FriesType, Item, SauceType } from "@/dtos/Item.dto";

export function getRandomId() {
  const length = 5;
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getRandomInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This function returns a random element from a given array
function getRandomElementFromarray<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// This function applies random configurations to them to available items
function generateRandomOrderItems(item: Item) {
  switch (item.type) {
    case "burguer":
      const removeIngredients = allIngredients.filter(
        () => Math.random() < 0.3
      );
      return {
        ...item,
        config: {
          removeIngredients: removeIngredients,
        },
      };

    case "drink":
      const drinkTypes: DrinkType[] = ["agua", "refresco", "cerveza"];
      return {
        ...item,
        config: {
          variante: getRandomElementFromarray(drinkTypes),
        },
      };

    case "fries":
      const friesTypes: FriesType[] = ["normal", "smoked"];
      return {
        ...item,
        config: {
          style: getRandomElementFromarray(friesTypes),
        },
      };
    case "sause":
      const sauceTypes: SauceType[] = [
        "ketchup",
        "mostaza",
        "BBQ",
        "mayo",
        "picante",
      ];
      return {
        ...item,
        config: {
          flavor: getRandomElementFromarray(sauceTypes),
        },
      };
    case "dessert":
      return {
        ...item,
        config: {
          glutenFree: Math.random() < 0.5,
        },
      };
    default:
      return item;
  }
}

// This function generates a random number of items from the provided array
export function getOrderItems(items: Item[]) {
  const count = getRandomInterval(1, items.length);
  return Array.from({ length: count }, () => {
    const item = items[Math.floor(Math.random() * items.length)];
    return generateRandomOrderItems(item);
  });
}
