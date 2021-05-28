import { generateEmbed } from "../helper.js";

export const calculate = (expression) => {
  return generateEmbed("#00FF00", "Calculator", [
    { name: "Eval", value: eval(expression) },
  ]);
};
