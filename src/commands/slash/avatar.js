const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("📷Muestra el avatar del usuario proporcionado.")
    .addUserOption((option) =>
      option.setName("user").setDescription("Usuario.")
    ),
  async execute(client, int) {
    const user = int.options.getUser("user") || int.user;

    const avatar = new MessageEmbed()
      .setTitle(`<a:yuuVerify:978420003453943858> Avatar de: ${user.username}`)
      .setDescription(
        `[<a:arrow:893696023493488691>Descargar avatar](${user.displayAvatarURL(
          {
            dynamic: true,
            size: 1024,
          }
        )})`
      )
      .setColor(client.config.hexColor)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setURL(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setFooter({
        text: `Solicitado por ${int.user.username}`,
        iconURL: int.user.displayAvatarURL(),
      });

    await int.reply({ embeds: [avatar] });
  },
};
