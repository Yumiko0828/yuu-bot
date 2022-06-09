const { MessageEmbed } = require("discord.js");
const Neko = require("nekos.life");
const neko = new Neko();

module.exports = {
  name: "wallpaper",
  alias: ["background", "wp"],

  async execute(client, message, args) {
    try {
      let owo = await neko.wallpaper();

      const embed = new MessageEmbed()
        .setTitle("<a:yuuVerify:978420003453943858> Wallpaper generado")
        .setImage(owo.url)
        .setColor(client.config.hexColor)
        .setTimestamp()
        .setURL(owo.url);

      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      await message.channel.send({ content: err.message });
    }
  },
};
