import { command, generateEmbed } from "../../helper.js";
import { default as axios } from "axios";

const convertAmount = async (from, to, amount) => {
  const url = `skeleton`;
  const { data } = await axios.get(url);
  return data.result;
};

const headers = () => {
  return {
    "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    "X-RapidAPI-Key": "2da446beb8msh6d88186527d347cp13b59cjsndf5dd86a9d30",
  };
};

const execute = async (message, args) => {
  message.channel.send(`Skeleton`);
};

export default command("stocks", execute, "Lists stock values");
