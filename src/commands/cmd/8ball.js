const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "8ball",
  alias: [],
  execute(client, message, args) {
    const question = args.slice(0).join(" ");

    let respuestas = [
      "En mi opinion, si",
      "Es cierto",
      "Es decididamente asi",
      "Probablemente",
      "Buen pronostico",
      "Todo apunta a que si",
      "Sin duda",
      "Si",
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
        name: `${message.author.username} me pregunto...?`,
        iconURL: message.author.displayAvatarURL(),
      })
      .addField("Pregunta:", `» **${question}**`)
      .addField("Respuesta:", `» **${res}**`)
      .setFooter({ text: "🎱8ball" })
      .setTimestamp()
      .setColor(client.config.hexColor);

    message.reply({ embeds: [bal] });
  },
};
