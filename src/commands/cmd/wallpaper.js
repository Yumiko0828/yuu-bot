const { MessageEmbed } = require("discord.js");
const Neko = require("nekos.life");
const neko = new Neko();

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

        await message.channel.send({ embeds: [embed] });
      })
      .catch(async (err) => {
        console.log(err);
        await message.channel.send({ content: err.message });
      });
  },
};
