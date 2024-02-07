const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "kanallog",
    command: ["kanallogu","kanal-logu","channellogs", "kanal-log"],
    aliases: "kanallog #kanal/ID",
    description: "Bir üyenin rol geçmişini görüntüler.",
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
    if(!roller.Yetkiler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.Yetkiler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.kanalıBul(args[0])
    if(!kanal) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Bir kanal belirt ve tekrar dene.`)]}) 
    let _data = await Users.find({"Voices.channel": kanal.id, "Voices.state": "KATILDI"})

    let joined = []

    _data.forEach(async (x) => {
      let find = x.Voices.reverse().find(y => y.channel == kanal.id)
      await joined.push({ id: x._id, date: find.date})
    })
    
    _data = joined.filter(x => message.guild.members.cache.get(x.id)).slice(0, 15).sort((a, b) => b.date - a.date).map((value, index) => {
      let member = message.guild.members.cache.get(value.id)
      return `\` ${index + 1} \` ${member} ${member.user.username} (<t:${String(value.date).slice(0, 10)}:R>)`
    }).join("\n")
    let load = await message.reply({content: `${kanal} isimli kanalın giriş çıkışları kontrol ediliyor...`})
    if(joined.length <= 0) return load.edit(`${kanal} isimli kanalın giriş çıkışları kontrol edildi fakat daha önce bu kanala giriş yapan bulunamadı. `)
    await load.edit({content: null, embeds: [
      new richEmbed().açıklama(`Aşağıda ${kanal} kanalına son giriş yapan 15 üye listelenmektedir. Toplam da bu kanala giriş yapan ${joined.length} üye bulundu.

${_data}`)
    ]})
    setTimeout(() => {
      load.delete().catch(err => {})
    }, 20000)
 }
};