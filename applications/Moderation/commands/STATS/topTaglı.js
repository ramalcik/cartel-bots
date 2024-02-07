const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Users = require('../../../../database/Schemas/Client.Users');
module.exports = {
    name: "toptaglı",
    command: ["toptaglılar"],
    aliases: "toptaglı",
    description: "",
    category: "stat",
    uzantı: ayarlar.type,
    
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
    let embed = new richEmbed()
    if(!roller.teyitciRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.Yetkiler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.Yetkiler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
   let findedIndex = ''
   let data = await Users.find()
      
      let topTagli = data.filter(x => x.Taggeds).sort((cartelcim1, cartelcim2) => {
        let cartelcim2Toplam2 = 0;
        cartelcim2Toplam2 = cartelcim2.Taggeds.length
        let cartelcim1Toplam2 = 0;
        cartelcim1Toplam2 = cartelcim1.Taggeds.length
        return cartelcim2Toplam2-cartelcim1Toplam2;
    }).map((m, index) => {
        let cartelcimToplam2 = 0;
        cartelcimToplam2 = m.Taggeds.length
        if(m._id == message.author.id && (index + 1) > 25) findedIndex = `\`${index+1}.\` <@${m._id}>: \` ${cartelcimToplam2} Taglı \` **(Siz)**`
        return `\`${index + 1}.\` <@${m._id}>: \` ${cartelcimToplam2} Taglı \` ${m._id == message.member.id ? `**(Siz)**` : ``}`;
    }).slice(0, 25).join('\n');
  
      message.channel.send({content: null, embeds: [embed.açıklama(`**30** günlük **Taglı çekme** Top **25** sıralaması aşağıda belirtilmiştir\n\n${topTagli ? `${topTagli}\n${findedIndex}` : `Taglı çekme verisi bulunamadı.`}`)]})
  }
};