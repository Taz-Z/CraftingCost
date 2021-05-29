import { command, generateEmbed } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send(
    "The type of dude to go S tier comps in a normal tft game for 'practice'."
  );
};

export default command("asif", execute);
