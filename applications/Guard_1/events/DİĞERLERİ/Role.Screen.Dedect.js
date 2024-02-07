const { GuildMember, MessageEmbed, Message, Utils, MessageActionRow, MessageButton } = require("discord.js");
const fs = require('fs');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Roles = require('../../../../database/Schemas/Guards/GuildMember.Roles.Backup');

 /**
 * @param {Guild} guild
 * @param {GuildMember} user
 */

module.exports = async (oldPresence, newPresence, message, args) => {
    if(newPresence.user.bot) return;
    if(!newPresence) return;
    if(!newPresence.member) return;
    let embed = new richEmbed()
    let cartelim = newPresence.guild.members.cache.get(newPresence.member.user.id)
    if(!cartelim) return;
    if(cartelim.guild.id != global.sistem.SUNUCU.GUILD) return;
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: cartelim.guild.id})
    if(Data && !Data.offlineGuard) return;
    let Row = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId('ver')
        .setLabel('Rolleri Geri Ver!')
        .setStyle("SECONDARY"),
        )
        const Permissions = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD",  "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"];        
        let arr = []
    let Dedection =  Object.keys(newPresence.member.presence.clientStatus);
    let CheckWeb = Dedection.find(x => x == "web");
    let memberSafeRoles =  cartelim.roles.cache.filter((e) => e.editable && e.name !== "@everyone" && Permissions.some((a) => e.permissions.has(a)));
    if(memberSafeRoles) memberSafeRoles.forEach(rol => {
            arr.push(rol.id)
    })
    
    if(cartelim && cartelim.presence && cartelim.presence.status == "offline" && Permissions.some(x => cartelim.permissions.has(x))) {
        if(await client.checkMember(cartelim.id)) return; 
        await Roles.updateOne({_id: cartelim.id}, {$set: {"Roles": arr, Reason: "Çevrimdışı"}}, {upsert: true})
        if(arr && arr.length >= 1) await cartelim.roles.remove(arr, `Çevrimdışı alındığından dolayı yetkisi alındı.`).catch(err => {})
       embed.üstBaşlık(cartelim.user.username, cartelim.user.avatarURL({ dynamic: true})).başlık("Sunucuda Bir Yönetici Çevrim-Dışı Oldu!").açıklama(`${cartelim} (\`${cartelim.id}\`) kişisi Çevrim-Dışı oldu.\n
Alınan rol: ${arr.length >= 1 ? `${arr.filter(x => cartelim.guild.roles.cache.get(x)).map(x => cartelim.guild.roles.cache.get(x)).join(", ")}` : ` Rol alınmadı.` } `)
            let loged = newPresence.guild.kanalıBul("cartelfx");
            if(loged) await loged.send({embeds: [embed]})
    } else if(cartelim && cartelim.presence && cartelim.presence.status != "offline") {
        let Data = await Roles.findOne({_id: cartelim.id, Reason: "Çevrimdışı"})
        if(Data && Data.Roles && Data.Roles.length) {
            if(Data.Roles) cartelim.roles.add(Data.Roles, `Aktif olduğundan dolayı alınan yetkileri tekrardan verildi.`).catch(err => {})
            await Roles.findByIdAndDelete(cartelim.id)
        }
    }
}

module.exports.config = {
    Event: "presenceUpdate"
}

client.on("presenceUpdate", async (oldPresence, newPresence) => {
    if(!newPresence) return;
    if(!newPresence.member) return;
    let embed = new richEmbed()
    let Dedection =  Object.keys(newPresence.member.presence.clientStatus);
    let cartelim = newPresence.guild.members.cache.get(newPresence.member.user.id)
    if(!cartelim) return;
    if(cartelim.guild.id != global.sistem.SUNUCU.GUILD) return;
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: cartelim.guild.id})
    if(Data && !Data.webGuard) return;
    let Row = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId('ver')
        .setEmoji()
        .setLabel('Rolleri Geri Ver!')
        .setStyle("SECONDARY"),
    )
    const Permissions = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD",  "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"];        
    let arr = []
    let CheckWeb = Dedection.find(x => x == "web");
    let memberSafeRoles =  cartelim.roles.cache.filter((e) => e.editable && e.name !== "@everyone" && Permissions.some((a) => e.permissions.has(a)));
    if(memberSafeRoles) memberSafeRoles.forEach(rol => {
            arr.push(rol.id)
    })

    if(CheckWeb && Permissions.some(x => cartelim.permissions.has(x))) {
        if(await client.checkMember(cartelim.id)) return; 
         await Roles.updateOne({_id: cartelim.id}, {$set: {"Roles": arr, Reason: "Web tarayıcı girişi için kaldırıldı."}}, {upsert: true})
         if(arr && arr.length >= 1) await cartelim.roles.remove(arr, `Web üzerinden sunucuyu görüntülediği için.`).catch(err => {})
embed.başlık("Bir Yönetici Sunucuya Webden Giriş Sağladı!").açıklama(`${cartelim} (\`${cartelim.id}\`) isimli yönetici Web tarayıcısından **Sunucu** ekranına giriş yaptı.`)
         let loged = newPresence.guild.kanalıBul("cartelfx");
         if(loged) await loged.send({embeds: [embed], components: [Row]}).then(async (msg) => {
             const tacsahip = await newPresence.guild.fetchOwner();
             const filter = i =>  i.customId == "ver" && (sistem.Rooter.Users.some(user => user.isim === i.user.username) || i.user.id === newPresence.guild.fetchOwner().id)
             const collector = msg.createMessageComponentCollector({ filter, max: 1 })
          
             collector.on('collect', async i => { 
                 if(i.customId == "ver") {
                     let Data = await Roles.findOne({_id: cartelim.id})
                     if(Data && Data.Roles && Data.Roles.length) {
                         i.reply({content: `${cartelim}, kişisinin alınan rolleri başarıyla geri verildi.`, ephemeral: true})
                         if(Data.Roles) cartelim.roles.add(Data.Roles, `${i.user.username} tarafından tekrardan verildi.`).catch(err => {})
                         await Roles.findByIdAndDelete(cartelim.id)
                     } else {
                         i.reply({content: `${cartelim.guild.emojiyiBul(emojiler.no_cartel)} ${cartelim}, kişisinin rolleri veritabanında bulunamadığından işlem sonlandırıldı.`, ephemeral: true})
                     }
                 }
             })
             collector.on('end', c => {
                 msg.edit({embeds: [embed], components: []}).catch(err => {})
             })
         });
         const owner = await newPresence.guild.fetchOwner();
         if(owner) owner.send({embeds: [embed]}).catch(err => {})
         client.processGuard({
            type: "Tarayıcı Girişi!",
            target: cartelim.id,
        })
 
     } else {
         return;
     }
})

