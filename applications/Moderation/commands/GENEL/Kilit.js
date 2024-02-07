const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "kilit",
    command: ["chatkilit", "kitle"],
    aliases: "kilit @cartel/ID",
    description: "Komutun kullanıldığı metin kanalına yazmayı engeller.",
    category: "yönetim",
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
   * @param {Guild} guild
   */
  komutClient: async function (client, message, args, guild) {
    let embed = new richEmbed()
    if(!roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");

    if (message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
      await message.channel.permissionOverwrites.edit(everyone.id, { SEND_MESSAGES: false });
      await message.channel.send({ embeds: [embed.açıklama(`\`#${message.channel.name}\` kanalı ${message.author} tarafından kilitlendi.`)] })
    } else {
      await message.channel.permissionOverwrites.edit(everyone.id, { SEND_MESSAGES: true });
      await message.channel.send({ embeds: [embed.açıklama(`\`#${message.channel.name}\` kanalı ${message.author} tarafından kilidi açıldı.`)] });
    };

    }
};