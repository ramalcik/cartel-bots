const { MessageEmbed, MessageButton, MessageActionRow,  MessageSelectMenu } = require("discord.js");
const Stats = require('../../../../database/Schemas/Plugins/Client.Users.Stats')
const Invites = require('../../../../database/Schemas/Global.Guild.Invites');
const Users = require('../../../../database/Schemas/Client.Users');
const Upstaff = require('../../../../database/Schemas/Plugins/Client.Users.Staffs');

const moment = require('moment');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "düşür",
    command: ["düşür","dusur"],
    aliases: "düşür <@cartel/ID>",
    description: "Belirlenen yetkilinin sunucu içerisinde ki bilgileri gösterir ve yükseltir düşürür.",
    category: "stat",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    let embed = new richEmbed()
     if(!roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR') && !roller.yükselticiRoller.some(x => message.member.roles.cache.has(x))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if (!kullanıcı) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username,message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    let cartelcim = message.guild.members.cache.get(kullanıcı.id);
    if (!cartelcim) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username,message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(cartelcim.id == message.member.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(roller.kayıtsızRolleri.some(x => cartelcim.roles.cache.has(x))) return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined);
    

    let Upstaffs = await Upstaff.findOne({_id: cartelcim.id})
if(!Upstaffs ) {
    message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
} else {
    let yetkiBilgisi = _statSystem.staffs[_statSystem.staffs.indexOf(_statSystem.staffs.find(x => cartelcim.roles.cache.has(x.rol)))]
    let rolBul =  _statSystem.staffs[_statSystem.staffs.indexOf(yetkiBilgisi)-1];
    if(!rolBul) return message.channel.send({embeds: [ embed.açıklama(`${cartelcim} kişisi en alt yetkide olduğu için düşürme işlemi yapamadım.`)]})
    if(Upstaffs && !Upstaffs.yetkiVeren) await Users.updateOne({_id: cartelcim.id}, {$set: {"yetkiVeren": message.member.id}}, {upsert: true})
    if(roller.altYönetimRolleri.some(x => rolBul.exrol == x) || roller.yönetimRolleri.some(x => rolBul.exrol == x) || roller.üstYönetimRolleri.some(x => rolBul.exrol == x)) {
        await Upstaff.updateOne({_id: cartelcim.id}, { $set: {"Yönetim": true }}, {upsert: true})
    } else {
        await Upstaff.updateOne({_id: cartelcim.id}, { $set: {"Yönetim": false }}, {upsert: true})
    }
    let newRoles = []
    cartelcim.roles.cache.filter(x => yetkiBilgisi.rol != x.id && !yetkiBilgisi.exrol.includes(x.id)).map(x => newRoles.push(x.id))
    if(rolBul && rolBul.rol) {
      newRoles.push(rolBul.rol)
      if(rolBul.exrol && rolBul.exrol.length >= 1) newRoles.push(...rolBul.exrol)
    }
    cartelcim.roles.set(newRoles)
    await Upstaff.updateOne({_id: cartelcim.id}, { $set: {"Rolde": Date.now() }}, {upsert: true})
    await Users.updateOne({ _id: cartelcim.id }, { $push: { "StaffLogs": {
        Date: Date.now(),
        Process: "DÜŞÜRÜLME",
        Role: rolBul ? rolBul.rol : roller.ilkYetki,
        Author: message.member.id
    }}}, { upsert: true }) 
       await Upstaff.updateOne({_id: cartelcim.id}, {$set: {"Mission": {
        Tagged: 0,
        Register: 0,
        Invite: 0,
        Staff: 0,
        Sorumluluk: 0,
        CompletedSorumluluk: false,
        completedMission: 0,
        CompletedStaff: false,
        CompletedInvite: false,
        CompletedAllVoice: false,
        CompletedPublicVoice: false,
        CompletedTagged: false,
        CompletedRegister: false,
       }}}, {upsert: true});
       let logKanalı = message.guild.kanalıBul("terfi-log")
       if(logKanalı) logKanalı.send({embeds: [embed.açıklama(`${message.member} kişisi, ${cartelcim} yetkilisini ${message.guild.roles.cache.get(rolBul.rol)} rolüne düşürdü.`)]})
       await Stats.updateOne({userID: cartelcim.id}, {$set: {"taskVoiceStats": new Map()}}, {upsert: true}) 
       await Upstaff.updateOne({ _id: cartelcim.id }, { $set: { "Point": 0, "staffNo": Number(rolBul.No) + Number(1), "staffExNo": rolBul.No, "Yetkili": 0, "Görev": 0, "Invite": 0,  "Tag": 0, "Register": 0, "Ses": new Map(), "Mesaj": 0, "Bonus": 0, "Toplantı": 0, "Etkinlik": 0 }}, {upsert: true});
       message.channel.send({embeds: [embed.açıklama(`${cartelcim} kişisi <@&${message.guild.roles.cache.get(rolBul.rol)}> rolüne düşürüldü.`)]})

        message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
      }

    
}

    }


