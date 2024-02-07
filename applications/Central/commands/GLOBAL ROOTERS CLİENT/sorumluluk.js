const { Client, Message, MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const Users = require('../../../../database/Schemas/Client.Users');
const moment = require("moment");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

require("moment-duration-format");
const mongoose = require("mongoose");
let Select = new Map()
const { 
  Modal,
  TextInputComponent,
  SelectMenuComponent,
  showModal
} = dcmodal = require('discord-modals')


const Sorumluluk = require('../../../../database/Schemas/Plugins/Guild.Responsibility');

module.exports = {
    name: "sorumluluk",
    command: ["sorumluluk", "sorumlu"],
    aliases: "-",
    description: "",
    category: "-",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.on('interactionCreate', async (i) => {
      if(i.customId != "sorumluluk_sistem") return;
      let _data = await Sorumluluk.find({})
      let arr = []
      
      _data.map(d => {
        arr.push({
          name: d.name,
          value: d.role,
          leaders: d.leaders
        })
      })

      let guild = client.guilds.cache.get(i.guildId)
      if(!guild) return;
      let cartelim = guild.members.cache.get(i.user.id)
      if(!cartelim) return;

      let _get = arr.find(x => i.values == x.value) 
      if(_get) {

        Select.set(cartelim.id, {
          name: _get.name,
          role: _get.value,
          leaders: _get.leaders 
        })

        const modal = new Modal()
        .setCustomId('sorumlulukBasvuru')
        .setTitle(`${_get.name}`)
        .addComponents(
          new TextInputComponent()
          .setCustomId('isimyas')
          .setLabel('İsiminiz ve yaşınız ?')
          .setStyle('SHORT')
          .setMinLength(5)
          .setMaxLength(25)
      
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('referans')
          .setLabel('Referans')
          .setStyle('SHORT')
          .setMinLength(5)
          .setMaxLength(100)

          .setRequired(false),
          new TextInputComponent()
          .setCustomId('sorumluluk')
          .setLabel('Bu sorumluluğu neden istiyorsunuz?')
          .setStyle('LONG')
          .setMinLength(5)
          .setMaxLength(500)
          .setRequired(true),
        );
        return showModal(modal, {
          client: client,
          interaction: i 
        })
      }
     
    })

    client.on("modalSubmit", async (modal) => {
      if(modal.customId == "sorumluluk-kaldır") {

      }
      if(modal.customId == "sorumlulukBasvuru") {
        let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
        if(!guild) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
        }
        let cartelim = guild.members.cache.get(modal.user.id)
        if(!cartelim)  {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
        }
        let logKanalı = guild.kanalıBul("başvuru-log")
        if(!logKanalı) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Başvuru kanalı bulunmadığından dolayı, işleminize devam edemiyoruz. ` , ephemeral: true })
        }
        let isimyas = modal.getTextInputValue('isimyas');    
        let sorumluluk = modal.getTextInputValue('sorumluluk');  
        let refernas = modal.getTextInputValue('referans');
        let getir = Select.get(cartelim.id)
        if(!getir) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Sistemsel bir hata oluştu. ` , ephemeral: true })
        }
        let sorumlulukIsmi = getir.name
        let sorumlulukRolü = getir.role
        let Selector = getir.leaders || []
        if(cartelim.roles.cache.has(sorumlulukRolü)) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Üzerinizde bu sorumluluk rolü bulunduğu için işlem iptal edildi. ` , ephemeral: true })
        }
        let altYetki = guild.roles.cache.get(roller.ilkYetki)
        let embed = new richEmbed().üstBaşlık(cartelim.user.username, cartelim.user.avatarURL({dynamic: true})).açıklama(`${cartelim} kişi (**${sorumlulukIsmi}**) ${guild.roles.cache.get(sorumlulukRolü)} rolü için  <t:${Number(String(Date.now()).substring(0, 10))}:F> tarihinde başvurdu.`).altBaşlık(ayarlar.serverName + " • Yeni Sorumluluk Başvurusu!", cartelim.user.avatarURL({dynamic: true}))
        embed.sütun(`Başvuru Bilgisi`, `> İsim & Yaş: ${isimyas}
> Referans: ${refernas ? `${guild.members.cache.find(x => x.user.username == refernas || x.user.username.includes(refernas) || x.id == refernas) ? guild.members.cache.find(x => x.user.username == refernas || x.user.username.includes(refernas) || x.id == refernas) : `${refernas}`}` : "Bir referans belirtilmemiş."}
> Neden istiyor? ${sorumluluk}`)
        let yetkiler = cartelim.roles.cache.filter(rol => altYetki.position <= rol.position)
        if(yetkiler) embed.sütun(`Üzerindeki Yetki Rolleri`, `${yetkiler.map(x => x).join("\n")}`)
        logKanalı.send({content: `${Selector.map(x => guild.roles.cache.get(x)).join(", ")}`, embeds: [embed]})
        await modal.deferReply({ ephemeral: true })
        Select.delete(cartelim.id)
        return await modal.followUp({content: `Başarıyla ${guild.roles.cache.get(sorumlulukRolü)} rolüne başvurunuz iletilmiştir! Gerekli kontrollerden ve denetimlerden sonra ${Selector.map(x => guild.roles.cache.get(x)).join(", ")} rolüne sahip yöneticiler seninle ilgilenecektir. Tebrikler!`, ephemeral: true})

      }


      if(modal.customId == "sorumluluk-ekle") {
        let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
        if(!guild) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
        }
        let cartelim = guild.members.cache.get(modal.user.id)
        if(!cartelim)  {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
        }
        let name = modal.getTextInputValue('name');
        let role = modal.getTextInputValue('role');
        let leaders = modal.getTextInputValue('leaders');

        if(role && !guild.roles.cache.get(role)) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Belirtilen sorumluluk rolü sunucuda bulunamadı.` , ephemeral: true })
        }

        if(leaders && !leaders.split(' ').every(x => guild.roles.cache.get(x))) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Belirtilen sorumluluk lider rolleri sunucuda bulunamadı.` , ephemeral: true })
        }

        await Sorumluluk.updateOne({name: name}, {
        $set: {
          name: name,
          role: role,
          leaders: leaders ? leaders.split(' ') : [],
          date: Date.now(),
          created: cartelim.id,
        }
        }, {upsert: true})

        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `${guild.emojiyiBul(emojiler.onay_cartel)} Başarıyla ${name} sorumluluğu başarıyla <t:${String(Date.now()).slice(0, 10)}:R> eklendi.` , ephemeral: true })
      }
    })
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {

    let Buttons = [
      new MessageButton()
      .setLabel("Sorumluluk Oluştur")
      .setCustomId("add")
  
      .setStyle("PRIMARY"),
    ]

    let _data = await Sorumluluk.find({})

    if(_data && _data.length > 0) Buttons.push(
      new MessageButton()
      .setLabel("Kur")
      .setCustomId("install")
      .setStyle("PRIMARY"),
      new MessageButton()
      .setLabel("Listele")

      .setCustomId("list")
      .setStyle("PRIMARY"),
      new MessageButton()
      .setLabel("Kaldır")
      .setCustomId("remove")
      .setStyle("PRIMARY"),
      new MessageButton()
      .setLabel("Tüm Sorumlulukları Sıfırla")
      .setCustomId("reset")

      .setStyle("PRIMARY"),
    )
    let msg = await message.reply({content: `Sorumluluk sistemi yüklenirken bekleyin...`});
    let Row = new MessageActionRow().addComponents(Buttons)      
    msg.edit({embeds: [new richEmbed().açıklama(`Aşağıdaki düğmeler ile sunucu yetkililerine \`Sorumluluk\` alması için sorumluluk oluşturulur.`)], content: null, components: [Row]})
    var filter = (i) => i.user.id == message.author.id
    let collector = msg.createMessageComponentCollector({filter: filter, time: 120000 });
    collector.on('end', (c, reason) => {
      if(reason == "time") {
        msg.edit({content: `Zaman Aşımı...`})
        setTimeout(() => {
          msg.delete().catch(err => {})
        }, 7500)
      }

    })
    collector.on('collect', async (i) => {
      if(i.customId == "list") {
        let _get = await Sorumluluk.find({})
        let _data = _get.map((x, index) => `**${x.name}**: 
Sorumluluk Rolü: ${message.guild.roles.cache.get(x.role) ? message.guild.roles.cache.get(x.role) : "@deleted-roçe"}
Lider Rolü(leri): ${x.leaders.map(x => message.guild.roles.cache.get(x) ? message.guild.roles.cache.get(x) : "@deleted-role").join(", ")}
`)
        msg.edit({embeds: [new richEmbed().açıklama(`Aşağı da ${message.guild.name} sunucusuna ait sorumluluklar listelenmektedir.

${_data.join("\n──────────────────────────\n")}`)], content: null, components: []})
      }
      if(i.customId == "reset") {
        await Sorumluluk.deleteMany({})
        msg.edit({embeds: [new richEmbed().açıklama(`Sunucunun tüm sorumlulukları sıfırlandı`)], content: null, components: []})
        setTimeout(() => {
          msg.edit({embeds: [new richEmbed().açıklama(`Aşağıdaki düğmeler ile sunucu yetkililerine \`Sorumluluk\` alması için sorumluluk yönetir.`)], content: null, components: [Row]})
        }, 7500)
      }
      if(i.customId == "silSorumluluk") {
        let _get = await Sorumluluk.findOne({role: i.values[0]})

        msg.edit({embeds: [new richEmbed().açıklama(`**${_get ? _get.name : "@"}** isimli sorumluluk kaldırıldı.`)], content: null, components: []})
        await Sorumluluk.deleteOne({role: i.values[0]})
        setTimeout(() => {
          msg.edit({embeds: [new richEmbed().açıklama(`Aşağıdaki düğmeler ile sunucu yetkililerine \`Sorumluluk\` alması için sorumluluk yönetir..`)], content: null, components: [Row]})
        }, 3500)
      }
      if(i.customId == "remove") {
        let _data = await Sorumluluk.find({})
        if(_data && _data.length > 0) { 
          let arr = []
          _data.forEach(x => {
            arr.push({
              label: x.name,
              value: x.role,
              description: `${message.guild.roles.cache.get(x.role) ? message.guild.roles.cache.get(x.role).name : `@deleted-role`}`
            })
          })
          let Roww = new MessageActionRow().addComponents(
            new MessageSelectMenu()
            .setCustomId("silSorumluluk")
              .setPlaceholder("Silinmesi Mümkün Olan Sorumluluklar.")
              .setOptions(arr)
          )
          msg.edit({embeds: [new richEmbed().açıklama(`Listelenmiş olan sorumlulukları kaldırabilirsiniz,fakat en az 1 sorumluluk kalmalıdır.`)], content: null, components: [Roww]})
        } else {
          i.reply({embeds: [new richEmbed().açıklama( `Sorumluluk Bulunamadı.`)]})
        }
      }
      if(i.customId == "install") {
        let _data = await Sorumluluk.find({})
        if(_data && _data.length > 0) { 
            let arr = []
            _data.forEach(x => {
              arr.push({
                label: x.name,
                value: x.role,
              
              })
            })
            let Roww = new MessageActionRow().addComponents(
              new MessageSelectMenu()
              .setCustomId("sorumluluk_sistem")
                .setPlaceholder("Yetkili Sorumlulukları")
                .setOptions(arr)
            )
  
            message.channel.send({content: `**Merhaba!** ${ayarlar.serverName}
Aşağıda bulunan başvurusu açık sorumluluk rollerinden başvurmak istediğinizi seçiniz.`, components: [Roww]})
i.reply({embeds: [new richEmbed().açıklama(`Başarıyla ayarlamış olduğunuz sorumluluk başvuru sistemi açıldı. `)]})
        } else {
          i.reply({embeds: [new richEmbed().açıklama(`Kurulum yapabilmeniz için en az bir sorumluluk oluşturmalısınız.`)]})
        }
      }
      if(i.customId == "add") {
        msg.delete().catch(err => {})
        const modal = new Modal()
        .setCustomId('sorumluluk-ekle')
        .setTitle(`Sorumluluk Ekleme`)
        .addComponents(
          new TextInputComponent()
          .setCustomId('name')
          .setLabel('Sorumluluk Ismi')
          .setStyle('SHORT')
          .setMinLength(3)
          .setMaxLength(120)

          .setRequired(true),
          new TextInputComponent()
          .setCustomId('role')
          .setLabel('Sorumluluk Rolü')
          .setStyle('SHORT')
          .setMinLength(3)
          .setMaxLength(120)
    
          .setRequired(true),
          new TextInputComponent()
          .setCustomId('leaders')
          .setLabel('Sorumluluk Sorumluları')
          .setStyle('LONG')
          .setMinLength(3)
          .setMaxLength(1024)
          .setRequired(true),
        );
        showModal(modal, {
          client: client,
          interaction: i 
        })
      }
    })
    }
};


