const Users = require('../../../../database/Schemas/Client.Users');
const Settings = require('../../../../database/Schemas/Global.Guild.Settings');
const { richEmbed } = require('../../../../base/Funksiyonlar/embed');

const forceBans = require('../../../../database/Schemas/Punitives.Forcebans');
const Mutes = require('../../../../database/Schemas/Punitives.Mutes');
const voiceMutes = require('../../../../database/Schemas/Punitives.Vmutes');
const Jails = require('../../../../database/Schemas/Punitives.Jails');
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const {VK, DC, STREAM, ETKINLIK} = require('../../../../database/Schemas/Punitives.Activitys');

/**
* @param {Client} client 
*/

 module.exports = async () => {
    let _findServer = await Settings.findOne({ guildID: sistem.SUNUCU.GUILD })
    ayarlar = global.ayarlar = _findServer.Ayarlar
    roller = global.roller = _findServer.Ayarlar
    kanallar = global.kanallar = _findServer.Ayarlar
    
    setInterval(async () => {
        let köpekoçlar = await Jails.find({})
        let guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
        köpekoçlar.forEach(async (ceza) => {
            _findServer = await Settings.findOne({ guildID: sistem.SUNUCU.GUILD })
            ayarlar = global.ayarlar = _findServer.Ayarlar
            roller = global.roller = _findServer.Ayarlar
            kanallar = global.kanallar = _findServer.Ayarlar
            let cartelcim = guild.members.cache.get(ceza._id)
            if(!cartelcim && ceza.Duration && Date.now() >= ceza.Duration) {
                await Jails.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            }
            if (cartelcim && ceza.Duration && Date.now() >= ceza.Duration) { 
                await Jails.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
                let User = await Users.findOne({ _id: ceza._id })
                if(!ayarlar.taglıalım && User && User.Name && User.Names && User.Gender) {
                    cartelcim.setNickname(`${ayarlar.type ? cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ""}${User.Name}`)
                    if(User.Gender == "Erkek") cartelcim.setRoles(roller.erkekRolleri)
                    if(User.Gender == "Kadın") cartelcim.setRoles(roller.kadınRolleri)
                    if(User.Gender == "Kayıtsız") cartelcim.setRoles(roller.kayıtsızRolleri)
                    if(cartelcim.user.username.includes(ayarlar.tag)) cartelcim.roles.add(roller.tagRolü).catch(err => {}) 
                } else {
                  if(roller.kayıtsızRolleri)  cartelcim.setRoles(roller.kayıtsızRolleri).catch(err => {}) 
                  if(cartelcim && cartelcim.manageable && ayarlar.type ) await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
                  if(cartelcim && cartelcim.manageable && !ayarlar.type ) await cartelcim.setNickname(`İsim | Yaş`)
                  if(cartelcim && cartelcim.manageable && !ayarlar.type ) await cartelcim.setNickname(`Kayıtsız`)
                  if(cartelcim && cartelcim.manageable && ayarlar.type ) await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} Kayıtsız`)
                }   
            } else {
               if(cartelcim && !cartelcim.roles.cache.get(roller.cezalıRolü)) await cartelcim.setRoles(roller.cezalıRolü)
            }
        })
    }, 3000)

    setInterval(async () => {
        let OrospucocuklarıKüfürEtti = await Mutes.find({})
        let guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
        OrospucocuklarıKüfürEtti.forEach(async (ceza) => {
            let cartelcim = guild.members.cache.get(ceza._id)
            if(!cartelcim && ceza.Duration && Date.now() >= ceza.Duration) {
                await Mutes.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            }
            if (cartelcim && ceza.Duration && Date.now() >= ceza.Duration) { 
                if(roller.muteRolü)  await cartelcim.roles.remove(roller.muteRolü).catch(err => {})
                await Mutes.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            } else {
                if(cartelcim && !cartelcim.roles.cache.get(roller.muteRolü)) await cartelcim.roles.add(roller.muteRolü).catch(err => {})
            }
        })
    }, 5000)

    setInterval(async () => {
        let Sesmute = await voiceMutes.find({})
        let guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
        Sesmute.forEach(async (ceza) => {
            let cartelcim = guild.members.cache.get(ceza._id)
            if(!cartelcim && ceza.Duration && Date.now() >= ceza.Duration) {
                await voiceMutes.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            }
            if (cartelcim && ceza.Duration && Date.now() >= ceza.Duration) { 
                if(cartelcim && cartelcim.voice.channel) await cartelcim.voice.setMute(false).catch(err => {})
                await voiceMutes.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            } else {
                
                if(cartelcim && cartelcim.voice.channel) {
                    if(ayarlar && ayarlar.sorunCozmeKategorisi && cartelcim.voice.channel.parentId == ayarlar.sorunCozmeKategorisi) return;
                    await cartelcim.voice.setMute(true).catch(err => {})
                   let testtt = client.guilds.cache.get(sistem.SUNUCU.GUILD)
                  await testtt.kanalıBul("sesmute-log").send({ embeds: [ new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({ dynamic: true})).açıklama(`${cartelcim} (\`${cartelcim.id}\`) adlı kullanıcının cezası kaldırılamadı sese girdiğinde kaldırılacak.`)]})
                } 
            }
        })
    }, 7500);

    setInterval(async () => {
        let VKDATA = await VK.find({})
        let guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
        VKDATA.forEach(async (ceza) => {
            let cartelcim = guild.members.cache.get(ceza._id)
            if(!cartelcim && ceza.Duration && Date.now() >= ceza.Duration) {
                await VK.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            }
            if (cartelcim && ceza.Duration && Date.now() >= ceza.Duration) { 
                if(roller.vkCezalıRolü) await cartelcim.roles.remove(roller.vkCezalıRolü).catch(err => {})
                await VK.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            } else {
                if(cartelcim && !cartelcim.roles.cache.get(roller.vkCezalıRolü)) await cartelcim.roles.add(roller.vkCezalıRolü).catch(err => {})
            }
        })
    }, 30000);

    setInterval(async () => {
        let STREAMDATA = await STREAM.find({})
        let guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
        STREAMDATA.forEach(async (ceza) => {
            let cartelcim = guild.members.cache.get(ceza._id)
            if(!cartelcim && ceza.Duration && Date.now() >= ceza.Duration) {
                await STREAM.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            }
            if (cartelcim && ceza.Duration && Date.now() >= ceza.Duration) { 
                if(roller.streamerCezalıRolü) await cartelcim.roles.remove(roller.streamerCezalıRolü).catch(err => {})
                await STREAM.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            } else {
                if(cartelcim && !cartelcim.roles.cache.get(roller.streamerCezalıRolü)) await cartelcim.roles.add(roller.streamerCezalıRolü).catch(err => {})
            }
        })
    }, 25000);

    setInterval(async () => {
        let DCDATA = await DC.find({})
        let guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
        DCDATA.forEach(async (ceza) => {
            let cartelcim = guild.members.cache.get(ceza._id)
            if(!cartelcim && ceza.Duration && Date.now() >= ceza.Duration) {
                await DC.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            }
            if (cartelcim && ceza.Duration && Date.now() >= ceza.Duration) { 
                if(roller.dcCezalıRolü) await cartelcim.roles.remove(roller.dcCezalıRolü).catch(err => {})
                await DC.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            } else {
                if(cartelcim && !cartelcim.roles.cache.get(roller.dcCezalıRolü)) await cartelcim.roles.add(roller.dcCezalıRolü).catch(err => {})
            }
        })
    }, 45000);

    setInterval(async () => {
        let ETKINLIKDATA = await ETKINLIK.find({})
        let guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
        ETKINLIKDATA.forEach(async (ceza) => {
            let cartelcim = guild.members.cache.get(ceza._id)
            if(!cartelcim && ceza.Duration && Date.now() >= ceza.Duration) {
                await ETKINLIK.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            }
            if (cartelcim && ceza.Duration && Date.now() >= ceza.Duration) { 
                if(roller.etkinlikCezalıRolü) await cartelcim.roles.remove(roller.etkinlikCezalıRolü).catch(err => {})
                await ETKINLIK.deleteOne({_id: ceza._id})
                if(await Punitives.findOne({No: ceza.No})) await Punitives.updateOne({ No: ceza.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true })
            } else {
                if(cartelcim && !cartelcim.roles.cache.get(roller.etkinlikCezalıRolü)) await cartelcim.roles.add(roller.etkinlikCezalıRolü).catch(err => {})
            }
        })
    }, 60000);
 }
 
 module.exports.config = {
     Event: "ready"
 };

