import "./bootstrap.js";
import { Collection, Client } from "discord.js";
import * as fs from "fs";

const prefix = "!";
const client = new Client();

client.login(process.env.TOKEN);
client.commands = new Collection();

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = await import(`./commands/${folder}/${file}`);
    client.commands.set(command.default.name, command.default);
  }
}

client.on("message", async (message) => {
  if (!message.content.startsWith("!")) {
    return;
  }
  const args = message.content.slice(prefix.length).trim().split(" ");
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;
  if (command.args && !args.length) {
    return message.channel.send(
      `You didn't provide any arguments, ${message.author}!`
    );
  }
  try {
    command.execute(message, args);
  } catch (e) {
    console.error(e);
  }
});
