const { Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Users = require('../../../../database/Schemas/Client.Users');
module.exports = {
    name: "isimler",
    command: ["isimsorgu"],
    aliases: "isimler <@cartel/ID>",
    description: "Belirlenen üyenin önceki isim ve yaşlarını gösterir.",
    category: "teyit",
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
    if(!roller.teyitciRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    if (!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(cevaplar.üyeyok)]})
    cartelcim = message.guild.members.cache.get(cartelcim.id)
    let isimveri = await Users.findById(cartelcim.id)
    if(isimveri && isimveri.Names) {
    let isimler = isimveri.Names.length > 0 ? isimveri.Names.reverse().map((value, index) => `\`${value.Name}\` (${value.State}) ${value.Staff ? "(<@"+ value.Staff + ">)" : ""}`).join("\n") : "";
	if(isimveri.Names.length < 10) {
        message.reply({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin toplamda **${isimveri.Names.length || 0}** isim kayıtı bulundu.\n\n${isimler}`)]})
    } else {
        const button1 = new MessageButton()
        .setCustomId('geri')
        .setLabel('Önceki Sayfa').setEmoji("⬅️")         
        .setStyle('PRIMARY');
  
  const button2 = new MessageButton()
        .setCustomId('ileri')
        .setLabel('Sonraki Sayfa').setEmoji("➡️")         
        .setStyle('PRIMARY');
  Users.findOne({_id: cartelcim.id }, async (err, res) => {
    let msg = await message.reply({embeds: [new richEmbed().açıklama(`${cartelcim} kişisinin isim kayıtları yükleniyor...`)]})
  let pages = res.Names.sort((a, b) => b.Date - a.Date).chunk(10);
  var currentPage = 1
  if (!pages && !pages.length || !pages[currentPage - 1]) return msg.edit({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} isimli yetkilinin yükseltim geçmiş bilgisi bulunamadı.`)]}).then(x => setTimeout(() => {x.delete().catch(err => {})}, 7500))
  let embed = new richEmbed().renk("RANDOM").üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name} • ${currentPage} / ${pages.length}`, message.guild.iconURL({dynamic: true}))
  const row = new MessageActionRow().addComponents([button1, button2]);
  if (message.deferred == false){
  await message.deferReply()
  };
  const curPage = await msg.edit({
  embeds: [embed.açıklama(`${cartelcim} kişisinin isim geçmişi yükleniyor...`)],
  components: [row], fetchReply: true,
  }).catch(err => {});

  await curPage.edit({embeds: [embed.açıklama(`${cartelcim} kişisinin toplamda **${isimveri.Names.length || 0}** isim kayıtı bulundu.\n\n${pages[currentPage - 1].map((value, index) => `\`${value.Name}\` (${value.State}) ${value.Staff ? "(<@"+ value.Staff + ">)" : ""}`).join("\n")}`)]}).catch(err => {})

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
  embeds: [embed.altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name} • ${currentPage} / ${pages.length} `, message.guild.iconURL({dynamic: true})).açıklama(`${cartelcim} kişisinin toplamda **${isimveri.Names.length || 0}** isim kayıtı bulundu.\n\n${pages[currentPage - 1].map((value, index) => `\`${value.Name}\` (${value.State}) ${value.Staff ? "(<@"+ value.Staff + ">)" : ""}`).join("\n")}`)]
  }).catch(err => {});
  collector.resetTimer();
  });
  collector.on("end", () => {
  if(curPage) curPage.edit({
  embeds: [embed.altBaşlık(`${ayarlar.serverName ? ayarlar.serverName : message.guild.name}`, message.guild.iconURL({dynamic: true})).açıklama(`${cartelcim} kişisinin toplamda \`${res.Names.length || 0}\` adet isim geçmişi bulunmakta.`)],
  components: [],
  }).catch(err => {});
  })
  })
    }
    } else {
         message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin isim kayıtı bulunamadı.`)]});
     }
    }
};