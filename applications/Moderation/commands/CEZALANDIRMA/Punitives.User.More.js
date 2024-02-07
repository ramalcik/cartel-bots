const { Client, Message, MessageButton, MessageActionRow } = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "cezaişlemleri",
    command: ["ceza-işlemleri","cezakontrol"],
    aliases: "cezaişlemleri <@cartel/ID>",
    description: "Belirlenen veya komutu kullanan kişi belirlediği yetkili sayısını ve en son belirlediği yetkili sayısını gösterir.",
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
    if(!roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    cartelcim = message.guild.members.cache.get(cartelcim.id)
    let atılanCezalar = await Punitives.find({Staff: cartelcim.id})
    if(!atılanCezalar) return message.reply({content: ` ${cartelcim} kişisinin daha önce yaptırım uyguladığı ceza-i işlem bulunamadı.`});
    let cezalar = atılanCezalar
  //  atılanCezalar.forEach(ceza => cezalar.push({No: ceza.No, Type: ceza.Type, Member: ceza.Member, Reason: ceza.Reason, Date: ceza.Date}))
    let Row = new MessageActionRow().addComponents(
      new MessageButton()
      .setCustomId("last25")
      .setLabel("Son 25 Yaptırımları")
      .setStyle("DANGER"),
      new MessageButton()
      .setCustomId("bans")
      .setLabel("📛 Yasaklamalar")
      .setStyle("PRIMARY"),
      new MessageButton()
      .setCustomId("jails")
      .setLabel("🚫 Cezalandırmalar")
      .setStyle("PRIMARY"),
      new MessageButton()
      .setCustomId("mutes")
      .setLabel("🔇 Susturmalar")
      .setStyle("PRIMARY"),
      new MessageButton()
      .setCustomId("warns")
      .setLabel("🔔 Uyarılar")
      .setStyle("PRIMARY"),
    )
    await message.channel.send({embeds: [new richEmbed().açıklama(`:x: Aşağı da **${cartelcim.user.username}** (${cartelcim}) isimli kişisi(yetkilisi) tarafından yaptırım uygulanan cezalar listelenmektedir, düğmelerden tarafınca yaptırım uygulanan ceza türünü seçerek listeleyebilirsiniz.`)], components: [Row]}).then(async (msg) => {
      const filter = i => i.user.id == message.member.id 
      const collector = msg.createMessageComponentCollector({ filter,  errors: ["time"], time: 60000 })
      collector.on("collect", async (i) => {
        if(i.customId == "last25") {
         await msg.edit({embeds: [new richEmbed().renk("RANDOM").açıklama(`Aşağı da **${cartelcim.user.username}** (${cartelcim}) kişisinin son 25 yaptırım uygulanan cezaları listelenmekte.\n\n${cezalar.slice(0, 25).sort((a, b) => b.Date - a.Date ).filter(x => x.No != "-99999").map((value, index) => `\` #${value.No} (${value.Type}) \` ${message.guild.members.cache.has(value.Member) ? message.guild.members.cache.get(value.Member) : `<@${value.Member}>`} kişisine \`${tarihsel(value.Date)}\` tarihinde ceza-i işlem uygulandı.`).join("\n")}`)]}).catch(err => {}),await i.deferUpdate().catch(err => {})
        }
        if(i.customId == "bans") {
            await msg.edit({embeds: [new richEmbed().renk("RANDOM").açıklama(`Aşağı da **${cartelcim.user.username}** (${cartelcim}) kişisinin son yasakladığı 15 üye listelenmektedir.\n\n${cezalar.filter(x => x.Type == "Yasaklama" || x.Type == "Kalkmaz Yasaklama" || x.Tpye == "Underworld" ).length > 0  ? cezalar.slice(0, 15).sort((a, b) => b.Date - a.Date ).filter(x => x.Type == "Yasaklama" || x.Type == "Kalkmaz Yasaklama" ).map((value, index) => `\` #${value.No} \` ${message.guild.members.cache.has(value.Member) ? message.guild.members.cache.get(value.Member) : `<@${value.Member}>`} kişisine **${value.Reason}** sebebiyle \`${tarihsel(value.Date)}\` tarihinde yasakladı.`).join("\n"): "Daha önce yaptırım uygulanan yasaklama bulunamadı." }`)]}).catch(err => {}),await i.deferUpdate().catch(err => {})
        }
        if(i.customId == "jails") {
            await msg.edit({embeds: [new richEmbed().renk("RANDOM").açıklama(`Aşağı da **${cartelcim.user.username}** (${cartelcim}) kişisinin son cezalandırdığı 15 üye listelenmektedir.\n\n${cezalar.filter(x => message.guild.members.cache.has(x.Member) && x.Type == "Cezalandırılma" ).length > 0 ? cezalar.slice(0, 15).sort((a, b) => b.Date - a.Date ).filter(x => message.guild.members.cache.has(x.Member) && x.Type == "Cezalandırılma" ).map((value, index) => `\` #${value.No} \` ${message.guild.members.cache.has(value.Member) ? message.guild.members.cache.get(value.Member) : `<@${value.Member}>`} kişisine **${value.Reason}** sebebiyle \`${tarihsel(value.Date)}\` tarihinde cezalandırıldı.`).join("\n"): "Daha önce yaptırım uygulanan cezalandırma bulunamadı." }`)]}).catch(err => {}),await i.deferUpdate().catch(err => {})
        }
        if(i.customId == "mutes") {
            await msg.edit({embeds: [new richEmbed().renk("RANDOM").açıklama(`Aşağı da **${cartelcim.user.username}** (${cartelcim}) kişisinin son susturduğu 15 üye listelenmektedir.\n\n${cezalar.filter(x => message.guild.members.cache.has(x.Member) && (x.Type == "Ses Susturulma" || x.Type == "Metin Susturulma") ).length > 0 ? cezalar.slice(0, 15).sort((a, b) => b.Date - a.Date ).filter(x => message.guild.members.cache.has(x.Member) && (x.Type == "Ses Susturulma" || x.Type == "Metin Susturulma") ).map((value, index) => `\` #${value.No} \` ${message.guild.members.cache.has(value.Member) ? message.guild.members.cache.get(value.Member) : `<@${value.Member}>`} kişisine **${value.Reason}** sebebiyle \`${tarihsel(value.Date)}\` tarihinde ${value.Type == "Ses Susturulma" ? "ses kanallarında susturuldu" : "metin kanallarında susturuldu" }.`).join("\n"): "Daha önce yaptırım uygulanan susturulma bulunamadı." }`)]}).catch(err => {}),await i.deferUpdate().catch(err => {})
        }
        if(i.customId == "warns") {
            await msg.edit({embeds: [new richEmbed().renk("RANDOM").açıklama(`Aşağı da **${cartelcim.user.username}** (${cartelcim}) kişisinin son uyardığı 15 üye listelenmektedir.\n\n${cezalar.filter(x => message.guild.members.cache.has(x.Member) && x.Type == "Uyarılma" ).length > 0 ? cezalar.slice(0, 15).sort((a, b) => b.Date - a.Date ).filter(x => message.guild.members.cache.has(x.Member) && x.Type == "Uyarılma" ).map((value, index) => `\` #${value.No} \` ${message.guild.members.cache.has(value.Member) ? message.guild.members.cache.get(value.Member) : `<@${value.Member}>`} kişisine **${value.Reason}** sebebiyle \`${tarihsel(value.Date)}\` tarihinde uyarıldı.`).join("\n"): "Daha önce yaptırım uygulanan uyarma bulunamadı." }`)]}).catch(err => {}),await i.deferUpdate().catch(err => {})
        }
      })
      collector.on('end', i => {
          msg.delete().catch(err => {})
      })
    }).catch(err => {})
  }
};

