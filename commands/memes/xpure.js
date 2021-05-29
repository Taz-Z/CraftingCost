import { command, generateEmbed } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send(
    "You wanna tank this week for Side Project? Actually can you heal tn? Just curious, do you have a dps set?"
  );
};

export default command("xpure", execute);
