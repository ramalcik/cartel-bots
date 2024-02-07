const { Client, Message, MessageEmbed } = Discord = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const CategoryChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Category.Channels");
const TextChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Text.Channels");
const VoiceChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Voice.Channels");
module.exports = {
    name: "kategorikur",
    command: ["kategori-kur"],
    aliases: "kategorikur @cartel/ID",
    description: "test",
    category: "-",
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
    const embed = new richEmbed() 
   
    if (!args[0] || isNaN(args[0])) return message.message.channel.send({embeds: [ new richEmbed().açıklama(`Bir kategori id'si belirt ve tekrar dene.`)]})
    CategoryChannels.findOne({ channelID: args[0] }, async (err, data) => {
      if (!data) return message.channel.send({embeds: [ new richEmbed().açıklama(`Belirttiğiniz kategorinin veritabanında kayıdı bulunamadı.`)]})
      const newChannel = await message.guild.channels.create(data.name, {
        type: 'GUILD_CATEGORY',
        position: data.position,
      });
      await message.channel.send({ embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`**${newChannel.name}** isimli kategorinin, kategori yedeği kuruluyor.`)]})
      const textChannels = await TextChannels.find({ parentID: args[0] });
      textChannels.forEach(async (c) => {
           await textKur(c.channelID, message,embed, newChannel.id)
      
      });
      const voiceChannels = await VoiceChannels.find({ parentID: args[0] });
      voiceChannels.forEach(async (c) => {
            await voiceKur(c.channelID, message, embed, newChannel.id)
      });
      const newOverwrite = [];
      for (let index = 0; index < data.overwrites.length; index++) {
        const veri = data.overwrites[index];
        newOverwrite.push({
          id: veri.id,
          allow: new Discord.Permissions(veri.allow).toArray(),
          deny: new Discord.Permissions(veri.deny).toArray()
        });
      }
      await newChannel.permissionOverwrites.set(newOverwrite);
    });
  }
};


async function voiceKur(idcik, message, embed, parentID) {
    VoiceChannels.findOne({ channelID: idcik }, async (err, data) => {
        if (!data) return message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username,message.member.user.avatarURL({ dynamic: true})).açıklama(`Veritabanında ses kanalı bulunamadı.`)]}), message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
        const newChannel = await message.guild.channels.create(data.name, {
          type: 'GUILD_VOICE',
          bitrate: data.bitrate,
          parentID: parentID,
          position: data.position,
          userLimit: data.userLimit ? data.userLimit : 0
        });
        await message.channel.send({ embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`**${newChannel.name}** isimli ses kanalı kuruluyor.`)]})
        const newOverwrite = [];
        for (let index = 0; index < data.overwrites.length; index++) {
          const veri = data.overwrites[index];
          newOverwrite.push({
            id: veri.id,
            allow: new Discord.Permissions(veri.allow).toArray(),
            deny: new Discord.Permissions(veri.deny).toArray()
          });
        }
        if(message.guild.channels.cache.get(parentID)) {
          newChannel.setParent(parentID)
      }   
        await newChannel.permissionOverwrites.set(newOverwrite);
      });
}

async function textKur(idcik, message, embed, parentID) {
    TextChannels.findOne({ channelID: idcik }, async (err, data) => {
        if (!data) return message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username,message.member.user.avatarURL({ dynamic: true})).açıklama(`Veritabanında metin kanalı bulunamadı.`)]}), message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
        const newChannel = await message.guild.channels.create(data.name, {
          type: 'GUILD_TEXT',
          nsfw: data.nsfw,
          parentID: parentID,
          position: data.position,
          rateLimit: data.rateLimit,
        });
        await message.channel.send({ embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`**${newChannel.name}** isimli ses kanalı kuruluyor.`)]})
        const newOverwrite = [];
        for (let index = 0; index < data.overwrites.length; index++) {
          const veri = data.overwrites[index];
          newOverwrite.push({
            id: veri.id,
            allow: new Discord.Permissions(veri.allow).toArray(),
            deny: new Discord.Permissions(veri.deny).toArray()
          });
        }
        if(message.guild.channels.cache.get(parentID)) {
            newChannel.setParent(parentID)
        }
        await newChannel.permissionOverwrites.set(newOverwrite);
      });
}