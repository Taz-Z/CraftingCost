import { command, generateEmbed } from "../../helper.js";

const execute = (message, args) => {
  const prefix = "!";
  const { commands } = message.client;

  commands
    .filter((command) => command.description && command.name !== "help")
    .forEach((command) => {
      const fields = [];
      if (command.description) {
        fields.push({
          name: `Description`,
          value: command.description,
        });
      }

      if (command.usage) {
        fields.push({
          name: `Usage`,
          value: `${prefix}${command.name} ${command.usage}`,
        });
      }

      message.channel.send(generateEmbed("#00000", command.name, fields));
    });
};

export default command("help", execute, "Lists all of my commands and uses");
