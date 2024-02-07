const { Client, Message } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed")
module.exports = {
    name: "sil",
    command: ["sil"],
    aliases: "sil <1-100>",
    description: "Belirlenen miktar kadar metin kanallarında ki metinleri temizler.",
    category: "yönetim",
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
   * @param {Guild} guild
   */
  komutClient: async (client, message, args) => {
    if(!roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    if (!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) {
      return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.argümandoldur)]})
    }
    else {
      message.channel.bulkDelete(Number(args[0]), true).catch(err => {}).then(msg => message.channel.send({embeds: [ new richEmbed().açıklama(`<#${message.channel.id}> kanalında **${msg.size}** adet mesaj sildim.`)]}).then(x => {
        setTimeout(() => {
          x.delete().catch(err => {})
        }, 5000);
      }))
    }
  }
};