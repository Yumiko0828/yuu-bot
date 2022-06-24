const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  alias: ["cola"],
  async execute(client, message, args) {
    try {
      const voiceChannel = message.member?.voice?.channel;
      let queue = client.distube.getQueue(voiceChannel);

      if (!voiceChannel)
        return message.reply({
          content: "<a:no:871913506167980052> Debes estar en un canal de voz.",
        });

      if (
        message.guild.me.voice.channel &&
        voiceChannel.id !== message.guild.me.voice.channel.id
      )
        return message.reply({
          content:
            "<a:no:871913506167980052> Debes estar en el mismo canal de voz que yo.",
        });

      if (!queue) {
        const embed = new MessageEmbed()
          .setTitle("<a:animusic:989669794364137542> Yuu Queue")
          .setDescription("No se estan reproduciendo canciones.")
          .setTimestamp()
          .setColor(client.config.hexColor);

        return message.reply({
          embeds: [embed],
        });
      }

      let $queue = {
        list: "",
        length: queue.songs.length,
      };
      queue.songs.map((s) => {
        $queue.list += `❥ **${s.name}** (\`${s.formattedDuration}\`)\n`;
      });

      const embed = new MessageEmbed()
        .setTitle("<a:animusic:989669794364137542> Yuu Queue")
        .addField(`En cola (\`${$queue.length}\`)`, `${$queue.list}`)
        .setTimestamp()
        .setColor(client.config.hexColor);

      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
      await message.channel.send({ content: err.message });
    }
  },
};
