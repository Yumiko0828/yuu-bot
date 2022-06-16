const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("📨 Envia un mensaje a travéz de mi.")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("Contenido del mensaje.")
        .setRequired(true)
    ),

  async execute(client, int) {
    try {
      const txt = int.options.getString("content");
  
      await int.reply({ content: "<a:yuuVerify:978420003453943858> Mensaje enviado", ephemeral: true });
      await int.channel.send({ content: txt });
    } catch (err) {
      await int.reply({ content: err.message, ephemeral: true })
    }
  },
};