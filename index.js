import "./bootstrap.js";
import { Collection, Client } from "discord.js";
import * as fs from "fs";

const prefix = "!";
const client = new Client();

client.login(process.env.TOKEN);
client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.default.name, command.default);
}

client.on("message", async (message) => {
  if (!message.content.startsWith("!")) {
    return;
  }
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  try {
    const commandObj = client.commands.get(command);
    if (commandObj) commandObj.execute(message, args);
  } catch (error) {
    console.error(error);
  }
});
