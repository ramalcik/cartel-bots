const { GuildMember, MessageEmbed, Message, Guild, GuildEmoji } = require("discord.js");
const fs = require('fs');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

 /**
 * @param {GuildEmoji} emoji
 */


module.exports = async (emoji) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: emoji.guild.id})
    if(Data && !Data.emojiGuard) return;
       let entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "emoji" ,"Emoji Kaldırma!")) return;
    let embed = new richEmbed().üstBaşlık(entry.executor.username, entry.executor.avatarURL({ dynamic: true})).başlık("Sunucuda Emoji Silindi!")
    client.punitivesAdd(entry.executor.id, "jail")
    client.allPermissionClose()
    embed.açıklama(`${entry.executor} (\`${entry.executor.id}\`) tarafından \`${emoji.name}\` isimli emoji silindi ve cezalandırıldı.`);
    let loged = emoji.guild.kanalıBul("cartelfx");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await emoji.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Emoji Sildi!",
        target: entry.executor.id,
    })
}

module.exports.config = {
    Event: "emojiDelete"
}
