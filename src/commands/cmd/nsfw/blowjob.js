const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "blowjob",
  alias: ["bj"],
  async execute(client, message, args) {
    if (!message.channel.nsfw) {
      return await message.reply({
        content: `🔞 **${message.author.username}**, este canal no es **NSFW**`,
      });
    }

    fetch("https://akaneko-api.herokuapp.com/api/blowjob")
      .then((res) => res.json())
      .then(async (data) => {
        const embed = new MessageEmbed()
          .setTitle("<:hornygirl:966070553268064378> Blowjob 😋🔥")
          .setImage(data.url)
          .setColor(client.config.hexColor);

        await message.reply({ embeds: [embed] });
      })
      .catch(async (err) => {
        console.log(err);
        await message.channel.send({ content: err.message });
      });
  },
};
