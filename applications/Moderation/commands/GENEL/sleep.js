const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

module.exports = {
    name: "sleep",
    command: ["sleep","sleeptaşı","sleep-taşı"],
    aliases: "sleep",
    description: "",
    category: "yönetim",
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

    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) &&  !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let voiceChannel = message.member.voice.channelId;
    if (!voiceChannel && !args[0]) return message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true}))]})
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(cartelcim) {
         if(!cartelcim.voice.channel) return message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisi bir ses kanalında bulunmuyor.`)]})
       await cartelcim.voice.setChannel(kanallar.sleepRoom)
       return message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.avatarURL({ dynamic: true})).açıklama(`${cartelcim} kişisi **sleep room** kanalına taşındıyor.`)]})
    } else {
        let cartelcimler = message.member.voice.channel.members.filter(x => x.voice.selfDeaf || x.voice.selfMute)
        if(cartelcimler.size <= 0) return message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Bulunduğun kanalda birden fazla **afk** üye olduğu için **sleep room** kanalına taşındı.`)]})
        
        message.member.voice.channel.members.array().filter(x => x.voice.selfDeaf || x.voice.selfMute).forEach((m, index) => {
        setTimeout(() => {
            m.voice.setChannel(kanallar.sleepRoom);
        }, index*1000);
        });
        message.channel.send({  embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Bulunduğun kanalda ${cartelcimler.size} kişi **sleep room** odasına taşınıyor.`)]})
    }
  }
}