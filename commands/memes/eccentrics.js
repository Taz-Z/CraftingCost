import { command } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send("Need a good lock for this key. Is Kooma around?");
};

export default command("eccentric", execute);
