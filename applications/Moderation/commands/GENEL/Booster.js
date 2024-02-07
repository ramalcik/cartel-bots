const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require('../../../../base/Funksiyonlar/embed')
let zaman = new Map();
module.exports = {
    name: "booster",
    command: ["b","boost","zengin"],
    aliases: "booster <Belirlenen Isim>",
    description: "Sunucuya takviye atan üyeler bu komut ile isim değişimi yapar.",
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
   * @param {Guild} guild
   */
  komutClient: async (client, message, args) => {
      
      let embed = new richEmbed()
      if (!message.member.roles.cache.has(roller.boosterRolü) && (roller.özelRoller && !roller.özelRoller.some(x => message.member.roles.cache.has(x))) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
      if (zaman.get(message.author.id) >= 1) return message.reply({content: `Sunucu takviyecisi özellik komutunu sadece **15 Dakika** ara ile kullanabilirsin.`, ephemeral: true}), message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined);
      if(ayarlar.type ) {
        if(roller.Yetkiler.some(x => message.member.roles.cache.has(x)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) {
          let isim = args.join(' ');
          if (!isim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Değiştirmem için bir isim belirt.`)]})
          let Nickname = message.member.nickname.replace(ayarlar.tagsiz, "").replace(ayarlar.tag, "").replace(" ", "").split(" | ")[0]
          if(Nickname && message.member.manageable) {
            message.member.setNickname(message.member.displayName.replace(Nickname, isim)).catch(err => {})
            zaman.set(message.author.id, (zaman.get(message.author.id) || 1));
            setTimeout(() => {
              zaman.delete(message.author.id)
            }, 1000 * 60 * 15 * 1)
            return message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
          } else {
            return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
          }
        }
      }
     
      let yazilacakIsim;
      let isim = args.join(' ');
      if (!isim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Değiştirmem için bir isim belirt.`)]})
      if(ayarlar.type) yazilacakIsim = `${message.member.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} ${isim}`
      if(!ayarlar.type) yazilacakIsim = `${isim}`;
      if(message.member.manageable) {
      message.member.setNickname(`${yazilacakIsim}`).then(devam => {
      message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
      	      zaman.set(message.author.id, (zaman.get(message.author.id) || 1));
	    setTimeout(() => {
		    zaman.delete(message.author.id)
	    }, 1000 * 60 * 15 * 1)
      }).catch(cartel =>  message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined))
    } else {
      message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
    }
  }
};