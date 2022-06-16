module.exports = {
  name: "clear",
  alias: ["cls"],

  async execute(client, message, args) {
    try {
      let cantidad = args[0];

      if (!cantidad)
        return await message.reply(
          `<a:no:871913506167980052> Uso correcto: \`${client.config.prefix}${this.name} <cantidad>\``
        );

      if (isNaN(cantidad))
        return await message.reply(
          "<a:no:871913506167980052> La cantidad debe ser un **número**!"
        );

      if (cantidad <= 0)
        return await message.reply(
          `<a:no:871913506167980052> La cantidad \`${cantidad}\` no es valida, debe ser mayor a **0**!`
        );

      await message.delete();
      await message.channel.bulkDelete(cantidad);
      await message.channel.send(
        `<a:yuuVerify:978420003453943858> **${cantidad}** ${
          cantidad > 1 ? "mensajes eliminados" : "mensaje eliminado"
        } correctamente 🧹`
      );
    } catch (err) {
      await message.channel.send(err.message);
    }
  },
};
