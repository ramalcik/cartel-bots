const { GuildMember, MessageEmbed, GuildChannel } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

 /**
 * @param {GuildChannel} oldChannel
 * @param {GuildChannel} newChannel
 */


module.exports = async (oldChannel, newChannel) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: oldChannel.guild.id})
    if(Data && !Data.channelGuard) return;
       let entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_OVERWRITE_CREATE'}).then(audit => audit.entries.first())
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "channels" ,"Kanal İzni Oluşturuldu!")) return;
    let embed = new richEmbed().üstBaşlık(entry.executor.username, entry.executor.username.avatarURL({ dynamic: true})).başlık("Sunucuda Kanal İzni Oluşturuldu!")
    client.punitivesAdd(entry.executor.id, "ban")
    client.allPermissionClose()
    await newChannel.permissionOverwrites.set(oldChannel.permissionOverwrites.cache.array())
    embed.açıklama(`${entry.executor} (\`${entry.executor.id}\`) tarafından \`#${oldChannel.name}\` isimli kanalda izin oluşturdu ve yasaklandı.`);
    let loged = newChannel.guild.kanalıBul("cartelfx");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await newChannel.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Kanal İzni Oluşturma!",
        target: entry.executor.id,
    })
}

module.exports.config = {
    Event: "channelUpdate"
}

