import { command } from "../../helper.js";

const validateInputs = (args) => {
  let [time, units] = args;
  if (!units) units = "s";
  if (units.startsWith("h")) {
    time = Number(time) * 60 * 60 * 1000;
  } else if (units.startsWith("m")) {
    time = Number(time) * 60 * 1000;
  } else {
    time = Number(time) * 1000;
  }
  return [calcTime, time, units];
};
const execute = (message, args) => {
  const [calcTime, time, units] = validateInputs(args);
  setTimeout(() => {
    message.channel.send(
      `${message.author} has been reminded after ${time} ${units}`
    );
  }, calcTime);
};

export default command(
  "remindme",
  execute,
  "Pings you after the given time",
  "15 min",
  true
);
