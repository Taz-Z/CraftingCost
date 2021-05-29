import { command, generateEmbed } from "../../helper.js";
import { default as axios } from "axios";

const url = "https://raider.io/api/v1/mythic-plus/affixes?region=us&locale=en";

const execute = async (message, args) => {
  const { data } = await axios.get(url);
  message.channel.send(
    generateEmbed("#FF0000", "M+ Affixes", [
      { name: "Affixes", value: data.title },
    ])
  );
};

export default command("affixes", execute, "Displays the weekly m+ affixes");
