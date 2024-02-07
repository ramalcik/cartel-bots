const { MessageEmbed , Guild} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

/**
 * 
 * @param {Guild} role 
 * @returns 
 * 
 */

module.exports = async role => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: role.guild.id})
    if(Data && !Data.roleGuard) return;
       let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "roles" ,"Rol Oluşturma!")) return;
    let embed = new richEmbed().üstBaşlık(entry.executor.username, entry.executor.avatarURL({ dynamic: true})).başlık("Sunucuda Rol Oluşturuldu!")
    client.punitivesAdd(entry.executor.id, "ban")
    client.allPermissionClose()
    embed.açıklama(`${entry.executor} (__${entry.executor.id}__) tarafından bir rol oluşturuldu! Oluşturan kişi yasaklandı ve rol silindi.`);
    await role.delete()
    let loged = role.guild.kanalıBul("cartelfx");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await role.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Rol Oluşturdu!",
        target: entry.executor.id,
    })
}

module.exports.config = {
    Event: "roleCreate"
}


