const { MessageEmbed, MessageButton, MessageActionRow,  MessageSelectMenu } = require("discord.js");
const Stats = require('../../../../database/Schemas/Plugins/Client.Users.Stats')
const Invites = require('../../../../database/Schemas/Global.Guild.Invites');
const Users = require('../../../../database/Schemas/Client.Users');
const Upstaff = require('../../../../database/Schemas/Plugins/Client.Users.Staffs');
const Unleash = require('../../../../database/Schemas/Plugins/Guıild.Remove.Staffs');
const moment = require('moment');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "yetki-geçmiş",
    command: ["yetkigeçmişi","yetkigecmis","yükseltimler","yukseltimler","yetki-gecmis","laststaff","yetkigecmisi","yetkiligeçmişi","yetkiligecmisi","yetkiligecmis","yetkiligeçmiş"],
    aliases: "yükseltimler <@cartel/ID>",
    description: "Belirlenen yetkilinin sunucu içerisinde ki bilgileri gösterir ve yükseltir düşürür.",
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
    let embed = new richEmbed()
    if(!roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR') && !roller.yükselticiRoller.some(x => message.member.roles.cache.has(x)) && !roller.limitliYükselticiRolleri.some(x => message.member.roles.cache.has(x))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if (!kullanıcı) message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    let cartelcim = message.guild.members.cache.get(kullanıcı.id);
    if (!cartelcim) message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})

                const button1 = new MessageButton()
                .setCustomId('geri')
                .setEmoji(message.guild.emojiyiBul("geri"))         
                .setStyle('SECONDARY');
          
          const button2 = new MessageButton()
                .setCustomId('ileri')
                .setEmoji(message.guild.emojiyiBul("sonraki"))         
                .setStyle('SECONDARY');
          Users.findOne({_id: cartelcim.id }, async (err, res) => {
            let msg = await message.channel.send({embeds: [new richEmbed().açıklama(`Yetkili geçmişi aranıyor...`)]})
          if (!res) return msg.edit({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} yetkilisinin yükseltim geçmiş bilgisi bulunamadı.`)]}).then(x => setTimeout(() => {x.delete().catch(err => {})}, 7500))
          if(!res.StaffLogs) return msg.edit({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} isimli yetkilinin yükseltim geçmiş bilgisi bulunamadı.`)]}).then(x => setTimeout(() => {x.delete().catch(err => {})}, 7500))
          let pages = res.StaffLogs.sort((a, b) => b.Date - a.Date).chunk(10);
          var currentPage = 1
          if (!pages && !pages.length || !pages[currentPage - 1]) return msg.edit({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} isimli yetkilinin yükseltim geçmiş bilgisi bulunamadı.`)]}).then(x => setTimeout(() => {x.delete().catch(err => {})}, 7500))
          let embed = new richEmbed().renk("RANDOM").üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name} • ${currentPage} / ${pages.length}`, message.guild.iconURL({dynamic: true}))
          const row = new MessageActionRow().addComponents([button1, button2]);
          if (message.deferred == false){
          await message.deferReply()
          };
          const curPage = await msg.edit({
          embeds: [embed.açıklama(`${cartelcim} yetkilinin yükseltim geçmiş bilgisi yükleniyor. Lütfen bekleyin...`)],
          components: [row], fetchReply: true,
          }).catch(err => {});

          await curPage.edit({embeds: [embed.açıklama(`${pages[currentPage - 1].map((x, index) => `\` ${index + 1} \` ${message.guild.roles.cache.get(x.Role) ? message.guild.roles.cache.get(x.Role) : "@deleted-role"} <t:${Number(String(x.Date).substring(0, 10))}:R> [**${x.Process}**] (<@${x.Author}>)`).join("\n")}`)]}).catch(err => {})

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
          embeds: [embed.altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name} • ${currentPage} / ${pages.length} `, message.guild.iconURL({dynamic: true})).açıklama(`${pages[currentPage - 1].map((x, index) => `\` ${index + 1} \` ${message.guild.roles.cache.get(x.Role) ? message.guild.roles.cache.get(x.Role) : "@deleted-role"} <t:${Number(String(x.Date).substring(0, 10))}:R> [**${x.Process}**] (<@${x.Author}>) `).join("\n")}`)]
          }).catch(err => {});
          collector.resetTimer();
          });
          collector.on("end", () => {
          if(curPage) curPage.edit({
          embeds: [embed.altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name}`, message.guild.iconURL({dynamic: true})).açıklama(`${cartelcim} isimli yetkilinin toplamda \`${res.StaffLogs.length || 0}\` adet yükseltim geçmiş bilgisi mevcut.`)],
          components: [],
          }).catch(err => {});
          })
          })


    }
};

