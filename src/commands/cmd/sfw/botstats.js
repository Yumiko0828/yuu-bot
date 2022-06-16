const { MessageEmbed, version } = require("discord.js");
const { size, format, mstime } = require("yutil.js");

module.exports = {
  name: "botstats",
  alias: ["bs"],
  async execute(client, message, args) {
    try {
      const { days, hours, minutes, seconds } = mstime(client.uptime);
      const embed = new MessageEmbed()
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setThumbnail(client.user.avatarURL())
        .setColor(client.config.hexColor)
        .addField("Desarrollador", `» Yasu Yumiko#5285`)
        .addField("Version", `» v${client.config.version}`)
        .addField(
          "Tiempo activo",
          `» Hace **${days}** ${days == 1 ? "dia" : "dias"}, **${hours}** ${
            hours == 1 ? "hora" : "horas"
          }, **${minutes}** ${
            minutes == 1 ? "minuto" : "minutos"
          } y **${seconds}** ${seconds == 1 ? "segundo" : "segundos"}`
        )
        .addField(
          "Activo desde",
          `» El **${format(client.readyAt).date}**, a las **${format(
            client.readyAt
          ).hour}**`
        )
        .addField("Servidores", `» ${client.guilds.cache.size}`)
        .addField("Usuarios", `» ${client.users.cache.size}`)
        .addField("Ram", `» ${size(process.memoryUsage().heapUsed)}`)
        .addField("Node version", `» ${process.version}`)
        .addField("Lenguaje", "» JavaScript")
        .addField("Libreria", `» Discord.js v${version}`)
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);
      await message.channel.send({ content: err.message });
    }
  },
};
