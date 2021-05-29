import { generateEmbed } from "../../helper.js";
import { default as axios } from "axios";

const url = "https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en";

const getAffixes = async () => {
  const { data } = await axios.get(url);
  return generateEmbed("#FF0000", "M+ Affixes", [
    { name: "Affixes", value: data.title },
  ]);
};

const affix = {
  name: "affixes",
  description: "affixes",
  execute: async (message, args) => {
    message.channel.send(await getAffixes());
  },
};

export default affix;
