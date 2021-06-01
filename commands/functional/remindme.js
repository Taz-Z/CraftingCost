import { command } from "../../helper.js";

const validateInputs = (args) => {
  let [time, units] = args;
  let calctime = 0;
  if (!units) units = "s";
  if (units.startsWith("h")) {
    calctime = Number(time) * 60 * 60 * 1000;
  } else if (units.startsWith("m")) {
    calctime = Number(time) * 60 * 1000;
  } else {
    calctime = Number(time) * 1000;
  }
  return [calctime, time, units];
};
const execute = (message, args) => {
  const [calcTime, time, units] = validateInputs(args);
  console.log(calcTime, time, units)
  setTimeout(() => {
    console.log("here")
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
