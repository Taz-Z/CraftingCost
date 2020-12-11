# CraftingCost
Determines if an item is worth to craft and sell

# Example Output

<a href="https://ibb.co/h2TYy28"><img src="https://i.ibb.co/RQJj9QH/example-Output.png" alt="example-Output" border="0"></a>

# How to use
You can copy paste this code into a google script file.  
I recommend setting up a trigger for every 30 minutes as the Auction house api updates every hour.

Replaces the const values at the top of the file with your specific values:

```js

  const CLIENTID = "PUT CLIENT KEY IN THESE QUOTES";
  const CLIENTKEY = "PUT CLIENT KEY IN THESE QUOTES";
  const REALMID = 61 //SET THIS TO YOUR REALM ID
  const DISCORD_WEBHOOK = "PUT DISCORD WEBHOOK URL HERE"

```

Change those to your values, eg:

```js

  const CLIENTID = "x1Y2z3";
  const CLIENTKEY = "assadasdasd";
  const REALMID = 61 //SET THIS TO YOUR REALM ID
  const DISCORD_WEBHOOK = "www.discordexamplewebhook.com"

```

To get your client key/id vist: https://develop.battle.net/documentation

To set up a discord webhook vist: https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks
