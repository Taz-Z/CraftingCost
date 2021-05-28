import { generateEmbed } from "./helper";
import { default as axios } from "axios";

const LOGS_KEY = process.env.LOGS_KEY;
const WARCRAFT_LOGS_URL =
  "https://www.warcraftlogs.com:443/v1/parses/character/";
const WARCRAFT_LOGS_QUERY = "?timeframe=historical&api_key=" + LOGS_KEY;
const HEROIC_DIFFICULTY = 4; //ID of heroic fights, can be retrieved from warcraft logs
const MYTHIC_DIFFICULTY = 5; //ID of mythic fights

/**
 * Contains boss data and damage parses
 **/
function boss(name) {
  this.name = name;
  this.best = 0;
  this.avg = 0;
  this.parses = [];
}

/**
 * Get all best parse/boss
 **/
export async function getParses(name, server) {
  const bosses = {
    2398: new boss("Shriekwing"), //Get ID from warcraft logs
    2418: new boss("Huntsman Altimor"),
    2383: new boss("Hungering Destroyer"),
    2406: new boss("Lady Inerva"),
    2402: new boss("Sun King"),
    2405: new boss("Artificer Xymox"),
    2412: new boss("Council of Blood"),
    2399: new boss("Sludgefist"),
    2417: new boss("Stone Legion Generals"),
    2407: new boss("Sire Denathrius"),
  };

  const url =
    WARCRAFT_LOGS_URL + name + "/" + server + "/us" + WARCRAFT_LOGS_QUERY; //full logs url to post to
  const { data } = await axios.get(url);
  for (const key in data) {
    const currParse = data[key];
    if (currParse.difficulty === MYTHIC_DIFFICULTY)
      bosses[currParse.encounterID].parses.push(currParse.percentile);
  }
  const avgParses = formatBosses(bosses);
  const topAvg = avgParses[0];
  const avg = avgParses[1];
  return formatPrints(bosses, topAvg, avg, name, server);
}

const formatBosses = (bosses) => {
  let bestAvgSum = 0;
  let avgSum = 0;
  let flexCount = Object.keys(bosses).length;
  for (const id in bosses) {
    const boss = bosses[id];
    if (boss.parses.length <= 0) {
      flexCount--;
      continue;
    }
    bestAvgSum += boss.best = Math.max.apply(null, boss.parses);
    avgSum += boss.avg = getMean(boss.parses);
  }
  return [bestAvgSum / flexCount, avgSum / flexCount];
};

const formatPrints = (bosses, topAvg, avg, name, server) => {
  const printStatements = [{ name: "Best Average", value: topAvg.toFixed(2) }];
  for (const boss in bosses) {
    const currBoss = bosses[boss];
    printStatements.push({
      name: currBoss.name,
      value: currBoss.best.toFixed(2),
    });
  }
  return generateEmbed(
    "#000000",
    `Parses for ${name}-${server}`,
    printStatements
  );
};

/**
 * Give mean of array
 **/
const getMean = (parses) => {
  let sum = 0;
  const count = parses.length;
  for (const parse in parses) sum += parses[parse];
  return Math.floor(sum / count);
};
