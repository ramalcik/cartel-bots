const { GuildMember, MessageEmbed, Message } = require("discord.js");
const fs = require('fs');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

 /**
 * @param {GuildMember} member
 */


module.exports = async (member) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: member.guild.id})
    if(Data && !Data.kickGuard) return;
    let embed = new richEmbed()
    .setTitle("Sunucuda Sağ-Tık Üye Atıldı!").üstBaşlık(member.user.username, member.user.avatarURL({ dynamic: true}))
    let entry = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "member" ,"Sağ-Tık Atma!")) return;
    client.punitivesAdd(entry.executor.id, "jail")
    client.allPermissionClose()
    embed.açıklama(`${member} (\`${member.id}\`) kişisi, ${entry.executor} (\`${entry.executor.id}\`) tarafından sunucudan \`Sağ-Tık\` ile atıldı! atan kişi ise yasaklandı.`);
    let loged = member.guild.kanalıBul("cartelfx");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await member.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Sağ-tık Üye Atma!",
        target: entry.executor.id,
        member: member.id,
    })
}

module.exports.config = {
    Event: "guildMemberRemove"
}
