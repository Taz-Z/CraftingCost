import { command, generateEmbed } from "../../helper.js";

const execute = (message, args) => {
  message.channel.send(
    generateEmbed("#0000FF", "Biggest Whale NA?", [
      { name: "Xinthel", value: ":whale:" },
      { name: "Matt", value: ":whale:" },
      { name: "Matthew", value: ":whale:" },
      { name: "Mattyesh", value: ":whale:" },
    ])
  );
};

export default command("matt", execute);
