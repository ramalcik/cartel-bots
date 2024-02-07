const { Client, Message, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const TalentPerms = require('../../../../database/Schemas/Global.Guild.Settings');
const task = require('../../../../database/Schemas/Plugins/Client.Users.Tasks');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const ms = require('ms')
const { 
  Modal,
  TextInputComponent,
  SelectMenuComponent,
  showModal
} = dcmodal = require('discord-modals')

module.exports = {
    name: "özelkomut",
    command: ["özelkomut","rolkomut"],
    aliases: "",
    description: "",
    category: "-",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.on('modalSubmit', async (modal) => {
      let guild = client.guilds.cache.get(modal.guildId);

      if(!guild) {
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `Sistemsel olarak bir hata oluştur` , ephemeral: true })
      }
      let cartelim = guild.members.cache.get(modal.user.id)
      if(!cartelim){
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
      }
      if(modal.customId == "tp-kaldır") {
        let cmdName = modal.getTextInputValue('tp_isim');
        let check = await TalentPerms.findOne({guildID: guild.id})
        let cmd = check.talentPerms.find(cartel => cartel.Commands == cmdName)
        if(!cmd) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Belirtilen isimde aktif bir komut bulunmakta. ` , ephemeral: true })
        }
        await TalentPerms.updateOne({guildID: guild.id}, { $pull: { "talentPerms": cmd } }, { upsert: true })
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `Başarıyla ${cmdName} komutu <t:${String(Date.now()).slice(0, 10)}:R> kaldırıldı. ${guild.emojiyiBul(emojiler.onay_cartel)}` , ephemeral: true })

      }
      if(modal.customId == "tp-detay") {
        let cmdName = modal.getTextInputValue('tp_isim');
        let check = await TalentPerms.findOne({guildID: guild.id})
        let cmd = check.talentPerms.find(cartel => cartel.Commands == cmdName)
        if(!cmd) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Belirtilen isimde aktif bir komut bulunmakta. ` , ephemeral: true })
        }
       
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({embeds: [new richEmbed().setThumbnail(guild.iconURL({dynamic: true})).altBaşlık(cartelim.user.username, cartelim.user.avatarURL({dynamic: true})).açıklama(`Aşağı da **${cmdName}** isimli rol (ver/al) veya alt komutun detaylı bilgileri belirtilmiştir.\n
Bu komut ${cmd.Author ? guild.members.cache.get(cmd.Author) ? guild.members.cache.get(cmd.Author) : `<@${cmd.Author}>` : cartelim} tarafından ${cmd.Date ? `<t:${String(cmd.Date).slice(0, 10)}:R>` : `<t:${String(Date.now()).slice(0, 10)}:R>`} oluşturdu.

**Verilen rol(ler)**:
${cmd.Roles ? cmd.Roles.map(x => guild.roles.cache.get(x)).join(", ") : "@deleted-role"} rol veya rollerini veriyor.
**Kullanacak rol(ler)**:
${cmd.Permission ? cmd.Permission.map(x => guild.roles.cache.get(x)).join(", ") : "@rol bulanamadı"} rol veya rolleri kullanabilir.`)] , ephemeral: true })


      }
      if(modal.customId == "tp-ekle") {
        let cmdName = modal.getTextInputValue('tp_isim');
        let cmdType = modal.getTextInputValue("tp_kullancakroller") || [] 
        let cmdContent = modal.getTextInputValue('tp_vericekroller') || []
        cmdType = cmdType.split(' ');
        cmdContent = cmdContent.split(' ');
        let _Permission = []
        let _Roles = []
        cmdType.forEach((a) => {
          _Permission.push(a)
        })
        cmdContent.forEach((a) => {
          _Roles.push(a)
        })
        let check = await TalentPerms.findOne({guildID: guild.id})
        let cmd = check.talentPerms ? check.talentPerms.find(cartel => cartel.Commands == cmdName) : undefined
        if(cmd) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Belirtilen isimde aktif bir komut bulunmakta. ` , ephemeral: true })
        }
        if((_Roles && !_Roles.some(x => guild.roles.cache.has(x))) || (_Permission && !_Permission.some(x => guild.roles.cache.has(x)))) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Belirtilen rol veya roller ${guild.name} sunucusunda bulunamadı. ` , ephemeral: true })
        }
        await TalentPerms.updateOne({guildID: guild.id}, { $push: {"talentPerms": {
          Name: başHarfBüyült(cmdName),
          Commands: cmdName,
          Permission: _Permission,
          Roles: _Roles,
          Date: Date.now(),
          Author: cartelim.id,
        }}}, {upsert: true})
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `Başarıyla ${cmdName} komutu <t:${String(Date.now()).slice(0, 10)}:R> eklendi. ${guild.emojiyiBul(emojiler.onay_cartel)}` , ephemeral: true })

      }
    })
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && message.guild.ownerId != message.member.id) return;  
    const embed = new richEmbed()
      let Tp = await TalentPerms.findOne({guildID: message.guild.id})

      let load = await message.reply({
        content: `${message.guild.name} sunucusuna ait rol (ver/al) komut oluşturma sistemi yükleniyor. Lütfen bekleyin!`
      })

      let Row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle("SUCCESS")
          .setEmoji("943265806341513287")
          .setLabel("Komut Oluştur")
          .setCustomId("tp_ekle"),
          new MessageButton()
          .setStyle("PRIMARY")
          .setEmoji("963743753036791879")
          .setLabel("Komut Bilgileri")
          .setCustomId("tp_bilgileri"),
          new MessageButton()
          .setStyle("SECONDARY")
          .setEmoji("943265806547038310")
          .setLabel("Komut Kaldır")
          .setCustomId("tp_kaldır"),
      );
    
      let TalentPerm = Tp.talentPerms
      let komutlar = []
      let komutListe = []
        if(Tp && TalentPerm) {
          TalentPerm.filter(x => !Array.isArray(x.Commands)).forEach(x =>  komutlar.push({name: x.Commands, roles: `${x.Roles.map(a => message.guild.roles.cache.get(a) ? message.guild.roles.cache.get(a) : "@deleted-role").join(", ")}`}))
          TalentPerm.filter(x => !Array.isArray(x.Commands)).forEach(data => {
            komutListe.push([
              {label: başHarfBüyült(data.Commands), value: data.Commands, emoji: {id: "1023821496025612359"}, description: `${data.Roles.map(x => message.guild.roles.cache.get(x) ? message.guild.roles.cache.get(x).name : "@deleted-role").join(", ")} veriyor.`},
            ])
          })
        }

      load.edit({content: null, embeds: [
        new richEmbed()
        .açıklama(`Aşağıda ${message.guild.name} sunucusuna ait rol (ver/al) komut oluşturma, görüntüleme ve kaldırma işlemi yapabilirsiniz.\n
Sunucuda toplamda ${komutlar.length} alt komut veya rol (ver/al) komutu bulunmakta. Eklemek için aşağıda bulunan "Komut Oluştur" düğmesini kullanabilirsiniz.\n
${komutlar.length > 0 ? `Aşağıda sunucuda bulunan alt komut veya rol (ver/al) komutları listelenmekte:
${komutlar.map(x => ` **${x.name}** (${x.roles})`).join("\n")}` : ``}`)
        .setThumbnail(message.guild.iconURL({dynamic: true}))
      ],
      components: [Row]
    })
      var filter = (i) => i.user.id == message.member.id
      let collector = load.createMessageComponentCollector({ filter: filter, time: 60000})
      collector.on('collect', async (i) => {
        if(i.customId == "tp_bilgileri") {
          const modal = new Modal()
          .setCustomId('tp-detay')
          .setTitle(`Alt Komut Bilgi`)
          .addComponents(
            new TextInputComponent()
            .setCustomId('tp_isim')
            .setLabel('Komut İsmi')
            .setStyle('SHORT')
            .setMinLength(3)
            .setMaxLength(120)
            .setPlaceholder(`Örn: vip`)
            .setRequired(true),
          );
          showModal(modal, {
            client: client,
            interaction: i 
          })
        }
        if(i.customId == "tp_kaldır") {
          const modal = new Modal()
          .setCustomId('tp-kaldır')
          .setTitle(`Alt Komut Kaldırma`)
          .addComponents(
            new TextInputComponent()
            .setCustomId('tp_isim')
            .setLabel('Komut İsmi')
            .setStyle('SHORT')
            .setMinLength(3)
            .setMaxLength(120)
            .setPlaceholder(`Örn: vip`)
            .setRequired(true),
          );
          showModal(modal, {
            client: client,
            interaction: i 
          })
        }
        if(i.customId == "tp_ekle") {
          const modal = new Modal()
          .setCustomId('tp-ekle')
          .setTitle(`Alt Komut Komut Ekleme`)
          .addComponents(
            new TextInputComponent()
            .setCustomId('tp_isim')
            .setLabel('Komut İsmi')
            .setStyle('SHORT')
            .setMinLength(3)
            .setMaxLength(120)
            .setPlaceholder(`Örn: vip`)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('tp_kullancakroller')
            .setLabel('Kullanıcak Rol(ler)')
            .setStyle("LONG")
            .setMinLength(3)
            .setMaxLength(250)
            .setPlaceholder(`Birden fazla için boşluk bırakın.`)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('tp_vericekroller')
            .setLabel('Verilecek Rol(ler)')
            .setStyle("LONG")
            .setMinLength(3)
            .setMaxLength(250)
            .setPlaceholder(`Birden fazla için boşluk bırakın.`)
            .setRequired(true),
          );
          showModal(modal, {
            client: client,
            interaction: i 
          })
        }
      })
      collector.on('end', (collected, reason) => {
          if(reason == "time") {
            Row.components[0].setDisabled(true)
            Row.components[1].setDisabled(true)
            Row.components[2].setDisabled(true)
            
            load.edit({components: [Row], embeds: [
              new richEmbed().açıklama(`Zaman aşımına uğradığı için işleminiz sonlandırıldı. `)
            ]});
            setTimeout(() => {
              message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
              load.delete().catch(err => {})
            }, 7500)
          }
      })
}

};


function başHarfBüyült(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}