const { Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "çek",
    command: ["çek", "izinliçek","cek","izinlicek"],
    aliases: "izinliçek @cartel/ID",
    description: "Belirlenen üyeye izin ile yanına gider.",
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
    let embed = new richEmbed()
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!message.member.voice.channel) return message.channel.send({embeds: [ embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Bir kanala katıl ve tekrar dene.`)]})
    if (!member) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if (message.member.id === member.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if (message.member.voice.channel === member.voice.channel) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`${member} kişisiyle aynı kanaldasınız.`)]})
    if (!member.voice.channel) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`${member} kişisi ses kanalına bağlı değil.`)]})
    if (member.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if (message.member.roles.highest.position < cartelcim.roles.highest.position) { 
        let Row = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId("kabulet")
            .setLabel("Kabul Et")
            .setEmoji(message.guild.emojiyiBul(emojiler.onay_cartel))
            .setStyle("SECONDARY"),
            new MessageButton()
            .setCustomId("reddet")
            .setLabel("Reddet")
            .setEmoji(message.guild.emojiyiBul(emojiler.no_cartel))
            .setStyle("DANGER")
        )   
        message.channel.send({content: `${cartelcim.toString()}`, embeds: [embed.açıklama(`${member}, ${message.author} adlı üye \`${message.member.voice.channel.name}\` odasına seni çekmek istiyor.\nKabul ediyor musun?`)], components: [Row]}).then(async (msg) => {
            var filter = (i) => i.user.id == cartelcim.id
            let collector = msg.createMessageComponentCollector({filter: filter, time: 30000})
            collector.on('collect', async (i) => {
                if(i.customId == "kabulet") {
                    await i.deferUpdate().catch(err => {})
             
                    await msg.edit({content: `${message.member.toString()}`, embeds: [embed.açıklama(`${cartelcim}, kişi senin odaya çekme isteğini kabul etti.`)], components: []}).catch(err => {})
                    await cartelcim.voice.setChannel(message.member.voice.channel.id).catch(err => {});
                    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
                    setTimeout(() => {
                        msg.delete().catch(err => {})
                    }, 12000);
                }
                if(i.customId == "reddet") {
                    await i.deferUpdate().catch(err => {})
                   
                    await msg.edit({content: `${message.member.toString()}`, embeds: [embed.açıklama(`${cartelcim}, kişi senin odaya çekme isteğini reddetti!`)], components: []}).catch(err => {})
                    message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined).catch(err => {})
                    setTimeout(() => {
                        msg.delete().catch(err => {})
                    }, 12000);
                }
            })
            collector.on('end', async (i) => {
                i.delete()
                let RowTwo = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId("kabulet")
                    .setLabel("⏲️ Mesajın geçerlilik süresi doldu.")
                    .setStyle("DANGER")
                    .setDisabled(true),
                )  
                await msg.edit({content: `${message.member.toString()}`, embeds: [embed.açıklama(`${message.author}, ${cartelcim} kişi tepki vermediğinden dolayı işlem iptal edildi.`)], components: [RowTwo]}).catch(err => {})
           
                })
            }
        )
    } else {
        if (roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) || message.member.permissions.has('ADMINISTRATOR')) {
            await cartelcim.voice.setChannel(message.member.voice.channel.id).catch(err => {});
            message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
            return message.channel.send({embeds: [embed.açıklama(`${message.member} isimli yetkili ${member} kişiyi \`${message.member.voice.channel.name}\` isimli odaya çekti!`)]})
        }
    }
    }
};