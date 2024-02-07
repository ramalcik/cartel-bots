const { Client, Message, MessageEmbed} = require("discord.js");
const Invite = require('../../../../database/Schemas/Global.Guild.Invites');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "topdavet",
    command: ["topinvite"],
    aliases: "topinvite",
    description: "Sunucu içerisindeki tüm davet sıralaması görüntülenir",
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
    let findedIndex = '';
    let data = await Invite.find()
    
      let topTagli = data.filter(x => x.total).sort((cartelcim1, cartelcim2) => {
        let cartelcim2Toplam2 = 0;
        cartelcim2Toplam2 = cartelcim2.total
        let cartelcim1Toplam2 = 0;
        cartelcim1Toplam2 = cartelcim1.total
        return cartelcim2Toplam2-cartelcim1Toplam2;
    }).map((m, index) => {
        let cartelcimToplam2 = 0;
        cartelcimToplam2 = m.total
        if((index + 1) > 20) findedIndex =  `\`${index + 1}.\` <@${m.userID}>: \`${m.total} davet\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        return`\`${index + 1}.\` <@${m.userID}>: \`${m.total} davet\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
    }).slice(0, 25).join('\n');

    message.channel.send({content: null, embeds: [embed.açıklama(`**30** günlük **Davet** Top **25** sıralaması aşağıda belirtilmiştir.\n\n${topTagli ? `${topTagli}\n${findedIndex}` : `Davet etme verisi bulunamadı.`}`)]})
    


    }
};

