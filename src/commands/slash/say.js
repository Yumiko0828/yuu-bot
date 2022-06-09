const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("📨Envia un mensaje a travéz de mi.")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("Contenido del mensaje.")
        .setRequired(true)
    ),

  execute(client, int) {
    const txt = int.options.getString("content");

    int.reply({ content: "<a:yuuVerify:978420003453943858> Mensaje enviado", ephemeral: true });
    int.channel.send({ content: txt });
  },
};