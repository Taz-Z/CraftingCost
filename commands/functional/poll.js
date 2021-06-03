import { Emoji } from "discord.js";
import { command, generateEmbed } from "../../helper.js";

const MAX_QUESTIONS = 10;
const idle = 1 * 60 * 1000; // 1 minutes
const time = 1 * 60 * 1000; // 1 minutes

const emojiMap = {
  0: "0⃣",
  1: "1⃣",
  2: "2⃣",
  3: "3⃣",
  4: "4⃣",
  5: "5⃣",
  6: "6⃣",
  7: "7⃣",
  8: "8⃣",
  9: "9⃣",
  10: "🔟",
  checkmark: "✅",
};

const emojis = Object.values(emojiMap);

const execute = (message, args) => {
  const answers = {
    question: "",
    pollChoices: [],
  };
  const answerKeys = Object.keys(answers);
  let iter = 0;

  const response = () =>
    `Enter an option for the poll (${
      10 - answers.pollChoices.length
    } options left) or type done if you're done putting all options`;
  const messageFilter = (m) => m.author.id === message.author.id;

  message.author.createDM().then((channel) => {
    channel.send(
      'Please type out the poll question - Eg: "What is your favourite food"'
    );

    const messageCollector = channel.createMessageCollector(messageFilter, {
      idle,
    });

    messageCollector.on("collect", (msg) => {
      if (
        msg.content.trim() === "done" ||
        answers.pollChoices.length >= MAX_QUESTIONS - 1
      ) {
        iter = Infinity;
        messageCollector.stop();
      }
      if (iter <= answerKeys.length) {
        switch (answerKeys[iter]) {
          case "question":
            answers.question = msg.content;
            channel.send(response());
            iter++;
            break;
          case "pollChoices":
            answers.pollChoices.push(msg.content);
            channel.send(response());
            break;
        }
      }
    });

    messageCollector.on("end", async (collected) => {
      const description = answers.pollChoices
        .map((ans, i) => emojiMap[i + 1] + ": " + ans)
        .join("\n");
      const embed = generateEmbed("", answers.question, [], description);
      const embMsg = await message.channel.send(embed);
      const emojiChoiceMap = {};

      answers.pollChoices.forEach(async (ans, i) => {
        const currEmoji = emojiMap[i + 1];
        emojiChoiceMap[currEmoji] = ans;
        await embMsg.react(currEmoji);
      });
      await embMsg.react(emojiMap.checkmark);
      const reactFilter = (reaction, user) => {
        return emojis.includes(reaction.emoji.name);
      };

      const reactionCollector = embMsg.createReactionCollector(reactFilter, {
        time,
      });

      reactionCollector.on("collect", (reaction, user) => {
        if (
          reaction.emoji.name === emojiMap.checkmark &&
          user.id === message.author.id
        ) {
          reactionCollector.stop();
        }
      });

      reactionCollector.on("end", (collected) => {
        let count = -Infinity;
        let tie = [];
        //Can clean with a reduce
        Object.entries(emojiChoiceMap).forEach(([emoji, choice]) => {
          const collectedEmoji = collected.get(emoji);
          if (collectedEmoji) {
            const newCount = collectedEmoji.count ?? 0;
            if (newCount > count) {
              tie = [choice];
              count = newCount;
            } else if (newCount === count) {
              tie.push(choice);
            }
          }
        });
        let string =
          tie.length >= 2
            ? `There is a tie between ${tie.join(" and ")}`
            : `The winner is: ${tie.pop()}`;
        message.channel.send();
      });
    });
  });
};

export default command("poll", execute, "Begins poll construction");
