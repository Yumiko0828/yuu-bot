const { version } = require("../../package.json");
require("dotenv").config();

module.exports = {
  token: process.env.TOKEN, // Token de Yuu Kyomi
  devToken: process.env.DEV_TOKEN, // DevToken para pruebas en otro bot
  guildId: "871907014098448415", // ID del servidor de Yuu Kyomi
  clientId: "893926216892047430", // ID del cliente Yuu Kyomi
  devClientId: "895455347031015485", // ID del cliente DevBot
  hexColor: "#C3A9D1", // Color global de Yuu Kyomi
  prefix: "y!", // Prefix de Yuu Kyomi
  version, // Versión de Yuu Kyomi
};
