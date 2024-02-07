const { MessageEmbed, GuildMember } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

 /**
 * @param {GuildMember} member
 */


module.exports = async (member) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: member.guild.id})
    if(Data && !Data.botGuard) return;
    let embed = new richEmbed().üstBaşlık(member.user.username, member.user.avatarURL({ dynamic: true})).başlık("Sunucuya Bot Eklendi!")
    let entry = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "bot" ,"Sunucuya Bot Ekleme!")) return;
    client.punitivesAdd(entry.executor.id, "jail")
    client.punitivesAdd(member.id, "ban")
    client.allPermissionClose()
    embed.açıklama(`${entry.executor} (\`${entry.executor.id}\`) kişi tarafından ${member} (\`${member.id}\`) adında bir bot ekledi ve eklenen bot ile ekleyen üye cezalandırıldı.`);
    let loged = member.guild.kanalıBul("cartelfx");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await member.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Bot Ekleme!",
        target: entry.executor.id,
    })
}

module.exports.config = {
    Event: "guildMemberAdd"
}
