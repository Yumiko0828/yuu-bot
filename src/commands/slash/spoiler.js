const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spoiler")
    .setDescription("📨 Envia un mensaje como spoiler.")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("El contenido del spoiler")
        .setRequired(true)
    ),
  async execute(client, int) {
    try {
      const spoiler = int.options.getString("content");

      let url = new URL("https://nekos.life/api/v2/spoiler");
      let params = { text: spoiler };
      url.search = new URLSearchParams(params).toString();

      if (!spoiler)
        return await int.channel.send({
          content: `<a:no:871913506167980052> Uso correcto: \`${client.config.prefix}${this.name} <mensaje>\``,
        });

      fetch(url)
        .then((res) => res.json())
        .then(async (data) => {
          const embed = new MessageEmbed()
            .setAuthor({
              name: int.user.username,
              iconURL: int.user.displayAvatarURL(),
            })
            .setTitle(`Spoiler: ${data.owo}`)
            .setColor(client.config.hexColor)
            .setTimestamp();

          await int.reply({
            embeds: [embed],
          });
        })
        .catch(async (err) => {
          console.log(err);
          await int.reply({ content: err.message, ephemeral: true });
        });
    } catch (err) {
      console.log(err);
      await int.reply({ content: err.message, ephemeral: true });
    }
  },
};
