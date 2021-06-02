import { command } from "../../helper.js";

const cumlativeExp = [
  0, 1000, 2325, 4025, 6175, 8800, 11950, 15675, 20025, 25025, 30725, 37175,
  44400, 52450, 61375, 71200, 81950, 93675, 106400, 120175, 135050, 151850,
  169850, 189100, 209650, 231525, 254775, 279425, 305525, 333100, 362200,
  392850, 425100, 458975, 494525, 531775, 570750, 611500, 654075, 698500,
  744800, 795425, 848125, 902900, 959800, 1018875, 1080150, 1143675, 1209475,
  1277600, 1348075, 1424575, 1503625, 1585275, 1669550, 1756500, 1846150,
  1938550, 2033725, 2131725, 2232600, 2341550, 2453600, 2568775, 2687100,
  2808625, 2933400, 3061475, 3192875, 3327650, 3465825, 3614525, 3766900,
  3922975, 4082800, 4246400, 4413825, 4585125, 4760350, 4939525, 5122700,
  5338925, 5581950, 5855050, 6161850, 6506450, 6893400, 7327825, 7815450,
  8362650,
];

const PURPLE_EXP = 20000;
const BLUE_EXP = 5000;
const EXP_PER_LEYLINE = 6.5 * BLUE_EXP + 4.5 * PURPLE_EXP;
const RESIN_PER_DAY = 300;
const RESIN_PER_LEYLINE = 20;
const EXP_PER_DAY = EXP_PER_LEYLINE * (RESIN_PER_DAY / RESIN_PER_LEYLINE);

const validateInputs = (args) => {
  const [startLevel, endLevel] = args.map(Number);
  return [startLevel, endLevel];
};

const execute = (message, args) => {
  const [startLevel, endLevel] = validateInputs(args);
  const cumlativeCurrExp = cumlativeExp[startLevel - 1];
  const cumlativeTarExp = cumlativeExp[endLevel - 1];
  const daysToLevel = Math.ceil(
    (cumlativeTarExp - cumlativeCurrExp) / EXP_PER_DAY
  );
  message.channel.send(
    `You need ${daysToLevel} day(s) from level ${startLevel} to level ${endLevel}.`
  );
};

export default command(
  "level",
  execute,
  "Calculates exp stuff",
  "$CURR_LEVEL $TAR_LEVEL | !level 10 90",
  true
);
