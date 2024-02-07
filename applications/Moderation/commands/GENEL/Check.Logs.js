const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

const Users = require('../../../../database/Schemas/Users.Components');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "checklog",
    command: ["tıklamalog","tıklamalog","tiklamalog","ilgilenme","ilgilenmeler"],
    aliases: "ilgilenme @cartel/ID",
    description: "Bir üyenin rol geçmişini görüntüler.",
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
   */

  komutClient: async function (client, message, args) {
    if(!roller.Yetkiler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.Yetkiler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    cartelcim = message.guild.members.cache.get(cartelcim.id)
    const button1 = new MessageButton()
                .setCustomId('geri')
                .setEmoji(message.guild.emojiyiBul("geri"))         
                .setStyle('SECONDARY');
   
    const button2 = new MessageButton()
                .setCustomId('ileri')
                .setEmoji(message.guild.emojiyiBul("sonraki"))         
                .setStyle('SECONDARY');
    Users.findOne({_id: cartelcim.id }, async (err, res) => {
      if (!res) return message.reply({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin ilgilenme bilgisi bulunamadı.`)]})
      if(!res.Checks) return message.reply({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin ilgilenme bilgisi bulunamadı.`)]})
      let pages = res.Checks.sort((a, b) => b.date - a.date).chunk(15);
      var currentPage = 1
      let geçerliolanlar = res.Checks.filter(x => {
        let cartelcim = message.guild.members.cache.get(x.target)
        return cartelcim && (cartelcim.user.username.includes(ayarlar.tag) || roller.Yetkiler.some(x => cartelcim.roles.cache.has(x)))
}).length
      if (!pages && !pages.length || !pages[currentPage - 1]) return message.reply({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin ilgilenme bilgisi bulunamadı.`)]})
      let embed = new richEmbed().renk("RANDOM").üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name} • ${currentPage} / ${pages.length}`, message.guild.iconURL({dynamic: true}))
      const row = new MessageActionRow().addComponents([button1, button2]);
      if (message.deferred == false){
        await message.deferReply()
      };
      const curPage = await message.reply({
        embeds: [embed.açıklama(`${cartelcim}, kişisinin ilgilenme bilgisi yükleniyor... Lütfen bekleyin...`)],
        components: [row], fetchReply: true,
      }).catch(err => {});
    
      await curPage.edit({embeds: [embed.açıklama(`Geçerli olan ilgilenmeler "${message.guild.emojiyiBul(emojiler.onay_cartel)}" olarak görülür, geçersiz olanlar ise "${message.guild.emojiyiBul(emojiler.no_cartel)}" olarak görültülenir.
    
Geçerli olan: ${geçerliolanlar}
Geçersiz olan: ${res.Checks.length - geçerliolanlar}

${pages[currentPage - 1].map((x, index) => {
        let okey = false
        let cartelcim = message.guild.members.cache.get(x.target)
        if(cartelcim && (cartelcim.user.username.includes(ayarlar.tag) || roller.Yetkiler.some(x => cartelcim.roles.cache.has(x)))) okey = true
        return `\` ${index+1} \` <@!${cartelcim ? cartelcim.id : x.target}> <t:${String(x.date).slice(0, 10)}:R> [**${x.type}** | ${okey ? message.guild.emojiyiBul(emojiler.onay_cartel) : message.guild.emojiyiBul(emojiler.no_cartel)}] `
      }).join("\n")}`)]}).catch(err => {})

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
          embeds: [embed.altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name} • ${currentPage} / ${pages.length} `, message.guild.iconURL({dynamic: true})).açıklama(`Geçerli olan ilgilenmeler ${message.guild.emojiyiBul(emojiler.onay_cartel)} olarak görülür, geçersiz olanlar ise ${message.guild.emojiyiBul(emojiler.no_cartel)} olarak görültülenir.
    
Geçerli olan: ${geçerliolanlar}
Geçersiz olan: ${res.Checks.length - geçerliolanlar}
          
    ${pages[currentPage - 1].map((x, index) => {
            let okey = false
            let cartelcim = message.guild.members.cache.get(x.target)
            if(cartelcim && (cartelcim.user.username.includes(ayarlar.tag) || roller.Yetkiler.some(x => cartelcim.roles.cache.has(x)))) okey = true
            return `\` ${index+1} \` <@!${cartelcim ? cartelcim.id : x.target}> <t:${String(x.date).slice(0, 10)}:R> [**${x.type}** | ${okey ? message.guild.emojiyiBul(emojiler.onay_cartel) : message.guild.emojiyiBul(emojiler.no_cartel)}] `
          }).join("\n")}`)]
        }).catch(err => {});
        collector.resetTimer();
      });
      collector.on("end", () => {
        if(curPage) curPage.edit({
          embeds: [embed.altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name}`, message.guild.iconURL({dynamic: true})).açıklama(`${cartelcim} kişisinin toplamda \`${res.Checks.length || 0}\` adet tıklama bilgisi mevcut.`)],
          components: [],
        }).catch(err => {});
      })
    })
 }
};