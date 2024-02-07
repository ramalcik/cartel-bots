const { Client, Message, MessageEmbed} = require("discord.js");
const Invite = require('../../../../database/Schemas/Plugins/Client.Users.Staffs');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "topgörev",
    command: ["toptasks","top-görev","top-tasks","topgorev"],
    aliases: "topgörev",
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
    let data = await Invite.find()
      
      let topTagli = data.filter(x => x.Görev).sort((cartelcim1, cartelcim2) => {
        let cartelcim2Toplam2 = 0;
        cartelcim2Toplam2 = cartelcim2.Görev
        let cartelcim1Toplam2 = 0;
        cartelcim1Toplam2 = cartelcim1.Görev
        return cartelcim2Toplam2-cartelcim1Toplam2;
    }).map((m, index) => {
        let cartelcimToplam2 = 0;
        cartelcimToplam2 = m.Görev
          if(m._id == message.author.id && (index + 1) > 25) findedIndex = `\`${index+1}.\` <@${m._id}>: **\`${cartelcimToplam2} Görev Puanı\`** **(Siz)**`
        return `\`${index + 1}.\` <@${m._id}>: **\`${cartelcimToplam2} Görev Puanı\`** ${m._id == message.member.id ? `**(Siz)**` : ``}`;
    }).slice(0, 25).join('\n');
if(!topTagli) return message.channel.send({ embeds: [ embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(``)]})
    message.channel.send({content: null, embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`**30** günlük **Görev** Top **25** sıralaması aşağıda belirtilmiştir\n\n${topTagli ? `${topTagli}\n${findedIndex}` : `Görev yapma.`}`)]})


    }
};