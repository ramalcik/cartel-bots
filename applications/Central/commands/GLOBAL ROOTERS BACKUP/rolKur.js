const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const { guildBackup } = require('../../../../base/Funksiyonlar/Backup');
const roleBackup = require('../../../../database/Schemas/Guards/Backup/Guild.Roles')
const guildSettings = require('../../../../database/Schemas/Global.Guild.Settings')
const CategoryChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Category.Channels");
const TextChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Text.Channels");
const VoiceChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Voice.Channels");
module.exports = {
    name: "rolkur",
    command: ["kur"],
    aliases: "rol @cartel/ID",
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
    if (!args[0] || isNaN(args[0])) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Bir rol belirt ve tekrar dene.`)]})
    await roleBackup.findOne({ roleID: args[0] }, async (err, data) => {
      if (!data) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Belirttiğiniz rolün veritabanında kayıdı bulunamadı.`)]})
      let newRole;
      if(data.icon) {
       newRole = await message.guild.roles.create({
          name: data.name,
          color: data.color,
          hoist: data.hoist,
          icon: data.icon,
          permissions: data.permissions,
          position: data.position,
          mentionable: data.mentionable,
          reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"
        });
      } else {
        newRole = await message.guild.roles.create({
          name: data.name,
          color: data.color,
          hoist: data.hoist,
          permissions: data.permissions,
          position: data.position,
          mentionable: data.mentionable,
          reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"
        });
      }
      message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
      await message.channel.send({ embeds: [embed.açıklama(`<@&${newRole.id}> (\`${newRole.id}\`) isimli rol oluşturuldu.
\`Verilecek Rol:\` ${newRole}
\`Dağıtılacak Üye Sayısı:\` ${data.members.length}
\`Tahmini Dağıtım Süresi:\` ${(data.members.length>1000 ? parseInt((data.members.length*(250/1000)) / 60)+" dakika" : parseInt(data.members.length*(250/1000))+" saniye")}`)] })
      await client.rolKur(args[0], newRole)
      await client.queryManage(args[0], newRole.id).catch(err => {})
    }).catch(err => {});

  }
};