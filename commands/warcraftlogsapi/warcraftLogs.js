import { generateEmbed } from "../../helper.js";
import { default as axios } from "axios";

const WARCRAFT_LOGS_URL =
  "https://www.warcraftlogs.com:443/v1/rankings/character/";
const WARCRAFT_LOGS_QUERY =
  "?timeframe=historical&api_key=" + process.env.LOGS_KEY;
const HEROIC_DIFFICULTY = 4; //ID of heroic fights, can be retrieved from warcraft logs
const MYTHIC_DIFFICULTY = 5; //ID of mythic fights

/**
 * Get all best parse/boss
 **/
async function getParses(name, server) {
  const url =
    WARCRAFT_LOGS_URL + name + "/" + server + "/us" + WARCRAFT_LOGS_QUERY; //full logs url to post to
  const { data } = await axios.get(url);
  const bosses = getBosses(data);

  const avgParse = getAverageParse(bosses);
  return formatPrints(bosses, avgParse, name, server);
}

const getBosses = (data) => {
  return data.reduce((bosses, currParse) => {
    if (currParse.difficulty === MYTHIC_DIFFICULTY) {
      if (currParse.encounterID in bosses) {
        bosses[currParse.encounterID].parse = Math.max(
          bosses[currParse.encounterID].parse,
          currParse.percentile
        );
      } else {
        bosses[currParse.encounterID] = {
          name: currParse.encounterName,
          parse: currParse.percentile,
        };
      }
    }
    return bosses;
  }, {});
};

const getAverageParse = (bosses) => {
  const bossObj = Object.values(bosses);
  return bossObj.reduce((sum, boss) => sum + boss.parse, 0) / bossObj.length;
};

const formatPrints = (bosses, topAvg, name, server) => {
  const printStatements = Object.values(bosses).reduce(
    (arr, boss) => [...arr, { name: boss.name, value: boss.parse.toFixed(2) }],
    [{ name: "Best Average", value: topAvg.toFixed(2) }]
  );

  return generateEmbed(
    "#000000",
    `Parses for ${name}-${server}`,
    printStatements
  );
};

const parse = {
  name: "parses",
  description: "parses",
  args: true,
  execute: async (message, args) => {
    let [name, ...server] = args;
    server = server.join("");
    message.channel.send(await getParses(name, server));
  },
};

export default parse;
