import { command } from "../../helper.js";

const messageChoices = [
	"The command for this should honestly just be !theRetPally",
	"Sat on a couch watching tv for an entire month straight without moving.",
];

const execute = (message, args) => {
  message.channel.send(messageChoices[getRandomInt(0,messageChoices.length)]);
};

export default command("esh", execute);
