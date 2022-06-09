const { MessageEmbed, version } = require("discord.js");
const Size = require("../../utils/size");

module.exports = {
  name: "botstats",
  alias: ["bs"],
  execute(client, message, args) {
    const embed = new MessageEmbed()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL(),
      })
      .setThumbnail(client.user.avatarURL())
      .setColor(client.config.hexColor)
      .addField("Desarrollador", `» Yasu Yumiko#5285`)
      .addField("Version", `» v${client.config.version}`)
      .addField("Servidores", `» ${client.guilds.cache.size}`)
      .addField("Usuarios", `» ${client.users.cache.size}`)
      .addField("Ram", `» ${Size(process.memoryUsage().heapUsed)}`)
      .addField("Node version", `» ${process.version}`)
      .addField("Lenguaje", "» JavaScript")
      .addField("Libreria", `» Discord.js v${version}`)
      .setTimestamp();

    message.reply({ embeds: [embed] });
  },
};
