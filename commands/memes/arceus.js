import { command } from "../../helper.js";

const execute = (message, args) => {
  const arceus = "<@232380548394385418>";
  message.channel.send(`Hey ${arceus}`);
  message.channel.send(`Thanks ${arceus}`);
  message.channel.send(`for ${arceus}`);
  message.channel.send(`ignoring ${arceus}`);
  message.channel.send(`our ${arceus}`);
  message.channel.send(`9* ${arceus}`);
  message.channel.send(`invites ${arceus}`);
  message.channel.send(`last ${arceus}`);
  message.channel.send(`week ${arceus}`);
  message.channel.send(`Nbd ${arceus}`);
};

export default command("arceus", execute);
