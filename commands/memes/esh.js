import { command, generateEmbed } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send(
    "The command for this should honestly just be !theRetPally"
  );
};

export default command("esh", execute);
