module.exports = {
  name: "stop",
  alias: [],
  async execute(client, message, args) {
    try {
      const voiceChannel = message.member?.voice?.channel;

      if (!voiceChannel)
        return message.reply({
          content:
            "<a:no:871913506167980052> Debes estar en un canal de voz.",
        });

      if (
        message.guild.me.voice.channel &&
        voiceChannel.id !== message.guild.me.voice.channel.id
      )
        return message.reply({
          content:
            "<a:no:871913506167980052> Debes estar en el mismo canal de voz que yo.",
        });

      await client.distube.stop(message);
    } catch (err) {
      console.log(err);
      await message.channel.send({ content: err.message });
    }
  },
};
