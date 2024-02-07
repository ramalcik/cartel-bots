const { Client, Message, MessageEmbed} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Kullanici = require('../../../../database/Schemas/Client.Users')
module.exports = {
    name: "topteyit",
    command: ["Topteyit"],
    aliases: "topteyit",
    description: "Sunucu genelindeki teyit sıralamasını gösterir.",
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
      const all = await Kullanici.find().sort();
      let findedIndex = ''
    let teyit = all.filter(m => m.Records).sort((cartelcim1, cartelcim2) => {
        let cartelcim2Toplam2 = 0;
        cartelcim2Toplam2 = cartelcim2.Records.length
        let cartelcim1Toplam2 = 0;
        cartelcim1Toplam2 = cartelcim1.Records.length
        return cartelcim2Toplam2-cartelcim1Toplam2;
    })
    .map((value, index) => {
        if((index + 1) > 25 && message.author.id == value._id) findedIndex = `\`${index + 1}.\` <@${value._id}> toplam **${value.Records.filter(v => v.Gender === "Erkek").length + value.Records.filter(v => v.Gender === "Kadın").length}** üye kayıt etti. (${value.Records.filter(v => v.Gender === "Erkek").length || 0} Erkek, ${value.Records.filter(v => v.Gender === "Kadın").length || 0} Kadın)  ${value._id == message.member.id ? `**(Siz)**` : ``}`
        return `\`${index + 1}.\` <@${value._id}> toplam **${value.Records.filter(v => v.Gender === "Erkek").length + value.Records.filter(v => v.Gender === "Kadın").length}** üye kayıt etti. (${value.Records.filter(v => v.Gender === "Erkek").length || 0} Erkek, ${value.Records.filter(v => v.Gender === "Kadın").length || 0} Kadın)  ${value._id == message.member.id ? `**(Siz)**` : ``}`
    }).slice(0, 25)

    message.channel.send({content: null, embeds: [new richEmbed().açıklama(`**30** günlük **Teyit** Top **25** sıralaması aşağıda belirtilmiştir\n\n${teyit.join("\n") + `\n${findedIndex}` || `Kayıt etme verisi bulunamadı.`}`)]})
    }
};
