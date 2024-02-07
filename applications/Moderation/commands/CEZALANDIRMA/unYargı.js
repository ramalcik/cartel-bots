const { Client, Message, MessageEmbed} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "yargıkaldır",
    command: ["yargıkaldır","yargı-kaldır","yargi-kaldir","yargikaldir","unyargı"],
    aliases: "yargıkaldır <@cartel/ID>",
    description: "Belirlenen üyenin yasaklamasını kaldırır.",
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
    if(!roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.getUser(args[0])    
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    await Punitives.findOne({Member: cartelcim.id, Type: "Yasaklama", Active: true}).exec(async (err, res) => {
        message.guild.bans.fetch().then(async(yasaklar)=> {
            if(yasaklar.size == 0) return message.channel.send(cevaplar.yasaklamayok)
            let yasaklicartelcim = yasaklar.find(yasakli => yasakli.user.id == cartelcim.id)
            if(!yasaklicartelcim) return message.channel.send({embeds: [ new richEmbed().açıklama(`Belirttiğiniz kişi sunucu içerisinde yasaklı değil.`)]});
            if(res) {
                if(res.Staff !== message.author.id && message.guild.members.cache.get(res.Staff) && !sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username))  return message.channel.send({embeds: [new richEmbed().açıklama(` Bu ceza ${res.Staff ? message.guild.members.cache.get(res.Staff) ? `${message.guild.members.cache.get(res.Staff)} (\`${res.Staff}\`)` : `${res.Staff}` :  `${res.Staff}`} Tarafından cezalandırılmış. **Bu Cezayı Açman Münkün Değil!**`).altBaşlık("yaptırım yapılan cezada yaptırımı yapan yetkili işlem uygulayabilir.")]}).then(x => {
                    message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
                    setTimeout(() => {
                        x.delete()
                    }, 7500);
                });
            }
            if(res) await Punitives.updateOne({ No: res.No }, { $set: { "Active": false, Expried: Date.now(), Remover: message.member.id} }, { upsert: true })
            await message.guild.members.unban(cartelcim.id);
            let findChannel = message.guild.kanalıBul("ban-log");
            if(findChannel) await findChannel.send({embeds: [new richEmbed().açıklama(`${cartelcim} kullanıcısının sunucudaki ${res ? `\`#${res.No}\` ceza numaralı yasaklaması` : "yasaklaması"}, ${tarihsel(Date.now())} tarihinde ${message.author} tarafından kaldırıldı.`)]})
            await message.channel.send({embeds: [ new richEmbed().açıklama(`${cartelcim} kişisinin ${res ? `(\`#${res.No}\`) ceza numaralı` : "sunucudaki"} yasaklaması kaldırıldı.`)]});
            message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
            message.member.Leaders("ceza", 5, {type: "CEZA", user: cartelcim.id})
            message.member.Leaders("sorun", 5, {type: "CEZA", user: cartelcim.id})
            message.member.Leaders("criminal", 5, {type: "CEZA", user: cartelcim.id})
        })
    })
    }
};