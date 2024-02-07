const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const { richEmbed } = require('../../../../base/Funksiyonlar/embed')
const joinedAt = require('../../../../database/Schemas/Others/Users.JoinedAt');
const moment = require('moment')
module.exports = {
    name: "seskontrol",
    command: ["sesk", "n", "ses"],
    aliases: "seskontrol @cartel/ID",
    description: "Belirlenen üyenin seste aktif veya haporleri ve kulaklığının açık veya kapalı olduğunu gösterir.",
    category: "yönetim",
    uzantı: true,
  /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.on("voiceStateUpdate", async (oldState, newState) => {
      if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
      if (!oldState.channelId && newState.channelId) await joinedAt.findOneAndUpdate({ _id: newState.id }, { $set: { date: Date.now() } }, { upsert: true });
      let joinedAtData = await joinedAt.findOne({ _id: oldState.id });
      if (!joinedAtData) await joinedAt.findOneAndUpdate({ _id: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
      joinedAtData = await joinedAt.findOne({ _id: oldState.id });
      if (oldState.channelId && !newState.channelId) {
        await joinedAt.deleteOne({ _id: oldState.id });
      } else if (oldState.channelId && newState.channelId) {
        await joinedAt.findOneAndUpdate({ _id: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
      }
    })
  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  komutClient: async (client, message, args) => {
    let embed = new richEmbed()
    if(roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]}) 
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!member) message.channel.send({embeds: [new richEmbed().üstBaşlık(member.user.username, member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if (!member.voice.channel) return message.channel.send({ embeds: [embed.üstBaşlık(member.user.username, member.user.avatarURL({ dynamic: true})).açıklama(`${member} kişisi bir ses kanalına bağlı değil.`)] });
            let joinedAtData = await joinedAt.findOne({ _id: member.id });
            let limit = member.voice.channel.userLimit || "~";
            let mic = member.voice.selfMute ? `Kapalı!` : `Açık!`
            let kulak = member.voice.selfDeaf ? `Kapalı!` : `Açık!`
            let ekran =  member.voice.streaming ? `Açık!` : `Kapalı!`
            let kamera = member.voice.selfVideo ? `Açık!` : `Kapalı!`
            message.channel.send({ embeds: [embed.açıklama(`${member}, kişi şuan da ${member.voice.channel} kanalında bulunuyor bu kanalda \` ${joinedAtData ? moment.duration(joinedAtData ? Date.now() - joinedAtData.date : 0).format("H [saat], m [dk].") : "Süre bulunamadı"} \` süre geçirmiş.

**Ses durumu**:
Mikrofon: \`${mic}\`
Kulaklık: \`${kulak}\`
Ekran: \`${ekran}\`
Kamera: \`${kamera}\`
Doluluk: \` ${member.voice.channel.members.size}/${limit} \`
`)]})
    }
};