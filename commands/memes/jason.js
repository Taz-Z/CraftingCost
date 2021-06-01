import { command } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send("The names Jason, Jason Jason. Organization? Jason.");
};

export default command("jason", execute);
