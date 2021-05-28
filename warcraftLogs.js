const helper = require("./helper");

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

var bosses = {
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

/**
 * Get all best parse/boss
 **/
exports.getParses = (name, server) => {
  var url =
    WARCRAFT_LOGS_URL + name + "/" + server + "/us" + WARCRAFT_LOGS_QUERY; //full logs url to post to

  try {
    var allParses = JSON.parse(UrlFetchApp.fetch(url).getContentText());
    for (var key in allParses) {
      var currParse = allParses[key];
      if (currParse.difficulty === MYTHIC_DIFFICULTY)
        bosses[currParse.encounterID].parses.push(currParse.percentile);
    }
    var avgParses = formatBosses();
    var topAvg = avgParses[0];
    var avg = avgParses[1];
    return formatPrints(topAvg, avg);
  } catch (error) {
    return " \nIncorrect log url format provided";
  }
};

const formatBosses = () => {
  var bestAvgSum = 0;
  var avgSum = 0;
  var flexCount = Object.keys(bosses).length;
  for (var id in bosses) {
    var boss = bosses[id];
    if (boss.parses.length <= 0) {
      flexCount--;
      continue;
    }
    bestAvgSum += boss.best = Math.max.apply(null, boss.parses);
    avgSum += boss.avg = getMean(boss.parses);
  }
  return [bestAvgSum / flexCount, avgSum / flexCount];
};

const formatPrints = (topAvg, avg) => {
  var printStatements = [
    { name: "Averages", value: `Best: ${topAvg} Avg: ${avg}` },
  ];
  for (var boss in bosses) {
    var currBoss = bosses[boss];
    printStatements.push({
      name: currBoss.name,
      value: `Best: ${currBoss.best} Avg: ${currBoss.avg}`,
    });
  }
  return printStatements;
};

/**
 * Give mean of array
 **/
const getMean = (parses) => {
  var sum = 0;
  var count = parses.length;
  for (var parse in parses) sum += parses[parse];
  return Math.floor(sum / count);
};
