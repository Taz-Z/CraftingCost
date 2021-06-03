import { command, generateEmbed } from "../../helper.js";
import { default as axios } from "axios";

const convertAmount = async (from, to, amount) => {
  const url = `skeleton`;
  const { data } = await axios.get(url);
  return data.result;
};

const execute = async (message, args) => {
  message.channel.send(`Skeleton`);
};

export default command("stocks", execute, "Lists stock values");
