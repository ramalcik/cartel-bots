const { GuildMember, MessageEmbed, Message, MessageActionRow, MessageButton } = require("discord.js");
const fs = require('fs');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Roles = require('../../../../database/Schemas/Guards/GuildMember.Roles.Backup');
 /**
 * @param {Guild} guild
 * @param {GuildMember} user
 */
  module.exports = async () => {

    

    setInterval(async () => {
        const Permissions = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD",  "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"];  
        let newPresence = client.guilds.cache.get(sistem.SUNUCU.GUILD)
        if(!newPresence) return;
        const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
        let Data = await Guard.findOne({guildID: newPresence.id})
        if(Data && !Data.webGuard) return; 
    newPresence.members.cache.filter(x => !x.user.bot && x.presence && x.roles.cache.filter((e) => e.editable && e.name !== "@everyone" && Permissions.some((a) => e.permissions.has(a)))).forEach(async (cartelcim) => {
    
    let embed = new richEmbed()
    let Dedection =  Object.keys(cartelcim.presence.clientStatus);
    let Row = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId('ver')
        .setLabel('Rolleri Geri Ver!')
        .setStyle("PRIMARY"),
    )
    
    const Permissions = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD",  "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"];        
    
    let arr = []
    let CheckWeb = Dedection.find(x => x == "web");
    let memberSafeRoles = cartelcim.roles.cache.filter((e) => e.editable && e.name !== "@everyone" && Permissions.some((a) => e.permissions.has(a)));
    if(memberSafeRoles) memberSafeRoles.forEach(rol => {
        arr.push(rol.id)
    })
    
    if(CheckWeb && Permissions.some(x => cartelcim.permissions.has(x))) {
       if(await client.checkMember(cartelcim.id)) return; 
        await Roles.updateOne({_id: cartelcim.id}, {$set: {"Roles": arr, Reason: "Web tarayıcı girişi için kaldırıldı."}}, {upsert: true})
        if(arr && arr.length >= 1) await cartelcim.roles.remove(arr, `Web üzerinden sunucuyu görüntülediği için.`).catch(err => {})
        
        let loged = cartelcim.guild.kanalıBul("cartelfx");
        loged.send({embeds: [embed.başlık("Uyarı:Web Giriş").açıklama(`${cartelcim} (\`${cartelcim.id}\`) isimli kullanıcı Web tarayıcısından Discord ekranına giriş yaptı.`)]})
        if(loged) await loged.send({embeds: [embed], components: [Row]}).then(async (msg) => {
            const tacsahip = await cartelcim.guild.fetchOwner();
            const filter = i =>  i.customId == "ver" && (sistem.Rooter.Users.some(user => user.isim === i.user.username) || i.user.id === tacsahip.id)
            const collector = msg.createMessageComponentCollector({ filter, max: 1 })
         
            collector.on('collect', async i => { 
                if(i.customId == "ver") {
                    let Data = await Roles.findOne({_id: cartelcim.id})
                    if(Data && Data.Roles && Data.Roles.length) {
                        i.reply({embeds: [new richEmbed().açıklama(`${cartelcim}, kişisinin alınan rolleri üzerine yeniden verildi.`)]})
                        if(Data.Roles) cartelcim.roles.add(Data.Roles, `${i.user.username} tarafından tekrardan verildi.`).catch(err => {})
                        await Roles.findByIdAndDelete(cartelcim.id)
                    } else {
                        i.reply({embeds: [new richEmbed().açıklama(`${cartelcim}, kişisinin rolleri veritabanında bulunamadığından işlem başarısız.`)]})
                    }
                }
            })
            collector.on('end', c => {
                msg.edit({embeds: [embed], components: []}).catch(err => {})
            })
        });
        const owner = await cartelcim.guild.fetchOwner();
        if(owner) owner.send({embeds: [embed]}).catch(err => {})
    }
})
   
    }, 20000);
}

module.exports.config = {
    Event: "ready"
}