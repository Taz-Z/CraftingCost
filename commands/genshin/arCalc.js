import { command } from "../../helper.js";

const cumlativeExp = [
  0, 375, 875, 1500, 2225, 3075, 4025, 5100, 6275, 7575, 9000, 10525, 12175,
  13950, 15825, 17825, 20200, 22700, 25325, 28100, 30925, 34350, 38075, 42075,
  46375, 50950, 55825, 60975, 66425, 72150, 78175, 84475, 91075, 97975, 105150,
  112625, 120375, 128425, 136750, 145375, 155925, 167450, 179925, 193375,
  207775, 223125, 239450, 256725, 274975, 294175, 320575, 349375, 380575,
  414175, 450175, 682525, 941475, 1227225, 1540050, 1880175,
];

const EXP_PER_DAY = 3000;

const validateInputs = (args) => {
  let [currLevel, currExp, targetLevel] = args;
  if (!targetLevel && !currExp) {
    targetLevel = Number(currLevel) + 1;
    currExp = 0;
  } else if (!targetLevel) {
    if (Number(currExp) <= 60) {
      targetLevel = currExp;
      currExp = 0;
    } else {
      targetLevel = Number(currLevel) + 1;
    }
  } else if (!currExp) {
    currExp = 0;
  }

  return [currLevel, currExp, targetLevel].map(Number);
};

const execute = (message, args) => {
  const [currLevel, currExp, targetLevel] = validateInputs(args);
  const cumlativeCurrExp = cumlativeExp[currLevel - 1] + currExp;
  const cumlativeTarExp = cumlativeExp[targetLevel - 1];
  const daysToLevel = Math.ceil(
    (cumlativeTarExp - cumlativeCurrExp) / EXP_PER_DAY
  );
  message.channel.send(
    `You need ${daysToLevel} day(s) from AR ${currLevel} (${currExp} exp) to AR ${targetLevel}`
  );
};

export default command(
  "ar",
  execute,
  "Calculates how many days until the target AR given 2 resin refreshes/day",
  "$CURRENT_AR $CURRENT_EXP (Optional) $TARGET_AR (Optional) -- !ar 52 | !ar 52 5000 55 | !ar 52 5000 53",
  true
);
