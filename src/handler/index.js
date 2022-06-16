const path = require("node:path");
const chalk = require("chalk");
const fs = require("node:fs");

module.exports = async (client) => {
  console.log(chalk.yellow("⁘ » Cargando handlers..."));

  /*--------- Command handler ---------*/
  const commandFiles = fs.readdirSync(path.join(__dirname, "../commands/cmd"));

  for (const folders of commandFiles) {
    const folder = fs
      .readdirSync(path.join(__dirname, `../commands/cmd/${folders}`))
      .filter((file) => file.endsWith(".js"));
    for (const file of folder) {
      const command = require(`../commands/cmd/${folders}/${file}`);
      client.commands.set(command.name, command);
    }
  }

  /*--------- slash handler ---------*/
  const slashFiles = fs.readdirSync(path.join(__dirname, "../commands/slash"));

  for (const folders of slashFiles) {
    const folder = fs
      .readdirSync(path.join(__dirname, `../commands/slash/${folders}`))
      .filter((file) => file.endsWith(".js"));
    for (const file of folder) {
      const command = require(`../commands/slash/${folders}/${file}`);
      client.slashs.set(command.data.name, command);
    }
  }

  /*------------- Event handler -------------*/
  const eventFiles = fs
    .readdirSync(path.join(__dirname, "../events"))
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    require(`../events/${file}`);
  }

  console.log(chalk.green("✓ » Handler cargado!"));
};
