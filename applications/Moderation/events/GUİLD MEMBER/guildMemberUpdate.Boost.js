const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require('../../../../base/Funksiyonlar/embed');

module.exports = async (oldMember, newMember) => {
    if (oldMember.roles.cache.has(roller.boosterRolü) && !newMember.roles.cache.has(roller.boosterRolü)) try {
        Users.findOne({ _id: newMember.id }, async (err, UserData) => {
          if (!UserData) return;
          if(roller.kurucuRolleri.some(x => newMember.roles.cache.has(x))) return;
          let user = newMember;
          let guild = newMember.guild
          let kanalcik = guild.channels.cache.get("booster-log")
          
          if (oldMember.roles.cache.has(roller.boosterRolü) && !newMember.roles.cache.has(roller.boosterRolü)) {

            if(ayarlar.taglıalım && !user.user.username.includes(ayarlar.tag)) {
                if(kanalcik) kanalcik.send({embeds: [new richEmbed().renk("#df2f8f").açıklama(`${user} kişisi sunucu takviyesini bıraktığı için rolü alındı.`)]})
                await user.voice.disconnect().catch(err => {})
                if(user && user.manageable && ayarlar.type ) await user.setNickname(`${user.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
                if(user && user.manageable && !ayarlar.type ) await user.setNickname(`İsim | Yaş`)
                if(user && user.manageable && !ayarlar.type ) await user.setNickname(`Kayıtsız`)
                if(user && user.manageable && ayarlar.type ) await user.setNickname(`${user.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} Kayıtsız`)
                return await user.setRoles(roller.kayıtsızRolleri) 
            } 

            if(ayarlar.taglıalım && user.user.username.includes(ayarlar.tag) && UserData && UserData.Name && UserData.Names && UserData.Gender) {
              if(kanalcik) kanalcik.send({embeds: [new richEmbed().renk("#df2f8f").açıklama(`${user} kişisi sunucu takviyesini bıraktığı için eski ismine geri döndü.`)]})
              if(user && user.manageable) await user.setNickname(`${ayarlar.type ? user.user.username.includes(ayarlar.tag) ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ""}${UserData.Name}`)
            }
            if(ayarlar.taglıalım && user.user.username.includes(ayarlar.tag) && !UserData) {
              if(user && user.manageable && ayarlar.type ) await user.setNickname(`${user.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
              if(user && user.manageable && !ayarlar.type ) await user.setNickname(`İsim | Yaş`)
              if(user && user.manageable && !ayarlar.type ) await user.setNickname(`Kayıtsız`)
              if(user && user.manageable && ayarlar.type ) await user.setNickname(`${user.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} Kayıtsız`)
            }
            if(!ayarlar.taglıalım && UserData && UserData.Name && UserData.Names && UserData.Gender) {
                if(kanalcik) kanalcik.send({embeds: [new richEmbed().renk("#df2f8f").açıklama(`${user} kişisi sunucu takviyesini bıraktığı için eski ismine geri döndü.`)]})
                if(user && user.manageable) await user.setNickname(`${ayarlar.type ? user.user.username.includes(ayarlar.tag) ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ""}${UserData.Name}`)
            }

            if(!ayarlar.taglıalım && !UserData) {
              if(user && user.manageable && ayarlar.type ) await user.setNickname(`${user.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
              if(user && user.manageable && !ayarlar.type ) await user.setNickname(`İsim | Yaş`)
              if(user && user.manageable && !ayarlar.type ) await user.setNickname(`Kayıtsız`)
              if(user && user.manageable && ayarlar.type ) await user.setNickname(`${user.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} Kayıtsız`)
            }
          };
        })
      } catch (error) {
        client.logger.log("Boost çekildiğinde isim düzeltilmesinde sorun oluştu.","error")
      }
}

module.exports.config = {
    Event: "guildMemberUpdate"
}