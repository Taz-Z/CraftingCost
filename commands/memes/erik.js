import { command } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send("*Insert gay joke here*");
};

export default command("erik", execute);
