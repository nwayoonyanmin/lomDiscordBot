#! node
const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require("ms");
const fs = require('fs');
const ytdl = require('ytdl-core');

const token = 's9sp3ECql4fD6mDZwglGyJw1-8J.wwJM3X.2cDMwkTO5cTN5cTM1QDNwYzN';
const revtoken = token.split("").reverse().join("");
const PREFIX = '';

function getStr()
{   
    return "something";
}
function music(client,youtubelink)
{
    const streamOptions = { seek: 0, volume: 1 };
    //var voiceChannel = message.member.voiceChannel;
    var voiceChannel = client.channels.cache.find(channel => channel.id==='612983532327010314');
            voiceChannel.join().then(connection => {
            console.log("joined channel");
            const stream = ytdl(youtubelink, { filter : 'audioonly' });
            const dispatcher = connection.play(stream, streamOptions);
            dispatcher.on("end", end => {
                console.log("left channel");
                voiceChannel.leave();
            });
        }).catch(err => console.log(err));
}
function un_mute()
{

}
function sayarroll( min, max) {  
    if (!max) {max = min ; min= 1;}
    console.log(min,max);
    return Math.round(
      Math.random() * (max - min) + min 
    )
  }
function lomdice(dicecount)
{
    var dices = [dicecount];
    for(dice in dices)
    {
        dice = Math.round(Math.random()*6);
        //message.channel.send(dice);
        console.log(dice);
    }
    
    //message.channel.send();
}
function joinVCtest(client)
{
    console.log('channel called!!');
    //const channel = client.channels.join("612983532327010314");
    const channel = client.channels.cache.find(channel => channel.id==='612983532327010314');
    if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
      // Yay, it worked!
      console.log("Successfully connected.");
    }).catch(e => {
      // Oh no, it errored! Let's log it to console :)
      console.error(e);
    });
}
function getArgs( str, keyword) {
    
    var n = str.indexOf(keyword);
    if(n==-1)return -1;
    var m = str.slice(n+2).search("-");
    if(m==-1){
        return str.slice(n+2,str.length).trim();
    }
    return str.slice(n+2,n+m+1).trim();
    }
bot.on('ready', () => {
    console.log('This bot is active!');
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    let fullmsg = message.content.substring();
    let cmdKey = args[0].toLowerCase();
    
    //message.channel.send(args[0]);

        switch (cmdKey) {
            case 'ဖွင့်':
            case 'phwint':
            case 'sayarmusic' :
                music(message.client,args[1]);
                return;
            case 'joinvc':
                joinVCtest(message.client);
                return;
            case 'မင်းဆရာဘယ်သူလဲ':
                message.channel.send('ဆရာ စင်ရော် ပါခင်ဗျ။');
                return;
            case 'sayarroll':
            case 'roll':
            case '/roll':
                message.channel.send(sayarroll(Number(args[1]),Number(args[2])));
                return;
            case 'lomdice':
                lomdice(Number(args[1]));
                return;
	    case 'ငါ့ကိုချစ်လား':
		message.channel.send("ဟင့်အင်း")
		return;
            case 'tatesan':
            case 'တိတ်စမ်း':
            case 'mutemute':

                if(args.length < 2){return message.reply('ငါကဘယ်ကောင့်ကို Mute ရမှာလဲဟ');}

                var person  = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]));

                if(!person) return  message.reply(  args[1] + " ဆိုတဲ့ကောင်မရှိဘူးဟ ") 
                
                console.log('user found!!');

                let mainrole = message.guild.roles.cache.find(role => role.name === "newcomer");
                let role = message.guild.roles.cache.find(role => role.name === "Laung-Kee");
            
                if(!role) return message.reply("Couldn't find the mute role.")
                console.log('role found!!');

                //let time = args[2];
                let time = getArgs(fullmsg,"-t");
                if(time==-1){
                    time = '1m'; // 5s by default for testing REASON !!!.
                }
                console.log('timer OK!!' + time);
                //let desc = args[3];
                let desc = getArgs(fullmsg,"-r");
                if(desc==-1){
                    desc = 'ဘလိုင်းကြီး Laung-Kee';
                }
                console.log('reasons OK!!' + desc);

                try {
                    if(person.voice.channel.id==null){return;}
                } catch (err) {
                    message.channel.send('user not connected!!');
                    console.log(err.message);
                    return;
                }
                

                try {
                    message.channel.send(`<@${person.user.id}> ကို ${ms(ms(time))} ပါးစပ်ပိတ်ခိုင်းထားတယ် , ${desc}`)
                } catch (err) {
                    console.log('error converting time!!');
                    message.channel.send("Time format မှားနေတယ်");
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
                //un_mute(message,person,role);
                
                try {
                    setTimeout(function(){

                        person.voice.setMute(false);
                        person.roles.remove(role.id);
                        message.channel.send(`<@${person.user.id}> စကားပြန်ပြောလို့ရ ပြီ.`)

                    }, ms(time));
                } catch (err) {
                    console.log('error reassigning roles!!');
                    return;
                }      
            break;
        }
});

            
                        
bot.login(revtoken);
