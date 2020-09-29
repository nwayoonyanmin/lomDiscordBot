const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require("ms");


const token = 's9sp3ECql4fD6mDZwglGyJw1-8J.wwJM3X.2cDMwkTO5cTN5cTM1QDNwYzN';
const revtoken = token.split("").reverse().join("");
const PREFIX = '';

function getStr()
{   
    return "something";
}

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
                if(args.length < 2){return message.reply('ငါကဘယ်ကောင့်ကို Mute ရမှာလဲဟ');}
                
                var person  = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));

                /*if(message.member.roles.find()
                {
                    console.log('found!')
                }
                return;*/

                if(!person) return  message.reply(  args[1] + " ဆိုတဲ့ကောင်မရှိဘူးဟ ") 
                
                console.log('user found!!');
                //message.channel.send(args[1]);

                let mainrole = message.guild.roles.cache.find(role => role.name === "newcomer");
                let role = message.guild.roles.cache.find(role => role.name === "Laung-Kee");
            

                if(!role) return message.reply("Couldn't find the mute role.")
                console.log('role found!!');

                let time = args[2];
                if(!time){
                    //return message.reply("You didnt specify a time!");
                    time = '5s'; // 5s by default for testing REASON !!!.
                }
                console.log('timer OK!!');
                let desc = args[3];
                if(!desc){
                    //return message.reply("tell him why is he a Laung Kee")
                    desc = 'ဘလိုင်းကြီး Laung-Kee';
                }
                console.log('reasons OK!!');

                //------- EXTER FUNCTION TESTED AND IT'S WORKED ---------
                //console.log(getStr());
                //message.channel.send(role.id);
                
                //person.roles.remove(mainrole.id);
                //console.log(person.voice.channel);
                try {
                    if(person.voice.channel.id==null){return;}
                } catch (err) {
                    message.channel.send('user not connected!!');
                    console.log(err.message);
                    return;
                }
                
                try{
                    person.roles.add(role.id);
                    console.log('adding role done!!')
                    person.voice.setMute(true);
                    console.log('muted!!')
                }catch(err)
                {
                    console.log('error giving roles!!');
                    return;
                }
                
                try {
                    message.channel.send(`<@${person.user.id}> ကို ${ms(ms(time))} ပါးစပ်ပိတ်ခိုင်းထားတယ် , ${desc}`)
                } catch (err) {
                    console.log('error converting time!!');
                    return;
                }
                
                try {
                    setTimeout(function(){
                
                        //person.roles.add(mainrole.id);
                        person.voice.setMute(false);
                        person.roles.remove(role.id);
                        console.log(role.id)
                        message.channel.send(`<@${person.user.id}> စကားပြန်ပြောလို့ရ ပြီ.`)
                        //console.log(getStr());
                    }, ms(time));
                } catch (err) {
                    console.log('error reassigning roles!!');
                    return;
                }


        
            break;
        }



});

            
                        
bot.login(revtoken);