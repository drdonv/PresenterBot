const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', message => {
  taggedUsername = null;
  if (message.author.id == YOUR_DISCORD_ID) {                                       //paste your discord ID. Allows only you to initiate muting/unmuting. 
    if (message.content.startsWith(`${config.prefix}mute`)) {
      if (message.member.voice.channel) {
        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
          member.voice.setMute(true);
          if (member.user == message.mentions.users.first()){
            taggedUsername = message.mentions.users.first();
            member.voice.setMute(false);
          }
        }
      message.channel.send(`All members except <@${taggedUsername.id}> muted!`)
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
    if (message.content.startsWith(`${config.prefix}unmute`)) {
      if (message.member.voice.channel) {
        let channel = message.guild.channels.cache.get(message.member.voice.channel.id);
        for (const [memberID, member] of channel.members) {
          member.voice.setMute(false);
        }
        message.channel.send("All members unmuted!")
      } else {
        message.reply('You need to join a voice channel first!');
      }
    }
  }
});
  
client.login(config.token);

