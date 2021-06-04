import { command } from "../../helper.js";

const execute = async (message, args) => {
  const arceus = "<@232380548394385418>";
  await message.channel.send(`Hey ${arceus}`);
  await message.channel.send(`Thanks ${arceus}`);
  await message.channel.send(`for ${arceus}`);
  await message.channel.send(`ignoring ${arceus}`);
  await message.channel.send(`our ${arceus}`);
  await message.channel.send(`9* ${arceus}`);
  await message.channel.send(`invites ${arceus}`);
  await message.channel.send(`last ${arceus}`);
  await message.channel.send(`week ${arceus}`);
  await message.channel.send(`Nbd ${arceus}`);
};

export default command("arceus", execute);
