module.exports = {
  name: "play",
  alias: [],
  async execute(client, message, args) {
    try {
      const voiceChannel = message.member?.voice?.channel;
      const music = args.slice(0).join(" ");

      if (!voiceChannel)
        return message.reply({
          content: "<a:no:871913506167980052> Debes estar en un canal de voz.",
        });

      if (!music)
        return message.reply({
          content: `<a:no:871913506167980052> Uso correcto: \`${client.config.prefix}${this.name} <canción>\``,
        });

      const msg = await message.channel.send({
        content: "<a:loading:871913621284855818> Cargando...",
      });
      await client.distube.play(voiceChannel, music, {
        message,
        textChannel: message.channel,
        member: message.member,
      });
      await msg.delete();
    } catch (err) {
      console.log(err);
      await message.channel.send({ content: err.message });
    }
  },
};
