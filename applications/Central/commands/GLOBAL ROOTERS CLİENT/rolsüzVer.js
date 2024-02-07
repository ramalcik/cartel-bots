const { Client, Message, MessageEmbed} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

module.exports = {
    name: "rolsüz",
    command: ["rolsüzVer"],
    aliases: "rolsüzver",
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
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    let embed = new richEmbed()
    if(!roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
    let rolsuzCartelim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guildId).size === 0);

    if (rolsuzCartelim.size === 0) {
        message.channel.send({embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Kayıtsız rolüne sahip olmayan kişi yok.`)]})
    } else {
        rolsuzCartelim.forEach(roluOlmayanlar => {
            roluOlmayanlar.roles.set(roller.kayıtsızRolleri).catch(err => {});
        });
    
    message.channel.send({embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`${rolsuzCartelim.size} sayıda rolsüz olan kişilere kayıtsız rolü verildi.`)]})
    
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    }
}
};