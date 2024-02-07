const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const { guildBackup } = require('../../../../base/Funksiyonlar/Backup');
const roleBackup = require('../../../../database/Schemas/Guards/Backup/Guild.Roles')
const guildSettings = require('../../../../database/Schemas/Global.Guild.Settings')
module.exports = {
    name: "rolsil",
    command: ["rolsil"],
    aliases: "rolsil @cartel/ID",
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
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(!rol) message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Bir rol belirt ve tekrar dene.`)]})
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
    message.channel.send({ embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`**${rol.name}** (\`${rol.id}\`) isimli rol silindi.`)] })
    setTimeout(async () => {
        await rol.delete().catch(err => {})
    }, 2500);

  }
};