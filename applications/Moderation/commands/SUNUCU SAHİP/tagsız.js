const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Kullanici = require('../../../../database/Schemas/Client.Users')
module.exports = {
    name: "tagsızat",
    command: ["tagsızkayıtsız","tagsız"],
    aliases: "tagsızat",
    description: "Sunucudaki üyeler içerisinde tagı olmayanları kayıtsıza at.",
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
    const embed = new richEmbed() 
    if(!roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    if(!ayarlar.taglıalım) return message.channel.send({embeds: [embed.açıklama(`Taglı Alım modu kapalı olduğundan işlem yapamadım.`)]})
    let tagsızlar = message.guild.members.cache.filter(x => !x.user.username.includes(ayarlar.tag) && !x.roles.cache.has(roller.vipRolü)  && !x.roles.cache.has(roller.boosterRolü) 
    && (roller.kadınRolleri.some(r => x.roles.cache.has(r) || roller.erkekRolleri.some(r => x.roles.cache.has(r)))))
    tagsızlar.forEach(async (cartelcim) => {
            cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`).catch(err => {})
            cartelcim.roles.set(roller.kayıtsızRolleri).catch(err => {})
            if(cartelcim.voice.channel) cartelcim.voice.disconnect()
            let data = await Kullanici.findOne({_id: cartelcim.id});
            if(data && data.Name) await Kullanici.updateOne({_id: cartelcim.id}, {$set: { "Gender": "Kayıtsız" }, $push: { "Names": { Staff: message.member.id, Date: Date.now(), Name: data.Name, State: "Tagsız Kayıtsıza Atıldı" } } }, { upsert: true })
            cartelcim.Delete()
            cartelcim.removeStaff()
    })
    message.channel.send({embeds: [embed.açıklama(`Sunucuda kayıtlı olup tagı olmayan \`${tagsızlar.size}\` üye başarıyla kayıtsız'a atıldı!`)]}).then(x => {
        setTimeout(() => {
            x.delete()
        }, 7500);
    })
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)

 }
};