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
      let commands = {
        cmd: {
          sfw: "",
          nsfw: "",
        },
        slash: {
          sfw: "",
          nsfw: "",
        },
        total: 0,
      };

      /**
       * @param {string} folder
       * @param {string} subfolder
       * @param {string} prefix
       */
      function list(folder, subfolder, prefix = client.config.prefix) {
        const f = fs
          .readdirSync(path.join(__dirname, `../../${folder}/${subfolder}`))
          .filter((file) => file.endsWith(".js"));
        let l = "";
        // Map list
        f.map((x) => {
          let i = prefix + x.replace(".js", "");
          l += "❥ " + i + "\n";
        });
        return { list: l, length: f.length };
      }

      // Commands
      commands.cmd.sfw += list("cmd", "sfw").list;
      commands.cmd.nsfw += list("cmd", "nsfw").list;

      // Slash Commands
      commands.slash.sfw += list("slash", "sfw", "/").list;
      commands.slash.nsfw += list("slash", "nsfw", "/").list;

      // Total commands
      commands.total += list("cmd", "sfw").length;
      commands.total += list("cmd", "nsfw").length;
      commands.total += list("slash", "sfw").length;
      commands.total += list("slash", "nsfw").length;
      
      /* Row */
      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setPlaceholder("Selecciona una categoría")
          .setCustomId("yuriko_menu")
          .addOptions([
            {
              label: "Commands",
              description: `Comandos de prefijo (${client.config.prefix}).`,
              value: "cmds",
              emoji: "965758319446876201",
            },
            {
              label: "Slash Commands",
              description: "Comandos de barra diagonal (/).",
              value: "slashcmds",
              emoji: "965758319446876201",
            },
            {
              label: "Inicio",
              description: "Menu inicial.",
              value: "home",
              emoji: "965758319446876201",
            },
          ])
      );

      /*-------- Menu Embed --------*/
      const Menu = new MessageEmbed()
        .setTitle(`Comandos de ${client.user.username}`)
        .setDescription(
          `<a:exc:965758319446876201> **Nota**: Este menu solo lista los comandos actuales en tiempo real del bot. Si quieres una descripcion mas detallada de lo que hace y como usar cada comando, haga [click aqui](https://yuu-chan.ml/#commands)\n\nCategorías: \`2\` & Comandos: \`${commands.total}\``
        )
        .setThumbnail(client.user.avatarURL())
        .addField(
          "Categorías",
          "❥ Comandos de prefijo\n❥ Comandos de barra diagonal"
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
        .setDescription(
          "<a:exc:965758319446876201> **Nota**: Los comandos NSFW solo funcionan en canales que tenga activado el NSFW."
        )
        .setThumbnail(client.user.avatarURL())
        .addField(
          `Comandos SFW \`(${list("cmd", "sfw").length})\``,
          `${commands.cmd.sfw.toString()}`
        )
        .addField(
          `Comandos NSFW: \`(${list("cmd", "nsfw").length})\``,
          `${commands.cmd.nsfw.toString()}`
        )
        .setFooter({
          text: `${client.user.username}`,
          iconURL: client.user.avatarURL(),
        })
        .setTimestamp()
        .setColor(client.config.hexColor);

      /*-------- Slash Commands Embed --------*/
      const slashs = new MessageEmbed()
        .setTitle(`Comandos de ${client.user.username}`)
        .setDescription(
          "<a:exc:965758319446876201> **Nota**: Los comandos NSFW solo funcionan en canales que tenga activado el NSFW."
        )
        .setThumbnail(client.user.avatarURL())
        .addField(
          `Comandos SFW \`(${list("slash", "sfw").length})\``,
          `${commands.slash.sfw.toString()}`
        )
        .addField(
          `Comandos NSFW \`(${list("slash", "nsfw").length})\``,
          `${commands.slash.nsfw.toString()}`
        )
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
        }
        if (i.values[0] === "slashcmds") {
          await i.deferUpdate();
          i.editReply({ embeds: [slashs], components: [row] });
        }
        if (i.values[0] === "home") {
          await i.deferUpdate();
          i.editReply({ embeds: [Menu], components: [row] });
        }
      });
    } catch (err) {
      console.log(err);
      await message.channel.send({ content: err.message });
    }
  },
};
