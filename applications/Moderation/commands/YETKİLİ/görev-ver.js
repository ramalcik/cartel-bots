const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu, Util } = require("discord.js");
const Stats = require('../../../../database/Schemas/Plugins/Client.Users.Stats')
const InviteData = require('../../../../database/Schemas/Global.Guild.Invites');
const Users = require('../../../../database/Schemas/Client.Users');
const Upstaffs = require('../../../../database/Schemas/Plugins/Client.Users.Staffs');
const Tasks = require('../../../../database/Schemas/Plugins/Client.Users.Tasks');
const moment = require('moment');
const ms = require('ms')
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
require('moment-duration-format');
require('moment-timezone');
const table = require('table');
const { Modal, TextInputComponent, SelectMenuComponent } = discordModals = require('discord-modals');
discordModals(client)
let rolId;
let periyod;
let ödül;
module.exports = {
    name: "task",
    command: ["görevsistemi","görev-yönetim","görevyönetimi"],
    aliases: "görevyönetim",
    description: "Belirlenen üye veya kullanan üye eğer ki yetkiliyse onun yetki atlama bilgilerini gösterir.",
    category: "kurucu",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.yetkiliSesSureCevir = (date) => { return moment.duration(date).format('H'); };

    client.on('modalSubmit', async (modal) => {
      let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
      if(!guild) {
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
      }
      let ramalcim = guild.members.cache.get(modal.user.id)
      if(!ramalcim)  {
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
      }
      if(modal.customId == "myModal") {
        let bilgi = {
          rol: modal.getTextInputValue("rolId"),
          ödül: modal.getTextInputValue("ödül"),
          periyod: modal.getTextInputValue("t_selectInformationType") ? modal.getTextInputValue("t_selectInformationType") : "unlimited",
        }
  
        if(bilgi && bilgi.rol && bilgi.periyod && bilgi.ödül) {
            let rol = guild.roles.cache.get(bilgi.rol) || guild.roles.cache.find(x => bilgi.rol.includes(x.name))
            if(!rol) {
              await modal.deferReply({ ephemeral: true })
              return await modal.followUp({content: `Belirtilen ID veya isimde bir rol bulunamadı.` , ephemeral: true })
            } 
            let Row = new MessageActionRow().addComponents(
              new MessageButton()
                .setStyle("SECONDARY")
                .setLabel("Gereksinim Ekle/Güncelle")
                .setCustomId("gereksinimEkleme"),
              new MessageButton()
                .setStyle("DANGER")
                .setEmoji(guild.emojiyiBul(emojiler.no_ramal))
                .setCustomId("iptalEt")
                .setLabel("Görev Kurulumunu Sonlandır")
            )
            await modal.reply({components: [Row], embeds: [new richEmbed().açıklama(`**Merhaba!** ${ramalcim.user.username}
Şimdi sırada ${rol} görevine gereksinim eklemede. Ekledikten sonra senin için görevleri dağıtacağım. Cevap vermen için "**30 Saniye**" süren var.`)], ephemeral: true })
            var filter = (i) => i.user.id == ramalcim.id
            let collector = modal.channel.createMessageComponentCollector({filter: filter, max: 1, time: 30000})
            collector.on('collect', async (i) => {
              
              if(i.customId == "gereksinimEkleme") {
         
                let setTasks = new Modal()
                .setCustomId('ramalKe')
                .setTitle('Görev Gereksinimi Ekle')
                .addComponents(
                  new TextInputComponent()
                  .setCustomId('genelSes')
                  .setLabel("Kaç Saat Seste Durmalı?")
                  .setStyle('SHORT')
                  .setPlaceholder('Örn: 15')
                  .setRequired(true),

                  new TextInputComponent()
                  .setCustomId('publicSes')
                  .setLabel("Public/Streamer/Register'da Kaç Saat Durmalı?")
                  .setStyle('SHORT')
                  .setPlaceholder('Örn: 10')
                  .setRequired(true),
                  
                  new TextInputComponent()
                  .setCustomId('Yetkili')
                  .setLabel("Kaç Yetkili Belirlemeli?")
                  .setStyle('SHORT')
                  .setPlaceholder('Örn: 5'),

                  new TextInputComponent()
                  .setCustomId('Taglı')
                  .setLabel("Kaç Taglı Belirlemeli?")
                  .setStyle('SHORT')
                  .setPlaceholder('Örn: 5'),

                  new TextInputComponent()
                  .setCustomId('Davet')
                  .setLabel("Kaç Davet Yapmalı?")
                  .setStyle('SHORT')
                  .setPlaceholder('Örn: 5')
                 
                )
                rolId = bilgi.rol
                periyod = bilgi.periyod
                ödül = bilgi.ödül
                await i.showModal(setTasks);
                await i.deferUpdate().catch(err => {})
                await modal.editReply({components: [], embeds: [new richEmbed().açıklama(`Görev gerekesinim menüsü açıldı işleme burdan devam edilecek. ${i.guild.emojiyiBul(emojiler.onay_ramal)}`)], ephemeral: true})
              }
  
              if(i.customId == "iptalEt") {
                await i.deferUpdate().catch(err => {})
                await modal.editReply({components: [], embeds: [new richEmbed().açıklama(`Görev oluşturma/güncelleme işlemi başarıyla sonlandırıldı. ${i.guild.emojiyiBul(emojiler.onay_ramal)}`)], ephemeral: true})
              }
  
            })
            collector.on('end', async (collected, reason) => {
              if(reason == "time") {
                await modal.editReply({components: [], embeds: [new richEmbed().açıklama(`İşleminiz zaman aşımı nedeniyle sonlandırıldı. Daha sonra tekrar deneyin!`)], ephemeral: true})
              }
            })
  
        }
      }

      if(modal.customId == "ramalKe") {
        let bilgi = {
          genelses: modal.getTextInputValue("genelSes"),
          publicses: modal.getTextInputValue("publicSes"),
          taglı: modal.getTextInputValue("Taglı") || 0,
          yetkili: modal.getTextInputValue('Yetkili') || 0,
          davet: modal.getTextInputValue('Davet') || 0,
          rol: rolId,
          ödül: ödül,
          süre: periyod
        }
        let rol = guild.roles.cache.get(bilgi.rol)
        if(!rol) {
          console.log(rolId)
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Rol bulunamadığından işlem iptal edildi.` , ephemeral: true })
        }

        let verilenGörev = 0;
        if(bilgi && bilgi.genelses > 0) verilenGörev++
        if(bilgi && bilgi.publicses > 0) verilenGörev++
        if(bilgi && bilgi.taglı > 0) verilenGörev++
        if(bilgi && bilgi.yetkili > 0) verilenGörev++
        if(bilgi && bilgi.davet > 0) verilenGörev++
        let Row = new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle("SECONDARY")
            .setLabel("Görevi Ekle/Güncelle")
            .setCustomId("görevEkle"),
          new MessageButton()
            .setStyle("DANGER")
            .setEmoji(guild.emojiyiBul(emojiler.no_ramal))
            .setCustomId("iptalEt")
            .setLabel("Görevi Iptal Et")
        )
        await modal.reply({components: [Row], embeds: [new richEmbed().açıklama(`**Rol Adı**: ${rol.name} (${rol})
**Roldeki Üye Sayısı**: \` ${rol.members.size} \`
${bilgi.süre == "unlimited" ? "**Görev Süresi**: **\` ~ \`**"  : `**Görev Süresi**: <t:${String(Date.now()+ms(String(bilgi.süre))).slice(0, 10)}:R>`}
**Görev Ödülü**: \` ${bilgi.ödül} Görev Puanı \`
**Toplam Verilen Görev**: \` ${verilenGörev} \`
**Genel Toplam Ses**: \` ${bilgi.genelses} Saat \`
**Public/Streamer/Register Ses**: \` ${bilgi.publicses} Saat \`
${bilgi.yetkili > 0 ? `**Yetkili**: \` ${bilgi.yetkili} Kişi \`` : `- Yetkili Görevi Verilmemiş!`}
${bilgi.taglı > 0 ? `**Taglı**: \` ${bilgi.taglı} Kişi \`` : `- Taglı Görevi Verilmemiş!`}
${bilgi.davet > 0 ? `**Davet**: \` ${bilgi.davet} Kişi \`` : `- Davet Görevi Verilmemiş!`}

Şimdi sırada ${rol} görevine eklediğin gereksinimleri onaylaman gerek. Onaylaman için "**30 Saniye**" süren var.`)], ephemeral: true })
            var filter = (i) => i.user.id == ramalcim.id
            let collector = modal.channel.createMessageComponentCollector({filter: filter, max: 1, time: 30000})
            collector.on('collect', async (i) => {
              
              if(i.customId == "görevEkle") {
                await modal.editReply({components: [], embeds: [new richEmbed().açıklama(`Başarıyla ${rol} görevi verildi/güncelledi ve dağıtım ${rol.members.size} kişi üzerine gerçekleşti. ${i.guild.emojiyiBul(emojiler.onay_ramal)}`)], ephemeral: true})
                let görevData = await Tasks.findOne({Active: true, roleID: rol.id})
                if(görevData) {
                  await Tasks.deleteOne({Active: true, roleID: rol.id})
                }
                if(bilgi.süre == "unlimited") görevPush = { Active: true, AllVoice: bilgi.genelses, publicVoice: bilgi.publicses, Tagged: bilgi.taglı, Staff: bilgi.yetkili, Register: 0, Invite: bilgi.davet, Reward: bilgi.ödül, countTasks: Number(verilenGörev) }
                if(bilgi.süre != "unlimited") görevPush = { Active: true, AllVoice: bilgi.genelses, publicVoice: bilgi.publicses, Tagged: bilgi.taglı, Staff: bilgi.yetkili, Register: 0, Invite: bilgi.davet, Reward: bilgi.ödül, Time: Date.now()+ms(String(bilgi.süre)), countTasks: Number(verilenGörev) }
                let amcıklar = []
                let verilcekÜyeler = rol.members
                rol.members.forEach(async (orospuevladı) => {
                  amcıklar.push(orospuevladı.id)
                  await Stats.updateOne({guildID: sistem.SUNUCU.GUILD, userID: orospuevladı.id}, {$set: {"taskVoiceStats": new Map()}}, {upsert: true})
                  await Users.updateOne({_id: orospuevladı.id}, {$set: { "Staff": true }}, { upsert:true })

                  await Upstaffs.updateOne({_id: orospuevladı.id}, { $set: {"Mission": {
                    Tagged: 0,
                    Register: 0,
                    Invite: 0,
                    Staff: 0,
                    completedMission: 0,
                    CompletedStaff: false,
                    CompletedInvite: false,
                    CompletedAllVoice: false,
                    CompletedPublicVoice: false,
                    CompletedTagged: false,
                    CompletedRegister: false,
                  }, "Yönetim": true }})
                })
                
                await Tasks.updateOne({roleID: rol.id}, {$set: görevPush, $push: {Users: amcıklar}}, {upsert: true})
                let görevBilgilendirme = guild.kanalıBul("görev-bilgi")
                if(görevBilgilendirme) görevBilgilendirme.send({content: `${rol}`, embeds: [new richEmbed().altBaşlık(`${sistem.botSettings.Prefixs[0]}görev komutu ile verilen görevlerinizi listeleyebilirsiniz.`).açıklama(`${rol} rolünde bulunan ${verilcekÜyeler.map(x => x).slice(0,2).join(", ")} ${verilcekÜyeler.size > 2 ? `ve ${verilcekÜyeler.size - 2} daha fazlası...` : ''} üyeye(üyelerine) **${verilenGörev} adet** görev verildi.`)]})
                verilcekÜyeler.forEach(sünnetsizibneler => {
                  sünnetsizibneler.send({embeds: [new richEmbed().açıklama(`${sünnetsizibneler} sana bir görev verildi görev bilgilerini öğrenmek için lütfen **${sistem.botSettings.Prefixs[0]}yetkim** komutundan detaylı bakabilirsin.`)]}).catch(err => {
                  })
                })
              
              
              }
  
              if(i.customId == "iptalEt") {
                await i.deferUpdate().catch(err => {})
                await modal.editReply({components: [], embeds: [new richEmbed().açıklama(`Görev oluşturma/güncelleme işlemi başarıyla iptal edildi. ${i.guild.emojiyiBul(emojiler.onay_ramal)}`)], ephemeral: true})
              }
  
            })
            collector.on('end', async (collected, reason) => {
              if(reason == "time") {
                await modal.editReply({components: [], embeds: [new richEmbed().açıklama(`İşleminiz zaman aşımı nedeniyle sonlandırıldı. Daha sonra tekrar deneyin!`)], ephemeral: true})
              }
            })

      }

      if(modal.customId == "deleteTasks") {
        let getInput = modal.getTextInputValue('tasksId');
        let belirle =  guild.roles.cache.get(getInput) || guild.members.cache.get(getInput)

        if(!belirle) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Rol veya üyelerde bulunamadığından işlem iptal edildi.` , ephemeral: true })
        }
        let logKanal = guild.kanalıBul("görev-log")
        if(guild.roles.cache.get(getInput)) {
            let ramalcimler = belirle.members
            let görevData = await Tasks.findOne({roleID: belirle.id})
            if(!görevData) {
              await modal.deferReply({ ephemeral: true })
              return await modal.followUp({content: `Belirtilen role ait bir görev bulunamadı!` , ephemeral: true })
            }
            if(logKanal) logKanal.send({embeds: [new richEmbed().açıklama(`${belirle} rolününe ait olan ${ramalcimler.map(x => x).slice(0,2).join(", ")} ${ramalcimler.size > 2 ? `ve ${ramalcimler.size - 2} daha fazlası...` : ''} üyeler(üyelerin) <t:${String(Date.now()).slice(0, 10)}:R> ${ramalcim} tarafından tüm görev bilgileri temizlendi.`)]})
            await modal.reply({ephemeral: true, embeds: [new richEmbed().açıklama(`${ramalcimler.map(x => x.user.username).slice(0,2).join(", ")} ${ramalcimler.size > 2 ? `ve ${ramalcimler.size - 2} daha fazlası...` : ''} üyeler(üyelerin) \`${belirle.name}\` rolüne ait görev bilgileri temizleniyor...`)]})
            setTimeout(async () => {
                await Tasks.deleteOne({roleID: belirle.id})
                await modal.editReply({embeds: [new richEmbed().açıklama(`Başarıyla ${belirle} rolüne ait tüm görev verileri temizlendi ve kaldırıldı. ${guild.emojiyiBul(emojiler.onay_ramal)}`)], ephemeral: true})
            }, 2000)
            ramalcimler.forEach(async (ramalcim) => {
              await Tasks.findOneAndUpdate({ $pull: { Users: ramalcim.id }})
              await Upstaffs.updateOne({_id: ramalcim.id}, {$set: {"Mission": {
                Tagged: 0,
                Register: 0,
                Invite: 0,
                Staff: 0,
                completedMission: 0,
                CompletedStaff: false,
                CompletedInvite: false,
                CompletedAllVoice: false,
                CompletedPublicVoice: false,
                CompletedTagged: false,
                CompletedRegister: false,
              }}}, {upsert: true})
              await Stats.updateOne({guildID: sistem.SUNUCU.GUILD, userID: ramalcim.id}, {$set: {"taskVoiceStats": new Map()}}, {upsert: true})

          })
        } else if(guild.members.cache.get(getInput)) {
          let görevData = await Tasks.findOne({ roleID: belirle.roles.hoist ? belirle.roles.hoist.id : 0 }) || await Tasks.findOne({ roleID: belirle.roles.highest ? belirle.roles.highest.id : 0 })
          if(!görevData) {
            await modal.deferReply({ ephemeral: true })
            return await modal.followUp({content: `Belirtilen üyeye ait bir görev bulunamadı!` , ephemeral: true })
          }
          await Tasks.findOneAndUpdate({ $pull: { Users: belirle.id }})
          await Upstaffs.updateOne({_id: belirle.id}, {$set: {"Mission": {
            Tagged: 0,
            Register: 0,
            Invite: 0,
            Staff: 0,
            completedMission: 0,
            CompletedStaff: false,
            CompletedInvite: false,
            CompletedAllVoice: false,
            CompletedPublicVoice: false,
            CompletedTagged: false,
            CompletedRegister: false,
          }} }, {upsert: true})
           await Stats.updateOne({guildID: sistem.SUNUCU.GUILD, userID: belirle.id}, {$set: {"taskVoiceStats": new Map()}}, {upsert: true})
           if(logKanal) await logKanal.send({embeds: [new richEmbed().açıklama(`${guild.emojiyiBul(emojiler.onay_ramal)} ${belirle} kişisinin <t:${String(Date.now()).slice(0, 10)}:R> ${ramalcim} tarafından tüm görevleri temizlendi.`)]})
           await modal.reply({ephemeral: true, embeds: [new richEmbed().açıklama(`${guild.emojiyiBul(emojiler.onay_ramal)} Şuan da ${belirle} kişisine ait görev verileri temizleniyor...`)]})
           setTimeout(async () => {
               await modal.editReply({embeds: [new richEmbed().açıklama(`Başarıyla ${belirle} kişisine ait tüm görev verileri temizlendi. ${guild.emojiyiBul(emojiler.onay_ramal)}`)], ephemeral: true})
           }, 2000)
        
        }
      }
    })
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    let embed = new richEmbed()
    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !message.member.permissions.has("ADMINISTRATOR") && !roller.kurucuRolleri.some(x => message.member.roles.cache.has(x))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let process = ["ver", "temizle", "listele"]
    let seçenek = args[0]
    let Row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Görev Oluştur/Güncelle")
        .setCustomId("setTask"),

        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Görev Temizle/Kaldır")
        .setCustomId("deleteTask"),

        new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Görevleri Listele")
        .setCustomId("viewTasks")
 

    )
    message.reply({embeds: [new richEmbed().açıklama(`Aşağıda bulunan düğmeler ile görev sistemine ekleme, güncelleme ve silme işlemlerini gerçekleştirebilirsin.`)], components: [Row]}).then(async (msg) => {
      let filter = (i) => i.user.id == message.author.id
      let collector = msg.createMessageComponentCollector({filter: filter, max:1, time: 30000})
      collector.on('collect', async (i) => {
        if(i.customId == "deleteTask") {
          let deleteTasks = new Modal()
          .setCustomId('deleteTasks')
          .setTitle('Görev Temizle/Kaldır')
          .addComponents(
            new TextInputComponent()
            .setCustomId('tasksId')
            .setLabel("Rol ID/Üye ID")
            .setStyle('SHORT')
            .setPlaceholder('Silincek görev rolü veya temizlencek üye bilgisi girin.')
            .setRequired(true)
          )
        
         
          await i.showModal(deleteTasks);
          message.react(message.guild.emojiyiBul("985341193745473536"))
        }
        if(i.customId == "viewTasks") {
          message.react(message.guild.emojiyiBul(emojiler.onay_ramal) ? message.guild.emojiyiBul(emojiler.onay_ramal).id : undefined).catch(err => {})
          i.deferUpdate().catch(err => {})
          await Tasks.find({}).exec(async (err, res) => {
            if(err) return message.reply('Hata: `Bazı hatalar oluştu :(`')
            if(!res) return message.reply(`${ayarlar.serverName} sunucusuna ait görev bilgisi veritabanında bulunamadı.`).then(msg => {
              setTimeout(() => {
                msg.delete().catch(err => {})
              }, 5000)
            })
            if(res && res.length <= 0) return message.reply(`${ayarlar.serverName} sunucusuna ait görev bilgisi veritabanında bulunamadı.`).then(msg => {
              setTimeout(() => {
                msg.delete().catch(err => {})
              }, 5000)
            })
            let data = [["ID","Rol İsmi", "Tüm Ses Saati","Diğer Ses Saati", "Davet", "Taglı", "Yetkili","Ödül"]];
            data = data.concat(res.map((value, index) => {          
                return [
                    `#${index + 1}`,
                    `${message.guild.roles.cache.get(value.roleID) ? message.guild.roles.cache.get(value.roleID).name : "@Rol Yok!"}`,
                    `${value.AllVoice} Saat`,
                    `${value.publicVoice} Saat`,
                    `${value.Invite}`,
                    `${value.Tagged}`,
                    `${value.Staff}`,
                    `${value.Reward}`,
                ]
            }));
            let veriler = table.table(data, {
              border: {
                topBody: `─`,
                topJoin: `┬`,
                topLeft: `┌`,
                topRight: `┐`,
            
                bottomBody: `─`,
                bottomJoin: `┴`,
                bottomLeft: `└`,
                bottomRight: `┘`,
            
                bodyLeft: `│`,
                bodyRight: `│`,
                bodyJoin: `│`,
            
                joinBody: `─`,
                joinLeft: `├`,
                joinRight: `┤`,
                joinJoin: `┼`
              },
              drawHorizontalLine: function (index, size) {
                  return index === 0 || index === 1 || index === size;
              }
           });
           message.channel.send({content: `Aşağıda **${ayarlar.serverName}** sunucusuna ait aktif görevler listelenmektedir.`})
           const arr = Util.splitMessage(veriler, { maxLength: 2000, char: "\n" });
           for (const newText of arr) {
             message.channel.send(`\`\`\`${newText}\`\`\``)
           }
          })
        }
        if(i.customId == "setTask") {
          let setTasks = new Modal()
          .setCustomId('myModal')
          .setTitle('Görev Oluştur/Güncelle')
          .addComponents(
            new TextInputComponent()
            .setCustomId('rolId')
            .setLabel("Rol ID/İsmi")
            .setStyle('SHORT')
            .setPlaceholder('Görev verilecek rol belirtin.')
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('ödül')
            .setLabel("Görev Ödülü")
            .setStyle('SHORT')
            .setPlaceholder(`Görev ödülü belirleyin.`)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('otoYukseltimTuru')
            .setLabel("Yükseltim Türü")
            .setStyle('SHORT')
            .setPlaceholder(`AUTO/PERM/YAPAN/YAPMAYAN/TELAFI/MEETING`)
            .setRequired(true),
            new TextInputComponent() 
            .setCustomId('t_selectInformationType')
            .setLabel("Görev Süresi")
            .setStyle("SHORT")
            .setPlaceholder("Görev süresini seçmelisin. Sınırsız için boş bırakın. Örn: 1d")
            .setRequired(false),
          )
         
          await i.showModal(setTasks);
   

        } 
      })

      collector.on('end', (i, reason) => {
        msg.delete().catch(err => {})
        if(reason == "time") message.react(message.guild.emojiyiBul(emojiler.no_ramal) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
      })
    })
   
 }
};




