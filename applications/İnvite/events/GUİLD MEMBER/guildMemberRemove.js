const Users = require('../../../../database/Schemas/Client.Users')
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Roles = require('../../../../database/Schemas/Guards/GuildMember.Roles.Backup');
const leftRoles = require('../../../../database/Schemas/Users.Left.Roles');
const GUILD_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');

/**
* @param {Client} client 
*/

module.exports = async (member) => {
 if(member.guild.id !== sistem.SUNUCU.GUILD) return;

}
module.exports.config = {
   Event: "guildMemberRemove"
};

client.on("guildMemberRemove", async (member) => {
 if(member.guild.id !== sistem.SUNUCU.GUILD) return;
 await Roles.deleteOne({_id: member.id})
 let detay = client.users.cache.get(member.id)

 await GUILD_SETTINGS.updateOne({guildID: member.guild.id}, {$set: {[`Caches.latest`]: {
   id: detay.id,
   avatarURL: detay.displayAvatarURL({dynamic: true}),
   tag: detay.tag
 }}}, {upsert: true})

 let yetkiliRol = member.guild.roles.cache.get(roller.ilkYetki);
 let uyeUstRol = member.guild.roles.cache.get(member.roles.highest.id)
 if(yetkiliRol.rawPosition < uyeUstRol.rawPosition) {
  let rolleri = []
  member.roles.cache.filter(x => x.name != "@everyone").map(x => rolleri.push(x.id))
  await leftRoles.updateOne({_id: member.id} , {$set: {"_roles": rolleri}}, {upsert: true});
 }
})

client.on("guildMemberRemove", async (member) => {
 if(member.guild.id !== sistem.SUNUCU.GUILD) return;
 let entry = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
 if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000) return
 await Users.updateOne({ _id: entry.executor.id } , { $inc: { "Uses.Kick": 1 } }, { upsert: true })
})