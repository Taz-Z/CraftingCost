import { command, generateEmbed } from "../../helper.js";


const fetchCurrencies = () => {
  
}

const execute = (message, args) => {
  message.channel.send("This command works")
};

export default command(
  "!currency",
  execute,
  "Converts the currency amount from the first option to second",
  "5000 cad USD",
  true
);
