import { command } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send("Pong.");
};

export default command("ping", execute, "Pings the server to see if it is up");
