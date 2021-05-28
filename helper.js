const Discord = require("discord.js");

exports.generateEmbed = (color, title, fields) => {
  return new Discord.MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .addFields(fields);
};

exports.commands = [
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
