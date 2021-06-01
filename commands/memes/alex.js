import { command, generateEmbed, getRandomInt } from "../../helper.js";

const messageChoices = [
  "If you meeled more than the hpriest you might be in for a fight :).",
  "We all know the only reason you play monk is because it's one `e` away from monke.",
  "For all the first person you played in WoW, you sure do suck at valorant.",
];

const execute = (message, args) => {
  message.channel.send(messageChoices[getRandomInt(0, messageChoices.length)]);
};

export default command("alex", execute);
