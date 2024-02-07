const { Client, Message, MessageEmbed} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const {VK, DC, STREAM} = require('../../../../database/Schemas/Punitives.Activitys');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "dc-kaldır",
    command: ["dc-kaldir", "dckaldir","dckaldır","dccezalı-kaldır","dccezalıkaldır","dccezalikaldir","undc"],
    aliases: "undc <#No/@cartel/ID>",
    description: "Belirlenen üyenin metin kanallarındaki susturmasını kaldırır.",
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

    let aktivite = "**Doğruluk mu? Cesaretlik mi?**"
    if(!roller.dcSorumlusu.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.sorunÇözmeciler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    if(Number(args[0])) {
        let cezanobul = await DC.findOne({No: args[0]})
        if(cezanobul) args[0] = cezanobul._id
    }
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(cartelcim.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(!cartelcim.manageable) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.dokunulmaz)]})
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    let cezakontrol = await DC.findById(cartelcim.id) 
    if(!cezakontrol) {
        message.channel.send(cevaplar.cezayok);
        message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
        return;
    };  
    let cezabilgisi = await Punitives.findOne({ Member: cartelcim.id, Active: true, Type: "DC Cezalandırma" }) 
    if(cezabilgisi && cezabilgisi.Staff !== message.author.id && message.guild.members.cache.get(cezabilgisi.Staff) && !message.member.permissions.has("ADMINISTRATOR") && (roller.sorunÇözmeciler && !roller.sorunÇözmeciler.some(x => message.member.roles.cache.has(x))) && !roller.kurucuRolleri.some(x => message.member.roles.cache.has(x))) 
    return message.channel.send({embeds: [new richEmbed().açıklama(` Bu ceza ${cezabilgisi.Staff ? message.guild.members.cache.get(cezabilgisi.Staff) ? `${message.guild.members.cache.get(cezabilgisi.Staff)} (\`${cezabilgisi.Staff}\`)` : `${cezabilgisi.Staff}` :  `${cezabilgisi.Staff}`} Tarafından cezalandırılmış. **Bu Cezayı Açman Münkün Değil!**`).altBaşlık("yaptırım yapılan cezada yaptırımı yapan yetkili işlem uygulayabilir.")]})
    await Punitives.updateOne({ No: cezakontrol.No }, { $set: { "Active": false, Expried: Date.now(), Remover: message.member.id} }, { upsert: true })
    if(await DC.findById(cartelcim.id)) {
        await DC.findByIdAndDelete(cartelcim.id)
    }
    if(cartelcim && cartelcim.manageable) await cartelcim.roles.remove(roller.dcCezalıRolü).catch(err => {});;
    await message.reply(`${message.guild.emojiyiBul(emojiler.onay_cartel)} Başarıyla ${cartelcim} kişisinin (\`#${cezakontrol.No}\`) ceza numaralı ${aktivite} cezası kaldırıldı!`)
    if(cartelcim) cartelcim.send({embeds: [ new richEmbed().açıklama(`${message.author} tarafından <t:${String(Date.now()).slice(0, 10)}:R> \`#${cezakontrol.No}\` ceza numaralı ${aktivite} cezası kaldırıldı.`)]}).catch(x => {
        
    });
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    }
};