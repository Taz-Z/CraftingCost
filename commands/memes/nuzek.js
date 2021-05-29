import { command, generateEmbed } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send("Sorry this bot is reserved for those above 2k io :/");
};

export default command("nuzek", execute);
