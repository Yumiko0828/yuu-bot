const { Client, MessageEmbed } = require("discord.js");
const { inspect } = require("util");

module.exports = {
  name: "eval",
  alias: ["e"],

  execute(client, message, args) {
    if (message.author.id !== "752918867273187378")
      return message.reply({
        content: "<a:no:871913506167980052> No tienes acceso a este comando.",
      });

    let command = args.join(" ");
    if (!command)
      return message.reply({
        content: "<a:no:871913506167980052> Debes escribir un comando!",
      });

    try {
      const evaled = eval(command);
      let palabras = ["token", "destroy"];

      if (
        palabras.some((word) => message.content.toLowerCase().includes(word))
      ) {
        return message.channel.send(
          "<a:no:871913506167980052> Esas palabras no estan permitidas!"
        );
      }

      const embed = new MessageEmbed()
        .setColor(client.config.hexColor)
        .setTitle("Evaluado correctamente!")
        .addField(`**Tipo**:`, `\`\`\`prolog\n${typeof evaled}\`\`\``, true)
        .addField(
          "**Evaluado en:**",
          `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\`\`\``,
          true
        )
        .addField(`**Entrada**`, `\`\`\`js\n${command}\`\`\``)
        .addField(
          `**Salida**`,
          `\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``
        );

      message.reply({ embeds: [embed] });
    } catch (err) {
      const embedfallo = new MessageEmbed()

        .setColor("RED")
        .addField(`Entrada`, `\`\`\`js\n${command}\`\`\``)
        .addField(`Error`, `\`\`\`js\n${err}\`\`\``);

      message.reply({ embeds: [embedfallo] });
    }
  },
};
