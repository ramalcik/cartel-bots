const { Client, MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

const normalLoglar = [
    "isim-log",
    "kayıt-log",
    "kayıtsız-log",
    "taglı-log",
    "terfi-log",
    "yetki-ver-log",
    "yetki-bırakan",
    "yetki-çek-log",
    "mesaj-log",
    "voice-log",
    "nsfw-log",
    "bkes-log",
    "taşı-log",
    "underworld-log",
    "ban-log",
    "jail-log",
    "şüpheli-log",
    "yasaklı-tag-log",
    "booster-log",
    "mute-log",
    "sesmute-log",
    "uyarı-log",
    "rol-ver-log",
    "rol-al-log",
    "görev-log",
    "görev-bilgi",
   "başvuru-log",
   "açılmaz-ban-log",
    "şikayet-log",
    "command-safe",
    "bot-log",
    "cartelfx",
    "server-log",
    "açılmaz-ban-log",
]
module.exports = {
    name: "logkur",
    command: ["logkanalkur"],
    aliases: "",
    description: "",
    category: "-",
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
    if(ayarlar.type) normalLoglar.push("tag-log");
    if(message.guild.channels.cache.find(x => x.name == "CA-LOG")) {
        const butonY = new MessageActionRow()
        .addComponents(
                new MessageButton()
                .setCustomId('kaldıramk')
                .setLabel('Kanalları Kaldır!')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('tekrarkuroç')
                .setLabel('Kanalları Tekrar Kur!')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('iptal')
                .setEmoji(message.guild.emojiyiBul(emojiler.no_cartel).id)
                .setLabel('İşlemi İptal Et')
                .setStyle('DANGER'),
            );
            let bulNormal = message.guild.channels.cache.find(x => normalLoglar.some(log => x.name == log))
                       await message.channel.send({components: [butonY] ,embeds: [new richEmbed().açıklama(`(\`#${message.guild.channels.cache.find(x => x.name == "CA-LOG").name}\` kategorilere kurulmuş olarak gösterilmektedir. Aşağıdaki düğmelerden yapılmasını istediğiniz işlemi seçiniz!`)]})
            .then(x => {
                const filter = i =>  i.user.id === message.member.id;

                const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });
                
                collector.on('collect', async i => {
                    if(i.customId === "tekrarkuroç") {
                        x.delete()
                        message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
                        i.deferUpdate()
                        return kanalKur(message)
                    }
                    if (i.customId === 'kaldıramk') {
                        i.deferUpdate()
                        x.delete().catch(err => {})
                        message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
                        
                        await message.guild.channels.cache.filter(k => normalLoglar.some(x => k.name == x)).forEach(x => x.delete().catch(err => {}))
                                               await message.guild.channels.cache.find(x => x.name == "CA-LOG").delete().catch(err => {})

                   
                  }
                    if (i.customId === "iptal") {
                        x.delete()
                        message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
                    }
                   
                });
                
                collector.on('end', collected => {});
            })
    } else {
        kanalKur(message)
    }
    }
};

async function kanalKur(message) {
    const log = await message.guild.channels.create("CA-LOG", {
        type: "GUILD_CATEGORY",
        permissionOverwrites: [{
            id: message.guild.roles.everyone.id,
            deny: ['VIEW_CHANNEL']
        }]
    });

    normalLoglar.some(x => {
        message.guild.channels.create(x, {parent: log});
    })
       message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Tüm gerekli log kanalları başarıyla oluşturuldu ve veri tabanına otomatik olarak entegre edildi.`)]})
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
}