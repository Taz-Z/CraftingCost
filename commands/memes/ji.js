import { command, generateEmbed } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send("My creativity ended at you, feelsbadman");
};

export default command("ji", execute);
