
const { Client, Message, Util, MessageActionRow, MessageButton, MessageSelectMenu, Collection, Permissions} = Discord = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const { 
    Modal,
    TextInputComponent, 
    showModal,
    SelectMenuComponent,
  } = dcmodal = require('discord-modals')

module.exports = async (modal) => {
    let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
    if(!guild) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
    let cartelim = guild.members.cache.get(modal.user.id)
    if(!cartelim){
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }


    if(modal.customId == "isimDüzenleme") {
        if(!cartelim.roles.cache.has(roller.boosterRolü) && (roller.özelRoller && !roller.özelRoller.some(x => cartelim.roles.cache.has(x))) && !cartelim.permissions.has("ADMINISTRATOR") && !cartelim.permissions.has("MANAGE_ROLES") ) {
            await modal.deferReply({ ephemeral: true })
            return await modal.followUp({content: `Sunucumuza **boost* basmanız gerekmektedir.`})
        }
        if(ayarlar.type ) {
            if(roller.Yetkiler.some(x => cartelim.roles.cache.has(x)) && !roller.kurucuRolleri.some(rolAra => cartelim.roles.cache.has(rolAra)) && !cartelim.permissions.has('ADMINISTRATOR')) {
              let isim = modal.getTextInputValue('isim')
              let Nickname = cartelim.nickname.replace(ayarlar.tagsiz, "").replace(ayarlar.tag, "").replace(" ", "").split(" | ")[0]
              if(Nickname && cartelim.manageable) {
                cartelim.setNickname(cartelim.displayName.replace(Nickname, isim)).catch(err => {})
                await modal.deferReply({ ephemeral: true })
                return await modal.followUp({content: `Başarılı şekilde sunucuda isminiz güncellendi.`})
              } else {
                await modal.deferReply({ ephemeral: true })
                return await modal.followUp({content: `İsim değiştirirken bir hata oluştu veya botun yetkisi size yetmiyor.`})
              }
            }
        }
        let yazilacakIsim;
        let isim = modal.getTextInputValue('isim')
        if(ayarlar.type) yazilacakIsim = `${cartelim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} ${isim}`
        if(!ayarlar.type) yazilacakIsim = `${isim}`;
        if(cartelim.manageable) {
        cartelim.setNickname(`${yazilacakIsim}`).then(async (devam) => {
            await modal.deferReply({ ephemeral: true })
            return await modal.followUp({content: `Başarılı şekilde sunucuda isminiz güncellendi.`})
        }).catch( async (cartel) => {
            await modal.deferReply({ ephemeral: true })
            return await modal.followUp({content: `İsim değiştirirken bir hata oluştu veya botun yetkisi size yetmiyor.`})
        })
      } else {
            await modal.deferReply({ ephemeral: true })
            return await modal.followUp({content: `İsim değiştirirken bir hata oluştu veya botun yetkisi size yetmiyor.`})
      }
    }

    if(modal.customId == "sunucuDüzenleme") {
        let isim = modal.getTextInputValue('name');
        let resim = modal.getTextInputValue('avatar');
        let arkaplan = modal.getTextInputValue('banner')
        let gerçekleşenİşlemler = []
        
        let eskiIsim = guild.name
        let eskiAvatar = guild.iconURL()
        let eskiBanner = guild.bannerURL()

        if(isim && isim.length > 0 && isim != eskiIsim) {
            await guild.setName(isim)
            gerçekleşenİşlemler.push(`İsim Değişimi`)
        }

        if(resim && resim.length > 0 && resim != eskiAvatar) {
            await guild.setIcon(resim)
            gerçekleşenİşlemler.push(`Resim Değişimi`)
        }

        if(arkaplan && arkaplan.length > 0 && arkaplan != eskiBanner) {
            await guild.setBanner(arkaplan)
            gerçekleşenİşlemler.push(`Banner Değişimi`)
        }

        if(gerçekleşenİşlemler.length > 0) {
            let logKanal = guild.kanalıBul("server-log")
            if(logKanal) logKanal.send({embeds: [new richEmbed().renk("RANDOM")
    .altBaşlık(cartelim.user.username + " tarafından güncellendi.",cartelim.user.avatarURL({dynamic: true}))
          .açıklama(`${guild.name} sunucusunda güncelleme ${cartelim} tarafından yapıldı.

**Sunucu İsmi**: \` ${isim ? isim != eskiIsim ? `${eskiIsim} -> ${isim}` : `Değişmedi!` : `Değişmedi!` } \`
**Sunucu Resmi**: \` ${resim ? resim != eskiAvatar ? `Değişti!` : `Değişmedi!` : `Değişmedi!` } \`
**Sunucu Banner**: \` ${arkaplan ? arkaplan != eskiBanner ? `Değişti!` : `Değişmedi!` : `Değişmedi!` } \`
`)
.sütun(`Gerçekleşen Ayarlar`,`\`\`\`
${gerçekleşenİşlemler.join("\n")}
\`\`\``)]})
            await modal.deferReply({ ephemeral: true })
            return await modal.followUp({embeds: [new richEmbed().renk("RANDOM").açıklama(`Başarıyla ${guild.name} sunucusu üzerinde işlem(ler) <t:${String(Date.now()).slice(0, 10)}:F> tarihinde gerçekleştirildi/güncelleştirildi.

**Aşağıda gerçekleşen işlemler tamamlandı**:
\`\`\`
${gerçekleşenİşlemler.join("\n")}
\`\`\``)] , ephemeral: true })
        } else {
            await modal.deferReply({ ephemeral: true })
            return await modal.followUp({content: `Sunucu üzerinde bir değişiklik yapılmadı.` , ephemeral: true })
        }
          
    }
}

module.exports.config = {
    Event: "modalSubmit"
}