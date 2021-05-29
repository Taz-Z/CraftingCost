import { command, generateEmbed } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send("Needs a fucking hobby!");
};

export default command("taz", execute);
