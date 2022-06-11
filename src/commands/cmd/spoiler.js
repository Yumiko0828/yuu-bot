const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "spoiler",
  alias: [],
  async execute(client, message, args) {
    try {
      const spoiler = args.slice(0).join(" ");

      let url = new URL("https://nekos.life/api/v2/spoiler");
      let params = { text: spoiler };
      url.search = new URLSearchParams(params).toString();

      await message.delete();

      if (!spoiler)
        return await message.channel.send({
          content: `<a:no:871913506167980052> Uso correcto: \`${client.config.prefix}${this.name} <mensaje>\``,
        });

      fetch(url)
        .then((res) => res.json())
        .then(async (data) => {
          const embed = new MessageEmbed()
            .setAuthor({
              name: message.author.username,
              iconURL: message.author.displayAvatarURL(),
            })
            .setTitle(`Spoiler: ${data.owo}`)
            .setColor(client.config.hexColor)
            .setTimestamp();

          await message.channel.send({
            embeds: [embed],
          });
        })
        .catch(async (err) => {
          console.log(err);
          await message.channel.send({ content: err.message });
        });
    } catch (err) {
      console.log(err);
      await message.channel.send({ content: err.message });
    }
  },
};
