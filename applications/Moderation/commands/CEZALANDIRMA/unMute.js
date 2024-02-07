const { Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Mute = require('../../../../database/Schemas/Punitives.Mutes');
const voiceMute = require('../../../../database/Schemas/Punitives.Vmutes');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "unmute",
    command: ["cunmute", "unMute"],
    aliases: "unmute <@cartel/ID>",
    description: "",
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
    if(!roller.muteHammer.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.voiceMuteHammer.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    if(Number(args[0])) {
        let cezanobul = await Mute.findOne({No: args[0]}) || await voiceMute.findOne({No: args[0]})
        if(cezanobul) args[0] = cezanobul._id
    }
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(cartelcim.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(!cartelcim.manageable) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.dokunulmaz)]})
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    let cezakontrol = await Mute.findById(cartelcim.id)
    if(!cezakontrol) {
        return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username,message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.cezayok)]})
    }
      const chatmute = await Punitives.findOne({ Member: cartelcim.id, Active: true, Type: "Metin Susturulma" })
      if(!chatmute) {
        return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username,message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.cezayok)]})
    }
    const rowc = new MessageActionRow().addComponents(
        new MessageButton().setCustomId("kaldır").setEmoji("✅").setStyle("SECONDARY").setDisabled(false),        
        new MessageButton().setCustomId("kaldırma").setEmoji("❎").setStyle("SECONDARY").setDisabled(false),        
    
    )
    message.channel.send({components: [rowc], embeds: [ new richEmbed().açıklama(`${cartelcim} kişisinin chat mute cezasını kaldırmak istediğinize eminmisiniz?

Cezayı atan yetkili: ${chatmute.Staff ? message.guild.members.cache.get(chatmute.Staff) ? `${message.guild.members.cache.get(chatmute.Staff)} (\`${chatmute.Staff}\`)` : `${chatmute.Staff}` :  `${chatmute.Staff}`}
Ceza başlangıç tarihi: \`${tarihsel(chatmute.Date)}\`
Ceza bitiş tarihi: \`${tarihsel(chatmute.Duration)}\`
Ceza sebebi: ${chatmute.Reason}

    `)]}).then(async (msg) => {
        var filter = (i) => i.user.id == message.member.id
        let collector = msg.createMessageComponentCollector({filter: filter, max: 1})
        collector.on('collect', async (i) => {
            if(i.customId == "kaldır") {
                rowc.components[0].setStyle("SUCCESS").setDisabled(true)
            rowc.components[1].setDisabled(true)
                if(!roller.muteHammer.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().açıklama(`${cartelcim} kişisinin cezasını kaldıramadım.`)]})
                if(chatmute && chatmute.Staff !== message.author.id && message.guild.members.cache.get(chatmute.Staff) && !message.member.permissions.has("ADMINISTRATOR") && (roller.sorunÇözmeciler && !roller.sorunÇözmeciler.some(x => message.member.roles.cache.has(x))) && !roller.kurucuRolleri.some(x => message.member.roles.cache.has(x))) 
                return i.deferUpdate().catch(err => {})
            msg.delete().catch(err => {}),message.reply({embeds: [new richEmbed().açıklama(`Bu ceza ${chatmute.Staff ? message.guild.members.cache.get(chatmute.Staff) ? `${message.guild.members.cache.get(chatmute.Staff)} (\`${chatmute.Staff}\`)` : `${chatmute.Staff}` :  `${chatmute.Staff}`} tarafından cezalandırıldığı için cezayı kaldıramadım.`)]})
                 
                await Punitives.updateOne({ No: chatmute.No }, { $set: { "Active": false, Expried: Date.now(), Remover: message.member.id} }, { upsert: true })
                if(await Mute.findById(cartelcim.id)) {
                    await Mute.findByIdAndDelete(cartelcim.id)
                }
                if(cartelcim && cartelcim.manageable) await cartelcim.roles.remove(roller.muteRolü)
                
                let findChannel = message.guild.kanalıBul("mute-log")
                if(findChannel) findChannel.send({embeds: [new richEmbed().açıklama(`${cartelcim} kişisinin chat mute cezası kaldırıldı.
Cezayı atan yetkili: ${chatmute.Staff ? message.guild.members.cache.get(chatmute.Staff) ? `${message.guild.members.cache.get(chatmute.Staff)} (\`${chatmute.Staff}\`)` : `${chatmute.Staff}` :  `${chatmute.Staff}`}
Ceza başlangıç tarihi: \`${tarihsel(chatmute.Date)}\`
Ceza bitiş tarihi: \`${tarihsel(chatmute.Duration)}\`
Ceza sebebi: \`${chatmute.Reason}\`

`)]})
              
await msg.edit({components: [rowc], embeds: [ new richEmbed().açıklama(`${cartelcim} kişisinin chat mute cezasını kaldırmak istediğinize eminmisiniz?

Cezayı atan yetkili: ${chatmute.Staff ? message.guild.members.cache.get(chatmute.Staff) ? `${message.guild.members.cache.get(chatmute.Staff)} (\`${chatmute.Staff}\`)` : `${chatmute.Staff}` :  `${chatmute.Staff}`}
Ceza başlangıç tarihi: \`${tarihsel(chatmute.Date)}\`
Ceza bitiş tarihi: \`${tarihsel(chatmute.Duration)}\`
Ceza sebebi: \`${chatmute.Reason}\`

Ceza Kaldırıldı. :white_check_mark: 
                
                    `)]})
                
                  
            if(cartelcim) cartelcim.send({embeds: [ new richEmbed().açıklama(`Merhaba ${cartelcim}! sunucumuzda chat mute cezan ${message.member} tarafından kaldırıldı.

Cezayı atan yetkili: ${chatmute.Staff ? message.guild.members.cache.get(chatmute.Staff) ? `${message.guild.members.cache.get(chatmute.Staff)} (\`${chatmute.Staff}\`)` : `${chatmute.Staff}` :  `${chatmute.Staff}`}
Ceza başlangıç tarihi: \`${tarihsel(chatmute.Date)}\`
Ceza bitiş tarihi: \`${tarihsel(chatmute.Duration)}\`
Ceza sebebi: \`${chatmute.Reason}\`

                `)]})
                message.member.Leaders("ceza", 5, {type: "CEZA", user: cartelcim.id})
                message.member.Leaders("sorun", 5, {type: "CEZA", user: cartelcim.id})
                message.member.Leaders("criminal", 5, {type: "CEZA", user: cartelcim.id})
                
              

            }
}

    )
}
    )
}
}
