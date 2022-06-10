const client = require("../index");

/* Interaction create */
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.slashs.get(interaction.commandName);

  if (!command)
    return interaction.reply({
      content: "Oops... parece que la interacción fue eliminada o no existe!",
      ephemeral: true,
    });

  try {
    await command.execute(client, interaction);
  } catch (err) {
    console.log(err);
    await interaction.reply({
      content: err.message,
      ephemeral: true,
    });
  }
});
