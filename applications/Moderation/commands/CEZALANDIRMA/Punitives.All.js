const { Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const {richEmbed} = require('../../../../base/Funksiyonlar/embed')
const moment = require('moment');
require('moment-duration-format');
require('moment-timezone');
const ms = require('ms');

module.exports = {
    name: "tümcezalar",
    command: ["tümcezalar","soncezalar","son-cezalar","tumcezalar", "cezaları"],
    aliases: "soncezalar",
    description: "Belirtilen ceza numarasının bütün bilgilerini gösterir.",
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
    if(!roller.Yetkiler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.Yetkiler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    const button1 = new MessageButton()
                .setCustomId('geri')
                .setEmoji(message.guild.emojiyiBul("geri"))         
                .setStyle('SECONDARY');
    
                
    const button2 = new MessageButton()
                .setCustomId('ileri')
                .setEmoji(message.guild.emojiyiBul("sonraki"))         
                .setStyle('SECONDARY');
      let res = await Punitives.find()
      if (!res) return message.reply({embeds: [new richEmbed().açıklama(`${message.guild.name} sunucusunda ceza uygulanmadı.`)]})
      if(!res) return message.reply({embeds: [new richEmbed().açıklama(`${message.guild.name} sunucusunda ceza uygulanmadı.`)]})
      let data = []
      res.map(x => data.push(x))
      res = [...data]
      let pages = res.sort((a, b) => b.Date - a.Date).chunk(10);
      console.log(data)
      var currentPage = 1
      if (!pages && !pages.length || !pages[currentPage - 1]) return message.reply({embeds: [new richEmbed().açıklama(`${message.guild.name} sunucusunda ceza uygulanmadı.`)]})
      let embed = new richEmbed().renk("RANDOM").altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name} • ${currentPage} / ${pages.length}`, message.guild.iconURL({dynamic: true}))
      const row = new MessageActionRow().addComponents([button1, button2]);
      if (message.deferred == false){
        await message.deferReply()
      };
      const curPage = await message.reply({
        embeds: [embed.açıklama(`${message.guild.name} sunucusunun son atılan ceza listesi yükleniyor...`)],
        components: [row], fetchReply: true,
      }).catch(err => {});
      
      await curPage.edit({embeds: [embed.açıklama(`${pages[currentPage - 1].map((x, index) => `\` ${x.No} \` <@${x.Member}> <t:${String(Date.parse(x.Date)).slice(0, 10)}:R> [**${x.Type}**] (<@${x.Staff}>)`).join("\n")}`)]}).catch(err => {})

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
          embeds: [embed.altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name} • ${currentPage} / ${pages.length} `, message.guild.iconURL({dynamic: true})).açıklama(`${pages[currentPage - 1].map((x, index) => `\` ${x.No} \` <@${x.Member}> <t:${String(Date.parse(x.Date)).slice(0, 10)}:R> [**${x.Type}**] (<@${x.Staff}>)`).join("\n")}`)]
        }).catch(err => {});
        collector.resetTimer();
      });
      collector.on("end", () => {
        if(curPage) curPage.edit({
          embeds: [embed.altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name}`, message.guild.iconURL({dynamic: true})).açıklama(`${message.guild.name} sunucusunda toplamda \`${res.length || 0}\` adet ceza uygulandı.`)],
          components: [],
        }).catch(err => {});
      })
    }
};