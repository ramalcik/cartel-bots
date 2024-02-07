const { GuildMember, Collection } = require('discord.js');
const GUILD_INVITE = require('../../../../database/Schemas/Global.Guild.Invites');
const GUILD_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed")
let Upstaff
/**
 * 
 * @param {GuildMember} member 
 */

module.exports = async (member) => {
    Upstaff = require('../../../../base/Additions/Staff/Global.Staff.Index');
    if(member.guild.id != sistem.SUNUCU.GUILD) return;

    const _findServer = await GUILD_SETTINGS.findOne({ guildID: sistem.SUNUCU.GUILD })
    const _set = global._set = _findServer.Ayarlar
    
    const channel = client.channels.cache.get(_set.davetKanalı);
    if (!channel) return;
   if (member.user.bot) return channel.send({ content: `${member} isimli bot, sunucudan ayrıldı.`})
    const inviteMemberData = await GUILD_INVITE.findOne({ userID: member.user.id }) || [];
    if (!inviteMemberData.Inviter) {
      channel.send({ content: `${member.guild.emojiyiBul("geri")} ${member} kişisi sunucumuzdan ayrıldı, fakat davet edeni bulamadım.`})
    } else if (inviteMemberData.Inviter === member.guild.id) {
      await GUILD_INVITE.findOneAndUpdate({ guildID: member.guild.id, userID: member.guild.id }, { $inc: { total: -1 } }, { upsert: true });
      const inviterData = await GUILD_INVITE.findOne({ guildID: member.guild.id, userID: member.guild.id });
      const total = inviterData ? inviterData.total : 0;
      channel.send({ content: `${member.guild.emojiyiBul("geri")} ${member} kişisi sunucumuzdan ayrıldı, fakat davet edeni bulamadım.`})
    } else {
      if (Date.now()-member.user.createdTimestamp <= 1000*60*60*24*7) {
        const inviter = await client.users.fetch(inviteMemberData.Inviter);
        const inviterData = await GUILD_INVITE.findOne({ guildID: member.guild.id, userID: inviter.id, });
        const total = inviterData ? inviterData.total : 0;  
        return channel.send({ content: `${member.guild.emojiyiBul("geri")} ${member.user.tag} kişisi sunucumuzdan ayrıldı, **${inviter}** kişisi tarafından davet edilmiş, ve bu kişinin ${total} daveti oldu.`})
      } else {
        let inviteOwn = member.guild.members.cache.get(inviteMemberData.Inviter);
        const inviter = await client.users.fetch(inviteMemberData.Inviter);
        const ivSync = await GUILD_INVITE.findOne({ guildID: member.guild.id, userID: inviter.id, });
        if (ivSync && ivSync.total-1 >= 0) await GUILD_INVITE.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id}, { $inc: { leave: 1, total: -1 } }, { upsert: true });
        const inviterData = await GUILD_INVITE.findOne({ guildID: member.guild.id, userID: inviter.id, });
        const total = inviterData ? inviterData.total : 0; 
        if(inviteOwn && _statSystem.sistemcik) Upstaff.removePoint(inviteOwn.id, -_statSystem.points.invite, "Invite")
        return channel.send({ content: `${member.guild.emojiyiBul("geri")} ${member.user.tag} kişisi sunucumuzdan ayrıldı, **${inviter}** kişisi tarafından davet edilmiş, ve bu kişinin ${total} daveti oldu.`})
      }
    }
}

module.exports.config = {
    Event: "guildMemberRemove"
}

