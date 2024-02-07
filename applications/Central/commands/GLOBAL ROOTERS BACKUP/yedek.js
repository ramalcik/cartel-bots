const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const { guildBackup } = require('../../../../base/Funksiyonlar/Backup');
module.exports = {
    name: "backup",
    command: ["yedekal"],
    aliases: "yedek @cartel/ID",
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
    await guildBackup.guildChannels()
    await guildBackup.guildRoles()
    message.channel.send({embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Başarıyla \`${message.guild.name}\` sunucusunun son bir saat olan yedeklemesi <t:${String(Date.now()).slice(0, 10)}:R> alındı ve kayıtlara işlendi.`)]})
   
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    client.logger.log(`ROL => Manuel olarak backup işlemi gerçekleştirildi. (${message.author.tag})`, "backup") 
 }
};