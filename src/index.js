const { Client, Intents, Collection } = require("discord.js");
const intents = new Intents(32767);
const client = new Client({ intents });
const config = require("./config/config");
const chalk = require("chalk");
module.exports = client;

/* Initializations */
console.clear();
console.log(chalk.yellow("⁘ » Cargando codigo..."))

/*-------- Global variables --------*/
client.commands = new Collection();
client.slashs = new Collection();
client.config = config;

/*-------- Handlers --------*/
require("./handler/index")(client);

/*-------- Client Login --------*/
client.login(client.config.token);
