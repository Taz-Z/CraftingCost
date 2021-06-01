import { MessageEmbed } from "discord.js";

export const generateEmbed = (color, title, fields) =>
  new MessageEmbed().setColor(color).setTitle(title).addFields(fields);

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

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
