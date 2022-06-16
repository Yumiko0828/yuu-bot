const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wallpaper")
    .setDescription("📷 Genera un wallpaper."),
  execute(client, int) {
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

        await int.reply({ embeds: [embed] });
      })
      .catch(async (err) => {
        console.log(err);
        await int.reply({ content: err.message });
      });
  },
};
