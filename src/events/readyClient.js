const { MessageEmbed } = require("discord.js");
const client = require("../index");
const chalk = require("chalk");

/*-------- Event ready --------*/
client.on("ready", () => {
  console.log(chalk.green(`✓ » ${client.user.username} ready!`));
  
  /*-------- Set Presence --------*/
  async function $presence() {
    const status = [
      {
        type: "PLAYING",
        content: `${client.config.prefix}help - v${client.config.version}`,
      },
      {
        type: "LISTENING",
        content: `${client.guilds.cache.size} ${
          client.guilds.cache.size > 1 ? "servidores" : "servidor"
        }`,
      },
      {
        type: "WATCHING",
        content: `${client.users.cache.size} ${
          client.users.cache.size > 1 ? "usuarios" : "usuario"
        }`,
      },
    ];

    const option = Math.floor(Math.random() * status.length);
    client.user.setPresence({
      activities: [
        {
          name: status[option].content,
          type: status[option].type,
        },
      ],
      status: "idle",
    });
  }
  setInterval($presence, 8 * 1000);
  $presence();
});
