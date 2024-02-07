const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Users = require('../../../../database/Schemas/Client.Users');
module.exports = {
  name: "topyetkili",
  command: ["topyetkililer"],
  aliases: "topyetkili",
  description: "",
  category: "stat",
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
    let embed = new richEmbed()
    let findedIndex = ''
    let data = await Users.find()
      let topTagli = data.filter(x => x.Staffs).sort((cartelcim1, cartelcim2) => {
        let cartelcim2Toplam2 = 0;
        cartelcim2Toplam2 = cartelcim2.Staffs.length
        let cartelcim1Toplam2 = 0;
        cartelcim1Toplam2 = cartelcim1.Staffs.length
        return cartelcim2Toplam2-cartelcim1Toplam2;
    }).map((m, index) => {
        let cartelcimToplam2 = 0;
        cartelcimToplam2 = m.Staffs.length
        if(m._id == message.author.id && (index + 1) > 25) findedIndex = `\`${index+1}.\` <@${m._id}>: \` ${cartelcimToplam2} Yetkili \` **(Siz)**`
        return `\`${index + 1}.\` <@${m._id}>: \` ${cartelcimToplam2} Yetkili \` ${m._id == message.member.id ? `**(Siz)**` : ``}`;
    }).slice(0, 25).join('\n');

    message.channel.send({content: null, embeds: [embed.açıklama(`**30** günlük **Yetkili çekme** Top **25** sıralaması aşağıda belirtilmiştir\n\n${topTagli ? `${topTagli}\n${findedIndex}` : `Yetkili çekme verisi bulunamadı.`}`)]})
  
  }
};

