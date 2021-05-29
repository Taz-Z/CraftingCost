import { command, generateEmbed } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send(
    generateEmbed("#00FF00", "Calculator", [
      { name: "Eval", value: eval(args.join("")) },
    ])
  );
};

export default command(
  "math",
  execute,
  "Performs basic calculates given an expression",
  "!math 1+1",
  true
);
