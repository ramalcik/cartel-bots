const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const { set } = require("mongoose");

module.exports = {
    name: "toplutaşı",
    command: ["toplutasi"],
    aliases: "toplutaşı <Kanal ID>",
    description: "",
    category: "kurucu",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} msg 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
     if (!message.member.voice.channelId) return message.channel.send({ embeds: [ new richEmbed().açıklama(`Bir ses kanalına bağlan ve tekrar dene.`)]})
        let channel = args[0]
        if (args.length < 1) return message.channel.send({ embeds: [ new richEmbed().açıklama(`Belirttiğin kanaldaki kişilerin kanala taşınacağı `)]})
        let positionChannel = message.guild.channels.cache.find(x => x.id == channel)
        if (!positionChannel) return message.channel.send({ embeds: [ new richEmbed().açıklama(`Belirttiğin kanalı sunucuda bulamadım.`)]})
	if(positionChannel.type != "GUILD_VOICE") return message.channel.send({ embeds: [ new richEmbed().açıklama(`${positionChannel} kanalı ses kanalı olmadığı için işlem yapamadım.`)]})
        let channelMembers = message.member.voice.channel.members.map(x => x.id)
        for (let i = 0; i < channelMembers.length; i++) {
            setTimeout(() => {
                message.guild.members.cache.get(channelMembers[i]).voice.setChannel(positionChannel.id).catch(err => {})
            }, (i + 1) * 1000)
        }
    message.channel.send({embeds: [ new richEmbed().açıklama(`\`${message.member.voice.channel.name}\` kanalındaki tüm kişiler ${positionChannel} kanalına taşınıyor.

Taşıyan yetkili: ${message.member}
Taşınma tarihi: \`${tarihsel(Date.now())}\`
Kanaldaki üye sayısı: ${message.member.voice.channel.members.size}`)]}).then(msg => {
        setTimeout(() => {
           msg.edit({embeds: [ new richEmbed().açıklama(`\`${message.member.voice.channel.name}\` kanalındaki tüm kişiler ${positionChannel} kanalına taşınıyor.

Taşıyan yetkili: ${message.member}
Taşınma tarihi: \`${tarihsel(Date.now())}\`
Kanaldaki üye sayısı: ${message.member.voice.channel.members.size}

Kişiler taşındı ✅`)]}).catch(err => {})
        }, 5500)
    })
}
}