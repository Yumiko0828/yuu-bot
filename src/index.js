const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
const config = require("./config/config");
const chalk = require("chalk");
module.exports = client;

// Initializations
console.clear();
console.log(chalk.yellow("⁘ » Cargando codigo..."));

// Global variables
client.commands = new Collection();
client.slashs = new Collection();
client.config = config;

// Handlers
require("./handler/index")(client);

// Client Login
client.login(client.config.token);
