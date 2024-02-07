const { Client, Message, MessageEmbed} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Jail = require('../../../../database/Schemas/Punitives.Jails');
const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "şüpheliçıkart",
    command: ["unsuspend", "unsuspect","çıkar"],
    aliases: "şüpheliçıkart <@cartel/ID> <Sebep>",
    description: "Belirtilen üye yeni bir hesapsa onu şüpheliden çıkartır.",
    category: "yetkili",
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
    if(!roller.jailHammer.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(cartelcim.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(!cartelcim.manageable) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.dokunulmaz)]})
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    let cezakontrol = await Jail.findById(cartelcim.id)
    if(cezakontrol) {
        message.channel.send(` Belirtilen üye sistemsel tarafından cezalandırılmış, şüpheli çıkart komutu ile çıkartman münkün gözükmüyor.`).then(x => {
          setTimeout(() => {
            x.delete()
          }, 7500);
        });
        message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
        return;
    };
    let User = await Users.findOne({_id: cartelcim.id});
    if(!ayarlar.taglıalım && User && User.Name && User.Names && User.Gender) {
        if(cartelcim && cartelcim.manageable) await cartelcim.setNickname(`${ayarlar.type ? cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ""}${User.Name}`)
        if(User.Gender == "Erkek") await cartelcim.setRoles(roller.erkekRolleri)
        if(User.Gender == "Kadın") await cartelcim.setRoles(roller.kadınRolleri)
        if(User.Gender == "Kayıtsız") cartelcim.setRoles(roller.kayıtsızRolleri)
        if(cartelcim.user.username.includes(ayarlar.tag)) cartelcim.roles.add(roller.tagRolü)
    } else {
        cartelcim.setRoles(roller.kayıtsızRolleri)
        if(cartelcim && cartelcim.manageable && ayarlar.type ) await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
        if(cartelcim && cartelcim.manageable && !ayarlar.type ) await cartelcim.setNickname(`İsim | Yaş`)
        if(cartelcim && cartelcim.manageable && !ayarlar.type ) await cartelcim.setNickname(`Kayıtsız`)
        if(cartelcim && cartelcim.manageable && ayarlar.type ) await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} Kayıtsız`)
    }
    let findChannel = message.guild.kanalıBul("şüpheli-log")
    if(findChannel) findChannel.send({embeds: [new richEmbed().açıklama(`${cartelcim} kullanıcısının şüpheli durumu <t:${String(Date.now()).slice(0, 10)}:R> ${message.member} tarafından kaldırıldı.`)]})
    
    await message.reply({embeds: [new richEmbed().açıklama(`Başarıyla ${cartelcim} kişi şüpheli hesap konumundan çıkartıldı!`)]})
    .then(x => {
      setTimeout(() => {
        x.delete()
      }, 7500);
    })
    if(cartelcim) cartelcim.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.displayAvatarURL({dynamic: true})).açıklama(`${cartelcim.user.username}, ${message.author} tarafından <t:${String(Date.now()).slice(0, 10)}:R> şüpheliden çıkartıldın.`)]}).catch(x => {
      
    });
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    }
};