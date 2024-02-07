const { MessageEmbed , Guild} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const deletedRoles = require('../../../../database/Schemas/Guards/Backup/Guild.Deleted.Roles');
/**
 * @param {Guild} role 
 */

module.exports = async role => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: role.guild.id})
    if(Data && !Data.roleGuard) return;
      let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000) return;
    let embed = new richEmbed().üstBaşlık(entry.executor.username, entry.executor.avatarURL({ dynamic: true})).başlık("Sunucuda Rol Silindi!")
    await deletedRoles.updateOne({"roleID": role.id}, { $set: { "Date": Date.now(), "Remover": entry.executor.id }}, {upsert: true})
    embed.açıklama(`${entry.executor} (__${entry.executor.id}__) tarafından ${role.name} (__${role.id}__) rolü silindi. \`${sistem.botSettings.Prefixs[0]}rolkur ${role.id}\` komutu ile kurulum yapabilirsiniz.`);
    let loged = role.guild.kanalıBul("cartelfx");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await role.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
}

module.exports.config = {
    Event: "roleDelete"
}