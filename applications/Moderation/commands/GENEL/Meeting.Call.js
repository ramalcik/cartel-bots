const { Client, Message, MessageEmbed} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "toplantıçağır",
    command: ["toplantı-çağır", "meeting-call"],
    aliases: "toplantıçağır",
    description: "Seste olmayan yetkilileri çağırır.",
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
    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let embed = new richEmbed()
    let enAltYetkiliRolü = message.guild.roles.cache.get(roller.Yetkiler);
    let yetkililer = message.guild.members.cache.filter(cartelcim => !cartelcim.user.bot  && cartelcim.roles.highest.position >= enAltYetkiliRolü.position && !cartelcim.voice.channel)
    if (yetkililer.length == 0) return message.channel.send({embeds: [ new embed.açıklama(`Aktif olup seste olmayan yetkili bulunmuyor.`)]})
    let mesaj = await message.channel.send({embeds: [ embed.setThumbnail(message.member.user.avatarURL({dynamic: true})).açıklama(`${yetkililer.size} adet yetkiliye özelden bilgilendirme atıldı.`)]});
    var filter = m => m.author.id === message.author.id && m.author.id !== client.user.id && !m.author.bot;
        yetkililer.forEach((yetkili) => {
          setTimeout(() => {  
            yetkili.send({embeds: [ embed.açıklama(`Sunucuda toplantı başladı fakat sunucuda toplantı kanalında bulunmuyorsun yönetim tarafından bilgilendirme atıldı.`)]}).then(x => mesaj.edit({embeds: [embed.açıklama(`${yetkili} yetkilisine özelden mesaj atıldı!`)]})).catch(err => message.channel.send(`${yetkili}, Sunucusunda toplantı başladı. Yetkili olduğun halde toplantıda değilsin. Eğer toplantıya girmezsen yetkilerin alınacaktır.`).then(x => mesaj.edit({embeds: [embed.açıklama(`${yetkili} yetkilisine özelden mesaj atılamadığı için kanalda etiketlendi!`)]})));
          }, 2*1000);
        });
    }
};