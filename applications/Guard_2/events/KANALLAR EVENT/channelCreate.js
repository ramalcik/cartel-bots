const { MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = async channel => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: channel.guild.id})
    if(Data && !Data.channelGuard) return;
       let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "channels" ,"Kanal Oluşturma!")) return;
    let embed = new richEmbed().üstBaşlık(entry.executor.username, entry.executor.avatarURL({ dynamic: true})).başlık("Sunucuda Kanal Oluşturuldu!")
    client.punitivesAdd(entry.executor.id, "ban")
    client.allPermissionClose()
    embed.açıklama(`${entry.executor} (\`${entry.executor.id}\`) tarafından \`#${channel.name}\` isimli kanal oluşturuldu ve oluşturulduğu gibi silinip yapan kişi yasaklandı.`);
    await channel.delete({reason: `Guard tarafından tekrardan silindi.`});   
    let loged = channel.guild.kanalıBul("cartelfx");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await channel.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Kanal Oluşturma!",
        target: entry.executor.id,
    })
}

module.exports.config = {
    Event: "channelCreate"
}
