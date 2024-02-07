const { Client, Message, MessageEmbed, Util } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Users = require('../../../../database/Schemas/Client.Users');

module.exports = {
    name: "notları-kaldır",
    command: ["notkaldır","notlartemizle"],
    aliases: "notları-kaldır <@cartel/ID>",
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
    if(!cartelcim) return message.reply({content: `Bir üye belirtmediğinden işlem iptal edildi.`}).then(msg => {
        message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            msg.delete()
        }, 7500);
    })
    let User = await Users.findOne({_id: cartelcim.id})
    if(!User) return message.reply({content: `Belirtilen ${cartelcim} kişisinin veritabanında hiç bir kayıdı bulunamadı.`}).then(msg => {
        message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            msg.delete()
        }, 7500);
    })
    if(User && !User.Notes) return message.reply({content: `Belirtilen ${cartelcim} kişisinin notları bulunamadı.`}).then(msg => {
        message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            msg.delete()
        }, 7500);
    })
    if(User && User.Notes && !User.Notes.length > 0) return message.reply({content: `Belirtilen ${cartelcim} kişisinin notları bulunamadı.`}).then(msg => {
        message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            msg.delete()
        }, 7500);
    })

    await Users.updateOne({_id: cartelcim.id}, {$unset: {"Notes": 1}}, {upsert: true})
    message.channel.send({embeds: [new richEmbed().açıklama(`Başarıyla ${cartelcim} kişisinin tüm notları temizlendi.`)]}).then(async (msg) => {
        setTimeout(() => {
            msg.delete()
        }, 12000);
    })
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    }
};

