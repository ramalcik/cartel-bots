const { Client, Message, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");
const { richEmbed } = require('../../../../base/Funksiyonlar/embed');
const GUILD_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Invite = require('../../../../database/Schemas/Global.Guild.Invites')
const Users = require('../../../../database/Schemas/Client.Users');
const Stats = require('../../../../database/Schemas/Plugins/Client.Users.Stats')
const Heykeller = require('../../../../database/Schemas/Others/Middle.Heykels')
const MonthlyMember = require("../../../../database/Schemas/Plugins/Global.Monthly.Member")
let statConfig;
const moment = require('moment');
require("moment-duration-format");
require("moment-timezone");
const table = require('table');
const { 
  Modal,
  TextInputComponent, 
  showModal
} = dcmodal = require('discord-modals')

dcmodal(client)

let özellikler = [
    { name: "oğlak", type: "burç" },
    { name: "kova", type: "burç"},
    { name: "balık", type: "burç"},
    { name: "koç", type: "burç"},
    { name: "boğa", type: "burç"},
    { name: "ikizler", type: "burç"},
    { name: "yengeç", type: "burç"},
    { name: "aslan", type: "burç"},
    { name: "başak", type: "burç"},
    { name: "terazi", type: "burç"},
    { name: "akrep", type: "burç"},
    { name: "yay", type: "burç"},


    { name: "lovers", type: "ilişki"},
    { name: "alone", type: "ilişki"},


    {name: "pembe", type: "renkler"},
    {name: "mavi", type: "renkler"},
    {name: "turuncu", type: "renkler"},
    {name: "kırmızı", type: "renkler"},
    {name: "mor", type: "renkler"},
    {name: "beyaz", type: "renkler"},
    {name: "sarı", type: "renkler"},
    {name: "yeşil", type: "renkler"},
    {name: "siyah", type: "renkler"},

    {name: "dc", type: "oyun"},
    {name: "vk", type: "oyun"},

    {name: "bestFriendRolü", type: "diğer"},
    
  // Tekil, Rol, Kanal, Roller, açmalı, Cogul
  ];
module.exports = {
    name: "rolkurulumu",
    command: ["sistem", "sistemkurulumu"],
    aliases: "options",
    description: "",
    category: "-",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.on('modalSubmit', async (modal) => {
      statConfig =  require('../../../../base/Additions/Staff/Sources/Global.Staff.Settings')
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
           if(modal.customId == "istekoneri") {
        let logKanalı = guild.kanalıBul("istek-öneri-log")
        if(!logKanalı) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `İstek-Öneri kanalı bulunmadığından dolayı, işleminize devam edemiyoruz. ` , ephemeral: true })
        }
        let text = modal.getTextInputValue('textIstekOneri'); 
        let embed = new richEmbed().altBaşlık(`${cartelim.user.username} • Yeni ${ayarlar.serverName} İstek/Öneri`, cartelim.user.avatarURL({dynamic: true}))
        let Etiket;
        if(roller && roller.Buttons && roller.Buttons.istekÖneriŞikayetSorumlusu) Etiket = `${cartelim.guild.roles.cache.get(roller.Buttons.istekÖneriŞikayetSorumlusu)}`
        logKanalı.send({content: Etiket ? Etiket : null, embeds: [embed.açıklama(`**Merhaba!** ${ayarlar.serverName} Yönetimi
${cartelim} kişisinin <t:${String(Date.now()).slice(0,10)}:F> tarihinde aşağıda istek veya önerisi belirtilmiştir.`)
        .sütun(`İçerik`, `${text}`)
        ]})
        await modal.deferReply({ ephemeral: true })
        await modal.followUp({content: `Başarıyla istek veya öneriniz yönetime iletilmiştir. Teşekkür Ederiz! ${guild.emojiyiBul(emojiler.onay_cartel)}` , ephemeral: true })
      }
      if(modal.customId == "botsorun") {
        let logKanalı = guild.kanalıBul("bot-sorun-log")
        if(!logKanalı) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Bot sorun kanalı bulunmadığından dolayı, işleminize devam edemiyoruz. ` , ephemeral: true })
        }
        let text = modal.getTextInputValue('textsorun'); 
        let embed = new richEmbed().altBaşlık(`${cartelim.user.username} • Yeni Bot Sorun Bildirimi`, cartelim.user.avatarURL({dynamic: true}))
        logKanalı.send({content: `<@719117042904727635>`, embeds: [embed.açıklama(`**Merhaba!** ${ayarlar.serverName} Yönetimi
${cartelim} kişisinin <t:${String(Date.now()).slice(0,10)}:F> tarihinde aşağıda bot sorunu bildirdi.`)
        .sütun(`İçerik`, `${text}`)
        ]})
        await modal.deferReply({ ephemeral: true })
        await modal.followUp({content: `Başarıyla bot sorunu münür'a iletilmiştir. Teşekkür Ederiz! ${guild.emojiyiBul(emojiler.onay_cartel)}` , ephemeral: true })
      }
      if(modal.customId == "soruncozmecagir") {
        let logKanalı = guild.kanalıBul("şikayet-log")
        if(!logKanalı) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Şikayet kanalı bulunmadığından dolayı, işleminize devam edemiyoruz. ` , ephemeral: true })
        }
        let yetkiliRol = cartelim.guild.roles.cache.get(roller.ilkYetki);
        let cartelimUstRol = cartelim.guild.roles.cache.get(cartelim.roles.highest.id)
       // if(yetkiliRol.rawPosition < cartelimUstRol.rawPosition) {
       //   await modal.deferReply({ ephemeral: true })
      //    return await modal.followUp({content: `Yetkili olduğunuzdan dolayı, işleminize devam edemiyoruz. ` , ephemeral: true })
      //  }
        let sorun = modal.getTextInputValue('sorun');  
        let hakkında = modal.getTextInputValue('hakkında');  
        let embed = new richEmbed().altBaşlık(`${cartelim.user.username} • Yeni ${ayarlar.serverName} Sorun Çözme Çağırma Formu`, cartelim.user.avatarURL({dynamic: true}))
        logKanalı.send({content: `${roller.sorunÇözmeciler.map(x => cartelim.guild.roles.cache.get(x)).join(", ")}`, embeds: [embed.açıklama(`${cartelim} isimli cezalı bir üye sorun çözme çağırmak istiyor. Aktif olan sorun çözmecilerimizin bu olaya bakmasını istiyorum.`)
      .sütun("Sorun Tipi",`> ${sorun}`)
      .sütun("Sorun",`> ${hakkında}`)
    ]})
    await modal.deferReply({ ephemeral: true })
    await modal.followUp({content: `Başarıyla sorun çözmeye hatalı bildiri iletilmiştir. Teşekkür Ederiz! ${guild.emojiyiBul(emojiler.onay_cartel)}` , ephemeral: true })
      }
      if(modal.customId == "ybasvuru") {
        let logKanalı = guild.kanalıBul("başvuru-log")
        if(!logKanalı) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Başvuru kanalı bulunmadığından dolayı, işleminize devam edemiyoruz. ` , ephemeral: true })
        }
        let yetkiliRol = cartelim.guild.roles.cache.get(roller.ilkYetki);
        let cartelimUstRol = cartelim.guild.roles.cache.get(cartelim.roles.highest.id)
        if(yetkiliRol.rawPosition < cartelimUstRol.rawPosition) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Yetkili olduğunuzdan dolayı, işleminize devam edemiyoruz. ` , ephemeral: true })
        }
        let isimyas = modal.getTextInputValue('isimyas');  
        let aktiflik = modal.getTextInputValue('aktiflik');  
        let yarar = modal.getTextInputValue('yarar');  
        let hakkında = modal.getTextInputValue('hakkında');
        let refernas = modal.getTextInputValue('referans');
        let embed = new richEmbed().altBaşlık(`${cartelim.user.username} • Yeni ${ayarlar.serverName} Yetkili Başvurusu`, cartelim.user.avatarURL({dynamic: true}))
        let Etiket;
        if(ayarlar && roller.Buttons && roller.Buttons.genelSorumlular && roller.Buttons.sorumlulukSorumlusu) {
          Etiket = [...roller.Buttons.genelSorumlular, ...roller.Buttons.sorumlulukSorumlusu]
        }
        logKanalı.send({content: `${Etiket ? Etiket.map(x => guild.roles.cache.get(x)).join(", ") : `@everyone`}`, embeds: [embed.açıklama(`**Merhaba!** ${Etiket ? Etiket.map(x => guild.roles.cache.get(x)).join(", ") : ayarlar.serverName}

${cartelim} (**\`${isimyas}\`**) kişisinin yaptığı <t:${String(Date.now()).slice(0,10)}:F> tarihindeki yetkili başvurusunun detayları aşağıda görüntülenmiştir.`)
.sütun(`Referans Bilgisi`, `${refernas ? `${guild.members.cache.find(x => x.user.username == refernas || x.user.username.includes(refernas) || x.id == refernas) ? guild.members.cache.find(x => x.user.username == refernas || x.user.username.includes(refernas) || x.id == refernas) : `${refernas}`}` : "Bir referans belirtilmemiş."}`)
.sütun(`Yetkilik Geçmiş Bilgisi`, `${aktiflik}`)
.sütun(`Yaptırım Bilgisi`, `${yarar}`)
.sütun(`Hakkında`, `${hakkında}`)
]})
        await modal.deferReply({ ephemeral: true })
        await modal.followUp({content: `Başarıyla yetkili başvuru kaydınız alınmıştır en kısa süreçte sizlere ulaşacağız, lütfen özel mesaj kutunuzu herkese açık yapın. ${guild.emojiyiBul(emojiler.onay_cartel)}` , ephemeral: true })
      }  
  });

    client.ws.on('INTERACTION_CREATE', async interaction => {
      let GameMap = new Map([
          ["cezaListesi",roller.teyitciRolleri],
          ["lastPunitives",roller.teyitciRolleri],
          ["cezaPuanim",roller.teyitciRolleri],
          ["II", "123"],
          ["III", "123"],
          ["IV", "123"],
          ["V", "123"],
          ["VI", "123"],
          ["VII", "123"],
          ["VIII", "123"],
          ["IX", "123"],
          ["bestFriend", roller.Buttons ? roller.Buttons.bestFriendRolü ? roller.Buttons.bestFriendRolü : "123" : "123"],
  
      ])
      let name = interaction.data.custom_id        
      let guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
      let member = guild.members.cache.get(interaction.member.user.id)
      if(!GameMap.has(name) || !member) return;
      let Cezalar = await Punitives.find({Member: member.id})
      let InviteData = await Invite.findOne({ guildID: member.guild.id, userID: member.user.id });
      let returnText;
          let xx = await guild.members.cache.get(interaction.member.user.id);

      const total = InviteData ? InviteData.total ? InviteData.total  : 0: 0;
  const regular = InviteData ? InviteData.regular ? InviteData2.regular  : 0: 0;
  const bonus = InviteData ? InviteData.bonus ? InviteData.bonus  : 0: 0;
  const leave = InviteData ? InviteData.leave ? InviteData.leave  : 0: 0;
  const fake = InviteData ? InviteData.fake ? InviteData.fake  : 0: 0;
  const invMember = await Invite.find({ Inviter: member.user.id });
  const bazıları = invMember ? invMember.filter(value => member.guild.members.cache.get(value.userID)).slice(0, 7).map((value, index) => `\` • \`${member.guild.members.cache.get(value.userID)} (\`${value.userID}\`)`).join("\n") : undefined
  const daily = invMember ? member.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && Date.now() - usr.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
  const weekly = invMember ? member.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && Date.now() - usr.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
  let toplamMesaj = 0
  let toplamSes = 0
  let statData = await Stats.findOne({ guildID: member.guild.id, userID: member.id})
      if(statData && statData.voiceStats) statData.voiceStats.forEach(c => toplamSes += c);
      if(statData && statData.chatStats)   statData.chatStats.forEach(c => toplamMesaj += c);
      let returnText2;
      if(name == "I") returnText = `**${member.guild.name}** Sunucusuna \`${tarihsel(member.joinedAt)}\` Tarihinde Katılmışsınız.`
      if(name == "II") returnText = `${member}, üstünüzde bulunan rol(ler) şunlardır:
${member.roles.cache.filter(x => x.name != "@everyone" && x.id != roller.boosterRolü).map(x => `\` ••❯ \` ${x} (\`${x.id}\`)`).join("\n")}
üzeriniz de **${member.roles.cache.size}** adet rol(ler) bulunmaktadır.`
       if(name == "III") returnText = `${member} hesabınız, **${tarihsel(member.user.createdAt)}** tarihinde ${global.tarihHesapla(member.user.createdAt)} açılmış.`
       if(name == "IV") returnText = `${member.toString()}, üyesinin \`${tarihsel(Date.now() - (1000*60*60*3))}\` tarihinden itibaren \`${member.guild.name}\` sunucusunda toplam davet bilgileri aşağıda belirtilmiştir.
\` • \` **Toplam**: \` ${total + bonus} üye \` (**Bonus**: \` ${bonus} üye \`)
\` • \` **Girenler**: \` ${regular} üye \` (**Sahte**: \` ${fake} üye \`, **Ayrılmış**: \` ${leave} üye \`)
\` • \` **Günlük**: \` ${daily} üye \`
\` • \` **Haftalık**: \` ${weekly} üye \`

${bazıları ? `\` ••❯ \` Davet ettiğin bazı kişiler: 
${bazıları}` : ''}`
if(name == "V") returnText = `**${member.guild.name}** sunucunda **${await member.cezaPuan()}** ceza puanın bulunmakta.`
if(name == "VI") returnText = `**${member.guild.name}** Sunucusunun Aktif & Ses Bilgisi
Sunucumuz da **${global.sayılıEmoji(member.guild.memberCount)}** üye bulunmakta.
Sunucumuz da **${global.sayılıEmoji(member.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size)}** aktif üye bulunmakta.`
   
if(name == "VII") {
let isimveri = await Users.findById(member.id)
  if(isimveri && isimveri.Names) {
    let isimler = isimveri.Names.length > 0 ? isimveri.Names.reverse().map((value, index) => `**İsim**: \` ${value.Name} \`  
**İşlem**: ${value.State} ${value.Staff ? "(**İşlem Yapan**: <@"+ value.Staff + ">)" : ""}
**Tarih**: \` ${tarihsel(value.Date)} \`
──────────────────────`).join("\n") : "";
      returnText = `
Aşağıda sunucu içerisinde ki isimleriniz (**${isimveri.Names.length || 0}**) sıralandırılmıştır:
──────────────────────
${isimler}`
  } else {
      returnText = `${member.guild.name} sunucusunda isim kaydınız bulunamadı.`
   }
} 
let saatDakikaCevir = (date) => { return moment.duration(date).format('H [saat,] m [dakika]'); }; 
if(name == "VIII")  returnText = `**${member.guild.name}** Sunucusunda Toplamda **${toplamMesaj} mesaj** istatistiğiniz bulunuyor.`
if(name == "IX") returnText = `**${member.guild.name}** Sunucusunda Toplamda **${saatDakikaCevir(toplamSes)}** boyunca zaman geçirmişsin.`
  
      if(name === "notlarim") {
        const üyeVerisi = await Users.findOne({ _id: xx.user.id });
        if (!üyeVerisi) {
          return interaction.reply({
            content: `${interaction.user}, sistemde kayıtlı veriniz bulunmamaktadır.`,
            ephemeral: true,
          });
        }
    
        if(üyeVerisi && !üyeVerisi.Notes) {
          return interaction.reply({
            content: `${interaction.user}, sistemde kayıtlı notunuz bulunmamaktadır.`,
            ephemeral: true,
          });
        }
    
        let Notlar = üyeVerisi.Notes.map((data, index) => `\`${index + 1}\` **${data.Note}** (${data.Author ? guild.members.cache.get(data.Author) : `<@${data.Author}>`}) (\`${data.Date ? tarihsel(data.Date) : tarihsel(Date.now())}\`)`).join("\n");
    
        await interaction.reply({content: `${interaction.user}, aşağıda şimdiye kadar eklenmiş **${üyeVerisi.Notes.length}** adet not bulunmaktadır, \n\n${Notlar}`, ephemeral: true})
      }
    
            
  });
    client.on('interactionCreate', async (i) => {
        let member = await i.guild.members.cache.get(i.user.id)
   
      if(i.customId == "cdestekcik") {
        let canlıDestekBul = i.guild.kanalıBul("canlı-destek")
        if(!canlıDestekBul) return i.reply({ephemeral: true, content: `Canlı destek sistemi kurulu olmadığından dolayı işleminize devam edilemiyor. `})
        const canlıDestekKategorisi = canlıDestekBul.parentId
        let canlıDestekRolü = []
        i.guild.roles.cache.array().filter(x => x.name.includes("Canlı Destek")).map(x => canlıDestekRolü.push(x.id))

        const evet = new MessageButton()
        .setCustomId("evt")
        .setLabel("Evet")
        .setStyle("SUCCESS")
  
        const hayır = new MessageButton()
        .setCustomId("hyr")
        .setLabel("Hayır")
        .setStyle("DANGER")
  
        const onay = new MessageButton()
        .setCustomId("onayla")
        .setLabel("Canlı Desteği Onayla")
        .setStyle("SUCCESS")
  
        const red = new MessageButton()
        .setCustomId("reddet")
        .setLabel("Reddet")
        .setStyle("DANGER")

        const dk = new MessageButton()
        .setCustomId("kapatCanliDestek")
        .setLabel("Desteği Sonlandır")
        .setStyle("SECONDARY")
        .setEmoji("🎫")

        const row2 = new MessageActionRow()
        .addComponents([evet, hayır])

        const row3 = new MessageActionRow()
        .addComponents([onay, red])

        const row31 = new MessageActionRow()
        .addComponents([dk])

        await i.reply({ embeds:[new richEmbed().açıklama(`Canlı desteğe bağlanmak istediğinize emin misiniz?`)], components: [row2], ephemeral: true});
        var filter = (c) => c.user.id && i.user.id 
        let collector = i.channel.createMessageComponentCollector({filter: filter, max: 1, time: 30000})
        collector.on('collect', async (collect) => {
          if(collect.customId == "evt") {
            await i.editReply({embeds: [new richEmbed().açıklama(`Canlı destek ekibimize bildirdik, sizi canlı destek ekibine aktarıyorum. Lütfen bekleyin!`)], components: [], ephemeral: true});
            let logKanalı = i.guild.kanalıBul("canlı-destek")
            if(logKanalı) logKanalı.send({content: `${canlıDestekRolü.map(x => i.guild.roles.cache.get(x)).join(", ")}`, embeds: [new richEmbed().açıklama(`${member} kişisi canlı desteğe bağlanmak istiyor. Kabul ediyor musunuz?`)], components: [row3]}).then(async (msg) => {
              var filter = (i) => {
                let cartelimcik = i.guild.members.cache.get(i.user.id)
                return canlıDestekRolü.some(x => cartelimcik.roles.cache.has(x))
              }
              let collector2 = msg.createMessageComponentCollector({ componentType: 'BUTTON', max: 1 });
              collector2.on("collect", async (interaction) => { 
                if(interaction.customId == "onayla") {
                  msg.edit({
                    content: null,
                    embeds : [new richEmbed().açıklama(`${member} kişisinin canlı desteği <t:${String(Date.now()).slice(0,10)}:F> tarihinde ${interaction.user} tarafından onaylandı. ${member.guild.emojiyiBul(emojiler.onay_cartel)}`)],
                    components : []
                  })
                  
                  member.guild.channels.create(`${member.user.username}-destek`, {
                    parent: canlıDestekKategorisi,
                    topic: member.id,
                    permissionOverwrites: [{
                        id: member,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                      },
            
                      {
                        id: interaction.user,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                      },
                      {
                        id: member.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                      },
                    ],
                    type: 'text',
                  }).then(async c => { 
                    c.send({
                      embeds: [new richEmbed().açıklama(`Canlı destek kanalı başarıyla oluşturuldu.
**NOT:** Canlı destek almaktan vaz geçerseniz veya destek bitti ise aşağıda ki düğmeyi kullanabilirsiniz.`).altBaşlık(`bu canlı destek 5 dakika sonra kapatılacaktır.`)],
                      components : [row31]
                    }).then(async (cmsg) => {
                      let collectorcuk = cmsg.createMessageComponentCollector({time: 60000*5})
                      collectorcuk.on('collect', async (inte) => {
                        if(inte.customId == "kapatCanliDestek") {
                          inte.deferUpdate().catch(err => {})
                          cmsg.edit({embeds: [new richEmbed().açıklama(`${cmsg.guild.emojiyiBul(emojiler.onay_cartel)} ${inte.user} tarafından canlı destek kapatıldı. 10 Saniye içerisinde Kanal Bulunamadı. olacaktır.`)],components: []})
                        }
                      }
                      )
                      collectorcuk.on('end', async (kapat) => {
                    
                      })
                    })
                    interaction.reply({content: `[ONAYLANDI] Canlı destek kanalı oluşturuldu.`, ephemeral: true})
                    member.send({
                     content: `Canlı destek isteğiniz başarıyla onaylandı!\nSunucumuzda bulunan <#${c.id}> kanalını ziyaret ediniz.`
                    }).catch(err => {});
                    
                  })

                }
                if(interaction.customId == "reddet") {
                  member.send(`Canlı destek isteğiniz, ${interaction.user} tarafından reddedildi. `).catch(err => {})
                  msg.edit({content: null, embeds: [new richEmbed().açıklama(` ${member} kişisinin canlı destek isteği <t:${String(Date.now()).slice(0, 10)}:R> ${interaction.user} tarafından reddedildi.`)], components: []}).catch(err => {})
                  await interaction.reply({ephemeral: true, content: `${member.guild.emojiyiBul(emojiler.onay_cartel)} Başarıyla ${member} kişisinin, canlı desteğini iptal ettin.`}) 
                  setTimeout(() => {
                    msg.delete().catch(err => {})
                  }, 10000);        
                }
              })
            })

          }
          if(collect.customId == "hyr") {
            await i.editReply({content: `${member.guild.emojiyiBul("support")} Canlı destek bağlantısını iptal ettiniz. İyi günler!`, components: [], ephemeral: true})
          }
        })
      }
      if(i.customId == "boost") {
        let modal = new Modal()
        .setCustomId('isimDüzenleme')
        .setTitle('İsim Güncelleme')
        .addComponents(
          new TextInputComponent()
            .setCustomId('isim')
            .setLabel('Yeni İsim')
            .setStyle('SHORT') 
            .setPlaceholder('Yeni isminizi belirtin.')
            .setRequired(true), 
      
          
        );
        if(!member.roles.cache.has(roller.boosterRolü) && !member.permissions.has("ADMINISTRATOR") && !member.permissions.has("MANAGE_ROLES") ) {
         
          return  await i.reply({content: `Sunucumuza **boost** basmanız gerekmektedir.`, ephemeral: true})
      }
        return showModal(modal, {
          client: client, 
          interaction: i,
        });
      }

            if(i.customId == "basvurucuk") {
          const modal = new Modal()
          .setCustomId('ybasvuru')
          .setTitle('Yetkili Başvuru Formu')
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
            .setLabel('Kullanıcı İsmi')
            .setStyle('SHORT')
            .setMinLength(5)
            .setMaxLength(100)
            .setRequired(false),
            new TextInputComponent()
            .setCustomId('aktiflik')
            .setLabel('Daha önce yetkilik yaptınız mı?')
            .setStyle('SHORT')
            .setMinLength(1)
            .setMaxLength(250)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('yarar')
            .setLabel('Ne yapabilirsin bize açıklar mısınız?')
            .setStyle('LONG')
            .setMinLength(5)
            .setMaxLength(250)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('hakkında')
            .setLabel('Hakkında bir kaç şey söylemek ister misin?')
            .setStyle("LONG")
            .setMinLength(5)
            .setMaxLength(400)
            .setRequired(true)
          );
          showModal(modal, {
            client: client,
            interaction: i 
          })
        }
        if(i.customId == "botsorun") {
          const modal = new Modal()
          .setCustomId('botsorun')
          .setTitle('Sorunları İlet')
          .addComponents(
            new TextInputComponent()
            .setCustomId('textsorun')
            .setLabel('Sorunu anlatır mısınız?')
            .setStyle("LONG")
            .setMinLength(5)
            .setMaxLength(500)
            .setRequired(true)
          );
          showModal(modal, {
            client: client,
            interaction: i
          })
        }
      if(i.customId == "istekönericik") {
        const istekOneri = new Modal() 
        .setCustomId('istekoneri')
        .setTitle('İstek & Öneri Formu')
        .addComponents(
          new TextInputComponent() 
          .setCustomId('textIstekOneri')
          .setLabel('İstek veya öneriniz nedir?')
          .setStyle('LONG')
          .setMinLength(10)
          .setMaxLength(980)
          .setPlaceholder('İsteğinizi ve önerinizi bizlere iletin..')
          .setRequired(true)
        );
        showModal(istekOneri, {
          client: client,
          interaction: i 
        })
      }
    })
            client.on("interactionCreate", async (interaction) => {
                let menu = interaction.customId
                const member = await client.guilds.cache.get(sistem.SUNUCU.GUILD).members.fetch(interaction.member.user.id)
                if (!member) return;
                let Database = await GUILD_SETTINGS.findOne({guildID: sistem.SUNUCU.GUILD})
                const data = Database.Ayarlar.Buttons




                if (menu === "renks") {
                  let color = new Map([
                    ["kirmizi", data.kırmızı],
                    ["turuncu", data.turuncu],
                    ["mavi", data.mavi],
                    ["mor", data.mor],
                    ["pembe", data.pembe],
                    ["beyaz", data.beyaz],
                    ["yeşil", data.yeşil],
                    ["sarı", data.sarı],
                    ["siyah", data.siyah],
                  ])
                  let role = color.get(interaction.values[0])
                  let renkroller = [data.kırmızı, data.turuncu, data.mavi, data.mor, data.pembe, data.yeşil, data.sarı, data.siyah, data.beyaz]
                  if (!member.roles.cache.has(roller.tagRolü) && !member.roles.cache.has(roller.boosterRolü) && !member.permissions.has("ADMINISTRATOR")) {
                    interaction.reply({ content: `Sadece sunucumuza boost basmış ${ayarlar.type ? `veya taglı` : ``} üyeler renk rolü seçebilir. `, ephemeral: true })
                  } else {
                    if (interaction.values[0] === "rolsil") {
                      await member.roles.remove(renkroller)
                    } else if (role) {
                      if (renkroller.some(m => member.roles.cache.has(m))) {
                        await member.roles.remove(renkroller)
                      }
                      await member.roles.add(role)
                    }
                    interaction.reply({ content: `Rolleriniz güncellendi.`, ephemeral: true })
                  }
                } else if (menu === "valantines") {
                    let relationship = new Map([
                      ["couple", data.lovers],
                      ["single", data.alone]
                    ])
                    let role = relationship.get(interaction.values[0])
                    let roles = [data.lovers, data.alone]
                    if (interaction.values[0] === "rolsil") {
                      await member.roles.remove(roles)
                    } else if (role) {
                      if (roles.some(m => member.roles.cache.has(m))) {
                        await member.roles.remove(roles)
                      }
                      await member.roles.add(role)
                    }
                    interaction.reply({ content: "Rolleriniz güncellendi.", ephemeral: true })
                  } else if (menu === "games") {
                    let GameMap = new Map([
                      ["lol", data.lol],
                      ["csgo", data.csgo],
                      ["minecraft", data.minecraft],
                      ["valorant", data.valorant],
                      ["fortnite", data.fortnite],
                      ["gta5", data.gta5],
                      ["pubg", data.pubg],
                      ["wildrift", data.wildrift],
                      ["fivem", data.fivem],
                      ["mlbb", data.mobilelegends],
                    ])

                    let roles = [data.lol,data.csgo,data.minecraft, data.valorant, data.fortnite,data.gta5, data.pubg,data.wildrift, data.fivem, data.mobilelegends]
                    var role = []
                    for (let index = 0; index < interaction.values.length; index++) {
                      let ids = interaction.values[index]
                      let den = GameMap.get(ids)
                      role.push(den)
                    }
                    if (!interaction.values.length) {
                      await member.roles.remove(roles)
                    } else {
                      await member.roles.remove(roles)
                      await member.roles.add(role)
                    }
                    interaction.reply({ content: "Rolleriniz güncellendi.", ephemeral: true })
                  } else if (menu === "horoscope") {
                    let HorosCope = new Map([
                      ["koç", data.koç],
                      ["boğa", data.boğa],
                      ["ikizler", data.ikizler],
                      ["yengeç", data.yengeç],
                      ["aslan", data.aslan],
                      ["başak", data.başak],
                      ["terazi", data.terazi],
                      ["akrep", data.akrep],
                      ["yay", data.yay],
                      ["oğlak", data.oğlak],
                      ["kova", data.kova],
                      ["balık", data.balık],
                    ])
                    let roles = [data.koç, data.boğa, data.ikizler, data.yengeç, data.aslan, data.başak, data.terazi, data.akrep, data.yay, data.oğlak, data.kova, data.balık,
                    ]
                    let role = HorosCope.get(interaction.values[0])
                    if (interaction.values[0] === "rolsil") {
                      await member.roles.remove(roles)
                    } else if (role) {
                      if (roles.some(m => member.roles.cache.has(m))) {
                        await member.roles.remove(roles)
                      }
                      await member.roles.add(role)
                    }
                    interaction.reply({ content: "Rolleriniz güncellendi.", ephemeral: true })
              
                  } else if (menu === "etkinliks") {
                    let eventsMap = new Map([
                      ["etkinlik", roller.etkinlikKatılımcısı],
                      ["cekilis", roller.cekilisKatılımcısı],
                    ])
                    let roles = [roller.etkinlikKatılımcısı, roller.cekilisKatılımcısı]
                    var role = []
                    for (let index = 0; index < interaction.values.length; index++) {
                      let ids = interaction.values[index]
                      let den = eventsMap.get(ids)
                      role.push(den)
                    }
                    if (!interaction.values.length) {
                      await member.roles.remove(roles)
                    } else {
                      await member.roles.remove(roles)
                      await member.roles.add(role)
                    }
                    
                    interaction.reply({ content: "Rolleriniz güncellendi.", ephemeral: true })
                  }
            })

                //CEZA PANELİ İNTERACTİONU FİX()
            client.on('interactionCreate', async (interaction) => {
              if (!interaction.isButton()) return;
              if(
                interaction.customId === "cezasayim") {
     

                  const cezasayisi = await Punitives.countDocuments({ Member: interaction.user.id})

                  return interaction.reply({
                    content: `Sistemde ${cezasayisi || 0} adet toplam cezanız bulunmaktadır.`
                    , ephemeral: true})
                }
            

              if(
             interaction.customId === "cezalarim"
              ) {
              
                const toplam = await Punitives.countDocuments({ Member: interaction.user.id}) 
                const voicemute = await Punitives.countDocuments({ Member: interaction.user.id, Type: "Ses Susturulma"})
                const chatmute = await Punitives.countDocuments({ Member: interaction.user.id, Type: "Metin Susturulma"})
                const cezali = await Punitives.countDocuments({ Member: interaction.user.id, Type: "Cezalandırılma"})
                const uyarilma = await Punitives.countDocuments({ Member: interaction.user.id, Type: "Uyarılma"})

              let res = await Punitives.find(({ Member: interaction.user.id}))
             
             
                let data = []
                res.map(x => data.push(x))
                res = [...data]
                let yaprammm = res.sort((a, b) => b.Date - a.Date).chunk(1);
                return interaction.reply({
                  content: `Sistemde üzerinize kayıtlı olan ${toplam || 0} ceza verisi bulunmaktadır.

${voicemute || 0} Voice Mute ${chatmute || 0} Chat Mute ${cezali || 0} Cezalı ${uyarilma || 0} Uyarı`,
                  ephemeral: true,
                });
              }
            if(interaction.customId === "notlarim") {
              const üyeVerisi = await Users.findOne({ _id: interaction.user.id });
              if (!üyeVerisi) {
                return interaction.reply({
                  content: `${interaction.user}, sistemde kayıtlı veriniz bulunmamaktadır.`,
                  ephemeral: true,
                });
              }
          
              if(üyeVerisi && !üyeVerisi.Notes) {
                return interaction.reply({
                  content: `${interaction.user}, sistemde kayıtlı notunuz bulunmamaktadır.`,
                  ephemeral: true,
                });
              }
          
              let Notlar = üyeVerisi.Notes.map((data, index) => `\`${index + 1}\` **${data.Note}** (${data.Author ? interaction.guild.members.cache.get(data.Author) : `<@${data.Author}>`}) (\`${data.Date ? tarihsel(data.Date) : tarihsel(Date.now())}\`)`).join("\n");
          
              await interaction.reply({content: `${interaction.user}, aşağıda şimdiye kadar eklenmiş **${üyeVerisi.Notes.length}** adet not bulunmaktadır, \n\n${Notlar}`, ephemeral: true})
            
            }
              if (interaction.customId === 'kısayol1') {
                const userId = interaction.user.id;
                const userRoles = await MonthlyMember.findOne({ _id: userId });
            
                if (!userRoles || userRoles.Role === false) {
                  const replyMessage = 'Aylık üye rolleri artık üzerinize gelecek şekilde ayarlandı.';
                  await interaction.reply({ content: replyMessage, ephemeral: true });
            
                  if (!userRoles) {
                    const newRole = new MonthlyMember({
                      _id: userId,
                      Role: true
                    });
                    await newRole.save();
                  } else {
                    userRoles.Role = true;
                    await userRoles.save();
                  }
                } else {
                  const replyMessage = 'Zaten aylık üye rollerini alıyorsunuz.';
                  await interaction.reply({ content: replyMessage, ephemeral: true });
                }
              } else if (interaction.customId === 'kısayol2') {
                const userId = interaction.user.id;
                const userRoles = await MonthlyMember.findOne({ _id: userId });
            
                if (userRoles && userRoles.Role === true) {
                  const replyMessage = 'Aylık üye rolleri artık üzerinize gelmeyecek şekilde ayarlandı.';
                  await interaction.reply({ content: replyMessage, ephemeral: true });
            
                  userRoles.Role = false;
                  await userRoles.save();
                } else {
                  const replyMessage = 'Aylık üye rollerini zaten almıyorsunuz.';
                  await interaction.reply({ content: replyMessage, ephemeral: true });
                }
              }
            });
           
          
  },
    
      
   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    
        const embed = new richEmbed()
        let Database = await GUILD_SETTINGS.findOne({guildID: message.guild.id})
        const data = Database.Ayarlar.Buttons
        let secim = args[0];
              let Rowck = new MessageActionRow().addComponents(
          new MessageSelectMenu()
          .setCustomId("qwewqwqwq")
          .setPlaceholder(`🎄 Sistem Kurulumları`)
          .setOptions(
              
              {label: "Rol Alma", emoji:"1081914863141539910", description: "Sunucuda Etkinlik Çekiliş Rollerini Almaya Yarayan Paneli Kurar.", value: "etkinlikçekilişkur"},
              {label: "Rol Kurulumu", emoji:"1167528955801247885", description: "Sunucudaki Gerekli Olan Rolleri/Sistemleri Kurar.", value: "otomatikkur"},
              {label: "Kullanıcı Paneli", emoji:"1081916599155576832", description: "Sunucudaki Üyelerin Yardım Alması İçin Gerekli Sistemi Kurar.", value: "kpaneli"},
              {label: "Ceza Paneli", emoji:"1081917543708622878", description: "Sunucudaki Üyelerin Cezalarını/Ceza Puanlarını Öğrenmeye Yarayan Sistemi Kurar.", value: "cezapanelikur"},
              {label: "Kısayollar", emoji: "1081915419713081434", description: "Kısayollar", value: "kısayollar"}
          )
        )

        const sywss = new MessageActionRow().addComponents(
          new MessageSelectMenu()
          .setCustomId("qwewqwq")
          .setPlaceholder("🎄 Rol Kurulumu")
          .setOptions(
          {label: "Etkinlik & İlişki Rolleri", emoji:"", description: "Sunucudaki Üyelerin Etkinlik/Çekiliş'lerden Faydalanması İçin Gerekli Rolleri Kurar", value:"otomatikilişki"},
          {label: "Renk Rolleri", emoji:"", description: "Sunucudaki Üyelerin Renk Rollerini Alması İçin Gerekli Renk Rollerini Kurar.", value: "otomatikrenk"},
          {label: "Oyun Rolleri", emoji:"", description: "Sunucudaki Üyelerin Oyun Rollerini Alması İçin Gerekli Oyun Rollerini Kurar", value: "otomatikoyun"},
          {label: "Burç Rolleri", emoji:"", description: "Sunucudaki Üyelerin Burç Rollerini Alması İçin Gerekli Burç Rollerini Kurar", value: "otomatikburç"},
          {label: "Aylık Üye Rolleri", emoji:"", description: "Sunucudaki Üyelerin Serverde Geçirdiği Zamana Göre Rollerini Verir", value: "otomatikaylikcartelim"},
          {label: "Ses Rozet Rolleri",  emoji:"", description:  "Kullanıcıların Seste Durduğu Kadar Üzerilerine Rol Eklenir.", value: "otomatiksesrozet"},

        )

        
        )   
            
        if (!secim || !özellikler.some(ozellik => ozellik.name.toLowerCase() == secim.toLowerCase())) {
            let emboo = embed.açıklama(`Merhaba **${message.member.user.username}** (${message.member}) ${ayarlar.serverName ? ayarlar.serverName : message.guild.name } sunucusuna ait rol menü, düğme ve liste menü sistemi ayarları bu komut ile yapılmaktadır. Bu komut ile isteğe bağlı anlık güncelleme işlemini yapabilirsiniz.
`)
            return message.channel.send({components: [Rowck],embeds: [emboo]}).then(async (x) => {
                const filter = i =>  i.user.id === message.member.id;

                const collector = await x.createMessageComponentCollector({ filter: filter, time: 30000 });
           
                collector.on('collect', async i => {

                                   if(i.values[0] == "otomatiksesrozet") {
                    if(ayarlar.statRozet && ayarlar.statRozetOne && message.guild.roles.cache.get(roller.statRozetOne)) return await i.reply({content: ` Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                    await i.reply({content: `Başarıyla otomatik ses rozet rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                    x.delete().catch(err => {})
                    let aylıkSistem = [
                      {isim: "Bronz 🥉", renk: "#ca9501",  sheet: "statRozetOne"},
                      {isim: "Gümüş 🥈", renk: "#7c818d",  sheet: "statRozetTwo"},
                      {isim: "Altın 🥇", renk: "#efff5d",  sheet: "statRozetThree"},
                      {isim: "Elmas ✨", renk: "#30b7c5", sheet: "statRozetFour"},
                      {isim: "Şampiyon 🏆", renk: "#fff02d",  sheet: "statRozetFive"},
                    ]
                    aylıkSistem.forEach(async (data) => {
                        let rol = message.guild.roles.cache.find(x => x.name == data.isim)
                        if(rol) {
                          await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                        } else {
                          const burçRolü = await message.guild.roles.create({
                            name: data.isim,
                            color: data.renk,
                            reason: "Otomatik Ses Rozet Sistemi!"
                          }).then(async (rol) => {
                            await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                          })
                        }
                    })

                    await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.statRozet`]: true}}, {upsert: true}).catch(e => console.log(e))
                  }
                  if(i.values[0] == "otomatikaylikcartelim") {
                    if(ayarlar.aylikcartelim && ayarlar.birAy && message.guild.roles.cache.get(ayarlar.birAy)) return await i.reply({content: ` Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                    await i.reply({content: `Başarıyla otomatik aylık üye rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                    await x.delete().catch(err => {})
                    let aylıkSistem = [
                      {isim: "1 Aylık Üye", renk: "#96963d", icon: "https://cdn.discordapp.com/attachments/990322473750917120/996913946747470004/image-removebg-preview_1.png", sheet: "birAy"},
                      {isim: "3 Aylık Üye", renk: "#aaaa54", icon: "https://cdn.discordapp.com/attachments/990322473750917120/996914106298810429/image-removebg-preview_2.png", sheet: "ucAy"},
                      {isim: "6 Aylık Üye", renk: "#d1d16d", icon: "https://cdn.discordapp.com/attachments/990322473750917120/996914232090169534/image-removebg-preview_3.png", sheet: "altiAy"},
                      {isim: "9 Aylık Üye", renk: "#f8f825", icon: "https://cdn.discordapp.com/attachments/990322473750917120/996914374918803486/image-removebg-preview_4.png", sheet: "dokuzAy"},
                      {isim: "+1 Yıllık Üye", renk: "#1ad8d3", icon: "https://cdn.discordapp.com/attachments/990322473750917120/996914881225830410/image-removebg-preview_5.png", sheet: "birYil"},
                    ]
                    
                    aylıkSistem.forEach(async (data) => {
                      let rol = message.guild.roles.cache.find(x => x.name == data.isim)
                      if(rol) {
                        await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                      } else { 
                            const burçRolü = await message.guild.roles.create({
                              name: data.isim,
                              color: data.renk,
                            //  icon: data.icon,
                              reason: "Otomatik Aylık Üyelik Sistemi!"
                            }).then(async (rol) => {
                      await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                      })
                      }
                    })
                    await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.aylikcartelim`]: true}}, {upsert: true}).catch(e => console.log(e))
                  }
                  if(i.values[0] == "otomatikburç") {
                    if(ayarlar.Buttons && ayarlar.Buttons.aslan && message.guild.roles.cache.get(ayarlar.Buttons.aslan)) return await i.reply({content: ` Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                    await i.reply({content: `Başarıyla otomatik burç rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                    await x.delete().catch(err => {})
                    let burçSistemi = [
                      {isim: "Koç", renk: "#09040d", sheet: "koç"},
                      {isim: "Boğa", renk: "#09040d", sheet: "boğa"},
                      {isim: "İkizler", renk: "#09040d", sheet: "ikizler"},
                      {isim: "Yengeç", renk: "#09040d", sheet: "yengeç"},
                      {isim: "Aslan", renk: "#09040d", sheet: "aslan"},
                      {isim: "Başak", renk: "#09040d", sheet: "başak"},
                      {isim: "Terazi", renk: "#09040d", sheet: "terazi"},
                      {isim: "Akrep", renk: "#09040d", sheet: "akrep"},
                      {isim: "Yay", renk: "#09040d", sheet: "yay"},
                      {isim: "Oğlak", renk: "#09040d", sheet: "oğlak"},
                      {isim: "Kova", renk: "#09040d", sheet: "kova"},
                      {isim: "Balık", renk: "#09040d", sheet: "balık"},
                    ]


                    burçSistemi.forEach(async (data) => {
                      let rol = message.guild.roles.cache.find(x => x.name == data.isim)
                      if(rol) {
                        await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                      } else { 

                     const burçRolü = await message.guild.roles.create({
                            name: data.isim,
                            color: data.renk,
                            reason: "Otomatik Burç Kurulum Sistemi!"
                          }).then(async (rol) => {
                    await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                    })
                  }
                    })
                  }
                  if(i.values[0] == "otomatikilişki") {
                    if(ayarlar.Buttons && ayarlar.Buttons.lovers && message.guild.roles.cache.get(ayarlar.Buttons.lovers)) return await i.reply({content: ` Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                    await i.reply({content: `Başarıyla otomatik ilişki & etkinlik rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                    await x.delete().catch(err => {})
                    let iliskiSistemi = [
                 
                      {isim: "İlişkim Yok", renk: "#ffffff", sheet: "alone"},
                      {isim: "İlişkim Var", renk: "#ffffff", sheet: "lovers"},
                   
                      {isim: "Etkinlik Katılımcısı", renk: "#ffffff", sheet: "etkinlik", sheetcik: "etkinlikKatılımcısı"},
                      {isim: "Çekiliş Katılımcısı", renk: "#ffffff", sheet: "cekilis", sheetcik: "cekilisKatılımcısı"}
                    ]
                    iliskiSistemi.forEach(async (data) => {
                      let rol = message.guild.roles.cache.find(x => x.name == data.isim)
                      if(rol) {
                        await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                        if(data.sheetcik)  await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheetcik}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                      } else { 

                     const iliskiRolü = await message.guild.roles.create({
                            name: data.isim,
                            color: data.renk,
                            reason: "Otomatik İlişki & Etkinlik Kurulum Sistemi!"
                          }).then(async (rol) => {
                    await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                    if(data.sheetcik)  await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.${data.sheetcik}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                  })
                }
                    })
                  }





                  if(i.values[0] == "otomatikoyun") {
                    if(ayarlar.Buttons && ayarlar.Buttons.csgo && message.guild.roles.cache.get(ayarlar.Buttons.csgo)) return await i.reply({content: ` Otomatik kurulum sistemini aktif etmek için, aktif bir rol bulunmaması gerekir.`, ephemeral: true});
                    await i.reply({content: `Başarıyla otomatik oyun rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                    await x.delete().catch(err => {})
                    let oyunSistemi = [
                      {isim: "League Of Legends", renk: "#ffffff", sheet: "lol"},
                      {isim: "Counter-Strike: Global Offensive", renk: "#ffffff", sheet: "csgo"},
                      {isim: "Minecraft", renk: "#ffffff", sheet: "minecraft"},
                      {isim: "Call of Duty", renk: "#ffffff", sheet: "callOfDuty"},
                      {isim: "Valorant", renk: "#ffffff", sheet: "valorant"},
                      {isim: "Fortnite", renk: "#ffffff", sheet: "fortnite"},
                      {isim: "Grand Theft Auto V", renk: "#ffffff", sheet: "gta5"},
                      {isim: "PUBG", renk: "#ffffff", sheet: "pubg"},
                      {isim: "Pubg Mobile", renk: "#ffffff", sheet: "pubgMobile"},
                      {isim: "Wild Rift", renk: "#ffffff", sheet: "wildrift"},
                      {isim: "Mobile Legends", renk: "#ffffff", sheet: "mobilelegends"},
                      {isim: "FiveM", renk: "#ffffff", sheet: "fivem"},
                    ]
                    oyunSistemi.forEach(async (data) => {
                      let rol = message.guild.roles.cache.find(x => x.name == data.isim)
                      if(rol) {
                        await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                      } else { 
                     const oyunRolü = await message.guild.roles.create({
                            name: data.isim,
                            color: data.renk,
                            reason: "Otomatik Oyun Kurulum Sistemi!"
                          }).then(async (rol) => {
                    await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                    })
                  }
                    })
                  }
                  if(i.values[0] == "otomatikrenk") {
                    if(ayarlar.Buttons && ayarlar.Buttons.kırmızı && message.guild.roles.cache.get(ayarlar.Buttons.kırmızı)) return await i.reply({content: `Bu İşlem Daha Önce Gerçekleştirildiği İçin İşlem İptal Edildi.`, ephemeral: true});
                    await i.reply({content: `Başarıyla otomatik renk rolleri oluşturularak veritabanına kayıt edildi.`, ephemeral: true})
                    await x.delete().catch(err => {})
                    let renkSistemi = [
                        {isim: "Kırmızı", renk: "#e43200", sheet: "kırmızı"},
                        {isim: "Turuncu", renk: "#e4b400", sheet: "turuncu"},
                        {isim: "Mavi", renk: "#0055e4", sheet: "mavi"},
                        {isim: "Mor", renk: "#7c00f8", sheet: "mor"},
                        {isim: "Pembe", renk: "#f866c1", sheet: "pembe"},
                        {isim: "Beyaz", renk: "#e9e4e7", sheet: "beyaz"},
                        {isim: "Yeşil", renk: "#0fc708", sheet: "yeşil"},
                        {isim: "Sarı", renk: "#d8e244", sheet: "sarı"},
                        {isim: "Siyah", renk: "#181817", sheet: "siyah"}
                      ]
                      renkSistemi.forEach(async (data) => {
                        let rol = message.guild.roles.cache.find(x => x.name == data.isim)
                        if(rol) {
                          await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                        } else { 
                       const renkRolü = await message.guild.roles.create({
                              name: data.isim,
                              color: data.renk,
                              reason: "Otomatik Renk Kurulum Sistemi!"
                            }).then(async (rol) => {
                      await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${data.sheet}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
                      })
                    }
                      })
                  }
                
                  if(i.values[0]  == "kpaneli") {
                    await x.delete().catch(err => {}),await i.deferUpdate().catch(err => {}).catch(err => {}); 
                    const boostrow = new MessageActionRow().addComponents(
              new MessageButton()
              .setCustomId("boost")
              .setLabel("Booster")
              .setStyle("SECONDARY")
              .setEmoji("1193275659854815264")
                    )
                    const rowc = new MessageActionRow().addComponents(
                      new MessageButton()
                      .setCustomId("basvurucuk")
                      .setLabel("Yetkili Başvur")
                      .setStyle("SECONDARY"),
                      new MessageButton()
                      .setCustomId("istekönericik")
                      .setLabel("İstek Öneri")
                      .setStyle("SECONDARY"),
                      new MessageButton()
                      .setCustomId("cdestekcik")
                      .setLabel("Canlı Destek")
                      .setStyle("SECONDARY"),
                      new MessageButton()
                      .setCustomId("botsorun")
                      .setLabel("Bot Sorun")
                      .setStyle("SECONDARY")
                    )
             await message.channel.send({ components: [rowc], content: `**Aşağıdan yapmak istediğiniz işlemleri seçebilirsiniz.**`})
             await message.channel.send({ components: [boostrow], content: `**Aşağıdan sunucuya boost basan kişiler kendine özel isim koyabilirler.**`})
                  }
                  if(i.values[0]  == "yöneticiPaneli") {
                    let konser = client.channels.cache.find(x => x.type == "GUILD_CATEGORY" && x.name.includes("Konser") || x.name.includes("KONSER"))
                    let etkınlik = client.channels.cache.find(x => x.type == "GUILD_CATEGORY" && x.name.includes("Etkinlik") || x.name.includes("ETKİNLİK") || x.name.includes("Etkinlık") || x.name.includes("ETKINLIK"))
                    let vkKategori = etkınlik ? etkınlik.id : undefined
                    let dcKategori = konser ? konser.id : undefined
                   
                    let Row = new MessageActionRow().addComponents(
                      new MessageSelectMenu()
                      .setCustomId("münüryöneticipaneli")
                      .setPlaceholder("Yönetici işlemleri şunlardır...")
                      .setOptions(
                        {label: "Sunucu Güncelle", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde herhangi bir değişiklik yapabilirsiniz.", value: "sunucuduzenle"},
                        {label: "Rolsüz Ver", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde rolü bulunmayanlara kayıtsız vermeyi sağlar.", value: "rolsüzver"},
                        {label: "Özel Karakter Temizle", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde isminde ünlem, sembol vs. bulunanları temizler.",value: "özelkarakter"},
                        {label: "Public Senkronizasyon", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde değişiklikleri, tekrardan senkronize eder." ,value: "syncpublic"},
                        {label: "Streamer Senkronizasyon", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde değişiklikleri, tekrardan senkronize eder." ,value: "syncstreamer"},
                        {label: "Teyit Senkronizasyon", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde değişiklikleri, tekrardan senkronize eder." ,value: "syncregister"},
                        {label: "Sorun Çözme Senkronizasyon", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde değişiklikleri, tekrardan senkronize eder." ,value: "syncsç"},
                        {label: "Diğer Senkronizasyon", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde değişiklikleri, tekrardan senkronize eder." ,value: "syncother"},
                        {label: "Genel Senkronizasyon", emoji: {id: "1042946131077902417"}, description: "Sunucu üzerinde değişiklikleri, tekrardan senkronize eder." ,value: "syncguild"},
                    )
                    )
                    let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
                    let RowTwo = new MessageActionRow().addComponents(
                      new MessageButton()
                      .setLabel(`Etkinlik Odası (${i.guild.kanalıBul(vkKategori).permissionsFor(everyone).has('VIEW_CHANNEL') ? "Gösterme" : "Göster"})`)
                      .setCustomId("vkgoster")
                      .setStyle(i.guild.kanalıBul(vkKategori).permissionsFor(everyone).has('VIEW_CHANNEL') ? "SECONDARY" : "PRIMARY"),
                      new MessageButton()
                      .setLabel(`Konser Odası (${i.guild.kanalıBul(dcKategori).permissionsFor(everyone).has('VIEW_CHANNEL') ? "Gösterme" : "Göster"})`)
                      .setCustomId("konsergoster")
                      .setStyle(i.guild.kanalıBul(dcKategori).permissionsFor(everyone).has('VIEW_CHANNEL') ? "SECONDARY" : "PRIMARY"),
                    )
                
                    message.channel.send({components: [Row,RowTwo], content: `**Merhaba!** ${ayarlar.serverName} ${message.guild.emojiyiBul(emojiler.serverTag)}\nAşağıda bulunan menü aracılığı ile "${ayarlar.serverName}" sunucusunun üzerinde değişiklilik ve kontrolleri sağlayabilirsin, bu sizin için kolaylık sağlar.`})
                    x.delete().catch(err => {})
                    await i.deferUpdate().catch(err => {}),await message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
                  }
                  if(i.values[0]  == "yetkiliPaneli") {
                    let opt = [
                      {label: "Uyar",emoji: {id: "1042946131077902417"}, description: "Belirtilen üyeyi belirtilen sebepte uyarabilirsin.", value: "uyari"},
                      {label: "Sustur",emoji: {id: "1042946131077902417"},  description: "Belirtilen üyeyi seste ve metin kanallarında susturursun.", value: "gg3"},
                      {label: "Reklam", emoji: {id: "1042946131077902417"}, description: "Belirtilen üyeyi reklam yapmaktan cezalandırırsın.", value: "reklam"},
                      {label: "Cezalandır", emoji: {id: "1042946131077902417"}, description: "Belirtilen üyeyi karantinaya gönderirsin.", value: "gg"},
                      {label: "Underworld", emoji: {id: "1042946131077902417"}, description: "Belirtilen üyeyi Underworld'e gönderirsin.", value: "underworld"},
                      {label: "Ceza Bilgileri",emoji: {id: "1042946131077902417"}, description: "Belirtilen üyenin son 10 cezasını listelersiniz.", value: "cezakontrol"},
                      {label: "Ceza Kontrolü",emoji: {id: "1042946131077902417"}, description: "Belirtilen ceza numarası ile ceza bilgisini görüntülersiniz.", value: "cezabilgisi"},
                      {label: "Yükseltim Nedir? Nasıl Yetki Atlanır?", emoji: {id: "1042946131077902417"}, value: "yukseltim", description: "Bu konu hakkında bilgi almak istiyorsan tıkla!"},
                      {label: "Puanlama Bilgisi Nedir?", emoji: {id: "1042946131077902417"},value: "kaçpuan", description: "Bu konu hakkında bilgi almak istiyorsan tıkla!"},
                      {label: "Kayıt Nasıl Yapılır?", emoji: {id: "1042946131077902417"},value: "kayıt", description: "Bu konu hakkında bilgi almak istiyorsan tıkla!"},
                      {label: "Davet Nasıl Yapılır?", emoji: {id: "1042946131077902417"},value: "davet", description: "Bu konu hakkında bilgi almak istiyorsan tıkla!"},
                    ]
                    if(ayarlar.type) opt.push({label: "Taglı Nasıl Kullanılır?", emoji: {id: "1042946131077902417"},value: "taglı", description: "Bu konu hakkında bilgi almak istiyorsan tıkla!"})
                    let Row = new MessageActionRow().addComponents(
                      new MessageSelectMenu()
                      .setCustomId("KONTROLPANEL")
                      .setPlaceholder("Yetkili işlemleri şunlardır...")
                      .setOptions(
                        [
                          ...opt,
                          {label: "Yetki Detayı",emoji: {id: "1042946131077902417"}, description: "Belirtilen üyenin yetkili geçmişini görüntüler.", value: "ygeçmiş"},
                          {label: "İstifa",emoji: {id: "1042946131077902417"}, description: "Basıldığı zaman üzerinizdeki tüm yetkileri bırakırsınız.", value: "istifa"}
                        ]
                      )
                    )
                
                    message.channel.send({components: [Row], embeds: [], content: `**Merhaba!** ${ayarlar.serverName} ${message.guild.emojiyiBul(emojiler.serverTag)}\nAşağı listede yetkili moderasyon işlemleri belirtilmiştir, uygulamak istediğiniz moderasyon işlemini aşağıda ki menüden seçiniz.`})
                    x.delete().catch(err => {})
                    await i.deferUpdate().catch(err => {}),await message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
                  }
                    if(i.values[0]  === "cezapanelikur") {
                     await i.deferUpdate().catch(err => {}).catch(err => {}); 
                      let butonamq = new MessageActionRow().addComponents(
                        new MessageButton()
                        .setCustomId("cezalarim")
                        .setLabel("Cezalarım")
                        .setStyle("SECONDARY"),
                        new MessageButton()
                        .setCustomId("notlarim")
                        .setLabel("Notlarım")
                        .setStyle("SECONDARY"),
                        new MessageButton()
                        .setCustomId("cezasayim")
                        .setLabel("Ceza Sayım")
                        .setStyle("SECONDARY"),

                      )
                        return message.channel.send({ components: [butonamq], content: `**Aşağıdaki seçeneklerden bilgisini almak istediğiniz butona tıklayıp öğrenebilirsiniz.**`})
                    }
                    if (i.values[0] == "kısayollar") {
                      await x.delete().catch(err => {});
                      await i.deferUpdate().catch(err => {});
                  
                      const yarraəm = new MessageActionRow().addComponents(
                          new MessageButton()
                              .setCustomId("kısayol1")
                              .setLabel("Evet")
                              .setStyle("SECONDARY")
                              .setEmoji("✔️"),
                          new MessageButton()
                              .setCustomId("kısayol2")
                              .setLabel("Hayır")
                              .setStyle("SECONDARY")
                              .setEmoji("❌")
                      );
                  
                      client.api.channels(message.channel.id).messages.post({
                          data: {
                              content: `**1, 2, 3, 6, 9 ve 12 Aylık üye rollerinin üstünüzde görünmesini istiyor musunuz?**`,
                              components: [yarraəm]
                          }
                      });
                  }
                    if(i.values[0]  == "otomatikkur") {
                      await x.edit({content: null, components: [ sywss ], embeds: [new richEmbed().açıklama(`
Aşağıdaki Menüler Sayesinde Sunucu İçerisinde Rol Alma'daki Rolleri Kurabilirsiniz`)]}), 
                      await i.deferUpdate().catch(err => {}).catch(err => {});
                    }
                    
                    if(i.values[0]  === "etkinlikçekilişkur") {
                     await i.deferUpdate().catch(err => {}).catch(err => {});
                      client.api.channels(message.channel.id).messages.post({ data: {"content":`
**${ayarlar.serverName ? ayarlar.serverName : message.guild.name}** Sunucusuna ait alınabilecek roller aşağı da listelenmektedir. ${message.guild.emojiyiBul(emojiler.Konfeti)}
Sunucu içerisinde **\`@everyone\`**, **\`@here\`** ve gereksiz etiketlerden sizleri rahatsız etmek istemiyoruz.
Düzenlenecek etkinlikler, konserler, turnuvalar ve daha fazlasından haberdar olmak için  ${roller ? roller.etkinlikKatılımcısı ? message.guild.roles.cache.get(roller.etkinlikKatılımcısı) ? message.guild.roles.cache.get(roller.etkinlikKatılımcısı) : `@deleted-role!`: `@deleted-role!` : `@deleted-role!`} rolünü alabilirsiniz.
Çekilişlerden ve ürünlerden (${message.guild.emojiyiBul(emojiler.boostluNitro)}, ${message.guild.emojiyiBul(emojiler.Exxen)}, ${message.guild.emojiyiBul(emojiler.Netflix)}, ${message.guild.emojiyiBul(emojiler.Spotify)}, ${message.guild.emojiyiBul(emojiler.Youtube)}) haberdar olmak için ${roller ? roller.cekilisKatılımcısı ? message.guild.roles.cache.get(roller.cekilisKatılımcısı) ? message.guild.roles.cache.get(roller.cekilisKatılımcısı) : `@deleted-role!`: `@deleted-role!` : `@deleted-role!`} rolünü alabilirsiniz.
`,"components":[
  
                                               
  {
    "type": 1, "components": [{
        "type": 3, "custom_id": "etkinliks", "options": [
            { "label": "Etkinlik Katılımcısı", "description": "Etkinliklerden haberdar olmak için", "value": "etkinlik", "emoji": { "id": "740684333370703923" }, },
            { "label": "Çekiliş Katılımcısı", "description": "Çekilişlerden haberdar olmak için", "value": "cekilis", "emoji": { "id": "922059128250195978" }, },
        ], "placeholder": "Rol Seç!", "min_values": 0, "max_values": 2
    }],
}]} })                  
                      
                                                
                                             
                            if(ayarlar.Buttons && ayarlar.Buttons.aslan && message.guild.roles.cache.get(ayarlar.Buttons.aslan)) client.api.channels(message.channel.id).messages.post({
                              data: {
                                  "content": `**Burç** Rolünüzü Almak İçin Menüden Rolünüzü Alınız.`,
                                  "components": [  {
                                      "type": 1, "components": [{
                                          "type": 3, "custom_id": "horoscope", "options": [
                                              { "label": "Koç", "value": "koç", "emoji": { "id": "921860371998990398", "name": "monarch_koc" }, },
                                              { "label": "Boğa", "value": "boğa", "emoji": { "id": "921860427749675049", "name": "monarch_boga" }, },
                                              { "label": "İkizler", "value": "ikizler", "emoji": { "id": "921860478425247755", "name": "monarch_ikizler" }, },
                                              { "label": "Yengeç", "value": "yengeç", "emoji": { "id": "921860522431881236", "name": "monarch_yengec" }, },
                                              { "label": "Aslan", "value": "aslan", "emoji": { "id": "921863570793316362", "name": "monarch_aslan" }, },
                                              { "label": "Başak", "value": "başak", "emoji": { "id": "921863598836432998", "name": "monarch_basak" }, },
                                              { "label": "Terazi", "value": "terazi", "emoji": { "id": "921863669996998667", "name": "monarch_terazi" }, },
                                              { "label": "Akrep", "value": "akrep", "emoji": { "id": "921863704830681098", "name": "monarch_akrep" }, },
                                              { "label": "Yay", "value": "yay", "emoji": { "id": "921863747046350920", "name": "monarch_yay" }, },
                                              { "label": "Oğlak", "value": "oğlak", "emoji": { "id": "921860226662154340", "name": "monarch_oglak" }, },
                                              { "label": "Kova", "value": "kova", "emoji": { "id": "921860274707902525", "name": "monarch_kova" }, },
                                              { "label": "Balık", "value": "balık", "emoji": { "id": "921860308467855411", "name": "monarch_balik" }, },
                                              { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "id": "922058306263072860", "name": "monarch_trash" }, }
                  
                                          ], "placeholder": "Rol Seç!", "min_values": 1, "max_values": 1
                                      }],
                                  }
                                  ]
                              }
                          })
                         
                          if(ayarlar.Buttons && ayarlar.Buttons.mavi && message.guild.roles.cache.get(ayarlar.Buttons.mavi)) client.api.channels(message.channel.id).messages.post({
                          data: {
                              "content": `Renk Rollerini Almak İçin Menüden rolünüzü alınız.`,
                              "components": [{
                                  "type": 1, "components": [{
                                      "type": 3, "custom_id": "renks", "options": [
                                          { "label": "Kırmızı", "value": "kirmizi", "emoji": { "name": "🍒" }, },
                                          { "label": "Turuncu", "value": "turuncu", "emoji": {  "name": "🥕" }, },
                                          { "label": "Mavi", "value": "mavi", "emoji": { "name": "🌊" }, },
                                          { "label": "Mor", "value": "mor", "emoji": {  "name": "🍇" }, },
                                          { "label": "Pembe", "value": "pembe", "emoji": { "name": "🌸" }, },
                                          { "label": "Yeşil", "value": "yeşil", "emoji": {  "name": "🥝" }, },
                                          { "label": "Sarı", "value": "sarı", "emoji": {  "name": "🍋" }, },
                                          { "label": "Siyah", "value": "siyah", "emoji": { "name": "🕷️" }, },
                                          { "label": "Beyaz", "value": "beyaz", "emoji": { "name": "🥥" }, },

                                          {
                                              "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "id": "922058306263072860", "name": "monarch_trash" },
                                          }], "placeholder": "Rol Seç!", "min_values": 1, "max_values": 1
                                  }],
                              }
                              ]
                          }
                      })
                      if(ayarlar.Buttons && ayarlar.Buttons.alone && message.guild.roles.cache.get(ayarlar.Buttons.alone)) client.api.channels(message.channel.id).messages.post({
                        data: {
                            "content": `**İlişki** durumunuzu belirtmeniz için menüden rolünüzü alınız.`,
                            "components": [  {
                                "type": 1, "components": [{
                                    "type": 3, "custom_id": "valantines", "options": [
                                        { "label": "Sevgilim Var", "value": "couple", "emoji": { "id": "921864349428121670", "name": "monarch_lovers" }, },
                                        { "label": "Sevgilim Yok", "value": "single", "emoji": { "id": "921864389097844736", "name": "monarch_alone" }, },
                                        { "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "id": "922058306263072860", "name": "monarch_trash" }, }
                                    ], "placeholder": "Rol Seç!", "min_values": 1, "max_values": 1
                                }],
                            }
                            ]
                        }
                    })

                                                   await message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {}).catch(err => {})
                    }

                    
                  });
                
                collector.on('end', collected => { 
                    x.delete().catch(err => {})
                 });
            })
        }
        let ozellik = özellikler.find(o => o.name.toLowerCase() === secim.toLowerCase());
        if (ozellik.type) {
            let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r => r.name === args.splice(1).join(' '));
            if(!rol) return message.channel.send({embeds: [embed.açıklama(`**${başHarfBüyült(ozellik.name)}** isimli seçenek ayarını hangi rol yapmamı istiyorsun?`)]}).then(x => setTimeout(() => {
              x.delete().catch(err => {});
          }, 7500));
            await GUILD_SETTINGS.findOneAndUpdate({guildID: message.guild.id}, {$set: {[`Ayarlar.Buttons.${ozellik.name}`]: rol.id}}, {upsert: true}).catch(e => console.log(e))
             message.channel.send({embeds: [embed.açıklama(`Başarıyla **${başHarfBüyült(ozellik.name)}** isimli seçenek ayar rolü ${rol} olarak tanımladı.`)]})
            return message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})  
        }
    }
};

function başHarfBüyült(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }





 
                   
            