const { Client, Message, MessageButton, MessageActionRow } = require("discord.js");
const Unleash = require('../../../../database/Schemas/Plugins/Guıild.Remove.Staffs');
const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "sonyetki",
    command: ["son-yetkisi","sonrolleri","sonroller","yetkibırakan"],
    aliases: "yetkibırakan <@cartel/ID>",
    description: "Belirlenen üyeyi yetkiye davet etmek için istek gönderirsin.",
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
   */

  komutClient: async function (client, message, args) {
        if(!roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
        let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
        if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
        let data = await Unleash.findOne({_id: cartelcim.id})
        if(!data) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.data)]})
        message.channel.send({embeds: [new richEmbed().açıklama(`${cartelcim} isimli eski yetkilinin eski rolleri aşağıda belirtilmiştir.\n
\n${data ? data.unleashRoles.map(x => `\` • \` ${message.guild.roles.cache.get(x)} (\`${x}\`)`).join("\n") : `${message.guild.emojiyiBul(emojiler.onay_cartel)} Veritabanına bir rol veya bir veri bulunamadı!`}`)]})

    }
};