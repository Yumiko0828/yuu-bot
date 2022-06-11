const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("🎱 Pregunta a la bola mágica.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("La pregunta que quieres hacer.")
        .setRequired(true)
    ),

  async execute(client, int) {
    const question = int.options.getString("question");

    let respuestas = [
      "En mi opinion, si",
      "Es cierto",
      "Es decididamente asi",
      "Probablemente",
      "Buen pronostico",
      "Todo apunta a que si",
      "Sin duda",
      "Si",
      "no",
      "Osea si pero no",
      "Si - definitivamente",
      "Debes confiar en ello",
      "Respuesta vaga, vuelve a intentarlo",
      "Pregunta en otro momento",
      "Sera mejor que no te lo diga ahora",
      "No puedo predecirlo ahora",
      "Concentrate y vuelve a preguntar",
      "Puede ser",
      "No cuentes con ello",
      "Mi respuesta es no",
      "Mis fuentes me dicen que no",
      "Las perspectivas no son buenas",
      "Muy dudoso",
      "En mi opinion, si",
      "No se",
      "Creo que ya sabes la respuesta",
      "Quizas",
      "Puede ser pa",
      "Todo apunta a que si",
      "Sin duda alguna",
      "Definitivamente si",
      "Definitivamente no",
      "Lo dudas?",
      "Claro",
      "No se que decirte",
      "Pregunta de nuevo mi cerebro esta fallando XD",
      "No cuentes con eso",
      "Estoy seguro que no",
      "Obviamente no",
      "Las dos clases",
      "Obviamente",
    ];

    const res = respuestas[Math.floor(Math.random() * respuestas.length)];

    const bal = new MessageEmbed()
      .setAuthor({
        name: `${int.user.username} me pregunto...?`,
        iconURL: int.user.displayAvatarURL(),
      })
      .addField("Pregunta:", `» **${question}**`)
      .addField("Respuesta:", `» **${res}**`)
      .setFooter({ text: "🎱8ball" })
      .setTimestamp()
      .setColor(client.config.hexColor);

    int.reply({ embeds: [bal] });
  },
};
