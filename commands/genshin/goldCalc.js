import { command } from "../../helper.js";

const LEYLINES_PER_DAY = 15;
const GOLD_PER_LEYLINE = 60000;
const THOUSAND = 1000;
const MILLION = 1000000;
const NO_MULTIPLIER = 1;

const getMultiplier = (multiValue) => {
  if (multiValue === "k" || multiValue === "K") return THOUSAND;
  if (multiValue === "m" || multiValue === "M") return MILLION;
  return NO_MULTIPLIER;
};
const validateInputs = (args) => {
  const targetGold = args[0];
  const lastChar = targetGold.slice(-1);
  const multiplier = getMultiplier(lastChar);
  if (multiplier === NO_MULTIPLIER) return Number(args[0]);

  return Number(args[0].substring(0, targetGold.length - 1)) * multiplier;
};

const execute = (message, args) => {
  const targetGold = validateInputs(args);
  const goldPerDay = LEYLINES_PER_DAY * GOLD_PER_LEYLINE;
  const daysNeeded = Math.ceil(targetGold / goldPerDay);
  message.channel.send(
    `You need ${daysNeeded} day(s) of farming gold leylines to get ${targetGold} gold`
  );
};

export default command(
  "gold",
  execute,
  "Calculates how many days needed to get a certain amount of gold",
  "500k | !gold 1.5m | !gold 123465",
  true
);
