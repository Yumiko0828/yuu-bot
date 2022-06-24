const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "skip",
  alias: [],
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

      if (!queue)
        return message.reply({
          content: `No se estan reproduciendo canciones`,
        });

      const embed = new MessageEmbed()
        .setTitle("<a:animusic:989669794364137542> Yuu Skip")
        .setDescription(`La reproducción de **${queue.songs[0].name}** fue saltada por ${message.author}.`)
        .setTimestamp()
        .setColor(client.config.hexColor);

      await client.distube.skip(voiceChannel);
      await message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.log(err);
      await message.channel.send({ content: err.message });
    }
  },
};
