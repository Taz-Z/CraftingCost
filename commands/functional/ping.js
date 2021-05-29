import { command } from "../../helper.js";

export default command("ping", "Ping!", "!ping", (message, args) => {
  message.channel.send("Pong.");
});
