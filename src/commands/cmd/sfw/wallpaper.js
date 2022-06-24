const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "wallpaper",
  alias: ["background", "wp"],

  execute(client, message, args) {
    fetch("https://nekos.life/api/v2/img/wallpaper", {
      method: "GET",
    })
      .then((res) => res.json())
      .then(async (data) => {
        const embed = new MessageEmbed()
          .setTitle("<a:yuuVerify:978420003453943858> Wallpaper generado")
          .setImage(data.url)
          .setColor(client.config.hexColor)
          .setTimestamp()
          .setURL(data.url);

        await message.reply({ embeds: [embed] });
      })
      .catch(async (err) => {
        console.log(err);
        await message.reply({ content: err.message });
      });
  },
};
