const { Client, Message, MessageEmbed} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "cezatemizleme",
    command: ["cezatemizle"],
    aliases: "cezatemizle <#Ceza-No>",
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
    if(!Number(args[0])) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Bir ceza numarası belirt ve tekrar dene.`)]})
    let cezabul = await Punitives.findOne({No: args[0]});
    if(!cezabul) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`#${args[0]} numaralı ceza verisi bulamadım.`)]})
 if(cezabul && cezabul.Active) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`${args[0]} numaralı ceza aktif olduğundan kaldıramadım.`)]})
    await message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`${cezabul.Member ? message.guild.members.cache.get(cezabul.Member) ? message.guild.members.cache.get(cezabul.Member) : `<@${cezabul.Member}>` : `<@${cezabul.Member}>`} kişisine ait \`#${cezabul.No}\` numaralı ceza sicilinden kaldırıldı.`)]})
    await Punitives.updateOne({No: args[0]}, { $set: { Member: `Silindi #${cezabul.No} (${cezabul.Member})`, No: "-99999", Remover: `Sildi (${message.author.id})`} }, { upsert: true });
    await message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    }
};