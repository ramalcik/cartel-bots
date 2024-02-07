const { Client, Message, Util, Intents, MessageActionRow, MessageButton, MessageAttachment, MessageSelectMenu} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives')
const Users = require('../../../../database/Schemas/Client.Users')
const GUARDS_SETTINGS = require('../../../../database/Schemas/Guards/Global.Guard.Settings')
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings')
const { richEmbed } = require('../../../../base/Funksiyonlar/embed')
const { joinVoiceChannel } = require('@discordjs/voice')
let BOTS = global.allBots = client.allBots = []
module.exports = {
    name: "client",
    command: ["update"],
    aliases: "",
    description: "",
    category: "-",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: async function (client) {
    let cartelcim = require('../../../../base/Ayarlar/server.json');
    let wel = require("../../../../base/Ayarlar/welcome.json")
let Stat = cartelcim.TOKENLER.Stats
let Moderation = cartelcim.TOKENLER.Moderation
let İnvite = cartelcim.TOKENLER.İnvite
let Central = cartelcim.TOKENLER.Central
let Guard_1 = cartelcim.TOKENLER.Guard_1
let Guard_2 = cartelcim.TOKENLER.Guard_2
let Async = cartelcim.TOKENLER.Sync
let gates = wel.tokens

let allTokens = [gates, Stat, Moderation,İnvite, Central, Guard_1, Guard_2, Async]
let guardSettings = await GUARDS_SETTINGS.findOne({guildID: sistem.SUNUCU.GUILD})
if(!guardSettings) await GUARDS_SETTINGS.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"auditLimit": 10, auditInLimitTime: "2m"}}, {upsert: true})
allTokens.forEach(async (token) => {
    let botClient;
    if(cartelcim.TOKENLER.Dağıtıcılar.includes(token) || Guard_2 == token) {
        botClient = new Client({
            intents: [32767],
          
          })   
          botClient.on("ready", () => {
            setInterval(async () => {
                client.user.setPresence({
                    activities: [{ name: sistem.botStatus.Name, type: sistem.botStatus.type }],
                    status: sistem.botStatus.Status
                });
                const channel = client.channels.cache.get(sistem.SUNUCU.VoiceChannelID)
                joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                    selfDeaf: true,
                    selfMute: false,
                });
            }, 60 * 1000);
        })
         
    } else {
        botClient = new Client({
            intents: [32767],
           
          });

          botClient.on("ready", () => {
            setInterval(async () => {
                client.user.setPresence({
                    activities: [{ name: sistem.botStatus.Name, type: sistem.botStatus.type }],
                    status: sistem.botStatus.Status
                });
                const channel = client.channels.cache.get(sistem.SUNUCU.VoiceChannelID)
                joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                    selfDeaf: true,
                    selfMute: false,
                });
            }, 60 * 1000);
        })
    
    }
      botClient.on("ready", async () => {  
          BOTS.push(botClient)
          let guardSettings = await GUARDS_SETTINGS.findOne({guildID: sistem.SUNUCU.GUILD})
          if(!cartelcim.TOKENLER.Dağıtıcılar.includes(botClient.token)) {
            if(guardSettings && guardSettings.BOTS && !guardSettings.BOTS.includes(botClient.user.id)) {
                await GUARDS_SETTINGS.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"BOTS": botClient.user.id} }, {upsert: true})
            }
          }  
      })
      await botClient.login(token).catch(err => {
      })
})

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    let cartelcim = require('../../../../base/Ayarlar/server.json');
    let wel = require("../../../../base/Ayarlar/welcome.json")
        let Stat = cartelcim.TOKENLER.Stats
    let Moderation = cartelcim.TOKENLER.Moderation
    let İnvite = cartelcim.TOKENLER.İnvite
    let Central = cartelcim.TOKENLER.Central
    let Guard_1 = cartelcim.TOKENLER.Guard_1
    let Guard_2 = cartelcim.TOKENLER.Guard_2
    let Async = cartelcim.TOKENLER.Sync
    let gates = wel.tokens  


    let allTokens = [gates, Stat, Moderation,İnvite, Central, Guard_1, Guard_2, Async]
    let pubTokens = [gates, Stat, Moderation,İnvite, Central, Guard_1, Guard_2, Async]
   
    let OWNBOTS = []

    BOTS.forEach(bot => {
        OWNBOTS.push({
            value: bot.user.id,      
            label: `${bot.user.username}`,
            description: `${bot.user.id}`
        })
    })
    let Row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("selectBot")
        .setPlaceholder("🎄 CLİENTS")
        .addOptions(
            [OWNBOTS]
        )
    )

    let msg = await message.channel.send({embeds: [new richEmbed().renk("RANDOM").üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Aşağıda sıralanmakta olan botların ismini, profil fotoğrafını, durumunu ve hakkındasını değişmesini istediğiniz bir botu seçiniz.`)],components: [Row]})
    const filter = i => i.user.id == message.member.id
    const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 35000 })

    collector.on('collect', async (i) => {
        if(i.customId == "selectBot") {
            let type = i.values
            if(!type) return await i.reply({content: "Bir bot veya işlem bulunamadı!", ephemeral: true})

                let botId = i.values
                let botClient = BOTS.find(bot => bot.user.id == type)
                if(!botClient) return await i.reply({content: "Bir bot veya işlem bulunamadı!", ephemeral: true})
                let updateRow = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId("selectAvatar")
                    .setEmoji("")
                    .setLabel("Profil Fotoğrafı Değişikliliği")
                    .setStyle("SECONDARY"),
                    new MessageButton()
                    .setCustomId("selectName")
                    .setEmoji("")
                    .setLabel("İsim Değişikliliği")
                    .setStyle("SECONDARY"),
                    new MessageButton()
                    .setCustomId("selectState")
                    .setEmoji("")
                    .setLabel("Durum Değişikliliği")
                    .setStyle("SECONDARY"),
                )
                msg.delete().catch(err => {})
                await message.channel.send({embeds: [new richEmbed().renk("WHITE").açıklama(`${botClient.user} (**${botClient.user.username}**) isimli bot üzerinde yapmam için bir işlem seçin.`)], components: [
                    updateRow
                ]}).then(msg => {
                    const filter = i => i.user.id == message.member.id 
                    const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 35000 })
                    collector.on("collect", async (i) => {
                        let botClient = BOTS.find(bot => bot.user.id == botId)
                        if(!botClient) return await i.reply({content: "Bir bot veya işlem bulunamadı!", ephemeral: true})
                                                if(i.customId == "selectAvatar") {
                             msg.edit({embeds: [new richEmbed().renk("WHITE").açıklama(`${botClient.user} isimli botun yeni profil resmini yükleyin veya bağlantısını girin.`)],components: []})
                            var isimfilter = m => m.author.id == message.member.id
                            let col = msg.channel.createMessageCollector({filter: isimfilter, time: 60000, max: 1, errors: ["time"]})

                            col.on('collect', async (m) => {
                                if (m.content == ("iptal" || "i")) {
                                    msg.delete().catch(err => {});
                             
                                    await i.reply({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`İşlemi iptal ettim.`)]})
                                    return;
                                  };
                                  let eskinick = botClient.user.avatarURL({dynamic: true})
                                  let bekle = await message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Lütfen bekleyin....`)]})
                                   let isim = m.content || m.attachments.first().url
                                    if(!isim) {
                                    
                                        msg.delete().catch(err => {});
                                        await i.reply({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Profil resmi belirtilmediğin için işlemi iptal ettim.`)]})
                                        return;
                                    }
                                  botClient.user.setAvatar(isim).then(x => {
                                      bekle.delete().catch(err => {})
                                      msg.delete().catch(err => {})
                                      let logChannel = message.guild.kanalıBul("bot-log")
                                      if(logChannel) logChannel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`${message.member} tarafından ${botClient.user} isimli botun profil resmi değiştirildi.`).setThumbnail(botClient.user.avatarURL())]})
                                      message.channel.send({embeds: [new richEmbed().açıklama(`${botClient.user} isimli botun profil resmini güncelledim!`).üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true}))]}).then(x => {
                                   
                                   })
                                  }).catch(err => {
                                       bekle.delete().catch(err => {})
                                       msg.delete().catch(err => {})
                                      message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`**${botClient.user.username}**, botunun ismini değiştiremedim.
                                      `)]}).then(x => {
                                    
                                   })
                                  })
                            });
                            
                            col.on('end', collected => {
                                msg.delete().catch(err => {});
                            });
                        }
                        if (i.customId == "selectState") {
                            msg.edit({
                                embeds: [new richEmbed()
                                    .üstBaşlık(i.user.username, i.user.avatarURL({ dynamic: true }))
                                    .açıklama(` ${botClient.user} isimli botun yeni durumunu belirtin.`)],
                                components: []
                            });
                        
                            var isimfilter = m => m.author.id == message.member.id;
                            let col = msg.channel.createMessageCollector({
                                filter: isimfilter,
                                time: 60000,
                                max: 1,
                                errors: ["time"]
                            });
                        
                            col.on('collect', async (m) => {
                                if (m.content == ("iptal" || "i")) {
                                    msg.delete().catch(err => {});
                                    await i.reply({ embeds: [new richEmbed().üstBaşlık(i.user.username, i.user.avatarURL({ dynamic: true })).açıklama(`İşlem iptal edildi.`)] });
                                    return;
                                }
                        
                                let eskinick = botClient.user.username;
                                let bekle = await message.channel.send({ embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true })).açıklama(`Lütfen bekleyin....`)] });
                        
                                try {
                                    let isim = m.content;
                                    await botClient.user.setPresence({ activities: [{ name: isim }] });
                        
                                    bekle.delete().catch(err => {});
                                    msg.delete().catch(err => {});
                        
                                    let logChannel = message.guild.kanalıBul("bot-log");
                                    if (logChannel) logChannel.send({ embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true })).açıklama(`${message.member} tarafından ${botClient.user} isimli botun durumu değiştirildi.`)] });
                        
                                    message.channel.send({ embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true })).açıklama(`**${botClient.user}** isimli botun durumunu **${isim}** olarak değiştirdim.`)] }).then(x => {});
                                } catch (err) {
                                    console.error(err);
                                    bekle.delete().catch(err => {});
                                    msg.delete().catch(err => {});
                                    message.channel.send({ embeds: [new richEmbed().üstBaşlık(botClient.user.username, botClient.user.avatarURL({ dynamic: true })).açıklama(`**${botClient.user.username}**, işlem zaman aşımına uğradı.`)] }).then(x => {});
                                }
                            });
                        }
                        if(i.customId == "selectName") {
                            msg.edit({embeds: [new richEmbed().üstBaşlık(i.user.username,i.user.avatarURL({ dynamic: true })).açıklama(`${botClient.user} isimli botun yeni ismini belirtin.`)],components: []})
                            var isimfilter = m => m.author.id == message.member.id
                            let col = msg.channel.createMessageCollector({filter: isimfilter, time: 60000, max: 1, errors: ["time"]})

                            col.on('collect', async (m) => {
                                if (m.content == ("iptal" || "i")) {
                                    msg.delete().catch(err => {});
                                
                                    await i.reply({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true })).açıklama(`İşlemi iptal ettim.`)]})
                                    return;
                                  };
                                  let eskinick = botClient.user.username
                                  let bekle = await message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true })).açıklama(`Lütfen bekleyin....`)]})
                                  let isim = m.content
                                  botClient.user.setUsername(isim).then(x => {
                                      bekle.delete().catch(err => {})
                                      msg.delete().catch(err => {})
                                      let logChannel = message.guild.kanalıBul("bot-log")
                                      if(logChannel) logChannel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true })).altBaşlık(`${tarihsel(Date.now())} tarihinde işleme koyuldu.`).açıklama(`${message.member} tarafından ${botClient.user} isimli botun ismi değiştirildi.\n**${eskinick}** isimli botun ismi **${botClient.user.username}** olarak güncellendi.`)]})
                                      message.channel.send({embeds: [new richEmbed().setAuthor(message.member.user.username, message.member.user.avatarURL({ dynamic: true })).açıklama(`**${eskinick}** isimli botun ismini **${botClient.user.username}** olarak değiştirdim.`)]}).then(x => {
                                      }
                                      )
                                  }).catch(err => {
                                       bekle.delete().catch(err => {})
                                       msg.delete().catch(err => {})
                                      message.channel.send({embeds: [ new richEmbed().setAuthor(message.member.user.username, message.member.user.avatarURL({ dynamic: true })).açıklama(`**${botClient.user.username}**, işlem zaman aşımına uğradı.`)]}).then(x => {
                                      }
                                      )
                                    }
                                  )
                            });
                            
                            col.on('end', collected => {
                                msg.delete().catch(err => {});
                            });
                        }
                    })
                })
   
        }
    })

    collector.on("end", async () => {
        msg.delete().catch(err => {})
    })
    }
  };