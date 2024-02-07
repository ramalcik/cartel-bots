const { Client, Message, MessageEmbed} = require("discord.js");
const Kullanici = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "teyit",
    command: ["Teyit", "kayıtbilgi","kayıt-bilgi"],
    aliases: "teyit <@cartel/ID>",
    description: "Belirtilen üye ve komutu kullanan üyenin teyit bilgilerini gösterir.",
    category: "teyit",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    let cartelcim = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(cevaplar.üyeyok)]})
    cartelcim = message.guild.members.cache.get(cartelcim.id)
    if(!roller.teyitciRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let teyit = await Kullanici.findOne({ _id: cartelcim.id }) || [];
    let teyitBilgisi;
    if(teyit.Records){
      let erkekTeyit = teyit.Records.filter(v => v.Gender === "Erkek").length
      let kizTeyit = teyit.Records.filter(v => v.Gender === "Kadın").length
      let bazıları = teyit.Records.filter(v => message.guild.members.cache.get(v.User)).map((value, index) => message.guild.members.cache.get(value.User))
      let çıkanlar = teyit.Records.filter(v => !message.guild.members.cache.get(v.User)).length
      let taglılar = teyit.Records.filter(x => {
        let cartelcim = message.guild.members.cache.get(x.User)
        return cartelcim && cartelcim.user.username.includes(ayarlar.tag)
      }).length

      teyitBilgisi = `${cartelcim} toplam **${erkekTeyit+kizTeyit}** kişi kayıt etmiş! (**${erkekTeyit}** erkek, **${kizTeyit}** kadın, ${ayarlar.type ? `**${taglılar}** taglı, ` : ``}**${çıkanlar}** çıkanlar)
`    } else { 
      teyitBilgisi = `${cartelcim} kişisinin teyit bilgisi bulunamadı.`
    }
    message.reply({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(teyitBilgisi)]});
    }
};