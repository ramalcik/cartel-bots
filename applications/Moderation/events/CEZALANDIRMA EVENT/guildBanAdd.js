const { GuildMember, MessageEmbed } = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Users = require('../../../../database/Schemas/Client.Users');
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');

 /**
 * @param {Guild} guild
 * @param {GuildMember} user
 */
module.exports = async (ban) => {
    let guild = client.guilds.cache.get(sistem.SUNUCU.GUILD);
    let entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor) return;
    if(entry.executor.id == client.user.id) return;
    let cezano = await Punitives.countDocuments()
    cezano = cezano == 0 ? 1 : cezano + 1;
    let ceza = new Punitives({ 
        No: cezano,
        Member: ban.user.id,
        Staff: entry.executor.id,
        Type: "Yasaklama",
        Reason: "Sağ-Tık",
        Date: Date.now()
    })
    ceza.save().catch(err => {})
    let findedChannel = guild.kanalıBul("ban-log")
    if(findedChannel) findedChannel.send({embeds: [new richEmbed().üstBaşlık(ban.user.username, ban.user.avatarURL({ dynamic: true})).altBaşlık(`• Ceza Numarası: #${cezano}`, ban.user.avatarURL({dynamic: true})).açıklama(`${ban.user.toString()} kişisi, <t:${String(Date.now()).slice(0, 10)}:R> ${entry.executor} tarafından **Sağ-Tık** yasaklandırıldı.`)]})
    await Users.updateOne({ _id: entry.executor.id } , { $inc: { "Uses.Ban": 1 } }, {upsert: true})

 }

module.exports.config = {
    Event: "guildBanAdd"
}
