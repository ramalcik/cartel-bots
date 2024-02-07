 const Users = require('../../../../database/Schemas/Client.Users');
 const Settings = require('../../../../database/Schemas/Global.Guild.Settings');
 const { richEmbed } = require('../../../../base/Funksiyonlar/embed');
 const GUILD_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');
 const USERS_COMPONENTS = require('../../../../database/Schemas/Users.Components');
 const { MessageActionRow, MessageButton } = require('discord.js')
 /**
 * @param {Client} client 
 */

  module.exports = async (oldUser, newUser) => {



    const _findServer = await Settings.findOne({ guildID: sistem.SUNUCU.GUILD })
    ayarlar = global.ayarlar = _findServer.Ayarlar
    roller = global.roller = _findServer.Ayarlar
    kanallar = global.kanallar = _findServer.Ayarlar
    let client = oldUser.client;
    let guild = client.guilds.cache.get(sistem.SUNUCU.GUILD);
    if(!guild) return;
    let user = guild.members.cache.get(oldUser.id);
    if(!user) return;
    let UserData = await Users.findOne({ _id: user.id });

    let embed = new richEmbed()
    if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
    if ((ayarlar && ayarlar.yasakTaglar && ayarlar.yasakTaglar.some(tag => newUser.username.includes(tag))) && (roller.yasaklıTagRolü && !user.roles.cache.has(roller.yasaklıTagRolü))) {
        user.setRoles(roller.yasaklıTagRolü)
        user.send(`Merhaba ${user}! Sunucumuzun yasaklı taglarından birini kullanıcı adına aldığın için jaile atıldın! Tagı geri bıraktığında jailden çıkacaksın.`)
        let kanalYasak = guild.kanalıBul("yasaklı-tag-log")
        if(kanalYasak) kanalYasak.send({embeds: [embed.açıklama(`${user} adlı üye ismine yasaklı tag aldığı için jaile atıldı.`)]})
        return;
    };
    if ((ayarlar && ayarlar.yasakTaglar && !ayarlar.yasakTaglar.some(tag => newUser.username.includes(tag))) && (roller.yasaklıTagRolü && user.roles.cache.has(roller.yasaklıTagRolü))) {
        user.send(`**${user.guild.name}** sunucumuzun yasaklı taglarından birine sahip olduğun için cezalıdaydın ve şimdi bu yasaklı tagı çıkardığın için cezalıdan çıkarıldın!`).catch();
        let yasakKanal = guild.kanalıBul("yasaklı-tag-log")
        if(yasakKanal) yasakKanal.send({embeds: [embed.açıklama(`${user} adlı üye isminden yasaklı tagı çıkarttığı için cezalıdan çıkartıldı!`).renk("RANDOM")]})
        if(!ayarlar.taglıalım && UserData && UserData.Name && UserData.Names && UserData.Gender) {
            if(user && user.manageable) await user.setNickname(`${UserData.Name}`)
            if(UserData.Gender == "Erkek") await user.setRoles(roller.erkekRolleri)
            if(UserData.Gender == "Kadın") await user.setRoles(roller.kadınRolleri)
            if(UserData.Gender == "Kayıtsız") user.setRoles(roller.kayıtsızRolleri)
        } else {
            user.setRoles(roller.kayıtsızRolleri)
            if(user && user.manageable) await user.setNickname(`Kayıtsız`)
        }

    };

    
    if((ayarlar && ayarlar.yetkiliYasaklıTag) && ayarlar.yetkiliYasaklıTag.filter(x => x != ayarlar.tag).some(tag => newUser.username.includes(tag))){
        let data = await Users.findOne({_id: user.id})
        if(data && data.Staff) {
            user.removeStaff()
            let yetkiliRol = guild.roles.cache.get(roller.ilkYetki);
            await user.roles.remove(user.roles.cache.filter(rol => yetkiliRol.position <= rol.position && rol.id != roller.boosterRolü)).catch(err =>{});
        }
    }


    if(ayarlar.type && newUser.username.includes(ayarlar.tag) && !user.roles.cache.has(roller.tagRolü)){
        let addTagLog = guild.kanalıBul("tag-log")
        if(addTagLog) addTagLog.send({embeds: [embed.açıklama(`${user} kişisi ismine tagımızı aldı ve <@&${roller.tagRolü}> ailemize katıldı!
`).renk("RANDOM")]});

    if(user.manageable) user.setNickname(user.displayName.replace(ayarlar.tagsiz, ayarlar.tag))
        if (roller.cezalıRolü && user.roles.cache.has(roller.cezalıRolü)) return;
        if (roller.yasaklıTagRolü && user.roles.cache.has(roller.yasaklıTagRolü)) return;
        if (roller.underworldRolü && user.roles.cache.has(roller.underworldRolü)) return;
        await GUILD_SETTINGS.updateOne({guildID: guild.id}, {$set: {[`Caches.lastTagged`]: user.id}}, {upsert: true})
        user.roles.add(roller.tagRolü).catch();

    } else if(ayarlar.type && !newUser.username.includes(ayarlar.tag) && user.roles.cache.has(roller.tagRolü)){
        let removeTagLog = guild.kanalıBul("tag-log")
        if(removeTagLog) removeTagLog.send({embeds: [
            embed.açıklama(`${user} kişisi isminden tagımızı kaldırdı ve <@&${roller.tagRolü}> ailemizden ayrıldı!
Anlık olarak üzerinden <@&${roller.ilkYetki}> üzerinde ki tüm roller kaldırıldı.

Son çıkartılan taglıdan sonra **${user.guild.members.cache.filter(x => x.user.username.includes(ayarlar.tag)).size}** taglı kaldı.`).renk("RED")],
     }).then(user.send({content: `Görünüşe göre kullanıcı adından tagı kaldırmışsın. Bu sebepten dolayı üzerinde bulunan \`${roller.tagRolü}\` rolü alındı.`}))
    
     
        if (roller.cezalıRolü && user.roles.cache.has(roller.cezalıRolü)) return;
        if (roller.yasaklıTagRolü && user.roles.cache.has(roller.yasaklıTagRolü)) return;
        if (roller.underworldRolü && user.roles.cache.has(roller.underworldRolü)) return;
        user.removeTagged()
        user.removeStaff()
        if(ayarlar.taglıalım && !user.roles.cache.has(roller.boosterRolü)) {
            await user.voice.disconnect().catch(err => {})
            if(user && user.manageable && ayarlar.type ) await user.setNickname(` ${user.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
            if(user && user.manageable && !ayarlar.type ) await user.setNickname(`İsim | Yaş`)
            if(user && user.manageable && !ayarlar.type ) await user.setNickname(`Kayıtsız`)
            if(user && user.manageable && ayarlar.type ) await user.setNickname(`${user.user.username.includes(ayarlar.tag) ?  ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} Kayıtsız`)
            return await user.setRoles(roller.kayıtsızRolleri)   
        }
        await user.setNickname(user.displayName.replace(ayarlar.tag, ayarlar.tagsiz)).catch(err =>{})
        let tagRol = guild.roles.cache.get(roller.tagRolü);
        await user.roles.remove(user.roles.cache.filter(rol => tagRol.position <= rol.position && rol.id != roller.boosterRolü)).catch(err =>{});
          
    } 
}
  
  
  module.exports.config = {
      Event: "userUpdate"
  };