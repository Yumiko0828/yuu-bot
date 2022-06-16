const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "yuri",
  alias: [],
  async execute(client, message, args) {
    if (!message.channel.nsfw) {
      return await message.reply({
        content: `🔞 **${message.author.username}**, este canal no es **NSFW**`,
      });
    }

    fetch("https://akaneko-api.herokuapp.com/api/yuri")
      .then((res) => res.json())
      .then(async (data) => {
        const embed = new MessageEmbed()
          .setTitle("<:hornygirl:966070553268064378> Yuri 🔥")
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
