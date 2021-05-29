import { command, generateEmbed } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send(
    "If you meeled more than the hpriest you might be in for a fight :)."
  );
};

export default command("alex", execute);
