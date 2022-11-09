const { MessageEmbed } = require("discord.js")
const { moderator } = require("../config.json")

module.exports = {
    name: "decline",
    execute(client, message, args) {
        
        if(!moderator.includes(message.author.id)) return message.channel.send({ content: ":x: У вас нет достаточно прав для этой команды!"})
        
        if(!args[0]) {
            return message.channel.send({content: "ЭЭ, Где айди?"})
        }
        
        if(!args[1]) {
            return message.channel.send({content: "Причина отклонения?"})
        }
        
        let embed = new MessageEmbed()
        .setTitle("Вы были отклонены!")
        .setDescription(`Вы были отклонены!\n **Причина:** ${args.slice(1).join(" ")}\n **Отклонено модератором:** ${message.author.username}\n\n :warning: Если у вас возникли вопросы пишите мне(Winq#2179)`)
        .setColor("RED")
        .setFooter("Abobus Studio")
        client.users.cache.get(args[0]).send({embeds: [embed]});
        
        message.channel.send({content: ":white_check_mark: Отправлено!"})
    }
}