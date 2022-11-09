const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
    name: "myanketa",
    async execute(client, message, args) {
        
        require('../models/anketa')
const anketaModel = mongoose.model('anketa')

const anketaData = await anketaModel.findOne({ discord: `${message.author.tag}` })

if(anketaData) {
     let embed = new MessageEmbed()
        .setTitle("Ваша анкета")
        .setDescription(`**Ваше имя в анкете:** ${anketaData.username}\n **Ваш возраст в анкете:** ${anketaData.age}\n **Вашы знания в анкете:**: ${anketaData.skills}\n **Ваша страна в анкете:** ${anketaData.region}`)
       .setColor("GREEN")
       .setFooter("Winq | Beta Release")
        
  message.channel.send({embeds: [embed]})
} else {
    return message.channel.send({content: ":x: | Я не смог найти вашу анкету, или вы прописали неверную информацию в анкете!"})
}   
    }
}