import { command, generateEmbed } from "../../helper.js";

const MAX_QUESTIONS = 10;
const idle = 5 * 60 * 1000; // 5 minutes

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
    answers: [],
  };
  const answerKeys = Object.keys(answers);
  let iter = 0;
  const response = () =>
    `Enter an option for the poll (${
      10 - answers.answers.length
    } options left) or type done if you're done putting all options`;
  const filter = (m) => m.author.id === message.author.id;

  message.author.createDM().then((channel) => {
    channel.send(
      'Please type out the poll question - Eg: "What is your favourite food"'
    );

    const messageCollector = channel.createMessageCollector(filter, { idle });

    messageCollector.on("collect", (msg) => {
      if (
        msg.content.trim() === "done" ||
        answers.answers.length >= MAX_QUESTIONS - 1
      ) {
        messageCollector.stop();
      }
      if (iter <= answerKeys.length) {
        switch (answerKeys[iter]) {
          case "question":
            answers.question = msg.content;
            channel.send(response());
            iter++;
            break;
          case "answers":
            answers.answers.push(msg.content);
            channel.send(response());
            break;
        }
      }
    });

    messageCollector.on("end", async (collected) => {
      const description = answers.answers
        .map((ans, i) => emojiMap[i + 1] + ": " + ans)
        .join("\n");
      const embed = generateEmbed("", answers.question, [], description);
      const embMsg = await channel.send(embed);
      answers.answers.forEach(async (_, i) => {
        await embMsg.react(emojiMap[i + 1]);
      });
      await embMsg.react(emojiMap.checkmark);
      //emojis.includes(reaction.emoji.name)
      const reactFilter = (reaction, user) => true;

      const reactionCollector = embMsg.createReactionCollector(reactFilter, {
        time: 150000,
      });

      reactionCollector.on("collect", (reaction, user) => {
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
      });

      reactionCollector.on("end", (collected) => {
        console.log(`Collected ${collected.size} items`);
      });
    });
  });
};

export default command("poll", execute, "Begins poll construction");
