import { command } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send(
    "The only guild leader to required a PR team"
  );
};

export default command("iru", execute);
