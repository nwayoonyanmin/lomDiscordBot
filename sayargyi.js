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
function botHelp()
{

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
    
    //message.channel.send(args[0]);

        switch (args[0]) {
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
                    time = '5s'; // 5s by default for testing REASON !!!.
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