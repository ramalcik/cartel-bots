const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Users = require('../../../../database/Schemas/Client.Users');

module.exports = {
    name: "rapor",
    command: ["rapor"],
    aliases: "rapor",
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
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
  
    const embed = new richEmbed().üstBaşlık(message.member.user.username)
    
    const results = Users.find({
        'Records.Date': { $gte: new Date() },
      });
      
      const count = results.toArray().reduce((acc, doc) => acc + 1, 0);
      
    await message.channel.send({ embeds: [ embed.açıklama(`${count} kayıt yapılmış.`)]})
}
}