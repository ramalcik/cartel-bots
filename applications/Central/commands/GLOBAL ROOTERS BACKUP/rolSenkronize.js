const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const { guildBackup } = require('../../../../base/Funksiyonlar/Backup');
const roleBackup = require('../../../../database/Schemas/Guards/Backup/Guild.Roles')
const guildSettings = require('../../../../database/Schemas/Global.Guild.Settings')
const CategoryChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Category.Channels");
const TextChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Text.Channels");
const VoiceChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Voice.Channels");
module.exports = {
    name: "rolsenkronize",
    command: ["rolesync","rolsenkron","rolsync"],
    aliases: "rolsync @cartel/ID",
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
    let veriData = await guildSettings.findOne({ guildID: message.guild.id })
    let sunucuData = veriData.Ayarlar 
    const embed = new richEmbed() 
    if (!args[0] || isNaN(args[0])) return message.channel.send({embeds: [ embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Eski bir rol/id belirt ve tekrar dene.`)]})
    if (!args[1] || isNaN(args[1])) return message.channel.send({embeds: [ embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Senkronize edilecek bir rol belirt ve tekrar dene.`)]})
    let rolüBul = message.guild.roles.cache.get(args[1])
    if(!rolüBul) return message.reply("Rol bulunamadı.");
    roleBackup.findOne({ roleID: args[0] }, async (err, data) => {
        const channelPerm = data.channelOverwrites.filter(e => client.guilds.cache.get(sistem.SUNUCU.GUILD).channels.cache.get(e.id))
        for await (const perm of channelPerm) {
          let kanal = message.guild.channels.cache.get(perm.id);
          let newPerm = {};
          perm.allow.forEach(p => {
            newPerm[p] = true;
          });
          perm.deny.forEach(p => {
            newPerm[p] = false;
          });
          kanal.permissionOverwrites.create(rolüBul, newPerm).catch(error => client.logger.error(error));
        }
    })
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
  }
};