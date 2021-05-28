import { default as axios } from "axios";
import { generateEmbed } from "../helper.js";

export async function isWorthToCraft(serverName) {
  const CLIENTID = process.env.CLIENTID;
  const CLIENTKEY = process.env.CLIENTKEY;

  const itemMap = {
    168589: {
      name: "Marrowroot",
      value: Infinity,
    },
    171315: {
      name: "Nightshade",
      value: Infinity,
    },
    168586: {
      name: "Rising Glory",
      value: Infinity,
    },
    168583: {
      name: "Widowbloom",
      value: Infinity,
    },
    170554: {
      name: "Vigil's Torch",
      value: Infinity,
    },
    169701: {
      name: "Deathblossom",
      value: Infinity,
    },
    171276: {
      name: "Spectral Flask of Power",
      value: Infinity,
    },
    171285: {
      name: "Shadowcore Oil",
      value: Infinity,
    },
    171349: {
      name: "Potion of Phantom Fire",
      value: Infinity,
    },
    171351: {
      name: "Potion of Deathly Fixation",
      value: Infinity,
    },
    176811: {
      name: "Potion of Sacrificial Anima",
      value: Infinity,
    },
    171273: {
      name: "Potion of Spectral Intellect",
      value: Infinity,
    },
    171275: {
      name: "Potion of Spectral Strength",
      value: Infinity,
    },
    171270: {
      name: "Potion of Spectral Agility",
      value: Infinity,
    },
  };

  const craftAmounts = [
    {
      id: 171276,
      reagents: {
        171315: 3,
        168586: 4,
        168589: 4,
        168583: 4,
        170554: 4,
      },
    },
    {
      id: 171285,
      reagents: {
        169701: 2,
      },
    },
    {
      id: 171349,
      reagents: {
        168589: 3,
        168586: 3,
      },
    },
    {
      id: 171351,
      reagents: {
        168583: 3,
        170554: 3,
      },
    },
    {
      id: 176811,
      reagents: {
        168583: 6,
      },
    },
    {
      id: 171273,
      reagents: {
        168589: 5,
      },
    },

    {
      id: 171275,
      reagents: {
        168586: 5,
      },
    },
    {
      id: 171270,
      reagents: {
        168583: 5,
      },
    },
  ];

  const generateAccessToken = async () => {
    const { data } = await axios.post(
      "https://us.battle.net/oauth/token",
      null,
      {
        params: {
          grant_type: "client_credentials",
        },
        auth: {
          username: CLIENTID,
          password: CLIENTKEY,
        },
      }
    );

    return data.access_token;
  };

  const getServerID = async (token) => {
    const { data } = await axios.get(
      `https://us.api.blizzard.com/data/wow/search/connected-realm?namespace=dynamic-us&realms.name.en_US=${serverName}&access_token=${token}`
    );

    if (data.results && data.results.length) {
      serverName = data.results[0].data.realms[0].name.en_US;
      return data.results[0].data.id;
    }
    throw Error("Server not found");
  };

  const updateItemPrice = async (token) => {
    const realmID = await getServerID(token);
    const url = `https://us.api.blizzard.com/data/wow/connected-realm/${realmID}/auctions?namespace=dynamic-us&locale=en_US`;
    const base = 10000; //copper to gold conversion factor

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get(url, config);
    const ids = new Set(Object.keys(itemMap).map(Number));
    data.auctions
      .filter((auction) => ids.has(auction.item.id))
      .forEach((auction) => {
        const price = auction.unit_price / base;
        if (itemMap[auction.item.id].value > price) {
          itemMap[auction.item.id].value = price;
        }
      });
  };

  const getCraftingCosts = () => {
    return craftAmounts.map((item) => {
      const craftingCost = Object.entries(item.reagents).reduce(
        (acc, [id, amount]) => {
          return acc + itemMap[id].value * amount;
        },
        0
      );
      const priceInAH = itemMap[item.id].value;
      const difference = (priceInAH - craftingCost).toFixed(2);
      const profitOrLoss = difference > 0 ? "profit" : "loss";
      return {
        name: itemMap[item.id].name,
        value: `You make a ${profitOrLoss} of ${difference}`,
      };
    });
  };

  const token = await generateAccessToken();
  await updateItemPrice(token);
  return generateEmbed(
    "#0099ff",
    `Crafting Profits for ${serverName}`,
    getCraftingCosts()
  );
}
