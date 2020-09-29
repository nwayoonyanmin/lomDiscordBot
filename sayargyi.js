const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require("ms");


const token = '';

const PREFIX = '';


bot.on('ready', () => {
    console.log('This bot is active!');
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    //message.channel.send(args[0]);

    switch (args[0]) {
        case 'tatesan':
        case 'တိတ်စမ်း':
        case 'mutemute':
            //return message.reply("This command excuted");
            //message.channel.send(args[0]);
            var person  = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));
            if(!person) return  message.reply(  args[1] + " ဆိုတဲ့ကောင်မရှိဘူးဟ ") 
            
            //message.channel.send(args[1]);

            let mainrole = message.guild.roles.cache.find(role => role.name === "newcomer");
            let role = message.guild.roles.cache.find(role => role.name === "Laung-Kee");
           

            if(!role) return message.reply("Couldn't find the mute role.")


            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time!");
            }

            let desc = args[3];
            if(!desc){
                return message.reply("tell him why is he a Laung Kee")
            }

            //message.channel.send(role.id);
            
            //person.roles.remove(mainrole.id);
            person.roles.add(role.id);
            person.voice.setMute(true);

            message.channel.send(`<@${person.user.id}> ကို ${ms(ms(time))} ပါးစပ်ပိတ်ခိုင်းထားတယ် , ${desc}`)

            setTimeout(function(){
            
                //person.roles.add(mainrole.id);
                person.voice.setMute(false);
                person.roles.remove(role.id);
                console.log(role.id)
                message.channel.send(`<@${person.user.id}> စကားပြန်ပြောလို့ရ ပြီ.`)
            }, ms(time));

    
        break;
    }


});

            
                        
bot.login(token);