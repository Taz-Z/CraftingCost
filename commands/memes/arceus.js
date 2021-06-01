import { command } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send("Thanks for ignoring our 8* invites last week, nbd.");
};

export default command("arceus", execute);
