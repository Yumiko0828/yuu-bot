const { version } = require("../../package.json");
require("dotenv").config();

module.exports = {
  token: process.env.TOKEN, // Token de Yuu Kyomi
  guildId: "871907014098448415", // ID del servidor de Yuu Kyomi
  clientId: "893926216892047430", // ID del cliente Yuu Kyomi
  hexColor: "#C3A9D1", // Color global de Yuu Kyomi
  prefix: "y!", // Prefix de Yuu Kyomi
  version, // Versión de Yuu Kyomi
};
