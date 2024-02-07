const { Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "git",
    command: ["git", "izinligit"],
    aliases: "izinligit @cartel/ID",
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
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!message.member.voice.channel) return message.channel.send({embeds: [ embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Bir kanala katıl ve tekrar dene.`)]})
    if (!member) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if (message.member.id === member.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if (message.member.voice.channel === member.voice.channel) return message.rchannel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`${member} kişisiyle aynı kanaldasınız.`)]})
    if (!member.voice.channel) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`${member} kişisi ses kanalına bağlı değil.`)]})
    if (member.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if (message.member.permissions.has('ADMINISTRATOR') || roller.kurucuRolleri.some(x => message.member.roles.cache.has(x))) {
        message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
        await message.member.voice.setChannel(cartelcim.voice.channel.id).catch(err => {})
        return message.reply({embeds: [embed.açıklama(`${message.member} isimli yetkili ${cartelcim} (\`${cartelcim.voice.channel.name}\`) kişisinin odasına gitti!`)]}).then(x => setTimeout(() => {
            x.delete().catch(err => {})
        }, 7500))
    }
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
    
    message.channel.send({content: `${cartelcim.toString()}`, embeds: [embed.açıklama(`${cartelcim}, ${message.author} kişisi \`${cartelcim.voice.channel.name}\` adisimlilı odanıza gelmek istiyor.\nKabul ediyor musun?`)], components: [Row]}).then(async (msg) => {
        var filter = (i) => i.user.id == cartelcim.id
        let collector = msg.createMessageComponentCollector({filter: filter, time: 30000})

        collector.on('collect', async (i) => {
            if(i.customId == "kabulet") {
                await i.deferUpdate().catch(err => {})
                await msg.edit({content: `${message.member.toString()}`, embeds: [embed.açıklama(`${message.author}, ${cartelcim} kişi senin odaya gelme isteğini kabul etti.`)], components: []}).catch(err => {})
                await message.member.voice.setChannel(cartelcim.voice.channel.id).catch(err => {})
                message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
                setTimeout(() => {
                    msg.delete().catch(err => {})
                }, 12000);
            }
            if(i.customId == "reddet") {
                await i.deferUpdate().catch(err => {})
                await msg.edit({content: `${message.member.toString()}`, embeds: [embed.açıklama(`${message.author}, ${cartelcim} kişi senin odaya gelme isteğini reddetti!`)], components: []}).catch(err => {})
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
            setTimeout(() => {
                msg.delete().catch(err => {})
            }, 12000);
        })
    })

    }
};