const { GuildMember, MessageEmbed, Message, Guild, GuildChannel } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

 /**
 * @param {GuildChannel} channel
 */


module.exports = async (channel) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: channel.guild.id})
    if(Data && !Data.webhookGuard) return;
       let entry = await channel.guild.fetchAuditLogs({type: 'WEBHOOK_DELETE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, undefined ,"Webhook Silme!")) return;
    let embed = new richEmbed().üstBaşlık(entry.executor.username, entry.executor.avatarURL({ dynamic: true})).başlık("Sunucuda Webhook Silindi!")
    client.punitivesAdd(entry.executor.id, "ban")
    client.allPermissionClose()
    embed.açıklama(`${entry.executor} (\`${entry.executor.id}\`) tarafından \`${channel.name}\` kanalında webhook sildi ve sildiği gibi cezalandırıldı.`);
    let loged = channel.guild.kanalıBul("cartelfx");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await channel.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Webhook Silindi!",
        target: entry.executor.id,
    })
}

module.exports.config = {
    Event: "webhookUpdate"
}
