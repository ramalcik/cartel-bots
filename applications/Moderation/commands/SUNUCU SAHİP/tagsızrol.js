const { Client, Message, MessageEmbed} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

module.exports = {
    name: "tagsızver",
    command: ["tagsızlarver"],
    aliases: "tagsızver",
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
    if(!ayarlar.type) return;
    let embed = new richEmbed()
    if(!roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})

    let rolsuzcartelcim = message.guild.members.cache.filter(m => m.user.username.includes(ayarlar.tag) && !m.roles.cache.has(roller.tagRolü) && !m.roles.cache.has(roller.şüpheliRolü) && !m.roles.cache.has(roller.yasaklıTagRolü) &&  !m.roles.cache.has(roller.cezalıRolü) && !roller.kayıtsızRolleri.some(x => m.roles.cache.has(x)))
    rolsuzcartelcim.forEach(roluolmayanlar => { 
      roluolmayanlar.roles.add(roller.tagRolü).catch(err => {})
      roluolmayanlar.setNickname(roluolmayanlar.displayName.replace(ayarlar.tagsiz, ayarlar.tag)).catch(err => {})
    });
    let rollütagsiz = message.guild.members.cache.filter(m => !m.user.username.includes(ayarlar.tag) && m.roles.cache.has(roller.tagRolü) && !m.roles.cache.has(roller.şüpheliRolü) && !m.roles.cache.has(roller.yasaklıTagRolü) &&  !m.roles.cache.has(roller.cezalıRolü) && !roller.kayıtsızRolleri.some(x => m.roles.cache.has(x)))
        rollütagsiz.forEach(rl => {
        rl.setNickname(rl.displayName.replace(ayarlar.tag, ayarlar.tagsiz)).catch(err => {})
        rl.roles.remove(roller.tagRolü).catch(err => {})
    });
    message.channel.send({embeds: [embed.açıklama(`Sunucuda taglı olup rolü olmayan \`${rolsuzcartelcim.size}\` üyeye taglı rolü verildi, ve tagsız \`${rollütagsiz.size}\` üyeden geri alınmaya başlandı!`).altBaşlık('bu işlem biraz zaman alabilir.')]}).then(x => setTimeout(() => {
        x.delete()
    }, 7500));
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    }
};