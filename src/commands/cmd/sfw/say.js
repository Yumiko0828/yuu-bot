module.exports = {
  name: "say",
  alias: ["echo"],
  async execute(client, message, args) {
    const txt = args.slice(0).join(" ");

    if (!txt)
      return await message.reply({
        content: `<a:no:871913506167980052> Uso correcto: \`${client.config.prefix}${this.name} <message>\``,
      });

    await message.delete();
    await message.channel.send(txt);
  },
};
