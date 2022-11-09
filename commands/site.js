const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "site",
    async execute(client, message, args) {
        
        let data = null;
await axios.get("http://anketa.abobus.ga").then(() => data = true).catch((err)=>{console.log(err.response)})

 if(!data) {
   let embed = new MessageEmbed()
   .setTitle("Статус сайта")
   .setDescription("[Анкета](http://anketa.abobus.ga): :red_circle: Оффлайн")
   .setColor("RED")
   .setFooter("Winq | Beta Release")
   
   message.channel.send({embeds: [embed]})
 } else {
   let embedv = new MessageEmbed()
   .setTitle("Статус сайта")
   .setDescription("[Анкета](http://anketa.abobus.ga): :green_circle: Онлайн")
   .setColor("GREEN")
   .setFooter("Winq | Beta Release")
   
   message.channel.send({embeds: [embedv]})
 }
        
    }
}