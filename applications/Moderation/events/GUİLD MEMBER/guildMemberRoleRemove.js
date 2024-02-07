const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require('../../../../base/Funksiyonlar/embed');
let _staffs
const Upstaffs = require('../../../../database/Schemas/Plugins/Client.Users.Staffs')
const Tasks = require('../../../../database/Schemas/Plugins/Client.Users.Tasks')
module.exports = async (member, role) => {
    var reload = require('require-reload')(require);
     _staffs = reload('../../../../base/Additions/Staff/Sources/Global.Staff.Settings');
    const entry = await member.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE" }).then(audit => audit.entries.first());
    if (!entry || !entry.executor || entry.executor.bot || entry.createdTimestamp < (Date.now() - 5000)) return;
    if(_staffs.staffs.some(x => role.id == x.rol) && roller.ilkYetki != role.id && roller.ilkYetki != role.id) {
        let guild = member.guild
        if(!guild) return;
        await member.roles.add(role.id, "Sağ-tık yetki çekildiğinden dolayı tekrar verildi.").catch(err => {})
        let added = guild.members.cache.get(entry.executor.id)
        if(added) added.send({content: `Merhaba ${added}! ${member} kişisine, el ile yetkili rol verdiğin için kişinin @${role.name} rolü alındı,yetkili rol vermek için \`.yetkili ${member}\` komutunu kullan.`}).catch(err => {})
    } else {
        let görevGetir = await Tasks.findOne({ roleID: role.id }) || await Tasks.findOne({ roleID: role.id })
        let KullaniciData = await Users.findOne({_id: member.id})
        let yetkiliBilgisi = await Upstaffs.findOne({_id: member.id})
        if(görevGetir && yetkiliBilgisi)  {
            await Upstaffs.deleteOne({_id: member.id});
            await Users.updateOne({ _id: member.id }, { $set: { "Staff": false } }, { upsert: true })
            await Users.updateOne({ _id: member.id }, { $push: { "StaffLogs": {
                Date: Date.now(),
                Process: "ALINDI",
                Role: member.roles.hoist ? member.roles.hoist.id : roller.ilkYetki,
                Author: entry.executor.id
              }}}, { upsert: true }) 
        }
        await Users.updateOne({_id: member.id},  { $push: { "Roles": { rol: role.id, mod: entry.executor.id, tarih: Date.now(), state: "Kaldırma" } } }, { upsert: true })
        let logChannel = member.guild.kanalıBul("rol-al-log")
        if(logChannel) logChannel.send({embeds: [new richEmbed().açıklama(`${entry.executor} yetkilisi, ${member} kişisinden ${tarihsel(Date.now())} tarihinde ${role} rolünü aldı.`)]})      
    }
}

module.exports.config = {
    Event: "guildMemberRoleRemove"
}