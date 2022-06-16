const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { format } = require("yutil.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("📄 Muestra la información del usuario.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("El usuario del cual quieres la información")
        .setRequired(true)
    ),
  async execute(client, int) {
    try {
      let estados = {
        online: "🟢 En linea",
        idle: "🌙 Ausente",
        dnd: "⛔ No molestar",
        undefined: "⚪ Desconectado/invisible",
      };

      let member = int.options.getUser("user");

      member.joinedAt = int.guild.members.cache.get(member.id).joinedAt;
      member.roles = int.guild.members.cache.get(member.id).roles;
      member.nickname = int.guild.members.cache.get(member.id).nickname;

      const embedinfo = new MessageEmbed()
        .setColor(client.config.hexColor)
        .setDescription(`📚 | Informacion de **${member}**`)
        .addField("👤 | Nombre:", `${member.tag}`)
        .addField("🆔️ | Id:", ` ${member.id}`)
        .addField(
          "👌🏻 | Apodo:",
          `${member.nickname !== null ? `${member.nickname}` : "Ninguno"}`
        )
        .addField(
          "📆 | Union al servidor:",
          `${format(member.joinedAt).date}, a las ${format(member.joinedAt).hour}`
        )
        .addField(
          "⏰ | Creacion de la cuenta:",
          `${format(member.createdAt).date}, a las ${format(member.createdAt).hour}`
        )
        .addField(
          "💠 | Roles:",
          member.roles.cache.map((roles) => `\`${roles.name}\``).join(".")
        )
        .addField(
          "<a:booster:876883993293910026> | Booster:",
          member.premiumSince ? "Si boostea" : "No boostea"
        )
        .addField("♻️ | Estado:", estados[member.presence?.status])
        .setThumbnail(
          member.displayAvatarURL({ format: "png", dynamic: "true" })
        );

      await int.reply({ embeds: [embedinfo] });
    } catch (err) {
      console.log(err);
      await int.reply({ content: err.message, ephemeral: true });
    }
  },
};
