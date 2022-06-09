const path = require("path");
const chalk = require("chalk");
const fs = require("fs");


module.exports = async (client) => {

  console.log(chalk.yellow("⁘ » Cargando handlers..."))
  
  /*--------- Command handler ---------*/
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "../commands/cmd"))
    .filter((file) => file.endsWith(".js"));

    // commandFiles.map(x => {
    //   console.log("y!" + x.replace(".js", ""))
    // })

  for (const file of commandFiles) {
    const command = require(`../commands/cmd/${file}`);
    client.commands.set(command.name, command);
  }

  /*--------- slash handler ---------*/
  const slashFiles = fs
    .readdirSync(path.join(__dirname, "../commands/slash"))
    .filter((file) => file.endsWith(".js"));

  for (const file of slashFiles) {
    const command = require(`../commands/slash/${file}`);
    // console.log(command);
    client.slashs.set(command.data.name, command);
  }

  /*------------- Event handler -------------*/
  const eventFiles = fs
    .readdirSync(path.join(__dirname, "../events"))
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    require(`../events/${file}`);
  }

  console.log(chalk.green("✓ » Handler cargado!"))
  
};
