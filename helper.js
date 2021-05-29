import { MessageEmbed } from "discord.js";

export const generateEmbed = (color, title, fields) =>
  new MessageEmbed().setColor(color).setTitle(title).addFields(fields);

export const command = (name, description, usage, execute, args = false) => ({
  name,
  description,
  usage,
  execute,
  args,
});
