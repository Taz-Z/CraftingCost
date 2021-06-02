import { command, getRandomInt } from "../../helper.js";

const messageChoices = [
  "Needs a fucking hobby!",
  "Best streamer EUW!",
  "I cannot stress how badly this man needs a hobby... Like seriously this was so much work just to shitpost.",
];

const execute = (message, args) => {
  message.channel.send(messageChoices[getRandomInt(0, messageChoices.length)]);
};

export default command("taz", execute);
