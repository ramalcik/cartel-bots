const { MessageEmbed, MessageButton, MessageActionRow,  MessageSelectMenu } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Upstaff = require('../../../../database/Schemas/Plugins/Client.Users.Staffs')
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings')
module.exports = {
    name: "sesli",
    command: ["sesli"],
    aliases: "sesli",
    description: "Belirlenen yetkilinin sunucu içerisinde ki bilgileri gösterir ve yükseltir düşürür.",
    category: "kurucu",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: async function (client) {
  
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    if( !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR') && !roller.yükselticiRoller.some(x => message.member.roles.cache.has(x)) && !roller.limitliYükselticiRolleri.some(x => message.member.roles.cache.has(x))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin yetkili rolü bulunamadı.`)]})
    let pub = message.guild.channels.cache
    .filter(
        (x) =>
            x.parentId == kanallar.publicKategorisi &&
            x.type == "GUILD_VOICE",
    )
    .map((u) => u.members.size)
    .reduce((a, b) => a + b);
let ses = message.guild.channels.cache
    .filter((channel) => channel.type == "GUILD_VOICE")
    .map(
        (channel) =>
            channel.members.filter((member) => !member.user.bot).size,
    )
    .reduce((a, b) => a + b);
let bot = message.guild.channels.cache
    .filter((channel) => channel.type == "GUILD_VOICE")
    .map(
        (channel) =>
            channel.members.filter((member) => member.user.bot).size,
    )
    .reduce((a, b) => a + b);
let tagges = message.guild.members.cache.filter((x) => {
    return (
        x.user.username.includes(ayarlar.tag)  &&
        x.voice.channel &&
     ayarlar.Yetkiler.some(
            (role) => !x.roles.cache.has(role),
        ) &&
        !x.user.bot
    );
}).size;
let notag = message.guild.members.cache.filter((x) => {
    return (
        !x.user.username.includes(ayarlar.tag) &&
        x.voice.channel &&
        !x.user.bot
    );
}).size;
let yetkili = message.guild.members.cache.filter((x) => {
    return (
        x.user.username.includes(ayarlar.tag)  &&
        x.voice.channel &&
        ayarlar.Yetkiler.some((role) => x.roles.cache.has(role)) &&
        !x.user.bot
    );
}).size;
let owner = message.guild.members.cache.filter((x) => {
    return (
        x.voice.channel &&
        roller.kurucuRolleri.some((role) => x.roles.cache.has(role)) &&
        !x.user.bot
    );
}).size;
let stream = message.guild.members.cache.filter((x) => {
    return x.voice.streaming;
}).size;
let mic = message.guild.members.cache.filter((x) => {
    return x.voice.selfMute == true;
}).size;
let kulaklik = message.guild.members.cache.filter((x) => {
    return x.voice.selfDeaf == true;
}).size;
let count = 1;
let category = message.guild.channels.cache
    .filter((x) => x.type === "GUILD_CATEGORY")
    .sort((a, b) =>
        Number(
            message.guild.members.cache.filter(
                (x) =>
                    x.voice.channel &&
                    x.voice.channel.parentId === b.id,
            ).size -
                Number(
                    message.guild.members.cache.filter(
                        (x) =>
                            x.voice.channel &&
                            x.voice.channel.parentId === a.id,
                    ).size,
                ),
        ),
    )
    .map(
        (c, index) =>
            `${count++}. **#${c.name}**: **${
                c.members.filter(
                    (s) =>
                        s.voice.channel &&
                        s.voice.channel.parentId === c.id,
                ).size
            }**`,
    )
    .splice(0, 3)
    .join("\n");
   
    if (!args[0]) {
       message.channel.send({embeds: [new richEmbed()
        .setThumbnail(message.guild.iconURL({dynamic: true}))
            .açıklama(`
Sesli kanallarda toplam **${ses}** kişi var !
───────────────
Public odalarda **${pub}** kişi var !
Ses kanallarında **${notag}** normal kullanıcı var !
Ses kanallarında **${tagges}** taglı kullanıcı var !
Ses kanallarında toplam **${yetkili}** yetkili var !
Ses kanallarına toplam **${owner}** kurucu var !`)]})
       
    }
    if (args[0] == "detay") {
        message.channel.send({embeds: [new richEmbed()
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .açıklama(`
Sesli kanallarda toplam **${ses}** kişi var !
───────────────
Public odalarda **${pub}** kişi var !
Ses kanallarında **${notag}** normal kullanıcı var !
Ses kanallarında **${tagges}** taglı kullanıcı var !
Ses kanallarında toplam **${yetkili}** yetkili var !
Ses kanallarına toplam **${owner}** kurucu var !
───────────────
Ses kanallarında **${stream}** kişi yayın yapıyor.
Mikrofonu Kapalı: **${mic}**
Kulaklığı Kapalı: **${kulaklik}**
Bot: **${bot}**
───────────────
Top 3 kategori sırası;
${category}
`)]})
    }

  }
}