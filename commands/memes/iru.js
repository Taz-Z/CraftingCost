import { command } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send(
    "The only guild leader to require a PR team."
  );
};

export default command("iru", execute);
