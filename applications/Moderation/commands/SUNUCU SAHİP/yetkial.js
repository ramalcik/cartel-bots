const { Client, Message, MessageButton, MessageActionRow } = require("discord.js");
const Upstaff = require('../../../../database/Schemas/Plugins/Client.Users.Staffs');
const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "yetkial",
    command: ["yetki-al"],
    aliases: "yetkial <@cartel/ID>",
    description: "Belirlenen üyeyi komutu kullanan üyenin taglısı olarak belirler.",
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
    let embed = new richEmbed()
    if(!roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    let kontrol = await Users.findOne({_id: cartelcim.id}) || { Staff: false }
    let data = await Users.findOne({_id: cartelcim.id})
    let data2 = await Upstaff.findOne({_id: cartelcim.id})
    if(kontrol && kontrol.Staff) cartelcim.removeStaff(cartelcim.roles.cache, true)
    await Users.updateOne({ _id: cartelcim.id }, { $push: { "StaffLogs": {
      Date: Date.now(),
      Process: "ALINDI",
      Role: cartelcim.roles.hoist ? cartelcim.roles.hoist.id : roller.ilkYetki,
      Author: message.member.id
    }}}, { upsert: true }) 
    let sorumlusu = message.guild.members.cache.get(data.yetkiVeren)
    let altYetki = message.guild.roles.cache.get(roller.ilkYetki)
    if(altYetki) await cartelcim.roles.remove(cartelcim.roles.cache.filter(rol => altYetki.position <= rol.position))
    let yetkiliLog = message.guild.kanalıBul("yetki-çek-log")
    if(yetkiliLog) yetkiliLog.send({embeds: [embed.setThumbnail(cartelcim.user.avatarURL({dynamic: true})).üstBaşlık(cartelcim.user.username,cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim.toString()} kişisinin yetkili rolü alındı.
    
Eski yetkiyi veren ve tarih: ${sorumlusu || `Kişi bulunamadı.`} / ${data2.yetkiVerilmeTarihi ? ` <t:${String(Date.parse(data2.yetkiVerilmeTarihi)).slice(0, 10)}:R>` : `"Tarih Bulunamadı."`}
Yetki alınan tarih: \`${tarihsel(Date.now()) || `Tarih bulunamadı.`}\`  
Yetki alma işleminden alınan rol: ${altYetki || `Rol bulunamadı`}
Yetki alınmadan önceki puanı: \`${data2 ? data2.ToplamPuan : 0}\`
`)]})
     message.channel.send({embeds: [new richEmbed().setThumbnail(cartelcim.user.avatarURL({dynamic: true})).üstBaşlık(cartelcim.user.username,cartelcim.avatarURL({dynamic: true})).açıklama(`${cartelcim.toString()} kişisinden ${altYetki.name || `Rol bulunamadı.`} rolü alındı.`)]})
   
    
    }
};