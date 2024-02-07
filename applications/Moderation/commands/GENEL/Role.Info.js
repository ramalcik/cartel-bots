const {MessageActionRow, MessageButton, MessageSelectMenu} = Discord = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Seens = require('../../../../database/Schemas/Guild.Users.Seens');
let seens = []
module.exports = {
    name: "rolbilgi",
    command: ["rol-bilgi", "rolinfo", "bilgirol"],
    aliases: "rolbilgi <@Rol/ID>",
    description: "Belirtilen roldeki üyeleri sayar.",
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
    if(!roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]}) 
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(!role) return message.reply({content: `Belirtilen argümanlarda rol'e ait herhangi bir bilgi bulunamadı.`}).then(x => {
        message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined).catch(err => {

        })
        setTimeout(() => {
                x.delete().catch(err => {

                })
        }, 5000);
    })

    message.member.Leaders("rol", 0.01, {type: "ROLE", role: role.id, channel: message.channel.id})
    let load = await message.reply({content: `Belirtilen ${role.name} rolünün bilgileri getirilirken lütfen bekleyin.`})
    let offlinemembers = role.members.filter(x => !x.presence)
    let sestemembers = role.members.filter(x => (x.presence && x.presence !== "offline") && x.voice.channel)
    let sesteolmayanaktif = role.members.filter(x => (x.presence && x.presence !== "offline") && !x.voice.channel)
    let offlineamaseste = role.members.filter(x => !x.presence && x.voice.channel)
    let text = `**Rol Adı**: ${role.name} (\`${role.id}\`)
**Rol Rengi**: ${role.hexColor} (\`${role.color}\`)
**Rol Pozisyon**: ${role.rawPosition}
**Rol Üye Sayısı**:  ${role.members.size} 
─────────────────────
**Üyeler (\`Çevrim-Dışı\`) (\`${offlinemembers.size} üye\`)**
─────────────────────
${offlinemembers.size > 0 ? offlinemembers.map(x => {
    return `<@${x.id}> [\`${x.displayName ? x.displayName : x.username}\`]`
}).join("\n") : `Çevrim-dışı üye bulunamadı.`}
─────────────────────
**Üyeler (\`Aktif - Seste Olmayan\`) (\`${sesteolmayanaktif.size} üye\`)**
─────────────────────
${sesteolmayanaktif.size > 0 ? sesteolmayanaktif.map(x => {
    return `${x} [\`${x.displayName ? x.displayName : x.username}\`] (\`${x.id}\`)`
}).join("\n") : `Seste olmayan aktif bir üye bulunamadı.`}
─────────────────────
**Üyeler (\`Seste Olanlar\`) (\`${sestemembers.size} üye\`)**
─────────────────────
${sestemembers.size > 0 ? sestemembers.map(x => {
return `${x} [\`${x.displayName ? x.displayName : x.username}\`] (${x.voice.channel})`
}).join("\n") : `Seste olan üye bulunamadı.`}
─────────────────────
**Üyeler (\`Çevrim-Dışı - Seste Olanlar\`) (\`${offlineamaseste.size} üye\`)**
─────────────────────
${offlineamaseste.size > 0 ? offlineamaseste.map(x => {
return `${x} [\`${x.displayName ? x.displayName : x.username}\`] (${x.voice.channel})`
}).join("\n") : `Çevrim-dışı ama seste bulunan üye bulunamadı.`}
─────────────────────`

    load.edit({content: `${text}`}).catch(err => {
        const arr = Discord.Util.splitMessage(`${text}`, { maxLength: 1950, char: "" });
        load.edit({content: `Belirtilen ${role.name} rolünde 2048 karakteri aşan listeleme bulunduğundan aşağıya yeni mesaj şeklinde listeleyecektir.`})
        arr.forEach(element => {
           message.channel.send({content: `${element}`});
        });
})


  }

};
