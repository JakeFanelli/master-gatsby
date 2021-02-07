import { FaPepperHot, FaSeedling } from "react-icons/fa";
export default {
  name: "topping",
  title: "Toppings",
  type: "document",
  icon: FaPepperHot,
  fields: [
    {
      name: "name",
      title: "Pizza Name",
      type: "string",
      description: "Name of the topping",
    },
    {
      name: "vegetarian",
      title: "Vegetarian",
      type: "boolean",
      description: "Name of the topping",
      options: {
        layout: "checkbox",
      },
    },
  ],
  preview: {
    select: {
      name: "name",
      vegetarian: "vegetarian",
    },
    prepare: ({ name, vegetarian }) => ({
      title: `${name} ${vegetarian ? "(vegetarian)" : ""}`,
    }),
  },
};
