import { MessageEmbed } from "discord.js";

export function generateEmbed(color, title, fields) {
  return new MessageEmbed().setColor(color).setTitle(title).addFields(fields);
}

export const commands = [
  { name: "!ping", value: "Will respond with pong to determine server status" },
  {
    name: "!costs $SERVER",
    value: "Displays the profit margin of items on specified $SERVER",
  },
  {
    name: "!parses $NAME $SERVER",
    value: "Displays top mythic parses for $NAME-$SERVER",
  },
];
