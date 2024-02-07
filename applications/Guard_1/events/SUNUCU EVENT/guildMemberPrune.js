const { GuildMember, MessageEmbed, Message } = require("discord.js");
const fs = require('fs');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

 /**
 * @param {GuildMember} member
 */


module.exports = async (member) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: member.guild.id})
    if(Data && !Data.pruneGuard) return;
    let embed = new richEmbed().üstBaşlık(member.user.username, member.user.avatarURL({ dynamic: true}))
    .setTitle("Sunucuda Üye Çıkarıldı!")
    let entry = await member.guild.fetchAuditLogs({type: 'MEMBER_PRUNE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || Date.now() - entry.createdTimestamp > 5000 || await client.checkMember(entry.executor.id, undefined, "Sunucudan Üye Çıkartma!")) return;
    client.punitivesAdd(entry.executor.id, "ban")
    client.allPermissionClose()
    embed.açıklama(`${member} (\`${member.id}\`) kişisi, ${entry.executor} (\`${entry.executor.id}\`) tarafından sunucuda üye çıkartıldı! atan kişi ise yasaklandı.`);
    let loged = guild.kanalıBul("cartelfx");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Üye Çıkartma!",
        target: entry.executor.id,
    })
}

module.exports.config = {
    Event: "guildMemberRemove"
}
