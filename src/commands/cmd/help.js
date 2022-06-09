const {
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
} = require("discord.js");
const path = require("node:path");
const fs = require("node:fs");

module.exports = {
  name: "help",
  alias: [],

  async execute(client, message, args) {
    try {
      let cmdList = "";
      let cmdFiles = fs
        .readdirSync(path.join(__dirname, "./"))
        .filter((file) => file.endsWith(".js"));
      let slashList = "";
      let slashFiles = fs
        .readdirSync(path.join(__dirname, "../slash"))
        .filter((file) => file.endsWith(".js"));

      cmdFiles.map((x) => {
        let i = client.config.prefix + x.replace(".js", "");
        cmdList += "❥ " + i + "\n";
      });

      slashFiles.map((x) => {
        let i = "/" + x.replace(".js", "");
        slashList += "❥ " + i + "\n";
      });

      /* Row */
      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setPlaceholder("Selecciona una categoría")
          .setCustomId("yuriko_menu")
          .setMaxValues(2)
          .addOptions([
            {
              label: "Commands",
              description: "Comandos (y!).",
              value: "cmds",
              emoji: "965758319446876201",
            },
            {
              label: "Slash Commands",
              description: "Comandos de barra diagonal (/).",
              value: "slashcmds",
              emoji: "965758319446876201",
            },
          ])
      );

      /*-------- Menu Embed --------*/
      const Menu = new MessageEmbed()
        .setTitle(`Comandos de ${client.user.username}`)
        .setDescription(`Categorías: \`2\` & Comandos: \`10\``)
        .setThumbnail(client.user.avatarURL())
        .addField(
          "Categorías",
          "❥ Comandos normales\n❥ Comandos de barra diagonal"
        )
        .setFooter({
          text: `${client.user.username}`,
          iconURL: client.user.avatarURL(),
        })
        .setTimestamp()
        .setColor(client.config.hexColor);

      const mensaje = await message.channel.send({
        embeds: [Menu],
        components: [row],
      });

      /*-------- Filter --------*/
      const filter = (i) => i.user.id === message.author.id;

      const collector = mensaje.createMessageComponentCollector({
        filter: filter,
        time: 1800000,
      });

      /*-------- Commands Embed --------*/
      const cmds = new MessageEmbed()
        .setTitle(`Comandos de ${client.user.username}`)
        .setDescription("Comandos normales `(y!)`")
        .setThumbnail(client.user.avatarURL())
        .addField("Comandos:", `${cmdList.toString()}`)
        .setFooter({
          text: `${client.user.username}`,
          iconURL: client.user.avatarURL(),
        })
        .setTimestamp()
        .setColor(client.config.hexColor);

      /*-------- Slash Commands Embed --------*/
      const slashs = new MessageEmbed()
        .setTitle(`Comandos de ${client.user.username}`)
        .setDescription("Comandos de barra diagonal `(/)`")
        .setThumbnail(client.user.avatarURL())
        .addField("Comandos:", `${slashList.toString()}`)
        .setFooter({
          text: `${client.user.username}`,
          iconURL: client.user.avatarURL(),
        })
        .setTimestamp()
        .setColor(client.config.hexColor);

      /*-------- Collection --------*/
      collector.on("collect", async (i) => {
        if (i.values[0] === "cmds") {
          await i.deferUpdate();
          i.editReply({ embeds: [cmds], components: [row] });
        } else if (i.values[0] === "slashcmds") {
          await i.deferUpdate();
          i.editReply({ embeds: [slashs], components: [row] });
        }
      });
    } catch (err) {
      console.log(err);
      await message.channel.send({ content: err.message });
    }
  },
};