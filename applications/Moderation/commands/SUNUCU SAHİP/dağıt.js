const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

module.exports = {
    name: "dağıt",
    command: ["dagit"],
    aliases: "dağıt",
    description: "",
    category: "kurucu",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} msg 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let voiceChannel = message.member.voice.channelId;
    if (!voiceChannel) return message.reply(` Ses kanalında olmadığın için işlem iptal edildi.`)
    let publicRooms = message.guild.channels.cache.filter(c => c.parentId === kanallar.publicKategorisi && c.id !== kanallar.sleepRoom && c.type === "GUILD_VOICE");
    message.member.voice.channel.members.array().forEach((m, index) => {
      setTimeout(() => {
         if (m.voice.channelId !== voiceChannel) return;
         m.voice.setChannel(publicRooms.random());
      }, index*1000);
    });
    message.reply(`${message.guild.emojiyiBul(emojiler.onay_cartel)} \`${message.member.voice.channel.name}\` adlı ses kanalındaki üyeleri rastgele public odalara dağıtılmaya başladım!`);
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
  }
}