const { DisTube } = require("distube");
const { MessageEmbed } = require("discord.js");
const client = require("../index");

// Distube
const distube = new DisTube(client, {
  emitNewSongOnly: false,
});

client.distube = distube;

// Distube Events
distube

  // .on("playSong", (queue, song) => {
  //   let embed = new MessageEmbed()
  //     .setTitle("<a:animusic:989669794364137542> Yuu PlaySong")
  //     .addField(
  //       "Reproduciendo:",
  //       `❥ **${song.name}** (\`${song.formattedDuration}\`)`
  //     )
  //     .setTimestamp()
  //     .setColor(client.config.hexColor);

  //   queue.textChannel.send({ embeds: [embed] });
  // })

  .on("addSong", (queue, song) => {
    let embed = new MessageEmbed()
      .setTitle("<a:animusic:989669794364137542> Yuu Queue")
      .addField(
        "Agregado:",
        `❥ **${song.name}** (\`${song.formattedDuration}\`)`
      )
      .setTimestamp()
      .setColor(client.config.hexColor);

    queue.textChannel.send({
      embeds: [embed],
    });
  })
  .on("addList", (queue, playlist) => {
    let embed = new MessageEmbed()
      .setTitle("<a:animusic:989669794364137542> Yuu PlayList")
      .addField("Nombre:", `❥ **${playlist.name}**`)
      .addField("Canciones:", `❥ **${playlist.songs.length}** canciones`)
      .setTimestamp()
      .setColor(client.config.hexColor);

    queue.textChannel.send({
      embeds: [embed],
    });
  })
  .on("error", (textChannel, err) => {
    console.log(err);
    textChannel.send(`Error: ${err.message.slice(0, 2000)}`);
  })
  .on("finish", (queue) => {
    let embed = new MessageEmbed()
      .setTitle("<a:animusic:989669794364137542> Yuu Queue")
      .setDescription("La cola ha finalizado.")
      .setTimestamp()
      .setColor(client.config.hexColor);

    queue.textChannel?.send({ embeds: [embed] });
  })
  .on("disconnect", (queue) => {
    let embed = new MessageEmbed()
      .setTitle("<a:animusic:989669794364137542> Yuu Stop")
      .setDescription("El reproductor se detuvo y la cola se borró.")
      .setTimestamp()
      .setColor(client.config.hexColor);

    queue.textChannel?.send({ embeds: [embed] });
  })
  .on("empty", (queue) =>
    queue.textChannel?.send(
      "The voice channel is empty! Leaving the voice channel..."
    )
  );
