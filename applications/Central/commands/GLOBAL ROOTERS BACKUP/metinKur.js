const { Client, Message, MessageEmbed } = Discord = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const CategoryChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Category.Channels");
const TextChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Text.Channels");
const VoiceChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Voice.Channels");
module.exports = {
    name: "metinkur",
    command: ["metinkur"],
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

    if (!args[0] || isNaN(args[0])) return message.channel.send({embeds: [ new richEmbed().açıklama(`Bir metin kanalı id'si belirt ve tekrar dene.`)]})
    TextChannels.findOne({ channelID: args[0] }, async (err, data) => {
      if (!data) return;
      const newChannel = await message.guild.channels.create(data.name, {
        type: 'GUILD_TEXT',
        nsfw: data.nsfw,
        parentID: data.parentID,
        position: data.position,
        rateLimit: data.rateLimit,
      });
      await message.channel.send({ embeds: [embed.açıklama(`**${newChannel.name}** isimli metin kanalının, \`${tarihsel(Date.now())}\` tarihli metin kanalı kurulmaya başladı.`)]})
      const newOverwrite = [];
      for (let index = 0; index < data.overwrites.length; index++) {
        const veri = data.overwrites[index];
        newOverwrite.push({
          id: veri.id,
          allow: new Discord.Permissions(veri.allow).toArray(),
          deny: new Discord.Permissions(veri.deny).toArray()
        });
      }
      if(message.guild.channels.cache.get(data.parentID)) {
          newChannel.setParent(data.parentID)
      }
      await newChannel.permissionOverwrites.set(newOverwrite);
      await client.queryManage(args[0], newChannel.id)
      data.channelID = newChannel.id
      data.save()
    });
  }
};