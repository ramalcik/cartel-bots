const { Client, Message, MessageButton, MessageActionRow } = require("discord.js");
const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "yetkililerim",
    command: ["yetkililerim","yetkilibilgisi"],
    aliases: "yetkilibilgisi <@cartel/ID>",
    description: "Belirlenen veya komutu kullanan kişi belirlediği yetkili sayısını ve en son belirlediği yetkili sayısını gösterir.",
    category: "stat",
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
    if(!roller.Yetkiler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.Yetkiler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    cartelcim = message.guild.members.cache.get(cartelcim.id)
    const button1 = new MessageButton()
    .setCustomId('geri')
    .setLabel('Önceki Sayfa').setEmoji("⬅️")         
    .setStyle('PRIMARY');

const button2 = new MessageButton()
    .setCustomId('ileri')
    .setLabel('Sonraki Sayfa').setEmoji("➡️")         
    .setStyle('PRIMARY');
    Users.findOne({_id: cartelcim.id }, async (err, res) => {
      if (!res) return message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin yetkili bilgisi bulunamadı.`)]})
      if(!res.Staffs) return message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin yetkili bilgisi bulunamadı.`)]})
      let pages = res.Staffs.sort((a, b) => b.Date - a.Date).chunk(10);
      var currentPage = 1
      if (!pages && !pages.length || !pages[currentPage - 1]) return message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin yetkili bilgisi bulunamadı.`)]})
      let embed = new richEmbed().renk("RANDOM").üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name} • ${currentPage} / ${pages.length} • Yetkili: ${res.Staffs.length || 0}`, message.guild.iconURL({dynamic: true}))
      const row = new MessageActionRow().addComponents([button1, button2]);
      if (message.deferred == false){
        await message.deferReply()
      };
      const curPage = await message.channel.send({
        embeds: [embed.açıklama(`${cartelcim}, kişisin yetkili bilgisi yükleniyor... Lütfen bekleyin...`)],
        components: [row], fetchReply: true,
      }).catch(err => {});
    
      await curPage.edit({embeds: [embed.açıklama(`${pages[currentPage - 1].map((value, index) => `\` ${index + 1} \` ${message.guild.members.cache.get(value.id) ? message.guild.members.cache.get(value.id) : `<@${value.id}>`} <t:${Number(String(value.Date).substring(0, 10))}:F>`).join("\n")} `)]}).catch(err => {})

      const filter = (i) => i.user.id == message.member.id

      const collector = await curPage.createMessageComponentCollector({
        filter,
        time: 30000,
      });

      collector.on("collect", async (i) => {
        switch (i.customId) {
          case "ileri":
            if (currentPage == pages.length) break;
            currentPage++;
            break;
          case "geri":
            if (currentPage == 1) break;
            currentPage--;
            break;
          default:
            break;
          case "kapat": 
            i.deferUpdate().catch(err => {});
            curPage.delete().catch(err => {})
            return message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined);
        }
        await i.deferUpdate();
        await curPage.edit({
          embeds: [embed.altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name} • ${currentPage} / ${pages.length} • Yetkili: ${res.Staffs.length || 0}`, message.guild.iconURL({dynamic: true})).açıklama(`${pages[currentPage - 1].map((value, index) => `\` ${index + 1} \` ${message.guild.members.cache.get(value.id) ? message.guild.members.cache.get(value.id) : `<@${value.id}>`} <t:${Number(String(value.Date).substring(0, 10))}:F>`).join("\n")}`)]
        }).catch(err => {});
        collector.resetTimer();
      });
      collector.on("end", () => {
        if(curPage) curPage.edit({
          embeds: [embed.altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name}`, message.guild.iconURL({dynamic: true})).açıklama(`${cartelcim} kişisinin toplamda \`${res.Staffs.length || 0}\` adet yetkilisi mevcut.`)],
          components: [],
        }).catch(err => {});
      })
    })
  }
};

