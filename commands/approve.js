const { MessageEmbed } = require("discord.js")
const { moderator } = require("../config.json")

module.exports = {
    name: "approve",
    execute(client, message, args) {
        
        if(!moderator.includes(message.author.id)) return message.channel.send({ content: ":x: У вас нет достаточно прав для этой команды!"})
        
        if(!args[0]) {
            return message.channel.send({content: "ЭЭ, Где айди?"})
        }
        
        let embed = new MessageEmbed()
        .setTitle("Вы были приняты!")
        .setDescription(`Вы были приняты на работу с нами\n В скором вы получите особую роль в дискорд сервере!\n **Принято модератором:** ${message.author.username}\n\n :warning: Если у вас возникли вопросы пишите мне(Winq#2179)`)
        .setColor("GREEN")
        .setFooter("Abobus Studio")
        client.users.cache.get(args[0]).send({embeds: [embed]});
        
        message.channel.send({content: ":white_check_mark: Отправлено!"})
    }
}