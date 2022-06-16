const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ravatar",
  alias: ["randomav", "rav"],

  execute(client, message, args) {
    fetch("https://nekos.life/api/v2/img/avatar", {
      method: "GET",
    })
      .then((res) => res.json())
      .then(async (data) => {
        const embed = new MessageEmbed()
          .setTitle("<a:yuuVerify:978420003453943858> Avatar generado")
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
