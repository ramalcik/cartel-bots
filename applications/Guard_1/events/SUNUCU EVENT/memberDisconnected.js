const { MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = async (oldState, newState) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: oldState.guild.id})
    if(Data && !Data.disconnectGuard) return;
    let embed = new richEmbed().üstBaşlık(oldState.member.user.username, newState.member.user.avatarURL({ dynamic: true})).başlık("Sunucuda Bağlantı Kesildi!")
    let kanalcık = newState.channel
    
   
    if (kanalcık === null) {
        let entry = await (oldState, newState).guild.fetchAuditLogs({type: 'MEMBER_DISCONNECT'}).then(audit => audit.entries.first());
        if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "member" ,"Sunucuda Bağlantı Kesme!")) return;
            client.punitivesAdd(entry.executor.id, "jail")
            //client.allPermissionClose()
            embed.açıklama(`${entry.executor} (\`${entry.executor.id}\`) tarafından ${oldState.member} kişisinin bağlantısı kesildi. Bu işlemi yapan kişi sunucuda cezalandırıldı.`);
            let loged = oldState.guild.kanalıBul("cartelfx");
            if(loged) await loged.send({embeds: [embed]});
            const owner = await oldState.guild.fetchOwner();
            if(owner) owner.send({embeds: [embed]}).catch(err => {})
            client.processGuard({
                type: "Sağ-tık Bağlantı Kesme!",
                target: oldState.member.id,
                member: entry.executor.id,
            })
    }
}

module.exports.config = {
    Event: "voiceStateUpdate"
}

client.on("voiceChannelMute", async (member, muteType) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: member.guild.id})
    if(Data && !Data.muteGuard) return;
    let embed = new richEmbed()
    let entry = await member.guild.fetchAuditLogs({
        limit: 1,
        type: "MEMBER_UPDATE"
    }).then(audit => audit.entries.first());
    let checkRegister = member.guild.channels.cache.get(member.voice.channelId)
    if(entry && entry.executor && !entry.executor.bot && checkRegister && checkRegister.parentId) {
        if(checkRegister.parentId == kanallar.registerKategorisi || checkRegister.parentId == kanallar.streamerKategorisi || checkRegister.parentId == kanallar.sorunCozmeKategorisi) {
            embed.açıklama(`${member} (__${member.id}__) kişisine ${entry.executor} (__${entry.executor.id}__) tarafından ${checkRegister} kanalında Sağ-tık susturma işlemi yapıldı!`);
            let muted = member.guild.kanalıBul("sesmute-log");
            if(muted) return muted.send({embeds: [embed]});
        }
    }

    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "member" ,"Sağ-Tık Susturma İşlemi!")) return;
    client.punitivesAdd(entry.executor.id, "jail")
    //client.allPermissionClose()
    embed.açıklama(`${member} (__${member.id}__) kişisine ${entry.executor} (__${entry.executor.id}__) tarafından Sağ-tık susturma işlemi yapıldı! yapan kişi ise cezalandırıldı.`);
    let loged = member.guild.kanalıBul("cartelfx");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await member.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Sağ-tık Susturma!",
        target: member.id,
        member: entry.executor.id,
    })
});
