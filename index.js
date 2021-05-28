import "./bootstrap.js";
import { Client } from "discord.js";
import { generateEmbed, commands } from "./helper.js";
import { isWorthToCraft } from "./craftingCosts.js";
import { getParses } from "./warcraftLogs.js";

const prefix = "!";
const client = new Client();

client.login(process.env.TOKEN);

client.on("message", async (message) => {
  const args = message.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  switch (command) {
    case "help":
      message.channel.send(generateEmbed("#FFFFFF", "Bot Commands", commands));
      break;
    case "ping":
      message.channel.send("Pong.");
      break;
    case "costs":
      message.channel.send("...Loading Auction House Data...");
      let serverName = "Bleeding";
      if (args.length) {
        serverName = args[0];
      }
      try {
        message.channel.send(await isWorthToCraft(serverName));
      } catch (e) {
        message.channel.send(e.message);
      }
      break;
    case "parses":
      let [name, ...server] = args;
      server = server.join("");
      message.channel.send(await getParses(name, server));
      break;
      case "matt": 
      message.channel.send(generateEmbed("#0000FF", "Biggest Whale NA?",[{name: "Xinthel", value: ":whale:"}, {name: "Matt", value: ":whale:"}, {name: "Matthew", value: ":whale:"}, {name: "Mattyesh", value: ":whale:"}]        ));
      break;
    }
});
