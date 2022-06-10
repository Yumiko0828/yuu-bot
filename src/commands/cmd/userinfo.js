const { MessageEmbed } = require("discord.js");
const { format1, format2 } = require("../../utils/format");

module.exports = {
  name: "userinfo",
  alias: ["uinfo"],

  async execute(client, message, args) {
    try {
      let estados = {
        online: "🟢En linea",
        idle: "🌙Ausente",
        dnd: "⛔No molestar",
        undefined: "⚪Desconectado/invisible",
      };

      const member = message.mentions.members.first() || message.member;

      const embedinfo = new MessageEmbed()
        .setColor(client.config.hexColor)
        .setDescription(`📚 | Informacion de **${member}**`)
        .addField("👤 | Nombre:", member.user.tag)
        .addField("🆔️ | Id:", ` ${member.user.id}`)
        .addField(
          "👌🏻 | Apodo:",
          `${member.nickname !== null ? `${member.nickname}` : "Ninguno"}`
        )
        .addField(
          "📆 | Union al servidor:",
          `${format2(member.joinedAt)}, a las ${format1(member.joinedAt)}`
        )
        .addField(
          "⏰ | Creacion de la cuenta:",
          `${format2(member.user.createdAt)}, a las ${format1(
            member.user.createdAt
          )}`
        )
        .addField(
          "💠 | Roles:",
          member.roles.cache.map((roles) => `\`${roles.name}\``).join(".")
        )
        .addField(
          "🚀 | Booster:",
          member.premiumSince ? "Si boostea" : "No boostea"
        )
        .addField("♻️ | Estado:", estados[member.presence?.status])
        .setThumbnail(
          member.user.displayAvatarURL({ format: "png", dynamic: "true" })
        );

      await message.reply({ embeds: [embedinfo] });
    } catch (err) {
      console.log(err);
      await message.channel.send({ content: err.message });
    }
  },
};
