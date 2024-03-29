const {MessageActionRow, MessageButton, MessageSelectMenu} = Discord = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "denetim",
    command: ["denetim"],
    aliases: "denetim",
    description: "Belirtilen bir rolün üyelerinin seste olup olmadığını ve rol bilgilerini gösterir.",
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
    let embed = new richEmbed()
    let Row = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId("denetim-rol")
        .setLabel("Son Silinen Roller")
        .setStyle("SECONDARY")
        .setEmoji("943285259733184592"),
        new MessageButton()
        .setCustomId("denetim-kanallar")
        .setLabel("Son Silinen Kanallar")
        .setStyle("SECONDARY")
        .setEmoji("943285868368633886"),
    )

    message.reply({components: [Row], content: `Aşağıda **${message.guild.name}** sunucusuna ait denetim kaydında bulunan silinen rolleri ve kanalları listelersiniz.
Düğme ile silinen rolleri veya kanalları tekrardan kurabilirsiniz.`}).then(async (msg) => {
    var filter = (i) => i.user.id == message.author.id;
    let collector = msg.createMessageComponentCollector({filter: filter, time: 60000});
    collector.on('end', (collected, reason) => {
        if(reason == "time"){
            msg.delete().catch(err => {});
        }
    })
    collector.on('collect', async (i) => {
        if(i.customId == "denetim-rol") {
            msg.delete().catch(err => { })
            let opt = []
            const audit = await message.guild.fetchAuditLogs({ type: 'ROLE_DELETE' }).then(a => a.entries)
            const denetim = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60)
            .map(e => {
                opt.push({label: `${e.changes.filter(e => e.key === 'name').map(e => e.old)}`, value: e.target.id})
            })
            let RowChannel = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId(`${i.user.id}+denetim-roller`)
                    .setPlaceholder("Son 1 saat içerisinde silinenler.")
                    .setOptions(
                        opt.length > 0 ? opt : [{label: "Son 1 saat içerisinde silinen roller yok.", value: "0"}]
                    )
            )
           await i.reply({content: `**Merhaba!** ${message.author.tag}
Aşağıda son 1 saat içerisinde silinen rol listesi bulunmaktadır.
Seçilen rol otomatik olarak bot tarafından kurulmaktadır. :tada:`, components: [RowChannel], ephemeral: true})
            var filter = (i) => i.user.id == message.author.id;
            let collector = msg.channel.createMessageComponentCollector({filter: filter, time: 60000, max: 1});
            collector.on('collect', async (i) => {
                if(i.customId == `${i.user.id}+denetim-roller`) {
                    if(i.values[0] != "0") {
                        let channel = client.commands.find(x => x.name == "rolkur")
                        if(channel) channel.komutClient(client, message, [i.values[0]])
                        await i.update({components: [], content: `Başarıyla rol kurma komutlarına istek gönderildi.`})
                        message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
                    } else {
                        i.reply({content: `Son 1 saat içerisinde silinen bir veri bulunamadı.`, ephemeral: true})
                    }
                }
            })
        }
        if(i.customId == "denetim-kanallar") {
            msg.delete().catch(err => { })
            let opt = []
            const audit = await message.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(a => a.entries)
            const denetim = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60)
            .map(e => {
                opt.push({label: `${e.changes.filter(e => e.key === 'name').map(e => e.old)}`, value: e.target.id})
            })
            let RowChannel = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId(`${i.user.id}+denetim-kanallar`)
                    .setPlaceholder("Son 1 saat içerisinde silinenler.")
                    .setOptions(
                        opt.length > 0 ? opt : [{label: "Son 1 saat içerisinde silinen kanallar yok.", value: "0"}]
                    )
            )
           await i.reply({content: `**Merhaba!** ${message.author.tag}
Aşağıda son 1 saat içerisinde silinen kanal listesi bulunmaktadır.
Seçilen kanal otomatik olarak bot tarafından kurulmaktadır. :tada:`, components: [RowChannel], ephemeral: true})
            var filter = (i) => i.user.id == message.author.id;
            let collector = msg.channel.createMessageComponentCollector({filter: filter, time: 60000, max: 1});
            collector.on('collect', async (i) => {
                if(i.customId == `${i.user.id}+denetim-kanallar`) {
                    if(i.values[0] != "0") {
                        let channel = client.commands.find(x => x.name == "seskur")
                        if(channel) channel.komutClient(client, message, [i.values[0]])
                        let voice = client.commands.find(x => x.name == "metinkur")
                        if(voice) voice.komutClient(client, message, [i.values[0]])
                        let category = client.commands.find(x => x.name == "kategorikur")
                        if(category) category.komutClient(client, message, [i.values[0]])
                        await i.update({components: [], content: `Başarıyla kanal kurma komutlarına istek gönderildi.`})
                        message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
                    } else {
                        i.reply({content: `Son 1 saat içerisinde silinen bir veri bulunamadı.`, ephemeral: true})
                    }
                }
            })
        }
    })

})
   }
};