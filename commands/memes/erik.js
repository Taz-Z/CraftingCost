import { command, generateEmbed } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send(
    generateEmbed("#FFC0CB", "Erik", [{ name: "How Gay?", value: "Big Gay" }])
  );
};

export default command("erik", execute);
