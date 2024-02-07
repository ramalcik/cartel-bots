const { Client, Message, Util, MessageActionRow, MessageButton, MessageSelectMenu, Collection, Permissions} = Discord = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed.js");
const voiceCollection = new Collection()
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');
const Users = require('../../../../database/Schemas/Client.Users');
const Private = require('../../../../database/Schemas/Plugins/Guild.Private.Rooms.js');
const {VoiceChannels, TextChannels, CategoryChannels, Roles} = require("../../../../database/Schemas/Guards/Backup/Guild.Sync");
let vkKategori = "1008826074592968779"
let dcKategori = "1008826046105260113"
let aktiviteKategori = "964168000997572678"
const { 
  Modal,
  TextInputComponent, 
  showModal
} = dcmodal = require('discord-modals')

module.exports = {
    name: "komut",
    command: ["komutcuk","özeloda"],
    aliases: "",
    description: "",
    category: "-",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {},
   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

   komutClient: async function (client, message, args) {
    let Row = new MessageActionRow().addComponents(
      new MessageButton()
      .setCustomId("özelOdaOluştur")
      .setLabel("Özel Oda Oluştur")
      .setStyle("SUCCESS")
    )
    message.channel.send({content: `**Merhaba!** Özel Oda Oluşturma Sistemine Hoş Geldiniz!

Bu kısımdan kendin belirleyeceğin isimde ve senin yöneteceğin bir kanal oluşturabilirsin.
Ayrıca bu kanala istediklerin girebilir, istemediklerini odaya almayabilirsin.

Belki odanı gizli yaparak devlet sırlarını konuşabilir,
Ya da herkese açık yaparak halka seslenebilirsin.

Aşağıda bulunan "Özel Oda Oluştur" düğmesine basarak oluşturabilirsiniz, iyi sohbetler dilerim.`, components: [Row]})
  }
};

client.on("voiceChannelLeave", async (member, channel) => {
  let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
  if(!guild) return;
  let Data = await Private.findOne({voiceChannelId: channel.id})
  if(!Data) return;
  let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
  if(Data.permaRoom) return;
    if(sesKanalı && sesKanalı.members.size <= 0) { 
      await Private.deleteOne({guildID: Data.guildID, userID: Data.userID})
         sesKanalı.delete().catch(err => {})
    }
  })

client.on("voiceChannelSwitch", async (member, channel, newChannel) => {
  let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
  if(!guild) return;
  let Data = await Private.findOne({voiceChannelId: channel.id})
  if(!Data) return;
  if(Data.permaRoom) return;
  let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
  if(sesKanalı && sesKanalı.members.size <= 0) { 
    await Private.deleteOne({guildID: Data.guildID, userID: Data.userID})
       sesKanalı.delete().catch(err => {})
  }
})


client.on('modalSubmit', async (modal) => {
  if(modal.customId == "limitOzelOdacik") {
    let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
    if(!guild) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
    let uye = guild.members.cache.get(modal.user.id)
    if(!uye)  {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
    if(ayarlar && !ayarlar.özelOdaKategorisi) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel olarak özel oda oluştur kapalı.` , ephemeral: true })
    }
    let privOdalar = guild.channels.cache.get(ayarlar.özelOdaKategorisi)
    if(!privOdalar) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel olarak özel oda oluştur kapalı.` , ephemeral: true })
    }
  
    let Data = await Private.findOne({guildID: guild.id, userID: uye.id})
    if(!Data) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Bu kullanıcı için özel oda oluşturma yetkisi yok.` , ephemeral: true })
    }
    let limit = parseInt(modal.getTextInputValue('name'))
    if(isNaN(limit)) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Lütfen geçerli bir sayı girin.` , ephemeral: true })
    }
    let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
    if(sesKanalı) {
      sesKanalı.setUserLimit(Number(limit))
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Özel oda limiti başarıyla değiştirildi.` , ephemeral: true })
    } else {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
  }
  if(modal.customId == "isimDegistirme") {
    let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
    if(!guild) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
    let uye = guild.members.cache.get(modal.user.id)
    if(!uye)  {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
    if(ayarlar && !ayarlar.özelOdaKategorisi) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel olarak özel oda oluştur kapalı.` , ephemeral: true })
    }
    let privOdalar = guild.channels.cache.get(ayarlar.özelOdaKategorisi)
    if(!privOdalar) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel olarak özel oda oluştur kapalı.` , ephemeral: true })
    }
  
    let Data = await Private.findOne({guildID: guild.id, userID: uye.id})
    if(!Data) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
    let isim = modal.getTextInputValue('name'); 
    if(!isim) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Lütfen isim giriniz.` , ephemeral: true })
    }
    let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
    if(sesKanalı) {
      let kanalIsim = sesKanalı.name.replace("🔓", "").replace("🔒", "")
      await sesKanalı.setName(sesKanalı.name.replace(kanalIsim, isim))
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Özel oda ismi değiştirildi.` , ephemeral: true })
    } else {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
  }
  if(modal.customId == "ozelOdaBanla") {
    let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
    if(!guild) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
    let uye = guild.members.cache.get(modal.user.id)
    if(!uye)  {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
    if(ayarlar && !ayarlar.özelOdaKategorisi) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel olarak özel oda oluştur kapalı.` , ephemeral: true })
    }
    let privOdalar = guild.channels.cache.get(ayarlar.özelOdaKategorisi)
    if(!privOdalar) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel olarak özel oda oluştur kapalı.` , ephemeral: true })
    }
  
    let Data = await Private.findOne({guildID: guild.id, userID: uye.id})
    if(!Data) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Özel oda oluşturmadığınız için bu işlemi yapmaya hakkınız yok.` , ephemeral: true })
    }
    let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
    if(sesKanalı) { 
      let id = modal.getTextInputValue('name'); 
      let izinVerilcek = guild.members.cache.get(id)
      if(izinVerilcek) {
        if(izinVerilcek.voice && izinVerilcek.voice.channel && izinVerilcek.voice.channel.id == sesKanalı.id) izinVerilcek.voice.disconnect()
        sesKanalı.permissionOverwrites.delete(izinVerilcek);
        sesKanalı.permissionOverwrites.create(izinVerilcek, { CONNECT: false, VIEW_CHANNEL: false });
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `Başarıyla "${sesKanalı}" kanalında ${izinVerilcek} üyesi yasaklandı.` , ephemeral: true })
      } else {
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `Belirttiğiniz ID ile bir üye eşleşmedi. Lütfen geçerli bir ID numarası girin. ${cevaplar.prefix}` , ephemeral: true })
      }
    } else {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel olarak özel oda oluştur kapalı.` , ephemeral: true })
    }
  }

  if(modal.customId == "ozelOdaIzin") {
    let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
    if(!guild) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
    let uye = guild.members.cache.get(modal.user.id)
    if(!uye)  {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
    if(ayarlar && !ayarlar.özelOdaKategorisi) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel olarak özel oda oluştur kapalı.` , ephemeral: true })
    }
    let privOdalar = guild.channels.cache.get(ayarlar.özelOdaKategorisi)
    if(!privOdalar) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel olarak özel oda oluştur kapalı.` , ephemeral: true })
    }
  
    let Data = await Private.findOne({guildID: guild.id, userID: uye.id})
    if(!Data) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Özel oda oluşturmadığınız için bu işlemi yapmaya hakkınız yok.` , ephemeral: true })
    }
    let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
    if(sesKanalı) { 
      let id = modal.getTextInputValue('name'); 
      let izinVerilcek = guild.members.cache.get(id)
      if(izinVerilcek) {
        sesKanalı.permissionOverwrites.create(izinVerilcek, { CONNECT: true,  VIEW_CHANNEL: true });
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `Başarıyla "${sesKanalı}" kanalına ${izinVerilcek} üyesi eklendi.` , ephemeral: true })
      } else {
        await modal.deferReply({ ephemeral: true })
        return await modal.followUp({content: `Belirttiğiniz ID ile bir üye eşleşmedi. Lütfen geçerli bir ID numarası girin. ${cevaplar.prefix}` , ephemeral: true })
      }
    } else {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel olarak özel oda oluştur kapalı.` , ephemeral: true })
    }
  }

  if(modal.customId == "ozelOdaOlusturma") {
    let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
    if(!guild) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
    let uye = guild.members.cache.get(modal.user.id)
    if(!uye)  {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
    }
    if(ayarlar && !ayarlar.özelOdaKategorisi) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel olarak özel oda oluştur kapalı.` , ephemeral: true })
    }
    let privOdalar = guild.channels.cache.get(ayarlar.özelOdaKategorisi)
    if(!privOdalar) {
      await modal.deferReply({ ephemeral: true })
      return await modal.followUp({content: `Sistemsel olarak özel oda oluştur kapalı.` , ephemeral: true })
    }
  
    let Data = await Private.findOne({guildID: guild.id, userID: uye.id})
    
    let odaIsmi = modal.getTextInputValue('name'); 
    let odaIzin = modal.getTextInputValue('everyone');
    guild.channels.create(`${odaIzin != "HAYIR"  ? "🔓" : "🔒"} ${odaIsmi}`, {
      parent: privOdalar,
      permissionOverwrites: [{
          id: uye,
          allow: [Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK, Permissions.FLAGS.STREAM,Permissions.FLAGS.PRIORITY_SPEAKER,Permissions.FLAGS.MUTE_MEMBERS, Permissions.FLAGS.DEAFEN_MEMBERS, Permissions.FLAGS.MOVE_MEMBERS],
        },
      ],
      type: 'GUILD_VOICE',
    }).then(async (kanal) => {
      if(odaIzin == "HAYIR") { 
        await kanal.permissionOverwrites.edit(uye.guild.roles.everyone.id, { CONNECT: false,SPEAK: true, STREAM: true });
      } else { 
        await kanal.permissionOverwrites.edit(uye.guild.roles.everyone.id, { CONNECT: true, SPEAK: true, STREAM: true }); 
      }
      setTimeout(async () => {
        if(kanal && kanal.members.size <= 0) {
          setTimeout(async () => {
            await Private.deleteOne({guildID: guild.id, userID: uye.id})
            kanal.delete().catch(err => {})
          }, 1250)
        }
      }, 30000)

      let Row = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId("kanalBilgisi_ozelOda")
        .setLabel("Kanal Bilgisi")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("izinVer_ozelOda")
        .setLabel("Oda İzni Ver")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("yasakla_ozelOda")
        .setLabel("Odadan Yasakla")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("limit_ozelOda")
        .setLabel("Oda Limiti Düzenle")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("isimDegistir_ozelOda")
        .setLabel("Odanın İsmini Güncelle")
        .setStyle("SECONDARY"),
      )
      let RowTwo = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId("herkeseAcik_ozelOda")
        .setLabel(odaIzin != "HAYIR"  ? "Sadece İzinliler'e Ayarla" : "Herkese Açık Ayarla")
        .setStyle(odaIzin != "HAYIR"  ? "SECONDARY" : "PRIMARY"),
        new MessageButton()
        .setCustomId("odaIzinSıfırla")
        .setLabel("Kanal İzinleri Temizle")
        .setStyle("DANGER"),
        new MessageButton()
        .setCustomId("kaldır_ozelOda")
        .setLabel("Kanalı Kaldır")
        .setStyle("DANGER"),
      )
   if(kanal) kanal.send({content : `Özel Oda Yönetim Paneline Hoş Geldin! ${uye}

Özel odanız herkese açık ise yasakladığınız üyeler dışında herkes giriş yapabilir.
Özel odanız sadece izinliler olarak ayarlandığında izin verdiğiniz herkes giriş yapabilir.`, components: [Row, RowTwo]})
      await modal.deferReply({ ephemeral: true })
      await Private.updateOne({guildID: guild.id, userID: uye.id}, {$set: {"Date": Date.now(), "voiceChannelId": kanal.id, "messageChannelId": kanal.id}}, {upsert: true});
      await Private.updateOne({guildID: guild.id, userID: uye.id}, {$set: {"Date": Date.now(), "voiceChannelId": kanal.id, "messageChannelId": kanal.id}}, {upsert: true})
      await modal.followUp({content: `Ses kanalınız başarıyla oluşturuldu! <#${kanal.id}> (**${odaIzin != "EVET"  ? "Sadece İzinliler!" : "Herkese Açık!"}**)
Oluşturulan kanalınızı yönetmek ister misiniz? Yeni özellikle beraber artık ses kanalınızın sohbet yerinden hem kontrol hem mikrofonu olmayan arkadaşlarınızla oradan sohbet edebilirsiniz.` , ephemeral: true })
    })
  }
  
})


client.on("interactionCreate", async (i) => {
  let guild = client.guilds.cache.get(i.guild.id)
  if(!guild) return;
  let uye = guild.members.cache.get(i.user.id)
  if(!uye) return;
  if(!ayarlar) return;
  if(ayarlar && !ayarlar.özelOdaKategorisi) return;
  let privOdalar = guild.channels.cache.get(ayarlar.özelOdaKategorisi)
  if(!privOdalar) return;

  let Data = await Private.findOne({guildID: guild.id, userID: uye.id})
  if(i.customId == "limit_ozelOda") {
    if(!Data) return i.reply({content: `Kanal'ın isimi için bir özel oda oluşturmalısınız.`, ephemeral: true});
    let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
    if(sesKanalı) { 
      let özelOda = new Modal()
      .setCustomId('limitOzelOdacik')
      .setTitle(`${sesKanalı.name.replace("🔒", "").replace("🔓","")} Kanalı Limiti Düzenle!`)
      .addComponents(
        new TextInputComponent()
        .setCustomId('name')
        .setLabel('Kanal Limiti')
        .setStyle('SHORT')
        .setMinLength(1)
        .setMaxLength(2)
        .setPlaceholder(`Örn: 31`)
        .setRequired(true)
      );
      showModal(özelOda, {
        client: client,
        interaction: i,
      })
    } else {
      return i.reply({content: `Sistemsel bir hata oluştu, lütfen yöneticilere başvurun.`, ephemeral: true});
    }
  }

  if(i.customId == "odaIzinSıfırla") {
    if(!Data) return i.reply({content: `Kanal'ın isimi için bir özel oda oluşturmalısınız.`, ephemeral: true});
    let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
    if(sesKanalı) { 
      sesKanalı.permissionOverwrites.cache.filter(x => x.type == "member" && x.id != i.user.id).map(async (x) => {
        await sesKanalı.permissionOverwrites.delete(x.id)
      })
      return i.reply({content: `Başarıyla sen hariç tüm üyelerin izinleri ve yasakları sıfırlandı.`, ephemeral: true});
    } else {
      return i.reply({content: `Sistemsel bir hata oluştu, lütfen yöneticilere başvurun.`, ephemeral: true});
    }
  }

  if(i.customId == "isimDegistir_ozelOda") {
    if(!Data) return i.reply({content: `Kanal'ın isimi için bir özel oda oluşturmalısınız.`, ephemeral: true});
    
    let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
    if(sesKanalı) { 
      let isimDegistirme = new Modal()
      .setCustomId('isimDegistirme')
      .setTitle(`${sesKanalı.name.replace("🔒", "").replace("🔓","")} Kanalı Düzenle`)
      .addComponents(
        new TextInputComponent()
        .setCustomId('name')
        .setLabel('Kanal İsmi')
        .setStyle('SHORT')
        .setMinLength(2)
        .setMaxLength(32)
        .setPlaceholder(`${sesKanalı.name.replace("🔒", "").replace("🔓","")}`)
        .setRequired(true)
      );
      showModal(isimDegistirme, {
        client: client,
        interaction: i,
      })
    } else {
      return i.reply({content: `Sistemsel bir hata oluştu, lütfen yöneticilere başvurun.`, ephemeral: true});
    }
  }

  if(i.customId == "herkeseAcik_ozelOda") {
    if(!Data) return i.reply({content: `Kanal'ın görünürlüğü için bir özel oda oluşturmalısınız.`, ephemeral: true});
    let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
    if(sesKanalı) { 
      let Row = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId("kanalBilgisi_ozelOda")
        .setLabel("Kanal Bilgisi")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("izinVer_ozelOda")
        .setLabel("Oda İzni Ver")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("yasakla_ozelOda")
        .setLabel("Odadan Yasakla")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("limit_ozelOda")
        .setLabel("Oda Limiti Düzenle")
        .setStyle("SECONDARY"),
        new MessageButton()
        .setCustomId("isimDegistir_ozelOda")
        .setLabel("Odanın İsmini Güncelle")
        .setStyle("SECONDARY"),
      )
      let RowTwo = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId("herkeseAcik_ozelOda")
        .setLabel(sesKanalı.permissionsFor(uye.guild.roles.everyone).has('CONNECT') ? "Sadece İzinliler'e Ayarla" : "Herkese Açık Ayarla")
        .setStyle(sesKanalı.permissionsFor(uye.guild.roles.everyone).has('CONNECT') ? "SECONDARY" : "PRIMARY"),
        new MessageButton()
        .setCustomId("odaIzinSıfırla")
        .setLabel("Kanal İzinleri Temizle")
        .setStyle("DANGER"),
        new MessageButton()
        .setCustomId("kaldır_ozelOda")
        .setLabel("Kanalı Kaldır")
        .setStyle("DANGER"),
      )
      if (sesKanalı.permissionsFor(uye.guild.roles.everyone).has('CONNECT')) {
        await sesKanalı.permissionOverwrites.edit(uye.guild.roles.everyone.id, { CONNECT: false, SPEAK: true, STREAM: true });
        sesKanalı.setName(sesKanalı.name.replace("🔓", "🔒"))
        RowTwo.components[0].setStyle("PRIMARY").setLabel(`Herkese Açık Ayarla`)
        i.update({components: [Row, RowTwo]})
      } else {
        await sesKanalı.permissionOverwrites.edit(uye.guild.roles.everyone.id, { CONNECT: true, SPEAK: true, STREAM: true });
        RowTwo.components[0].setStyle("SECONDARY").setLabel(`Sadece İzinliler'e Ayarla`)
        sesKanalı.setName(sesKanalı.name.replace("🔒", "🔓"))
        i.update({components: [Row, RowTwo]})
      } 
    } else {
      return i.reply({content: `Sistemsel bir hata oluştu, lütfen yöneticilere başvurun.`, ephemeral: true});
    }
}

  if(i.customId == "yasakla_ozelOda") {
    
    if(!Data) return i.reply({content: `Kanal'a izinli kaldırmam için bir özel oda oluşturmalısınız.`, ephemeral: true});
    let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
    if(sesKanalı) { 
      let izinOdaBanla = new Modal()
      .setCustomId('ozelOdaBanla')
      .setTitle(`${sesKanalı.name.replace("🔒", "").replace("🔓","")} Kanalı Yasaklama Paneli`)
      .addComponents(
        new TextInputComponent()
        .setCustomId('name')
        .setLabel('ID')
        .setStyle('SHORT')
        .setMinLength(18)
        .setMaxLength(22)
        .setPlaceholder(`ID`)
        .setRequired(true)
      );
      showModal(izinOdaBanla, {
        client: client,
        interaction: i,
      })
    } else {
      return i.reply({content: `Sistemsel bir hata oluştu, lütfen yöneticilere başvurun.`, ephemeral: true});
    }
}

  if(i.customId == "izinVer_ozelOda") {
      if(!Data) return i.reply({content: `Kanal'a izinli eklemem için bir özel oda oluşturmalısınız.`, ephemeral: true});
      let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
      if(sesKanalı) { 
        let izinOda = new Modal()
        .setCustomId('ozelOdaIzin')
        .setTitle(`${sesKanalı.name.replace("🔒", "").replace("🔓","")} Kanalı İzin Paneli`)
        .addComponents(
          new TextInputComponent()
          .setCustomId('name')
          .setLabel('ID')
          .setStyle('SHORT')
          .setMinLength(18)
          .setMaxLength(22)
          .setPlaceholder(`ID`)
          .setRequired(true)
        );
        showModal(izinOda, {
          client: client,
          interaction: i,
        })
      } else {
        return i.reply({content: `Sistemsel bir hata oluştu, lütfen yöneticilere başvurun.`, ephemeral: true});
      }
  }
  if(i.customId == "kaldır_ozelOda") {
    if(!Data) return i.reply({content: `Kanal'ı kaldırmam için bir özel oda oluşturmalısınız.`, ephemeral: true});

    let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
    if(sesKanalı) { 
      setTimeout(async () => {
        await Private.deleteOne({guildID: guild.id, userID: uye.id})
        await sesKanalı.delete().catch(err => {})
      }, 5000);
      i.reply({content: `Başarıyla kanal silme işleminiz tamamlandı.
5 Saniye içerisinde ${sesKanalı} kanalınız silinecektir.`, ephemeral: true})
    } else {
      return i.reply({content: `Sistemsel bir hata oluştu, lütfen yöneticilere başvurun.`, ephemeral: true});
    }
  }
  if(i.customId == "kanalBilgisi_ozelOda") {
    if(!Data) return i.reply({content: `Kanal bilginizi görüntüleyebilmem için bir özel oda oluşturmalısınız.`, ephemeral: true});
    let sesKanalı = guild.channels.cache.get(Data.voiceChannelId)
    if(sesKanalı) {
      let yasaklılar = []
      let izinliler = []
      sesKanalı.permissionOverwrites.cache.filter(x => x.type == "member" && x.id != i.user.id).map(x => {
        if(sesKanalı.permissionsFor(x.id) && sesKanalı.permissionsFor(x.id).has("CONNECT")) {
          izinliler.push(x.id)
        } else {
          yasaklılar.push(x.id)
        }
      })

      i.reply({content: `
Ses kanalın görünürlüğü: **${sesKanalı.permissionsFor(uye.guild.roles.everyone).has('CONNECT') ? "Herkese Açık!" : "Sadece İzinliler!"}**
Oluşturulma tarihi: <t:${String(Data.Date).slice(0, 10)}:F> (<t:${String(Data.Date).slice(0, 10)}:R>)

Ses kanalında izinliler:
${izinliler.length > 0 ? izinliler.map(x => `> ${uye.guild.members.cache.get(x)} (\`${x}\`)`).join("\n") : "İzinli bulunamadı!"}

Ses kanalında yasaklılar:
${yasaklılar.length > 0 ? yasaklılar.map(x => `> ${uye.guild.members.cache.get(x)} (\`${x}\`)`).join("\n") : "Yasaklı bulunamadı!"}

`, ephemeral: true})
    } else {
      return i.reply({content: `Sistemsel bir hata oluştu, lütfen yöneticilere başvurun.`, ephemeral: true});
    }
  }

  const modal = new Modal()
  .setCustomId('ozelOdaOlusturma')
  .setTitle('Özel Oda Oluşturma')
  .addComponents(
    new TextInputComponent()
    .setCustomId('name')
    .setLabel('Oda İsmi Giriniz!')
    .setStyle('SHORT')
    .setMinLength(3)
    .setMaxLength(60)
    .setRequired(true),
    new TextInputComponent()
    .setCustomId('everyone')
    .setLabel('SES HERKESE AÇIK MI? (EVET/HAYIR)')
    .setStyle('SHORT')
    .setMinLength(1)
    .setMaxLength(10)
    .setPlaceholder('Sadece "EVET" veya "HAYIR" yazın.')
    .setRequired(true),
  );
  if(i.customId == "özelOdaOluştur") {
    if(Data) return i.reply({content: `Aktif bir özel odanız olduğundan dolayı bir özel oda oluşturmazsınız.`, ephemeral: true});
    showModal(modal, {
      client: client,
      interaction: i 
    })
  }
})

function başHarfBüyült(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

async function voiceKur(idcik, message, embed) {
    let sesKurma = await VoiceChannels.find({ parentID: idcik })
    if(sesKurma) {
      sesKurma.forEach(async (data) => {
         message.guild.channels.create(data.name, {
          type: 'GUILD_VOICE',
          bitrate: data.bitrate,
          parentId: idcik,
          position: data.position,
          userLimit: data.userLimit ? data.userLimit : 0
        }).then(async (gg) => {
          await gg.setParent(idcik)
        })
      })
    }
}

async function textKur(idcik, message, embed) {
  let metinkurma = await TextChannels.find({ parentID: idcik })
  if(metinkurma) {
    metinkurma.forEach(async (data) => {
      await message.guild.channels.create(data.name, {
        type: 'GUILD_TEXT',
        nsfw: data.nsfw,
        parentId: idcik,
        position: data.position,
        rateLimit: data.rateLimit,
      }).then(async (gg) => {
        await gg.setParent(idcik)
      });
    })
  }
}



