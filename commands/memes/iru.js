import { command } from "../../helper.js";

const messageChoices = [
  "The only guild leader to require a PR team and counseling staff.",
  "Somehow became a sugarbaby.",
  "The guild's abusive uncle.",
];

const execute = (message, args) => {
  message.channel.send(messageChoices[getRandomInt(0, messageChoices.length)]);
};

export default command("iru", execute);
