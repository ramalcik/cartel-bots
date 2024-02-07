const { Client, Message, MessageButton, MessageActionRow } = require("discord.js");

const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "taglı",
    command: ["tagaldır","tagli"],
    aliases: "tag <@cartel/ID>",
    description: "Belirlenen üyeyi komutu kullanan üyenin taglısı olarak belirler.",
    category: "yetkili",
    uzantı: ayarlar.type,
    
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
    let embed = new richEmbed()
    if(!roller.teyitciRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.Yetkiler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.Yetkiler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return;
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(ayarlar.type && !cartelcim.user.username.includes(ayarlar.tag)) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.taglıalım)]})
    if(Date.now()-cartelcim.user.createdTimestamp < 1000*60*60*24*7) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yenihesap)]}).then(x => {
      setTimeout(() => {
        x.delete()
      }, 7500);
    });
    let kontrol = await Users.findOne({_id: cartelcim.id})
    if(kontrol && kontrol.Tagged) return message.reply({embeds: [new richEmbed().açıklama(`${cartelcim} kişisi daha önceden bir başkası tarafından taglı olarak belirlenmiş.`)]}).then(x => {
      setTimeout(() => {
        x.delete().catch(err => {})
      }, 5000)
    });
    embed.açıklama(`${message.member.toString()} isimli yetkili seni taglı olarak belirlemek istiyor. Kabul ediyor musun?`);
    let Row = new MessageActionRow().addComponents(
      new MessageButton()
      .setCustomId("OK")
      .setEmoji(message.guild.emojiyiBul(emojiler.onay_cartel))
      .setLabel("Kabul Ediyorum!")
      .setStyle("SUCCESS"),
      new MessageButton()
      .setCustomId("NO")
      .setEmoji(message.guild.emojiyiBul(emojiler.no_cartel))
      .setLabel("Kabul Etmiyorum!")
      .setStyle("SECONDARY"),
    )
    message.channel.send({content: cartelcim.toString(), embeds: [embed], components: [Row]}).then(async (msg) => {
      const filter = i => i.user.id === cartelcim.id
      const collector = msg.createMessageComponentCollector({ filter,  errors: ["time"], time: 30000 })
      collector.on('collect', async (i) => {
        if(i.customId == "OK") { 
          message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
          await Users.updateOne({ _id: cartelcim.id }, { $set: { "Tagged": true, "tagCağıran": message.member.id } }, { upsert: true })
          await Users.updateOne({ _id: message.member.id }, { $push: { "Taggeds": { id: cartelcim.id, Date: Date.now() } } }, { upsert: true })
          msg.delete().catch(err => {})
          message.channel.send({embeds: [embed.açıklama(`${cartelcim.toString()} kişisi ${message.author} tarafından başarıyla taglı olarak belirledi!`)], components: []}).catch(err => {})
          let taglıLog = message.guild.kanalıBul("taglı-log")
          if(taglıLog) taglıLog.send({embeds: [embed.açıklama(`${cartelcim} kişi <t:${String(Date.now()).slice(0, 10)}:R> ${message.author} tarafından taglı olarak belirlendi.`)]})      
          client.Upstaffs.addPoint(message.member.id,_statSystem.points.tagged, "Taglı")
          message.member.Leaders("tag", _statSystem.points.tagged, {type: "TAGGED", user: cartelcim.id})
          i.deferUpdate().catch(err => {})
        }
        if(i.customId == "NO") {
          msg.edit({content: message.member.toString(), components: [],embeds: [new richEmbed().renk("RED").açıklama(`${cartelcim.toString()} kişi, **${message.guild.name}** taglı belirleme teklifini reddetti!`)], components: []}).catch(err => {});
          message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
          i.deferUpdate().catch(err => {})
        }
      })
      collector.on('end', i => {
        msg.delete().catch(err => {})
      }) 
    }).catch(err => {})
    }
};