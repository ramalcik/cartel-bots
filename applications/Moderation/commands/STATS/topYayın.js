const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Users = require('../../../../database/Schemas/Client.Users');
const moment = require('moment')
module.exports = {
    name: "topstreaming",
    command: ["topyayın","topstream","topyayın","yayınsıralaması","topstreamer"],
    aliases: "topstreaming",
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
     
    let topTagli = data.filter(x => x.Streaming).sort((cartelcim1, cartelcim2) => {
      let cartelcim2Toplam2 = 0;
      cartelcim2.Streaming.map(x => {
          cartelcim2Toplam2 += Number(x.End - x.Start)
      })
      let cartelcim1Toplam2 = 0;
      cartelcim1.Streaming.map(x => {
          cartelcim1Toplam2 += Number(x.End - x.Start)
      })
      return cartelcim2Toplam2-cartelcim1Toplam2;
  }).map((m, index) => {
      let cartelcimToplam2 = 0;
       m.Streaming.map(x => {
          cartelcimToplam2 += Number(x.End - x.Start)
      })
      if(message.author.id == m._id && cartelcimToplam2 != 0 && (index + 1) > 25) findedIndex = `\`${index+1}.\` <@${m._id}>: \`${moment.duration(cartelcimToplam2).format('D [gün,] h [saat,] m [dakika]')}\` **(Siz)**`
      return `\`${index + 1}.\` <@${m._id}>: \`${moment.duration(cartelcimToplam2).format('H [saat,] m [dakika]')}\` ${m._id == message.member.id ? `**(Siz)**` : ``}`;
  }).slice(0, 25).join('\n');



   message.channel.send({content: null, embeds: [embed.açıklama(`**30** günlük **Streaming** Top **25** sıralaması aşağıda belirtilmiştir.\n\n${topTagli ? `${topTagli}\n${findedIndex}` : `Yayın açma verisi bulunamadı.`}`)]})

  
  }
};