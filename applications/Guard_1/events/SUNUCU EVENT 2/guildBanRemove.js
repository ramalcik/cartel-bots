const { GuildMember, MessageEmbed } = require("discord.js");
const fs = require('fs');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

 /**
 * @param {Guild} guild
 * @param {GuildMember} user
 */

module.exports = async (ban) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: ban.guild.id})
    if(Data && !Data.banGuard) return;
    let embed = new richEmbed().başlık("Sunucuda Yasaklama Kaldırıldı!")
    let entry = await ban.guild.fetchAuditLogs({type: 'MEMBER_BAN_REMOVE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "member" ,"Yasaklama Kaldırma!")) return;
    client.punitivesAdd(entry.executor.id, "jail")
    client.allPermissionClose()
    await ban.guild.members.ban(ban.user.id, { reason: "Yasaklaması Kaldırıldığından Dolayı Tekrar Yasaklandı." });
    embed.açıklama(`${ban.user} (\`${ban.user.id}\`) kişisinin yasaklaması, ${entry.executor} (\`${entry.executor.id}\`) tarafından kaldırıldığı için, kaldıran kişi cezalandırılıp kaldırdığı üye tekrar banlandı.`);
    let loged = ban.guild.kanalıBul("cartelfx");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await ban.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Sağ-Tık Yasaklama Kaldırdı!",
        target: entry.executor.id,
        member: ban.user.id
    })
}

module.exports.config = {
    Event: "guildBanRemove"
}
