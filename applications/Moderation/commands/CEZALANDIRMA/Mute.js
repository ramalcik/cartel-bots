const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");
const Mute = require('../../../../database/Schemas/Punitives.Mutes');
const voiceMute = require('../../../../database/Schemas/Punitives.Vmutes');
const ms = require('ms');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
let selectSebep;
let selectMute;
const getLimitVoiceMute = new Map();
const getLimitMute = new Map()
module.exports = {
    name: "mute",
    command: ["chatmute", "voicemute","sesmute","sustur","sessustur","vmute","cmute","metinsustur","chatsustur","v-mute","c-mute"],
    aliases: "mute <@cartel/ID>",
    description: "Belirlenen üyeyi ses ve metin kanallarında susturur.",
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
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(cartelcim.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(!cartelcim.manageable) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.dokunulmaz)]})
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    const sebeps = [
        { label: "Kışkırtma, Trol, Dalgacı ve Ortam Bozucu Davranış", description: "10 Dakika", emoji: {name: "1️⃣"} , value: "1", date: "10m", type: 5},
        { label: "Dizi, Film ve Hikayeler Hakkında Spoiler Vermek", description: "5 Dakika", emoji: {name: "2️⃣"} ,value: "2", date: "5m", type: 5},
        { label: "Küçümseyici Ve Aşalayıcı Davranış", description: "20 Dakika", emoji: {name: "3️⃣"} ,value: "3", date: "20m", type: 5},
        { label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", description: "20 Dakika", emoji: {name: "4️⃣"} ,value: "4", date: "20m", type: 5},
        { label: "Ailevi Değerlere Küfür/Hakaret", description: "15 Dakika", emoji: {name: "5️⃣"} ,value: "5", date: "15m", type: 5},
        { label: `Ortamı (${ayarlar.serverName}) Kötülemek`, description: "30 Dakika", emoji: {name: "6️⃣"} ,value: "6", date: "30m", type: 5},
        { label: "Seste Yaşanan Olayları Chat'e Yansıtmak ve Uzatmak", description: "10 Dakika", emoji: {name: "7️⃣"} ,value: "7", date: "10m", type: 5},
        
        { label: "Kışkırtma, Trol, Dalgacı ve Ortam Bozucu Davranış", description: "10 Dakika", emoji: {name: "1️⃣"} , value: "8", date: "10m", type: 4},
        { label: "Küçümseyici Ve Aşalayıcı Davranış", description: "20 Dakika", emoji: {name: "2️⃣"} ,value: "9", date: "20m", type: 4},
        { label: "Özel Odalara Uyarılmalara Rağmen İzinsiz Giriş", description: "30 Dakika", emoji: {name: "3️⃣"} ,value: "10", date: "30m", type: 4},
        { label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", description: "20 Dakika", emoji: {name: "4️⃣"} ,value: "11", date: "20m", type: 4},
        { label: "Soundpad, Efekt ve Ses Programları Kullanımı", description: "10 Dakika", emoji: {name: "5️⃣"} ,value: "12", date: "10m", type: 4},
        { label: "Ailevi Değerlere Küfür/Hakaret", description: "15 Dakika", emoji: {name: "6️⃣"} ,value: "13", date: "15m", type: 4},
        { label: `Ortamı (${ayarlar.serverName}) Kötülemek`, description: "30 Dakika", emoji: {name: "7️⃣"} ,value: "14", date: "30m", type: 4} 
    ]
    let chatMuteButton = new MessageButton()
    .setCustomId(`chatmute`)
    .setLabel(`Metin Kanallarında ${roller.muteHammer.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  || message.member.permissions.has('ADMINISTRATOR') ? await Mute.findById(cartelcim.id) ? `(Aktif Cezası Var!)` : getLimitMute.get(message.member.id) >= ayarlar.muteLimit ? `(Limit ${getLimitMute.get(message.member.id)}/${ayarlar.muteLimit})` : `${!roller.kurucuRolleri.some(x => message.member.roles.cache.has(x)) && !sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !message.member.permissions.has('ADMINISTRATOR') ? Number(ayarlar.muteLimit) ? `(Limit: ${getLimitMute.get(message.member.id) || 0}/${ayarlar.muteLimit})`: `` : ``}` : "(Yetki Yok)"}`)
    .setEmoji(message.guild.emojiyiBul(emojiler.chatSusturuldu))
    .setStyle('SECONDARY')
    .setDisabled(roller.muteHammer.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  || message.member.permissions.has('ADMINISTRATOR') ? await Mute.findById(cartelcim.id) ? true : getLimitMute.get(message.member.id) >= ayarlar.muteLimit ? true : false : true)
    let voiceMuteButton = new MessageButton()
    .setCustomId(`voicemute`)
    .setLabel(`Ses Kanallarında ${roller.voiceMuteHammer.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  || message.member.permissions.has('ADMINISTRATOR') ? await voiceMute.findById(cartelcim.id) ? `(Aktif Cezası Var!)` : getLimitVoiceMute.get(message.member.id) >= ayarlar.voiceMuteLimit ? `(Limit Doldu ${getLimitVoiceMute.get(message.member.id)}/${ayarlar.voiceMuteLimit})` : `${!roller.kurucuRolleri.some(x => message.member.roles.cache.has(x)) && !sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !message.member.permissions.has('ADMINISTRATOR') ? Number(ayarlar.voiceMuteLimit) ? `(Limit: ${getLimitVoiceMute.get(message.member.id) || 0}/${ayarlar.voiceMuteLimit})`: `` : ``}` : "(Yetki Yok)"}`)
    .setEmoji(message.guild.emojiyiBul(emojiler.sesSusturuldu))
    .setStyle('SECONDARY')
    .setDisabled(roller.voiceMuteHammer.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  || message.member.permissions.has('ADMINISTRATOR') ? await voiceMute.findById(cartelcim.id) ? true : getLimitVoiceMute.get(message.member.id) >= ayarlar.voiceMuteLimit ? true : false : true)
    let iptalButton =  new MessageButton()
    .setCustomId(`iptal`)
    .setLabel('İşlemi İptal Et')
    .setEmoji(message.guild.emojiyiBul(emojiler.no_cartel))
    .setStyle('DANGER')
    let muteOptions = new MessageActionRow().addComponents(
            chatMuteButton,
            voiceMuteButton,
            iptalButton,
    );

    let msg = await message.reply({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.displayAvatarURL({dynamic: true})).açıklama(`Belirtilen ${cartelcim} kişiyi hangi türde susturmak istiyorsun?`)], components: [muteOptions]}).catch(err => {})

    const filter = i => i.user.id == message.member.id 
    const collector = msg.createMessageComponentCollector({ filter,  errors: ["time"], max: 3, time: 30000 })

    collector.on('collect', async i => {
        if (i.customId === `chatmute`) {
        selectMute = 5
        i.update({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.displayAvatarURL({dynamic: true})).açıklama(`Belirlenen ${cartelcim} isimli kişisini hangi sebep ile **metin kanallarından** susturmamı istiyorsun?`)], components: [new MessageActionRow().addComponents(
            new MessageSelectMenu()
            .setCustomId(`sebep`)
            .setPlaceholder(`Susturmak istediğiniz sebebi seçiniz.`)
            .addOptions([
                sebeps.filter(x => x.type == 5)
            ]),
        )]})
        }
        if (i.customId === `voicemute`) {
            selectMute = 4
            i.update({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.displayAvatarURL({dynamic: true})).açıklama(`Belirlenen ${cartelcim} isimli kişisini hangi sebep ile **ses kanallarından** susturmamı istiyorsun?`)], components: [new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId(`sebep`)
                .setPlaceholder(`Susturmak istediğiniz sebebi seçiniz.`)
                .addOptions([
                    sebeps.filter(x => x.type == 4)
                ]),
            )]})
            }
        if (i.customId === `sebep`) {
           let seçilenSebep = sebeps.find(x => x.value == i.values[0])
           if(seçilenSebep) {
               if(selectMute == 4) {
                if(Number(ayarlar.voiceMuteLimit)) {
		let voiceMuteCheck = await voiceMute.findById(cartelcim.id)
		if(voiceMuteCheck) return await i.reply({content: `Belirtiğin ${cartelcim} kişisinin, aktif bir susturulma cezası mevcut!`, ephemeral: true}),msg.delete().catch(err => {}),message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
                    if(!message.member.permissions.has('ADMINISTRATOR') && !sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) {
                        getLimitVoiceMute.set(`${message.member.id}`, (Number(getLimitVoiceMute.get(`${message.member.id}`) || 0)) + 1)
                            setTimeout(() => {
                                getLimitVoiceMute.set(`${message.member.id}`, (Number(getLimitVoiceMute.get(`${message.member.id}`) || 0)) - 1)
                            },1000*60*5)
                        }
                    }
                }
               if(selectMute == 5) {
		let chatMuteCheck = await Mute.findById(cartelcim.id)
		if(chatMuteCheck) return await i.reply({content: `Belirtiğin ${cartelcim} kişisinin, aktif bir susturulma cezası mevcut!`, ephemeral: true}),msg.delete().catch(err => {}),message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
                if(Number(ayarlar.muteLimit)) {
                    if(!message.member.permissions.has('ADMINISTRATOR') && !sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) {
                        getLimitMute.set(`${message.member.id}`, (Number(getLimitMute.get(`${message.member.id}`) || 0)) + 1)
                            setTimeout(() => {
                                getLimitMute.set(`${message.member.id}`, (Number(getLimitMute.get(`${message.member.id}`) || 0)) - 1)
                            },1000*60*5)
                        }
                    }
                }
                i.deferUpdate()  
                msg.delete().catch(err => {})
                message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
                const cezalandr = require("../../../../database/Schemas/Client.Rapor.System");
                await cezalandr.updateOne({ $inc: { "Cezalandırmalar.VoiceMute": 1 }})
              return cartelcim.addPunitives(seçilenSebep.type, message.member, seçilenSebep.label, message, seçilenSebep.date)
                  } else {
               return i.update({components: [], embeds: [ new richEmbed().açıklama(`İşlem sırasında hata oluştu lütfen bot sahibine başvurun.`)]})
           }
         }
        if (i.customId === `iptal`) {
            msg.delete().catch(err => {})
            return await i.reply({ content: `Başarıyla mute işlemleri menüsü kapatıldı.`, components: [], embeds: [], ephemeral: true });
        }
    });
    collector.on("end", async i => {
        msg.delete().catch(err => {})
    })

    }
};



function yetkiKontrol(message, type = 0) {
    if(type = 1) if(roller.voiceMuteHammer.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  || message.member.permissions.has('ADMINISTRATOR')) return true
    
    if(type = 2) if(roller.muteHammer.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  || message.member.permissions.has('ADMINISTRATOR')) return true
}