const { Client, Message, MessageEmbed} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Users = require('../../../../database/Schemas/Client.Users');
const Jail = require('../../../../database/Schemas/Punitives.Jails');
const { richEmbed } = require('../../../../base/Funksiyonlar/embed');
const getLimit = new Map();

module.exports = {
    name: "ban",
    command: ["yasakla", "sg", "ananısikerim", "underworld"],
    aliases: "ban <@cartel/ID> <Sebep>",
    description: "Belirlenen üyeyi sunucudan uzaklaştırır.",
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
    if(!ayarlar && !roller && !roller.banHammer || !roller.üstYönetimRolleri || !roller.yönetimRolleri || !roller.kurucuRolleri || !roller.altYönetimRolleri) return message.reply(cevaplar.notSetup)
    if(!roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(xxxx => message.member.roles.cache.has(xxxx)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.getUser(args[0])
    let sunucudabul = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(sunucudabul && sunucudabul.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(sunucudabul && message.member.roles.highest.position <= sunucudabul.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    if(sunucudabul && roller.Yetkiler.some(rolAra => sunucudabul.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkilinoban)]}); 
    if(getLimit.get(message.member.id) >= ayarlar.banLimit) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bokyolu)]}).then(s => setTimeout(() => s.delete().catch(err => {}), 7500));
    let sebep = args.splice(1).join(" ");
    if(!sebep) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let bul = await Punitives.findOne({Member: cartelcim.id, Type: "Underworld", Active: true})
    if(bul) return message.channel.send({embeds: [new richEmbed().açıklama(`Belirtilen ${cartelcim} isimli üyenin aktif bir **Underworld** cezası bulunmakta.`)]}).then(x => {
        message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            x.delete()
        }, 7500);
    });

    let cezakontrol = await Jail.findById(cartelcim.id)
    if(cezakontrol) {
        await Jail.deleteOne({ _id: cartelcim.id })
        await Punitives.updateOne({ No: cezakontrol.No }, { $set: { "Active": false, Expried: Date.now(), Remover: message.member.id, Reason: "Underworld'e Çevrildi!",} }, { upsert: true })
    };

    if(sunucudabul) {
        cartelcim.removeStaff()
        cartelcim.dangerRegistrant()
        cartelcim.addPunitives(8, message.member, sebep, message)
        message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    } else {
        let cezano = await Punitives.countDocuments()
        cezano = cezano == 0 ? 1 : cezano + 1;
        let ceza = new Punitives({ 
            No: cezano,
            Member: cartelcim.id,
            Staff: message.member.id,
            Type: "Underworld",
            Reason: sebep,
            Date: Date.now()
        })
        ceza.save().catch(err => {})
        let findedChannel = message.guild.kanalıBul("underworld-log")
        if(findedChannel) findedChannel.send({embeds: [new richEmbed().altBaşlık(`${message.guild.name ? `${message.guild.name} •` : ''} Ceza Numarası: #${cezano}`,message.guild.name ? message.guild.iconURL({dynamic: true}) : cartelcim.avatarURL({dynamic: true})).açıklama(`${cartelcim.toString()} üyesine, <t:${String(Date.now()).slice(0, 10)}:R> \`${sebep}\` nedeniyle ${message.member} tarafından ceza-i işlem uygulandı.`)]})
        await message.channel.send(`Başarıyla ${cartelcim.toString()} isimli kullanıcıya \`${sebep}\` sebebiyle "__Underworld__" türünde ceza-i işlem uygulandı. (\`Ceza Numarası: #${cezano}\`)`)
       
        await Users.updateOne({ _id: message.member.id } , { $inc: { "Uses.Underworld": 1 } }, {upsert: true})
        message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    }
    if(Number(ayarlar.banLimit)) {
        if(!message.member.permissions.has('ADMINISTRATOR') && !sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) {
            getLimit.set(`${message.member.id}`, (Number(getLimit.get(`${message.member.id}`) || 0)) + 1)
            setTimeout(() => {
                getLimit.set(`${message.member.id}`, (Number(getLimit.get(`${message.member.id}`) || 0)) - 1)
            },1000*60*5)
        }
    }
    }
};

  