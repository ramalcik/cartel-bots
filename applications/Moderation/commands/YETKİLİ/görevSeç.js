const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu, Util } = require("discord.js");
const Tasks = require('../../../../database/Schemas/Plugins/Client.Users.Tasks');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const taskAlanlar = require("../../../../database/Schemas/Plugins/Client.GörevAlanlar");
const Stats = require("../../../../database/Schemas/Plugins/Client.Users.Stats")
module.exports = {
    name: "görev",
    command: ["görev","gorevg"],
    aliases: "görev",
    description: "",
    category: "yetkili",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.cartelSaatYap = (date) => { return moment.duration(date).format('H'); };
  },

komutClient: async function (client, message, args) {
   toplamses = 0
   aylıkses = 0
   aylık = 0
    const puanBilgisi = require("../../../../database/Schemas/Plugins/Client.Users.Staffs").findOne({ _id: message.member.id})
let data = await Stats.findOne({ guildID: message.guild.id, userID: message.member.id})
    if(data.allVoice && data.allCategory) {
        let days = Object.keys(data.allVoice || {});
        
      

        days.forEach(_day => {
            let sum = Object.values(data.allVoice[_day]).reduce((x, y) => x + y, 0);
            toplamses += sum;


            
            if (_day <= 30) {
                aylıkses += sum;
                let keys = Object.keys(data.allVoice[_day]);
                keys.forEach(key => {
                    if (aylık[key]) aylık[key] += data.allVoice[_day][key];
                    else aylık[key] = data.allVoice[_day][key];
                });
            }
        });
      } 
        

    const embed = new richEmbed()
   

let ilerleme = ``;
    const eskiRol = _statSystem.staffs[_statSystem.staffs.indexOf(_statSystem.staffs.find(x => x.No == (puanBilgisi ? puanBilgisi.staffExNo : 0)))] || _statSystem.staffs[_statSystem.staffs.length-1];
     let görevBul = await Tasks.findOne({ roleID: eskiRol ? eskiRol.rol : "1231131"  }) || await Tasks.findOne({ roleID: message.member.roles.hoist ? message.member.roles.hoist.id : "1231131" }) || await Tasks.findOne({ roleID: message.member.roles.highest ? message.member.roles.highest.id : "1231131" })
     if(!görevBul) return message.channel.send({ embeds: [ embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`${message.member}, rolünüze atanmış görev bulunamadı.`)]})
     const göreviVar = await taskAlanlar.findOne({ _id: message.member.id });

     if (göreviVar) {
       if (göreviVar.Görevi === "Ses") {
         ilerleme = `\`(${aylık} saat / ${görevBul.AllVoice} saat)\``;
       }
       if (göreviVar.Görevi === "Taglı çekme") {
         ilerleme = ` \`(${puanBilgisi.Mission.Tagged} / ${görevBul.Tagged})\``;
       }
       if (göreviVar.Görevi === "Kayıt etme") {
         ilerleme = `\`(${puanBilgisi.Mission.Register} / ${görevBul.Register})\``;
       }
       if (göreviVar.Görevi === "Davet etme") {
         ilerleme = `\`${puanBilgisi.Mission.Invite} davet / ${görevBul.Invite} davet\``;
       }
       if (göreviVar.Görevi === "Yetkili") {
         ilerleme = `\`(${puanBilgisi.Mission.Staff} yetkili / ${görevBul.Staff} yetkili)\``;
       }
     
       message.channel.send({ embeds: [ embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true })).açıklama(`**${göreviVar.Görevi || "Bulunamadı"}** görevini zaten seçmişsin.\n${göreviVar.yapmasıGereken} ${ilerleme}`) ] });
     }
       
       const tskrow = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId("1")
        .setLabel("Taglı")
        .setStyle("PRIMARY"),
        new MessageButton()
        .setCustomId("2")
        .setLabel("Ses")
        .setStyle("PRIMARY"),
        new MessageButton()
        .setCustomId("3")
        .setLabel("Kayıt")
        .setStyle("PRIMARY"),
        new MessageButton()
        .setCustomId("4")
        .setLabel("İnvite")
        .setStyle("PRIMARY"),
        new MessageButton()
        .setCustomId("5")
        .setLabel("Yetkili")
        .setStyle("PRIMARY"),
    )
    let emb = new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Merhaba ${message.member.toString()}! aşağıdan rolünüze taktim olunmuş görevleri alabilirsiniz.`)
    .sütuns(
        { name: `Taglı`, value: `${görevBul.Tagged} kişiyi taga davet etmelisin!`},
        { name: `Ses`, value: `${görevBul.AllVoice} saat ses kanallarında vakit geçirmelisin!`},
        { name: `Kayıt`, value: `${görevBul.Register} kişiyi kayıt etmelisin!`},
        { name: `Davet`, value: `${görevBul.Invite} kişiyi davet etmelisin!`},
        { name: `Yetkili`, value: `${görevBul.Staff} kişiyi yetkili yapmalısın!`}
    )
        
    
    let taskmsg = await message.reply({ embeds: [emb], components: [tskrow] });

    var filter = (interaction) => interaction.user.id === message.member.id;
    const collector = taskmsg.createMessageComponentCollector({
        filter,
        time: 60000,
    });

    collector.on("collect", async (interaction) => {
  if(interaction.customId == "1") {
    await taskmsg.edit({ components: [], embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`${message.member}, **tag** görevini seçtin.
    
Görev gereksinimi:
**${görevBul.Tagged}** кişiyi taga davet etmelisin!`)]})
await taskAlanlar.updateOne({_id: message.member.id}, { $set: { "Görevi": "Taglı çekme", "Tarihi": Date.now(),"yapmasıGereken": `${görevBul.Tagged} kişiyi taga davet etmelisin.`}}, {upsert: true})
  }
  if(interaction.customId == "2") {
    await taskmsg.edit({ components: [], embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`${message.member}, **ses** görevini seçtin.
    
    Görev gereksinimi:
    **${görevBul.AllVoice}** saat seste vakit geçirmelisin!`)]})
    await taskAlanlar.updateOne({_id: message.member.id}, { $set: { "Görevi": "Ses", "Tarihi": Date.now(),"yapmasıGereken": `${görevBul.AllVoice} saat sesli kanallarda vakit geçirmelisin.`}}, {upsert: true})
  }
  if(interaction.customId == "3") {
    await taskmsg.edit({ components: [], embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`${message.member}, **kayıt** görevini seçtin.
    
    Görev gereksinimi:
    **${görevBul.Register}** kişiyi sunucuya kayıt etmelisin!`)]})
    await taskAlanlar.updateOne({_id: message.member.id}, { $set: { "Görevi": "Kayıt etme", "Tarihi": Date.now(),"yapmasıGereken": `${görevBul.Register} kişiyi sunucuya kayıt etmelisin.`}}, {upsert: true})
  }
  if(interaction.customId == "4") {
    await taskmsg.edit({ components: [], embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`${message.member}, **davet** görevini seçtin.
    
    Görev gereksinimi:
    **${görevBul.Invite}** kişiyi sunucuya davet etmelisin!`)]})
    await taskAlanlar.updateOne({_id: message.member.id}, { $set: { "Görevi": "Davet etme", "Tarihi": Date.now(),"yapmasıGereken": `${görevBul.Invite} kişiyi sunucuya davet etmelisin. `}}, {upsert: true})
  }
  if(interaction.customId == "5") {
    await taskmsg.edit({ components: [], embeds: [embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`${message.member}, **yetkili çekme** görevini seçtin.
    
    Görev gereksinimi:
    **${görevBul.Staff}** kişiyi yetkili yapmalısın!`)]})
    await taskAlanlar.updateOne({_id: message.member.id}, { $set: { "Görevi": "Yetkili", "Tarihi": Date.now(),"yapmasıGereken": `${görevBul.Staff} kişiyi yetkili yapmalısın.`}}, {upsert: true})
  }
 collector.on("end", () => {
   
 })
})


}
}