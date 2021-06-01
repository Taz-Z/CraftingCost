import { command } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send("Is currently making cancer his lil bitch");
};

export default command("pops", execute);
