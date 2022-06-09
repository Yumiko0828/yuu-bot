const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "jumbo",
  alias: ["emoji"],

  execute(client, message, args) {
    if (!args[0])
      return message.channel.send(
        "<a:no:871913506167980052> Debes mencionar un emoji."
      );

    let emoji = message.guild.emojis.cache.find(
      (x) => x.name === args[0].split(":")[1]
    );
    if (!emoji)
      return message.channel.send(
        "<a:no:871913506167980052> Ese no es un emoji valido."
      );

    const embed = new MessageEmbed()
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL(),
      })
      .setImage(emoji.url)
      .setColor(client.config.hexColor);

    message.channel.send({ embeds: [embed] });

    message.delete();
  },
};
