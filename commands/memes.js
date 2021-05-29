import { generateEmbed } from "../helper.js";

const getWhales = () => {
  return generateEmbed("#0000FF", "Biggest Whale NA?", [
    { name: "Xinthel", value: ":whale:" },
    { name: "Matt", value: ":whale:" },
    { name: "Matthew", value: ":whale:" },
    { name: "Mattyesh", value: ":whale:" },
  ]);
};

const meme = {
  name: "matt",
  description: "cost",
  execute: (message, args) => {
    message.channel.send(getWhales());
  },
};

export default meme;
