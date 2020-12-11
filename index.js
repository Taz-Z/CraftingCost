const isWorthToCraft = () => {
  const CLIENTID = "PUT CLIENT KEY IN THESE QUOTES";
  const CLIENTKEY = "PUT CLIENT KEY IN THESE QUOTES";
  const REALMID = 61 //SET THIS TO YOUR REALM ID
  const DISCORD_WEBHOOK = "PUT DISCORD WEBHOOK URL HERE"

  const itemMap = {
    168589: {
      name: "Marrowroot",
      value: Infinity
    },
    171315: {
      name: "Nightshade",
      value: Infinity
    },
    168586: {
      name: "Rising Glory",
      value: Infinity
    },
    168583: {
      name: "Widowbloom",
      value: Infinity
    },
    170554: {
      name: "Vigil's Torch",
      value: Infinity
    },
    169701: {
      name: "Deathblossom",
      value: Infinity
    },
    171276: {
      name: "Spectral Flask of Power",
      value: Infinity
    },
    171285: {
      name: "Shadowcore Oil",
      value: Infinity
    },
    171349: {
      name: "Potion of Phantom Fire",
      value: Infinity
    },
    171351: {
      name: "Potion of Deathly Fixation",
      value: Infinity
    },
    176811: {
      name: "Potion of Sacrificial Anima",
      value: Infinity
    },
    171273: {
      name: "Potion of Spectral Intellect",
      value: Infinity
    },
    171275: {
      name: "Potion of Spectral Strength",
      value: Infinity
    },
    171270: {
      name: "Potion of Spectral Agility",
      value: Infinity
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
      }
    },
    {
      id: 171285,
      reagents: {
        169701: 2
      }
    },
    {
      id: 171349,
      reagents: {
        168589: 3,
        168586: 3
      }
    },
    {
      id: 171351,
      reagents: {
        168583: 3,
        170554: 3
      }
    },
    {
      id: 176811,
      reagents: {
        168583: 6
      }
    },
    {
      id: 171273,
      reagents: {
        168589: 5
      }
    },

    {
      id: 171275,
      reagents: {
        168586: 5
      }
    },
    {
      id: 171270,
      reagents: {
        168583: 5
      }
    }
  ];

  const generateAccessToken = () => {
    const formData = {
      'grant_type': 'client_credentials'
    };

    const options = {
      method: 'post',
      payload: formData,
      headers: {
        Authorization: 'Basic ' + Utilities.base64Encode(CLIENTID + ":" + CLIENTKEY)
      }
    };
    const url = 'https://us.battle.net/oauth/token';
    const response = UrlFetchApp.fetch(url, options);
    const parsed = JSON.parse(response.getContentText());
    return parsed.access_token;

  };

  const getAuctionHouseData = (token) => {

    const url = `https://us.api.blizzard.com/data/wow/connected-realm/${REALMID}/auctions?namespace=dynamic-us&locale=en_US`;
    const base = 10000; //copper to gold conversion factor
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = UrlFetchApp.fetch(url, options);
    const parsed = JSON.parse(response.getContentText());
    const ids = new Set(Object.keys(itemMap).map(Number));
    parsed.auctions
      .filter(data => ids.has(data.item.id))
      .forEach(data => {
        const price = data.unit_price / base;
        if (itemMap[data.item.id].value > price) {
          itemMap[data.item.id].value = price;
        }
      });

    return Object.values(itemMap).map(item => ({ name: item.name, value: item.value.toString(), inline: true }));
  };

  const getCraftingCosts = () => {
    return craftAmounts.map(item => {
      const craftingCost = Object.entries(item.reagents).reduce((acc, [id, amount]) => {
        return acc + itemMap[id].value * amount
      }, 0)
      const priceInAH = itemMap[item.id].value;
      const difference = (priceInAH - craftingCost).toFixed(2);
      const profitOrLoss = difference > 0 ? "profit" : "loss";
      return { name: itemMap[item.id].name, value: `You make a ${profitOrLoss} of ${difference}` }
    })

  }

  const generateEmbed = (color, title, fields) => {
    return { color, title, fields };
  }

  const postToDiscord = (embeds) => {
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        username: "Crafting Bot",
        avatar_url: "https://symphony.com/wp-content/uploads/2019/08/build_great_chat_bots_blog.png",
        embeds
      }),
      muteHttpExceptions: true
    };
    const response = UrlFetchApp.fetch(DISCORD_WEBHOOK, options);
  }

  const token = generateAccessToken();
  const auctions = generateEmbed(456132, "Price in AH", getAuctionHouseData(token));
  const craftingCosts = generateEmbed(123456, "Is it worth to craft?", getCraftingCosts());
  postToDiscord([auctions, craftingCosts]);
}
