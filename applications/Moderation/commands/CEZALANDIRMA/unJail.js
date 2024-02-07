const { Client, Message, MessageEmbed} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Jail = require('../../../../database/Schemas/Punitives.Jails');
const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "unjail",
    command: ["cezalıçıkart", "cezalıçıkart"],
    aliases: "unjail <#No/@cartel/ID>",
    description: "Belirlenen üyeyi cezalıdan çıkartır.",
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
    if(Number(args[0])) {
      let cezanobul = await Jail.findOne({No: args[0]});
      if(cezanobul) args[0] = cezanobul._id
    }
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(cartelcim.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(!cartelcim.manageable) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.dokunulmaz)]})
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    let cezakontrol = await Jail.findById(cartelcim.id)
    if(!cezakontrol) {
        message.channel.send(cevaplar.cezayok);
        message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
        return;
    };
    let cezabilgisi = await Punitives.findOne({ Member: cartelcim.id, Active: true, Type: "Cezalandırılma" })
    if(cezabilgisi && cezabilgisi.Staff !== message.author.id && message.guild.members.cache.get(cezabilgisi.Staff) && !message.member.permissions.has("ADMINISTRATOR") && (roller.sorunÇözmeciler && !roller.sorunÇözmeciler.some(x => message.member.roles.cache.has(x))) && !roller.kurucuRolleri.some(x => message.member.roles.cache.has(x))) 
    return message.channel.send({embeds: [new richEmbed().açıklama(` Bu ceza ${cezabilgisi.Staff ? message.guild.members.cache.get(cezabilgisi.Staff) ? `${message.guild.members.cache.get(cezabilgisi.Staff)} (\`${cezabilgisi.Staff}\`)` : `${cezabilgisi.Staff}` :  `${cezabilgisi.Staff}`} Tarafından cezalandırılmış. **Bu Cezayı Açman Münkün Değil!**`).altBaşlık("yaptırım yapılan cezada yaptırımı yapan yetkili işlem uygulayabilir.")]})
    await Jail.deleteOne({ _id: cartelcim.id })
    await Punitives.updateOne({ No: cezakontrol.No }, { $set: { "Active": false, Expried: Date.now(), Remover: message.member.id} }, { upsert: true })
    let User = await Users.findOne({_id: cartelcim.id});
    if(!ayarlar.taglıalım && User && User.Name && User.Names && User.Gender) {
        if(cartelcim && cartelcim.manageable && ayarlar.type ) cartelcim.setNickname(`${ayarlar.type ? cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ""}${User.Name}`)
        if(User.Gender == "Erkek") cartelcim.setRoles(roller.erkekRolleri)
        if(User.Gender == "Kadın") cartelcim.setRoles(roller.kadınRolleri)
        if(User.Gender == "Kayıtsız") cartelcim.setRoles(roller.kayıtsızRolleri)
        if(cartelcim.user.username.includes(ayarlar.tag)) cartelcim.roles.add(roller.tagRolü)
    } else {
        if(cartelcim && cartelcim.manageable && ayarlar.type ) await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
        if(cartelcim && cartelcim.manageable && !ayarlar.type ) await cartelcim.setNickname(`İsim | Yaş`)
        if(cartelcim && cartelcim.manageable && !ayarlar.type ) await cartelcim.setNickname(`Kayıtsız`)
        if(cartelcim && cartelcim.manageable && ayarlar.type ) await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} Kayıtsız`)
        cartelcim.setRoles(roller.kayıtsızRolleri)
    }
    if(!User) {
        cartelcim.setRoles(roller.kayıtsızRolleri)
        if(cartelcim && cartelcim.manageable && ayarlar.type ) await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
        if(cartelcim && cartelcim.manageable && !ayarlar.type ) await cartelcim.setNickname(`İsim | Yaş`)
        if(cartelcim && cartelcim.manageable && !ayarlar.type ) await cartelcim.setNickname(`Kayıtsız`)
        if(cartelcim && cartelcim.manageable && ayarlar.type ) await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} Kayıtsız`)
    }
    await message.channel.send({embeds: [new richEmbed().açıklama(`${cartelcim} kişisisinden ${roller.jailRoü} rolünü aldım.`)]})
    if(cartelcim) cartelcim.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`Merhaba ${cartelcim}! ${message.author} tarafından <t:${String(Date.now()).slice(0, 10)}:R> \`#${cezakontrol.No}\` numaralı cezan kaldırıldı.`)]}).catch(x => {
      
    });
    let findChannel = message.guild.kanalıBul("jail-log")
    if(findChannel) findChannel.send({embeds: [new richEmbed().açıklama(`${cartelcim} kişisinin \`#${cezakontrol.No}\` numaralı cezalandırılması <t:${String(Date.now()).slice(0, 10)}:R> ${message.member} tarafından kaldırıldı.`)]})
  
    message.member.Leaders("ceza", 5, {type: "CEZA", user: cartelcim.id})
    message.member.Leaders("sorun", 5, {type: "CEZA", user: cartelcim.id})
    message.member.Leaders("criminal", 5, {type: "CEZA", user: cartelcim.id})
    }
};