import { generateEmbed } from "../../helper.js";

const calculate = (expression) => {
  return generateEmbed("#00FF00", "Calculator", [
    { name: "Eval", value: eval(expression) },
  ]);
};

const calc = {
  name: "math",
  description: "add",
  args: true,
  execute: (message, args) => {
    message.channel.send(calculate(args.join("")));
  },
};

export default calc;
