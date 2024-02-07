const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const { guildBackup } = require('../../../../base/Funksiyonlar/Senkronize');
module.exports = {
    name: "sync",
    command: ["senk","senkronizasyon"],
    aliases: "sync",
    description: "test",
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
    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username)) return;
    const embed = new richEmbed() 
    await guildBackup.guildChannels()
    await guildBackup.guildRoles()
    message.channel.send({embeds: [embed.açıklama(`Başarıyla rol ve kanal senkronizasyonu güncellendi.`)]})
   
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    client.logger.log(`ROL => Manuel olarak senkronizasyon işlemi gerçekleştirildi. (${message.author.tag})`, "backup") 
 }
};