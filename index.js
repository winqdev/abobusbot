//Definition of packages
//Main package
const discord = require("discord.js");
//File readers
const { readdirSync } = require("fs");
const { join } = require("path");
//Config files
const { TOKEN, PREFIX, logschannel, wlcchannel } = require("./config.json");
const config = require("./config.json");
//Database
const mongoose = require("mongoose");
//Bot
const intents = new discord.Intents(32767);
const client = new discord.Client({ intents, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
//Utils
const { MessageEmbed } = require("discord.js");
//Bad words Russian
let blacklist = ["nigger", "нига", "нигга", "пидор", "пидорас", "кунт", "нага", "даун", "дебил", "аутист", "хохол"]
let antilinks = ["discord.gg", "http://discord.gg", "https://discord.gg", "discord.com", "http://discord.com", "https://discord.com"]
//Databse linking
mongoose.connect(config.dblink,
    err => {
        if(err) throw err;
        console.log('Database connected!')
    });

//On ready event
client.on("ready", async () => {
  console.log("Bot is ready!");
  client.user.setActivity(
    `ну типо абоба`,
    { type: "PLAYING" }
  );
    client.user.setStatus("idle");
});
//On warn/errors event
client.on("warn", info => console.log(info));
client.on("error", console.error);

//Collections and maps
client.commands = new discord.Collection();
client.prefix = PREFIX;

//Loading files thru FS package
const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file =>
  file.endsWith(".js")
);
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file));
  client.commands.set(command.name, command);
}

//On message event
client.on("message", message => {
    //Censore
    /*
    if (blacklist.some(word => message.toString().toLowerCase().includes(word))) {message.delete().catch(e => console.error("Не могу удалть матное сообщение!")); message.channel.send({content: `${message.author.tag} Пожалуйста не материтесь!`})};
    */
    
    let embed = new discord.MessageEmbed()
    .setTitle("Анти-ссылки включены!")
    .setDescription(`Хей! ${message.author.tag}! \nХватит отправлять ссылки!`)
    .setColor("RED")
    
    if (antilinks.some(word => message.toString().toLowerCase().includes(word))) {message.delete().catch(e => console.error("Can't delete message!")); message.channel.send({embeds: [embed]})};
    
  if (message.author.bot) return;
  if (!message.guild) return;
    
  if (message.content.startsWith(PREFIX)) {

    const args = message.content
      .slice(PREFIX.length)
      .trim()
      .split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) {
      return;
    }

    try {
      client.commands.get(command).execute(client, message, args);
      
    } catch (err) {
      //On error print output
      console.log(err);
    }
  }
});
client.login(TOKEN);
