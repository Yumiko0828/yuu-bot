module.exports = {
  name: "say",
  alias: ["echo"],
  execute(client, message, args) {
    message.delete();

    const txt = args.slice(0).join(" ");

    if (!txt)
      return message.reply({
        content: "<a:no:871913506167980052> tienes que escribir un mensaje!",
      });

    message.channel.send(txt);
  },
};
