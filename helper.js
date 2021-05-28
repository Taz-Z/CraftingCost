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
    name: "!costs",
    value:
      "Accepts an additional argument (server) and displays the profit margin on items",
  },
];
