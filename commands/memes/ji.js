import { command } from "../../helper.js";

const messageChoices = [
  "Literally no one knows her real name.",
  "Has anyone heard her talk?",
];

const execute = (message, args) => {
  message.channel.send(messageChoices[getRandomInt(0, messageChoices.length)]);
};

export default command("ji", execute);
