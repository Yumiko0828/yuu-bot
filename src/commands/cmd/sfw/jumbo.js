const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "jumbo",
  alias: ["emoji"],

  async execute(client, message, args) {
    if (!args[0])
      return message.channel.send(
        `<a:no:871913506167980052> Uso correcto: \`${client.config.prefix}${this.name} :emoji:\``
      );

    let emoji = message.guild.emojis.cache.find(
      (x) => x.name === args[0].split(":")[1]
    );
    if (!emoji)
      return message.channel.send(
        "<a:no:871913506167980052> Ese no es un emoji valido, tiene que ser de este servidor!"
      );

    const embed = new MessageEmbed()
      .setImage(emoji.url)
      .setColor(client.config.hexColor);

    await message.reply({ embeds: [embed] });
    await message.delete();
  },
};
