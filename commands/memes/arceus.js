import { command, generateEmbed } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send("Thanks for ignoring our 7 invites last week, nbd.");
};

export default command("arceus", execute);
