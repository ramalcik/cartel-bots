const { Client, Message, MessageEmbed, Guild, MessageAttachment } = require("discord.js");
const Snipe = require('../../../../database/Schemas/Others/Channels.Snipe')
const moment = require('moment');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
require("moment-duration-format");
require("moment-timezone");
module.exports = {
    name: "snipe",
    command: ["snipe"],
    aliases: "snipe",
    description: "Komutun kullanıldığı kanal da en son silinmiş mesajın içeriğini ve tarihini gösterir.",
    category: "yönetim",
    uzantı: true,
  /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.on("messageDelete", async message => {
        if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
        await Snipe.updateOne({ _id: message.channel.id }, { $set: {  
            "yazar": message.author.id, 
            "yazilmaTarihi": message.createdTimestamp,
            "silinmeTarihi": Date.now(), 
            "dosya": message.attachments.first() ? true : false,
	    "icerik": message.attachments.first() ? message.attachments.first().proxyURL : message.content ? message.content : "Boş Mesaj!"
          } }, { upsert: true })
    });
  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  komutClient: async function (client, message, args, guild) {
    if(!roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.roles.cache.has(roller.boosterRolü) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) &&  !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR') && !roller.Yetkiler.some(x => message.member.roles.cache.has(x))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let mesaj = await Snipe.findById(message.channel.id)
    if (!mesaj) return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined);
    let mesajYazari = await client.users.fetch(mesaj.yazar);
    let embed = new richEmbed().açıklama(`Atan Kişi: ${mesajYazari}
Yazılma Tarihi: <t:${Number(String(mesaj.yazilmaTarihi).substring(0, 10))}:R>
Silinme Tarihi: <t:${Number(String(mesaj.silinmeTarihi).substring(0, 10))}:R> 
${mesaj.dosya ? "\n**Atılan mesaj dosya içeriyor**" : ""}`).üstBaşlık(mesajYazari.tag, mesajYazari.avatarURL())
    if (mesaj.icerik) embed.sütun('Mesajın İçeriği', mesaj.icerik);
    if (mesaj.dosya) embed.setImage(mesaj.icerik)
    let carteldörtbin;
    if (mesaj.icerik) carteldörtbin = mesaj.icerik
    message.reply({embeds: [embed]}).then(x => setTimeout(() => {
        x.delete()
    }, 15000)).catch(err => { 
      message.reply({content: `${message.guild.emojiyiBul(emojiler.chatMuteKaldırıldı)} ${message.guild.members.cache.get(mesaj.yazar)} (\`${moment.duration(Date.now() - mesaj.yazilmaTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")} önce yazılma / ${moment.duration(Date.now() - mesaj.silinmeTarihi).format("D [gün], H [saat], m [dakika], s [saniye]")} önce silinme\`) kişisi karakter sayısını aşan bir metin gönderdiği için **Discord API** buna izin vermedi, bende senin için dosya hazırladım.`, files: [{
          attachment: Buffer.from(carteldörtbin),
          name: `${mesaj.yazar}-snipe.txt`
      }]})
    });
    }
}