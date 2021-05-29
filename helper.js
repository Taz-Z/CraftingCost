import { MessageEmbed } from "discord.js";

export const generateEmbed = (color, title, fields) =>
  new MessageEmbed().setColor(color).setTitle(title).addFields(fields);

export const command = (
  name,
  execute,
  description = "",
  usage = "",
  args = false
) => ({
  name,
  execute,
  description,
  usage,
  args,
});
