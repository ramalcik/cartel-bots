const { Client, Message, MessageEmbed} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Users = require('../../../../database/Schemas/Client.Users');
const Forcebans = require('../../../../database/Schemas/Punitives.Forcebans');
const { richEmbed } = require('../../../../base/Funksiyonlar/embed');
module.exports = {
    name: "kalkmazban",
    command: ["cartelban", "uzaoç","forceban","xox","siktirgitamınoğlu","sg"],
    aliases: "kalkmazban <@cartel/ID> <Sebep>",
    description: "Belirlenen üyeyi sunucudan uzaklaştırır.",
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
    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username)) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.getUser(args[0])
    let sunucudabul = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(sunucudabul && sunucudabul.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(sunucudabul && message.member.roles.highest.position <= sunucudabul.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    let sebep = args.splice(1).join(" ");
    if(!sebep) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.sebep)]});
    if(sunucudabul) {
        cartelcim.addPunitives(1, message.member, sebep, message)
        message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    } else {
        let cezano = await Punitives.countDocuments()
        cezano = cezano == 0 ? 1 : cezano + 1;
        let ceza = new Punitives({ 
            No: cezano,
            Member: cartelcim.id,
            Staff: message.member.id,
            Type: "Kalkmaz Yasaklama",
            Reason: sebep,
            Date: Date.now()
        })
        ceza.save().catch(err => {})  
        islem = new Forcebans({
            No: cezano,
            _id: cartelcim.id,
        })
        await islem.save();
        let findedChannel = message.guild.kanalıBul("açılmaz-ban-log")
        if(findedChannel) findedChannel.send({embeds: [new richEmbed().altBaşlık(`Ceza Numarası: #${cezano}`, cartelcim.avatarURL({dynamic: true})).açıklama(`${cartelcim.toString()} kişisine, <t:${String(Date.now()).slice(0, 10)}:R> \`${sebep}\` nedeniyle işlem uygulandı.`)]})
        await message.channel.send(`${message.guild.emojiyiBul(emojiler.Yasaklandı)} ${cartelcim.toString()} kişiye \`${sebep}\` sebebiyle "__Kalkmaz(**BOT**) Yasaklama__" türünde ceza-i işlem uygulandı. (\`Ceza Numarası: #${cezano}\`)`)
        await message.guild.members.ban(cartelcim.id, { reason: `#${ceza.No} (${ceza.Reason})` }).catch(err => {})
        await Users.updateOne({ _id: message.member.id } , { $inc: { "Uses.Forceban": 1 } }, {upsert: true})
        message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    }
    }
};

  