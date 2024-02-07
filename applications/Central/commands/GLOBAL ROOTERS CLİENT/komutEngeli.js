const { Client, Message} = require("discord.js");
const cmdBans = require('../../../../database/Schemas/Plugins/Guıild.Remove.Staffs')
const { richEmbed } = require('../../../../base/Funksiyonlar/embed');
module.exports = {
    name: "haksıfırla",
    command: ["hak-sıfırla", "hak"],
    aliases: "",
    description: "",
    category: "-",
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
    let cartelim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelim) return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
    await cmdBans.findByIdAndDelete(cartelim.id)
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    message.channel.send({embeds: [new richEmbed().açıklama(`Başarıyla ${cartelim} kişisinin \`${message.guild.name}\` sunucusunda ki yetki salma hakları \`${tarihsel(Date.now())}\` tarihinde sıfırlandı.`)]})
  }
};