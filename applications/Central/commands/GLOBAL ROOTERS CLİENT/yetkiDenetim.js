const { Client, Message } = Discord = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const util = require("util")
const Stats = require("../../../../database/Schemas/Plugins/Client.Users.Stats");
const Users = require('../../../../database/Schemas/Client.Users');
const Upstaffs = require('../../../../database/Schemas/Plugins/Client.Users.Staffs');
const ms = require('ms')
const moment = require('moment')
module.exports = {
    name: "yetkidenetim",
    command: ["yetkidenetim"],
    aliases: "",
    description: "",
    category: "-",
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
    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username)) return;
    let data = await Stats.find()
    let yetkiler = data.filter(m => {
        let cartelimToplam2 = 0;
        if(m.lifeTotalVoiceStats) cartelimToplam2 = Number(m.lifeTotalVoiceStats)
        let cartelim = message.guild.members.cache.get(m.userID)
        return cartelimToplam2 <= ms("12h") && message.guild.members.cache.has(m.userID) && !cartelim.permissions.has("ADMINISTRATOR") && !cartelim.permissions.has("MANAGE_ROLES") && roller.Yetkiler.some(x => cartelim.roles.cache.has(x))
    })
    let mesaj = ''
    let yetkiliListesi = yetkiler.forEach((m, index) => {
        let yetkiliCheck = new Promise(async function(yetkili, yetkilidegil) {
            let get = await Users.findOne({_id: m.userID})
            let staffget = await Upstaffs.findOne({_id: m.userID})
            let cartelim = message.guild.members.cache.get(m.userID)
            if(get && get.Staff) {
                if(staffget && staffget.yetkiVerilmeTarihi && staffget.yetkiVerilmeTarihi >= Date.now() - ms("10h")) {
                    yetkili("yeni yetkili")
                } else {
                    setTimeout(async() => {
                        cartelim.removeStaff(cartelim.roles.cache, true)
                        await Users.updateOne({ _id: cartelim.id }, { $push: { "StaffLogs": {
                          Date: Date.now(),
                          Process: "STATI GEÇERSİZ",
                          Role: cartelim.roles.hoist ? cartelim.roles.hoist.id : roller.ilkYetki,
                          Author: message.member.id
                        }}}, { upsert: true }) 
                        let altYetki = message.guild.roles.cache.get(roller.ilkYetki)
                        if(altYetki) await cartelim.roles.remove(cartelim.roles.cache.filter(rol => altYetki.position <= rol.position)).catch(err => {});
                    
                    }, 1050 * index)
                    yetkili(true)
                }
            } else  {
                yetkili(false)
           }
        });
        let cartelim = message.guild.members.cache.get(m.userID)
        if(yetkiliCheck) {
            yetkiliCheck.then(
                function(value) {{
                    mesaj += `<@${m.userID}> (${çevirSüre(m.lifeTotalVoiceStats)}) [**Yetkisi alındı**] (${value})\n`
                    message.channel.send(`<@${m.userID}> (${çevirSüre(m.lifeTotalVoiceStats)}) [**${value == "yeni yetkili" ? "Yeni Yetkili" : value ? "Yetkisi alındı." : "Yetkisi alınmadı"}**] (<t:${Number(String(Date.parse(cartelim.joinedAt)).substring(0, 10))}:R>)\n`)
                }},
              );
        } 
    })   
    let embed = new richEmbed()
    message.channel.send({embeds: [embed.açıklama(`${mesaj.length >= 1 ? mesaj : "İşleminiz biraz sonra başlayacak, lütfen bekleyin."}`)]}).catch(err => {
        const arr = Discord.Util.splitMessage(`${mesaj.length >= 1 ? mesaj : "Tebrikler! 12 Saat Altı Bir Yetkili Bulunamadı!"}`, { maxLength: 1950 });
        arr.forEach(element => {
            message.channel.send({embeds: [embed.açıklama(`${element}`)]});
        }); 
    })

  }
};

function çevirSüre(date) {
    return moment.duration(date).format('H [saat,] m [dk.]');
}