const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = Discord = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

module.exports = {
    name: "yetkilidurum",
    command: ["yetkili-ses","ses-yetkili","yetkili-durum","yetkilisay","yetkili-say","ysay"],
    aliases: "yetkilisay",
    description: "",
    category: "kurucu",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} msg 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    if(!roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]}) 
    let Row = new MessageActionRow().addComponents(
        new MessageButton()
        .setLabel("Aktif Seste Olmayanlar")
        .setStyle("PRIMARY")
        .setCustomId("aktifseste"),
        new MessageButton()
        .setLabel("Toplam Seste Olmayanlar")
        .setStyle("PRIMARY")
        .setCustomId("toplam"),
        new MessageButton()
         .setLabel(`Toplam Yetkili Bilgisi`)
         .setStyle("SUCCESS")
         .setDisabled(false)
         .setCustomId("testt")
    )
    message.channel.send({embeds: [new richEmbed().açıklama(`Aşağıda bulunan düğmelerden yetkili aktifliğinin filtresini seçiniz.`)], components: [Row]}).then(async (msg) => {
        var filter = (i) => i.user.id == message.member.id
        let collector = msg.createMessageComponentCollector({filter: filter, max: 1})
        collector.on("collect", async (i) => {
            if(i.customId == "testt"){
                let Aloo = []
                let altyetkiler = message.guild.roles.cache.get(roller.ilkYetki)
                if(altyetkiler) altyetkiler.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri)).map(cartelcim => {
                    if(!Aloo.includes(cartelcim.id)) Aloo.push(cartelcim.id)
                })
                                     
                                         roller.altYönetimRolleri.some(x => {
                                             let rol = message.guild.roles.cache.get(x)
                                             rol.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri)).forEach(cartelcim => {
                                              if(!Aloo.includes(cartelcim.id)) Aloo.push(cartelcim.id)
                                             })
                                         })
                                         roller.yönetimRolleri.some(x => {
                                             let rol = message.guild.roles.cache.get(x)
                                             rol.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri)).forEach(cartelcim => {
                                              if(!Aloo.includes(cartelcim.id)) Aloo.push(cartelcim.id)
                                             })
                                         })
                                     
                                         roller.üstYönetimRolleri.some(x => {
                                             let rol = message.guild.roles.cache.get(x)
                                             rol.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri)).forEach(cartelcim => {
                                              if(!Aloo.includes(cartelcim.id)) Aloo.push(cartelcim.id)
                                             })
                                         })
                                         roller.kurucuRolleri.some(x => {
                                             let rol = message.guild.roles.cache.get(x)
                                             rol.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri) ).forEach(cartelcim => {
                                              if(!Aloo.includes(cartelcim.id)) Aloo.push(cartelcim.id)
                                             })
                                         })
                                         message.channel.send(`${message.guild.emojiyiBul(emojiler.serverTag)} Aşağı da **${message.guild.name}** sunucusunun bulunan tüm yetkilileri listelenmektedir. (Yetkili sayısı: **${Aloo ? Aloo.length : 0}**)`).then(x => {
                                            const arr = Discord.Util.splitMessage(`${Aloo.length >= 1 ? Aloo.map(x => `<@${x}>`).join(", ") : "Tüm yetkililer seste."}`, { maxLength: 1950, char: "," });
                                            arr.forEach(element => {
                                                message.channel.send(Discord.Formatters.codeBlock("js", element));
                                            });
                                          })
            }
            if(i.customId == "aktifseste") {
                let GUILD_MEMBERS = await client.guilds.cache.get(message.guild.id).members.fetch({ withPresences: true })

                            let Genel = []
                             let altyetkiler = message.guild.roles.cache.get(roller.ilkYetki)
                             if(altyetkiler) altyetkiler.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri)  && cartelcim.presence && cartelcim.presence?.status !== "offline" && !cartelcim.voice.channel).map(cartelcim => {
                                if(!Genel.includes(cartelcim.id)) Genel.push(cartelcim.id)
                             })
                         
                             roller.altYönetimRolleri.some(x => {
                                 let rol = message.guild.roles.cache.get(x)
                                 rol.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri) && cartelcim.presence && cartelcim.presence?.status !== "offline" && !cartelcim.voice.channel).forEach(cartelcim => {
                                  if(!Genel.includes(cartelcim.id)) Genel.push(cartelcim.id)
                                 })
                             })
                             roller.yönetimRolleri.some(x => {
                                 let rol = message.guild.roles.cache.get(x)
                                 rol.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri) && cartelcim.presence && cartelcim.presence?.status !== "offline" && !cartelcim.voice.channel).forEach(cartelcim => {
                                  if(!Genel.includes(cartelcim.id)) Genel.push(cartelcim.id)
                                 })
                             })
                         
                             roller.üstYönetimRolleri.some(x => {
                                 let rol = message.guild.roles.cache.get(x)
                                 rol.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri) && cartelcim.presence && cartelcim.presence?.status !== "offline"  && !cartelcim.voice.channel).forEach(cartelcim => {
                                  if(!Genel.includes(cartelcim.id)) Genel.push(cartelcim.id)
                                 })
                             })
                             roller.kurucuRolleri.some(x => {
                                 let rol = message.guild.roles.cache.get(x)
                                 rol.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri) && cartelcim.presence && cartelcim.presence?.status !== "offline" && !cartelcim.voice.channel).forEach(cartelcim => {
                                  if(!Genel.includes(cartelcim.id)) Genel.push(cartelcim.id)
                                 })
                             })
                         
                             //
                         
                             message.channel.send(`${message.guild.emojiyiBul(emojiler.serverTag)} Aşağı da aktif fakat seste olmayan **${message.guild.name}** sunucusunun tüm yetkilileri listelenmektedir. (Seste olmayan yetkili sayısı: **${Genel ? Genel.length : 0}**)`).then(x => {
                               const arr = Discord.Util.splitMessage(`${Genel.length >= 1 ? Genel.map(x => `<@${x}>`).join(", ") : "Tüm yetkililer seste."}`, { maxLength: 1950, char: "," });
                               arr.forEach(element => {
                                   message.channel.send(Discord.Formatters.codeBlock("js", element));
                               });
                             })
            }
            if(i.customId == "toplam") {

                let Genel = []
                 let altyetkiler = message.guild.roles.cache.get(roller.ilkYetki)
                 if(altyetkiler) altyetkiler.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri)   && !cartelcim.voice.channel).map(cartelcim => {
                    if(!Genel.includes(cartelcim.id)) Genel.push(cartelcim.id)
                 })
             
                 roller.altYönetimRolleri.some(x => {
                     let rol = message.guild.roles.cache.get(x)
                     rol.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri)   && !cartelcim.voice.channel).forEach(cartelcim => {
                      if(!Genel.includes(cartelcim.id)) Genel.push(cartelcim.id)
                     })
                 })
                 roller.yönetimRolleri.some(x => {
                     let rol = message.guild.roles.cache.get(x)
                     rol.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri) && !cartelcim.voice.channel).forEach(cartelcim => {
                      if(!Genel.includes(cartelcim.id)) Genel.push(cartelcim.id)
                     })
                 })
             
                 roller.üstYönetimRolleri.some(x => {
                     let rol = message.guild.roles.cache.get(x)
                     rol.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri)   && !cartelcim.voice.channel).forEach(cartelcim => {
                      if(!Genel.includes(cartelcim.id)) Genel.push(cartelcim.id)
                     })
                 })
                 roller.kurucuRolleri.some(x => {
                     let rol = message.guild.roles.cache.get(x)
                     rol.members.filter(cartelcim => !cartelcim.user.bot && !cartelcim.permissions.has('ADMINISTRATOR') && !cartelcim.roles.cache.has(roller.kurucuRolleri) && !cartelcim.voice.channel).forEach(cartelcim => {
                      if(!Genel.includes(cartelcim.id)) Genel.push(cartelcim.id)
                     })
                 })
             
                 //
             
                 message.channel.send(`${message.guild.emojiyiBul(emojiler.serverTag)} Aşağı da seste olmayan **${message.guild.name}** sunucusunun tüm yetkilileri listelenmektedir. (Seste olmayan yetkili sayısı: **${Genel ? Genel.length : 0}**)`).then(x => {
                   const arr = Discord.Util.splitMessage(`${Genel.length >= 1 ? Genel.map(x => `<@${x}>`).join(", ") : "Tüm yetkililer seste."}`, { maxLength: 1950, char: "," });
                   arr.forEach(element => {
                       message.channel.send(Discord.Formatters.codeBlock("js", element));
                   });
                 })
            }
        })
        collector.on("end", i => {
            msg.delete().catch(err => {})
        })
    })
    }
}







