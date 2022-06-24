const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "neko",
  alias: [],
  execute(client, message, args) {
    fetch("https://nekos.life/api/v2/img/neko", {
      method: "GET"
    })
      .then((res) => res.json())
      .then(async (data) => {
        const embed = new MessageEmbed()
          .setTitle("<a:neko:966108026178269184> Neko nya~")
          .setImage(data.url)
          .setColor(client.config.hexColor)
          .setTimestamp();

        await message.reply({ embeds: [embed] });
      })
      .catch(async (err) => {
        console.log(err);
        await message.channel.send({ content: err.message });
      });
  },
};
