const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "cezapuan",
    command: ["ceza-puan", "cezapuan", "yetkilicezanotu","ceza-notu","cezanotu"],
    aliases: "cezapuan <@cartel/ID>",
    description: "Belirtilen üyenin veya komutu kullanan üyenin ceza puanını veya yetkili ceza notunu belirtir.",
    category: "diğer",
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
      let cartelcim =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id)
      let embed = new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true}));
      let cezaPuan = await cartelcim.cezaPuan() || 0
      if((roller.Yetkiler && roller.Yetkiler.some(x => cartelcim.roles.cache.has(x))) || (roller.kurucuRolleri && roller.kurucuRolleri.some(x => cartelcim.roles.cache.has(x))) || cartelcim.permissions.has("ADMINISTRATOR")) {
        let yetkiliCezaNotu = await cartelcim.yetkiliCezaPuan() || 200
        message.reply({embeds: [embed.açıklama(`${cartelcim} isimli yetkilinin yetkili ceza notu **${yetkiliCezaNotu}**, ceza puanı ise **${cezaPuan}** puandır.`)]}).then(x => {
            setTimeout(() => {
                x.delete().catch(err => {})
            }, 7500);
        })
      } else {
        message.reply({embeds: [embed.açıklama(`${cartelcim} kişisinin ceza puanı **${cezaPuan}** puan.`)]}).then(x => {
            setTimeout(() => {
                x.delete().catch(err => {})
            }, 7500);
        })
      }
  }
};