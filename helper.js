import { MessageEmbed } from "discord.js";

export function generateEmbed(color, title, fields) {
  return new MessageEmbed().setColor(color).setTitle(title).addFields(fields);
}
