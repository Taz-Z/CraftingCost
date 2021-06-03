import { command, generateEmbed } from "../../helper.js";
import { default as axios } from "axios";

const convertAmount = async (from, to, amount) => {
  const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
  const { data } = await axios.get(url);
  return data.result;
};

const execute = async (message, args) => {
  const [from, to, amount] = args;
  const convertedAmount = await convertAmount(
    from.toUpperCase(),
    to.toUpperCase(),
    Number(amount)
  );
  message.channel.send(
    `The value of ${amount} ${from} is ${convertedAmount.toFixed(2)} ${to}`
  );
};

export default command(
  "currency",
  execute,
  "Converts the currency amount from the first option to second",
  "5000 cad USD",
  true
);
