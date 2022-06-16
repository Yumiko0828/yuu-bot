const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "dev",
  alias: [],
  execute (client, message, args) {
    let dev = client.users.cache.get("752918867273187378");

    const embed = new MessageEmbed()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
        url: "https://yuu-chan.ml"
      })
      .setTitle(`Desarrollador(es) de ${client.user.username}`)
      .addField("Devs", `» [${dev.username}](https://yumiko0828.ml)`)
      .setColor(client.config.hexColor);

    message.reply({ embeds: [embed] });
  }
}