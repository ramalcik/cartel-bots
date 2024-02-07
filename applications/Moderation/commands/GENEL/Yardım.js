const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');
module.exports = {
    name: "yardım",
    command: ["help", "yardim"],
    aliases: "yardım <@cartel/ID>",
    description: "Belirtilen üyenin profil resmini büyültür.",
    category: "Misc",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.on('interactionCreate', async i => {
        if (!i.isSelectMenu()) return;
        let Data = await GUILDS_SETTINGS.findOne({ _id: 1 })
        if (i.customId === 'cartel_yardim') {
            if(i.values == "talent") {
                i.reply({embeds: [new richEmbed().açıklama(`${Data ?  Data.talentPerms ? Data.talentPerms.map(x => `\`${sistem.botSettings.Prefixs[0] + x.Commands + " <@cartel/ID>"}\``).join("\n") : '' : ''}`)], ephemeral: true})
           } else {
            i.reply({
                embeds: [
                  new richEmbed().açıklama(
                    `${client.commands.filter(x => x.extend !== false && x.category === `${i.values}`).map(x => `\`${sistem.botSettings.Prefixs[0] + x.aliases}\``).join("\n")}`
                  )
                ],
                ephemeral: true
              });
           }
        }
    });
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    let embed = new richEmbed()
    let Data = await GUILDS_SETTINGS.findOne({ _id: 1 })
    let Row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("yardimmenusu")
        .setPlaceholder("Yardım kategorisini listeden seçin!")
        .setOptions(
            {label: "Üye Komutları", description: "Genel tüm komutları içerir.", value: "diğer"},
            {label: "Stats Komutları", description: "Genel tüm stat komutlarını içerir.", value: "stat"},
            {label: "Register Komutları", description: "Genel tüm kayıt komutlarını içerir.", value: "teyit"},
            {label: "Yetkili Komutları", description: "Genel tüm yetkili komutlarını içerir.", value: "yetkili"},
            {label: "Yönetim Komutları", description: "Genel tüm yönetim komutlarını içerir.", value: "yönetim"},
            {label: "Kurucu Komutları", description: "Genel tüm kurucu komutlarını içerir.", value: "kurucu"}
        )
    )



    const cartel = await message.reply({components: [Row] ,embeds: [new richEmbed().açıklama(`Aşağıdaki kategorilerden komut yardımı almak istediğiniz kategoriyi seçin!`)]})
    var filter = i => i.user.id == message.member.id
    let collector = cartel.createMessageComponentCollector({filter: filter, time: 60000, error: ["time"]})
    
    collector.on("collect", i => {
        if(i.customId == "yardimmenusu") {
           if(i.values == "talent") {
                cartel.edit({embeds: [new richEmbed().açıklama(`${Data ?  Data.talentPerms ? Data.talentPerms.map(x => `\`${sistem.botSettings.Prefixs[0] + x.Commands + " <@cartel/ID>"}\``).join("\n") : '' : ''}`)]})
           } else {
                cartel.edit({embeds: [new richEmbed().açıklama(`${client.commands.filter(x => x.extend !== false && x.category === `${i.values}`).map(x => `\`${sistem.botSettings.Prefixs[0] + x.aliases}\``).join("\n")}`)]})
           }
           i.deferUpdate()
        }
    })
    collector.on("end", () => {
        cartel.delete().catch(err => {})
      })
    }
};