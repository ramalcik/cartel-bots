const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require('../../../../base/Funksiyonlar/embed');
let _staffs
const Upstaffs = require('../../../../database/Schemas/Plugins/Client.Users.Staffs')
const Tasks = require('../../../../database/Schemas/Plugins/Client.Users.Tasks')
const GUILD_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');
module.exports = async (member, role) => {
        var reload = require('require-reload')(require);
        _staffs = reload('../../../../base/Additions/Staff/Sources/Global.Staff.Settings.js');
    const entry = await member.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE" }).then(audit => audit.entries.first());
    if (!entry || !entry.executor || entry.executor.bot || entry.createdTimestamp < (Date.now() - 5000)) return;  
    let yapan = member.guild.members.cache.get(entry.executor.id)
    if(!yapan) return;
    let Database = await GUILD_SETTINGS.findOne({guildID: member.guild.id})
    roller = Database.Ayarlar
    ayarlar = Database.Ayarlar
    if(_staffs.staffs.some(x => role.id == x.rol) && roller.ilkYetki != role.id && roller.ilkYetki != role.id) {
        let guild = member.guild
        if(!guild) return;
        await member.roles.remove(role.id, "Sağ-tık yetki verildiğinden dolayı çekildi.").catch(err => {})
        let added = guild.members.cache.get(entry.executor.id)
        if(added) added.send({content: `Merhaba ${added}! ${member} kişisine, el ile yetkili rol verdiğin için kişinin @${role.name} rolü alındı,yetkili rol vermek için \`.yetkili ${member}\` komutunu kullan.`}).catch(err => {})
    } else {
        let görevGetir = await Tasks.findOne({ roleID: role.id }) || await Tasks.findOne({ roleID: role.id })
        let KullaniciData = await Users.findOne({_id: member.id})
        let yetkiliBilgisi = await Upstaffs.findOne({_id: member.id})
        if(görevGetir && !yetkiliBilgisi) {
            await Upstaffs.updateOne({ _id: member.id }, { $set: { "staffNo": 1, "staffExNo": 0, "Point": 0, "ToplamPuan": 0, "yetkiVerilmeTarihi": Date.now(), "Yönetim": true } }, {upsert: true}); 
            await Users.updateOne({ _id: member.id }, { $set: { "Staff": true, "yetkiVeren": entry.executor.id } }, { upsert: true })
            await Users.updateOne({ _id: member.id }, { $push: { "StaffLogs": {
                Date: Date.now(),
                Process: "YETKİ VERİLME",
                Role: role.id,
                Author: entry.executor.id
              }}}, { upsert: true }) 
        } 
        if(görevGetir && KullaniciData && yetkiliBilgisi && yetkiliBilgisi.Yönetim && KullaniciData.Staff && KullaniciData.yetkiVeren) {
            await Upstaff.updateOne({_id: member.id}, { $set: {"Rolde": Date.now() }}, {upsert: true})
            await Users.updateOne({ _id: member.id }, { $push: { "StaffLogs": {
                Date: Date.now(),
                Process: "GÜNCELLEME",
                Role: role.id,
                Author: entry.executor.id
              }}}, { upsert: true }) 
        }
        
        if(roller && roller.yasaklıRoller && entry && entry.executor && roller.yasaklıRoller.some(x => role.id == x) && !sistem.Rooter.Users.includes(entry.executor.id)) {
            await member.roles.remove(role.id, "Verilmek istenilen rol yasaklı roller içinde barındırdığından dolayı kaldırıldı.").catch(err => {})
            return;
        }
        await Users.updateOne({_id: member.id},  { $push: { "Roles": { rol: role.id, mod: entry.executor.id, tarih: Date.now(), state: "Ekleme" } } }, { upsert: true })
        let logChannel = member.guild.kanalıBul("rol-ver-log")
        if(logChannel) logChannel.send({embeds: [new richEmbed().açıklama(`${entry.executor} yetkilisi, ${member} kişisine ${tarihsel(Date.now())} tarihinde ${role} rolünü verdi.`)]})      
    }
}

module.exports.config = {
    Event: "guildMemberRoleAdd"
}