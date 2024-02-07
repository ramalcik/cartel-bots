const { Client, Message, MessageEmbed} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "cezalartemizle",
    command: ["cezalartemizle","siciltemizle","sicil-temizle"],
    aliases: "cezalartemizle <@cartel/ID>",
    description: "Belirtilen ceza numarasının bütün bilgilerini gösterir.",
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
    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.getUser(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    let cezalar = await Punitives.findOne({Member: cartelcim.id});
    if(!cezalar) return message.reply({embeds: [new richEmbed().açıklama(`${cartelcim} kişisinin cezası bulunamadı.`)]});
    if(await Punitives.findOne({Member: cartelcim.id, Active: true})) return message.reply({embeds: [new richEmbed().açıklama(`${cartelcim} kişisinin aktif ceza olduğundan işlem yapamadım.`)]});

    await message.reply({embeds: [new richEmbed().açıklama(`${cartelcim} kişisinin tüm cezaları kaldırıldı.`)]})
    await Punitives.updateMany({Member: cartelcim.id}, { $set: { Member: `Silindi (${cartelcim.id})`, No: "-99999", Remover: `Sildi (${message.author.id})`} }, { upsert: true });
    await message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    }
};