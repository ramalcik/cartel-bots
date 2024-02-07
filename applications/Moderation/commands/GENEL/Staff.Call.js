const { Client, Message, MessageEmbed} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "yetkili-mesaj",
    command: ["seseçağır", "yetkiliçağır", "yetkili-çağır","sesçağır", "ytçağır"],
    aliases: "yetkiliçağır",
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
    let enAltYetkiliRolü = message.guild.roles.cache.get(roller.ilkYetki);
    let yetkililer = message.guild.members.cache.filter(cartelcim => !cartelcim.user.bot  && cartelcim.roles.highest.position >= enAltYetkiliRolü.position && !cartelcim.voice.channel)
    if (yetkililer.length == 0) return message.reply('Aktif olup, seste olmayan yetkili bulunmuyor. Maşallah!');
    let mesaj = await message.channel.send(`**${yetkililer.size}** yetkiliye sese gelme çağırısı yapılıyor`);
    var filter = m => m.author.id === message.author.id && m.author.id !== client.user.id && !m.author.bot;
        yetkililer.forEach((yetkili) => {
          setTimeout(() => {
            yetkili.send(message.guild.name+' Sunucusunda yetkin var ancak seste değilsin. Eğer sese girmez isen yetki yükseltimin göz önünde bulundurulacaktır.').then(x => mesaj.edit({embeds: [embed.açıklama(`${yetkili} yetkilisine özelden mesaj atıldı!`)]})).catch(err => message.channel.send(`${yetkili}, Sunucusunda yetkin var ancak seste değilsin. Eğer sese girmez isen yetki yükseltimin göz önünde bulundurulacaktır. Ayrıca dm'ni aç mesaj atamıyorum.`).then(x => mesaj.edit({embeds: [embed.açıklama(`${yetkili} yetkilisine özelden mesaj atılamadığı için kanalda etiketlendi!`)]})));
          }, 4*1000);
        });
    }
};