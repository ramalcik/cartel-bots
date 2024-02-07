const { Client, Message, MessageButton, MessageActionRow } = require("discord.js");
const Unleash = require('../../../../database/Schemas/Plugins/Guıild.Remove.Staffs');
const Users = require('../../../../database/Schemas/Client.Users');
const Upstaff = require('../../../../database/Schemas/Plugins/Client.Users.Staffs');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const moment = require('moment')
module.exports = {
    name: "yetki",
    command: ["yetkiver","yetkibaşlat", "yetkili"],
    aliases: "yetkiver <@cartel/ID>",
    description: "",
    category: "yönetim",
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
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(!roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [ embed.üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL).açıklama(cevaplar.yetersiz)]})
    
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [ new richEmbed().açıklama(cevaplar.kendi)]})
    if(roller.kayıtsızRolleri.some(x => cartelcim.roles.cache.has(x))) return message.channel.send({embeds: [ embed.açıklama(`${cartelcim} kişisinin üzerinde kayıtsız rolü olduğundan yetkili rolü veremedim.`)]})
    if(Date.now()-cartelcim.user.createdTimestamp < 1000*60*60*24*7 && !sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username))  return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username,message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yenihesap)]})
    if(ayarlar.type && !cartelcim.user.username.includes(ayarlar.tag)) return message.channel.send({
      embeds: [new richEmbed().üstBaşlık(cartelcim.user.username,cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin üzerinde tag bulunmuyor.`
    )]})
    if((ayarlar && ayarlar.yetkiliYasaklıTag) && ayarlar.yetkiliYasaklıTag.filter(x => x != ayarlar.tag).some(x => cartelcim.user.username.includes(x))) return message.reply({
      embeds: [new richEmbed().üstBaşlık(cartelcim.user.username,cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin üzerinde başka bir sunucunun tagı bulunuyor.`
    )]})
    
    let yetkiliRol = cartelcim.guild.roles.cache.get(roller.ilkYetki);
    let cartelcimUstRol = cartelcim.guild.roles.cache.get(cartelcim.roles.highest.id)
    if(yetkiliRol.rawPosition < cartelcimUstRol.rawPosition) return message.channel.send({
      embeds: [new richEmbed().üstBaşlık(cartelcim.user.username,cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin üzerinde yetkili rolü var. `
    )]})
    const verideBul = await Upstaff.findOne({ _id: cartelcim.id})
    if(verideBul) return message.channel.send({ embeds: [ embed.üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({ dynamic: true})).açıklama(`${cartelcim} kişisi daha önceden yetkili olarak atanmış.`)]})
   
		
    let Row = new MessageActionRow().addComponents(
      new MessageButton()
      .setCustomId("kabuledildi")
       .setLabel("Kabul Ediyorum.")
      .setStyle("SECONDARY"),
      new MessageButton()
      .setCustomId("NO")
      .setLabel("Kabul Etmiyorum.")
      .setStyle("SECONDARY"),
    )
    embed.üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim.toString()}, ${message.member.toString()} tarafından yetkili olmayı onaylıyor musunuz ?`)
    await message.channel.send({content: cartelcim.toString(), embeds: [embed], components: [Row]}).then(async (msg) => {
      const filter = i => i.user.id === cartelcim.id
      const collector = msg.createMessageComponentCollector({ filter,  errors: ["time"], time: 30000 })
      collector.on('collect', async (i) => {
       
        if(i.customId == "kabuledildi") {
          Row.components[0].setStyle("SUCCESS").setDisabled(true)
          Row.components[1].setDisabled(true)
          i.deferUpdate()
          await Users.updateOne({ _id: cartelcim.id }, { $set: { "Staff": true, "yetkiVeren": message.member.id } }, { upsert: true })
          await Users.updateOne({ _id: message.member.id }, { $push: { "Staffs": { id: cartelcim.id, Date: Date.now() } } }, { upsert: true })
          await Upstaff.findOneAndUpdate({ _id: cartelcim.id }, {	$push: { yetkiVerilmeTarihi: moment(Date.now()).format("LLL"),}, $inc: { total: 1 },	},{ upsert: true },
          );
       
    let yetkiliLog = message.guild.kanalıBul("yetki-ver-log")
    if(yetkiliLog) yetkiliLog.send({embeds: [embed.üstBaşlık(cartelcim.user.username,cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisine yetki verildi.

Yetkiyi veren: ${message.author} (${message.author.id})
Yetki verilen tarih: \`${tarihsel(Date.now())}\`
Yetki verme işleminde verilen rol: <@&${roller.ilkYetki}>
İşlem sonucunda yetkiyi verene takdim edilen puan: \`${_statSystem.points.staff}\`
`)]})      
    client.Upstaffs.addPoint(message.member.id,_statSystem.points.staff, "Yetkili")
    let yetkiBilgisi = _statSystem.staffs[_statSystem.staffs.indexOf(_statSystem.staffs.find(x => cartelcim.roles.cache.has(x.rol)))]
    let rolBul =  _statSystem.staffs[_statSystem.staffs.indexOf(yetkiBilgisi)+1];
    if(!rolBul) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username,message.member.user.avatarURL({dynamic: true}))]})
    if(rolBul.No > ayarlar.yükseltimSınırı && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR') && !roller.yükselticiRoller.some(x => message.member.roles.cache.has(x)) && roller.limitliYükselticiRolleri.some(x => message.member.roles.cache.has(x))) return 
    if(verideBul && !verideBul.yetkiVeren) await Users.updateOne({_id: cartelcim.id}, {$set: {"yetkiVeren": message.member.id}}, {upsert: true})
    if(roller.altYönetimRolleri.some(x => rolBul.exrol == x) || roller.yönetimRolleri.some(x => rolBul.exrol == x) || roller.üstYönetimRolleri.some(x => rolBul.exrol == x)) {
        await Upstaff.updateOne({_id: cartelcim.id}, { $set: {"Yönetim": true }}, {upsert: true})
    } else {
        await Upstaff.updateOne({_id: cartelcim.id}, { $set: {"Yönetim": false }}, {upsert: true})
    }
    await Upstaff.updateOne({_id: cartelcim.id}, { $set: {"Rolde": Date.now() }}, {upsert: true})
    let newRoles = []
    cartelcim.roles.cache.filter(x => yetkiBilgisi.rol != x.id && !yetkiBilgisi.exrol.includes(x.id)).map(x => newRoles.push(x.id))
    if(rolBul && rolBul.rol) {
      newRoles.push(rolBul.rol)
      if(rolBul.exrol && rolBul.exrol.length >= 1) newRoles.push(...rolBul.exrol)
    }
    await Upstaff.updateOne({ _id: cartelcim.id}, { $set: { "Mission": {
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
     }, "Point": 0, "staffNo": Number(rolBul.No) + Number(1), "staffExNo": rolBul.No, "Yetkili": 0, "Görev": 0, "Invite": 0,  "Tag": 0, "Register": 0, "Ses": new Map(), "Mesaj": 0, "Bonus": 0, "Toplantı": 0, "Etkinlik": 0 }}, {upsert: true});
    msg.edit({content: null, components: [ Row ], embeds: [embed.üstBaşlık(cartelcim.user.username,cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim.toString()} kişisine <@&${roller.ilkYetki}> rolü verildi.`)] })
    cartelcim.setNickname(cartelcim.displayName.replace(ayarlar.tagsiz, ayarlar.tag)).catch(err => {})
    cartelcim.roles.add(roller.ilkYetki).then(x => client.Upstaffs.addPoint(cartelcim.id,"1", "Bonus"))
    cartelcim.roles.add(roller.botKomutRolü).then(x => client.Upstaffs.addPoint(cartelcim.id, "1", "Bonus"))
    message.member.Leaders("yetki", _statSystem.points.staff, {type: "STAFF", user: cartelcim.id})
                } else
        if(i.customId == "NO") {
          Row.components[0].setDisabled(true)
          Row.components[1].setStyle("DANGER").setDisabled(true)
        }
      }
      )
    
    collector.on("end", async () => {
   Row.components[0].setDisabled(true)
   Row.components[1].setDisabled(true)
    });
    }
    )

   
  }
};