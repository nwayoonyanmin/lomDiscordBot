const Discord = require('discord.js');
 const client = new Discord.Client();

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
 if (msg.content === 'ping') {
 msg.reply('stfu');
 }
 });

client.login('NzYwNDQ1MTc5NTc5OTkwMDc2.X3MJww.UDY7Qch1VcSsHU-3LQxz5PpW7Pg');