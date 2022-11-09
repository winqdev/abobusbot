const { moderator } = require("../config.json");

module.exports = {
name: "ban",
async execute(client, message, args) {
  try {
      
  const member = message.mentions.members.first();

  /*if (!permission)
    return message.reply({ 
        contents: "❌ | Нет"
    }); */
   if(!moderator.includes(message.author.id)) return message.channel.send({ content: ":x: У вас нет достаточно прав для этой команды!"})

  if (!args[0]) return message.reply({ content: `❌ | Кого забанить?` });

  if (!member) return message.reply({ content: `💤 | Не могу найти этого чела...` } );

  if (member.id === message.author.id)
    return message.reply({ content: `❌ | Ты не можешь забанить самого себя!` });

  /*if (message.member.roles.highest.position < member.roles.highest.position)
    return message.reply({
      content: `❌ | `
    }); */

  if (!member.bannable) return message.reply({ content: `❌ | Не могу забанить чела`});

  return (
    (await member.ban()) +
    message
      .reply({
        content: `:anger: | Чпоньк! ГГ ВП ${member}`
      })
      .then((msg) => {
        setTimeout(() => msg.delete(), 20000);
      })
  );
    } catch(err) {
      message.reply({ content: `ОшибОЧКА ${err}` })
    }
}, };