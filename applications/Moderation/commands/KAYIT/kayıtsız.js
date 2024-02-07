const Kullanici = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require('../../../../base/Funksiyonlar/embed');
const getLimit = new Map();

module.exports = {
    name: "kayıtsız",
    command: ["unregistered","kayitsizyap","kayitsiz"],
    aliases: "kayıtsız <@cartel/ID>",
    description: "Belirlenen üyeyi kayıtsız üye olarak belirler.",
    category: "teyit",
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
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    if (getLimit.get(message.author.id) >= ayarlar.kayıtsızLimit) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bokyolu)]}).then(s => setTimeout(() => s.delete().catch(err => {}), 7500));
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(cartelcim.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(!cartelcim.manageable) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.dokunulmaz)]})
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    if(roller.kayıtsızRolleri.some(x => cartelcim.roles.cache.has(x))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kayıtsız)]})
      if(ayarlar.isimYaş) {
      if(ayarlar.type) {
        await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag  : (ayarlar.tagsiz ? ayarlar.tagsiz  : (ayarlar.tag || ""))} İsim | Yaş`)
      } else {
        await cartelcim.setNickname(`İsim | Yaş`)
      }
    } else {
      if(ayarlar.type) {
        await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag  : (ayarlar.tagsiz ? ayarlar.tagsiz  : (ayarlar.tag || ""))} Kayıtsız`)
      } else {
        await cartelcim.setNickname(`Kayıtsız`)
      }
    }
    cartelcim.setRoles(roller.kayıtsızRolleri)
    if(cartelcim.voice.channel) cartelcim.voice.disconnect()
    let data = await Kullanici.findOne({_id: cartelcim.id});
    if(data && data.Name) await Kullanici.updateOne({_id: cartelcim.id}, {$set: { "Gender": "Kayıtsız" }, $push: { "Names": { Staff: message.member.id, Date: Date.now(), Name: data.Name, State: "Kayıtsıza Atıldı" } } }, { upsert: true })
    cartelcim.Delete()
    cartelcim.removeStaff()
    let kayıtsızLog = message.guild.kanalıBul("kayıtsız-log")
    if(kayıtsızLog) kayıtsızLog.send({embeds: [ new richEmbed().açıklama(`${cartelcim} kişisi ${message.author} tarafından <t:${String(Date.now()).slice(0, 10)}:R> kayıtsız olarak belirlendi.`)]})
    message.reply({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisi, nedeniyle başarıyla kayıtsız'a gönderildi.`)]})
    cartelcim.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${message.author} tarafından sebebi ile <t:${String(Date.now()).slice(0, 10)}:R> kayıtsız'a atıldın.`)]}).catch(x => {
      })
    if(Number(ayarlar.kayıtsızLimit) && ayarlar.kayıtsızLimit > 1) {
      if(!message.member.permissions.has('ADMINISTRATOR') && !sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) {
        getLimit.set(`${message.member.id}`, (Number(getLimit.get(`${message.member.id}`) || 0)) + 1)
        setTimeout(() => {
          getLimit.set(`${message.member.id}`, (Number(getLimit.get(`${message.member.id}`) || 0)) - 1)
        },1000*60*5)
      }
    }
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    }
};