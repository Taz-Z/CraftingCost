import { generateEmbed } from "../../helper.js";

const erik = {
  name: "erik",
  description: "gay",
  execute: (message, args) => {
    message.channel.send(
      generateEmbed("#FFC0CB", "Erik", [{ name: "How Gay?", value: "Big Gay" }])
    );
  },
};

export default erik;
