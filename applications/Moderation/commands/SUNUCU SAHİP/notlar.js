const { Client, Message, MessageEmbed, Util } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Users = require('../../../../database/Schemas/Client.Users');

module.exports = {
    name: "notlar",
    command: ["not-listele","notes"],
    aliases: "notlar <@cartel/ID>",
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
    let cartelcim = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    let User = await Users.findOne({_id: cartelcim.id})
    if(!User) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Belirtilen ${cartelcim} kişisinin veritabanında hiç bir kayıdı bulunamadı.`)]})
    if(User && !User.Notes) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Belirtilen ${cartelcim} kişisinin veritabanında hiç bir not kayıdı bulunamadı.`)]})
    if(User && User.Notes && !User.Notes.length > 0) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Belirtilen ${cartelcim} kişisinin notları bulunamadı.`)]})
    let Notlar = User.Notes.map((data, index) => `\` ${index + 1} \` **${data.Note}** (${data.Author ? message.guild.members.cache.get(data.Author) : `<@${data.Author}>`}) (\`${data.Date ? tarihsel(data.Date) : tarihsel(Date.now())}\`)`).join("\n")
    message.channel.send({embeds: [new richEmbed().altBaşlık(`${message.member.user.username} tarafından istendi.`).açıklama(`Aşağıda ${cartelcim} kişisinin yöneticiler tarafından eklenmiş notları listelenmektedir.\n\n${Notlar}`)]}).then(async (msg) => {
    })
    
    }
};

