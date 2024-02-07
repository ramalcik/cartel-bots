const { Client, Message, MessageButton, MessageActionRow, MessageAttachment, MessageSelectMenu } = require("discord.js");
const Stats = require('../../../../database/Schemas/Plugins/Client.Users.Stats')
const Upstaff = require('../../../../database/Schemas/Plugins/Client.Users.Staffs');
const Users = require('../../../../database/Schemas/Client.Users')
const moment = require('moment');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const tm = require('../../../../base/Additions/Stats/Time.Manager')
const ms = require('ms');
const Seens = require('../../../../database/Schemas/Guild.Users.Seens');
const Sorumluluk = require('../../../../database/Schemas/Plugins/Guild.Responsibility');
const Tasks = require("../../../../database/Schemas/Plugins/Client.Users.Tasks")
require('moment-duration-format');
require('moment-timezone');
const Invite = require('../../../../database/Schemas/Global.Guild.Invites');
const table = require('table');
const { StageInstanceManager } = require("discord.js");
const Punitives = require("../../../../database/Schemas/Global.Punitives")
module.exports = {
    name: "ystat",
    command: ["ystat", "ytstat"],
    aliases: "ystat <@cartel/ID>",
    description: "Belirlenen üye veya kendinizin istatistik bilgilerine bakarsınız",
    category: "yetkili",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.guneCevir = (date) => { return moment.duration(date).format('d [gün]'); };
    client.cartelSaatYap = (date) => { return moment.duration(date).format('H'); };
    
    client.sureCevir = (duration) => {  
      let dr = moment.duration(duration).format('H [saat,] m [dk.]')
      return dr + "."
    };
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */
  
  komutClient: async function (client, message, args) { 
    let kullArray = message.content.split(" ");
    let kullaniciId = kullArray.slice(1);
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(kullaniciId[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === kullaniciId.slice(0).join(" ") || x.user.username === kullaniciId[0]) || message.member;

   
    let data = await  Stats.findOne({ guildID: sistem.SUNUCU.GUILD, userID: cartelcim.id })

   
        let Upstaffs = await Upstaff.findOne({_id: cartelcim.id})
        let top = await Stats.find();
        let kullanicidata =  await Users.findOne({_id: cartelcim.id})
if(!Upstaffs) return message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true, size: 2048})).açıklama(`${cartelcim} kişisinin veritabanında verisine ulaşamadım.`)]})
        let siralamagetir = top.filter(x => message.guild.members.cache.has(x.userID)).sort((a, b) => Number(b.lifeTotalVoiceStats) - Number(a.lifeTotalVoiceStats))
        let genelsiralama =  siralamagetir.find(x => x.userID == cartelcim.id) ? Number(siralamagetir.indexOf(siralamagetir.find(x => x.userID == cartelcim.id))) + 1 : `SIRALAMADA BULUNMUYOR!`

const cezaBul = Punitives.findOne({ Member: cartelcim.id, Type: "Ses Susturulma"})

        let haftalikSesToplam = 0;
        let haftalikSesListe = '';
        let genelChatToplam = 0;
        let genelSesToplam = 0;
        let genelSesListe = '';
        let genelChatListe = '';
        let genelafk = 0;
        let haftalikafk = 0;
        let canvasSesListe = ''
        let canvasChatListe = ''
        let müzikOdalar = '';
        let müzikToplam = 0;
        let streamer = 0;
        let public = 0;
        let register = 0;
        let soruncozme = 0;
        let eglence = 0;
        let alone = 0;
        let private = 0;
        cartelcim._views()
        if(data.lifeChatStats) {
          data.lifeChatStats.forEach(c => genelChatToplam += c);
  
          data.lifeChatStats.forEach((value, key) => {
          if(_statSystem.chatCategorys.find(x => x.id == key)) {
          let kategori = _statSystem.chatCategorys.find(x => x.id == key);
          let mesajkategoriismi = kategori.isim
          genelChatListe += `${message.guild.channels.cache.has(key) ? mesajkategoriismi ? mesajkategoriismi : message.guild.channels.cache.get(key).name : '#Silinmiş'}: \` ${value} mesaj \`\n`
  
          }
          });
        }
        let günlükses = 0, ikihaftalik = 0, aylıkses = 0, toplamses = 0;
        let günlükmesaj = 0, haftalıkmesaj = 0, aylıkmesaj = 0, toplammesaj = 0;
        let haftalık = {}, aylık = {}, günlük = [];
        let day = await tm.getDay(message.guild.id);
        let haftalıkm = {}, aylıkm = {}, günlükm = [];

        if(data.allMessage) {
          let days = Object.keys(data.allMessage);
  
  
          days.forEach(_day => {
              let sum = Object.values(data.allMessage[_day]).reduce((x, y) => x + y, 0);
              toplammesaj += sum;
           
  
              if (day == Number(_day)) {
                  günlükmesaj += sum;
                  günlükm = Object.keys(data.allMessage[_day]).map(e => Object.assign({ Channel: e, Value: data.allMessage[_day][e] }));
              }
              if (_day <= 7) {
                  haftalıkmesaj += sum;
                  let keys = Object.keys(data.allMessage[_day]);
                  keys.forEach(key => {
                      if (haftalıkm[key]) haftalıkm[key] += data.allMessage[_day][key];
                      else haftalıkm[key] = data.allMessage[_day][key];
                  });
              }
              if (_day <= 30) {
                  aylıkmesaj += sum;
                  let keys = Object.keys(data.allMessage[_day]);
                  keys.forEach(key => {
                      if (aylıkm[key]) aylıkm[key] += data.allMessage[_day][key];
                      else aylıkm[key] = data.allMessage[_day][key];
                  });
              }
          });
        }

        if(data.allVoice && data.allCategory) {
          let days = Object.keys(data.allVoice || {});
          
        
  
          days.forEach(_day => {
              let sum = Object.values(data.allVoice[_day]).reduce((x, y) => x + y, 0);
              toplamses += sum;

              if (day == Number(_day)) {
                  günlükses += sum;
                  günlük = Object.keys(data.allVoice[_day]).map(e => Object.assign({ Channel: e, Value: data.allVoice[_day][e] }));
              }
              if (_day <= 7) {
                ikihaftalik += sum;
                  let keys = Object.keys(data.allVoice[_day]);
                  keys.forEach(key => {
                      if (haftalık[key]) haftalık[key] += data.allVoice[_day][key];
                      else haftalık[key] = data.allVoice[_day][key];
                  });
              }
              
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

        if(data.lifeVoiceStats) {
          data.lifeVoiceStats.forEach(c => genelSesToplam += c);
          data.lifeVoiceStats.forEach((value, key) => {
                if(key == kanallar.publicKategorisi || ``) public += value
                if(key == kanallar.registerKategorisi || ``) register += value
                if(key == kanallar.streamerKategorisi || ``) streamer += value
                if(key == kanallar.sorunCozmeKategorisi || ``) soruncozme += value
                if(key == kanallar.eğlenceKategorisi || ``) eglence += value
                if(key == kanallar.aloneKategorisi || ``) alone += value
                if(key == kanallar.privateKategorisi || ``) private += value
          });
          
     

          data.lifeVoiceStats.forEach((value, key) => {
            if(ayarlar.musicRooms.some(x => x === key)) müzikToplam += value
          });
          data.lifeVoiceStats.forEach((value, key) => { 
          if(_statSystem.voiceCategorys.find(x => x.id == key)) {
            let kategori = _statSystem.voiceCategorys.find(x => x.id == key);
            if(ayarlar.sleepRoom && ayarlar.sleepRoom == key) {
              genelafk = value
            }
            let kategoriismi = kategori.isim 
              genelSesListe += ` ${message.guild.channels.cache.has(key) ? kategoriismi ? kategoriismi : `Diğer Odalar` : '#Silinmiş'}: \` ${client.sureCevir(value)} \`\n`  
            }
        
          });
          if(müzikToplam > 0) genelSesListe += ` Müzik Odalar: \` ${client.sureCevir(müzikToplam)} \`\n`
        }

        if(data.voiceStats) {
          data.voiceStats.forEach(c => haftalikSesToplam += c);
               
          data.voiceStats.forEach((value, key) => {
            if(ayarlar.musicRooms.some(x => x === key)) müzikToplam += value
            if(ayarlar.sleepRoom && ayarlar.sleepRoom == key) {
              haftalikafk = value
            }
          });
          data.voiceStats.forEach((value, key) => { 
          if(_statSystem.voiceCategorys.find(x => x.id == key)) {
            let kategori = _statSystem.voiceCategorys.find(x => x.id == key);
            let kategoriismi = kategori.isim 
               haftalikSesListe += ` ${message.guild.channels.cache.has(key) ? kategoriismi ? kategoriismi : `Diğer Odalar` : '#Silinmiş'}: \` ${client.sureCevir(value)} \`\n`
               canvasSesListe += `${message.guild.channels.cache.has(key) ? kategoriismi ? kategoriismi : `Diğer Odalar` : '#Silinmiş'}: ${client.sureCevir(value)}\n`
                
            }
        
          });
          if(müzikToplam > 0) haftalikSesListe += ` Müzik Odalar: \` ${client.sureCevir(müzikToplam)} \``, canvasSesListe += `Müzik Odalar: ${client.sureCevir(müzikToplam)}`
        }
        let haftalikChatToplam = 0;
        data.chatStats.forEach(c => haftalikChatToplam += c);
        let haftalikChatListe = '';
        data.chatStats.forEach((value, key) => {
        if(_statSystem.chatCategorys.find(x => x.id == key)) {
        let kategori = _statSystem.chatCategorys.find(x => x.id == key);
        let mesajkategoriismi = kategori.isim
        haftalikChatListe += ` ${message.guild.channels.cache.has(key) ? mesajkategoriismi ? mesajkategoriismi : message.guild.channels.cache.get(key).name : '#Silinmiş'}: \` ${value} mesaj \`\n`
        canvasChatListe += `${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} ${message.guild.channels.cache.has(key) ? mesajkategoriismi ? mesajkategoriismi : message.guild.channels.cache.get(key).name : '#Silinmiş'}: ${value} mesaj\n`  
        }
        });
//           --------------TANIMLAR()--------------
const eskiRol = _statSystem.staffs[_statSystem.staffs.indexOf(_statSystem.staffs.find(x => x.No == (Upstaffs ? Upstaffs.staffExNo : 0)))] || _statSystem.staffs[_statSystem.staffs.length-1];
let sorumlusu = message.guild.members.cache.get(kullanicidata.yetkiVeren)
let yetkiVeren = `${kullanicidata.yetkiVeren ? sorumlusu ? `${sorumlusu}` : `<@${kullanicidata.yetkiVeren}> (\`Sunucudan Ayrılmış!\`)`  : `\`Otomatik başlatılmış. \`` }`
let yetkiTarihi = ` ${Upstaffs.yetkiVerilmeTarihi ? ` <t:${String(Date.parse(Upstaffs.yetkiVerilmeTarihi)).slice(0, 10)}:R>` : `"Bulunamadı."`}`
let yetkibul = _statSystem.staffs[_statSystem.staffs.indexOf(_statSystem.staffs.find(x => cartelcim.roles.cache.has(x.rol)))]
let belirt = _statSystem.staffs.sort((a, b) => {
    let a_rol = message.guild.roles.cache.get(a.rol)
    let b_rol = message.guild.roles.cache.get(b.rol)
    if(a_rol && b_rol) return b_rol.rawPosition - a_rol.rawPosition
    })
    
  let bulundugurol = belirt.indexOf(belirt.find(x => x.rol == eskiRol.rol))

  const veriCek = await Upstaff.find({});
    
let toplamKameraAcikSuresi = 0;

let kameraAcmaTarihi = null;

kullanicidata.Voices.forEach(voice => {
  if (voice.state === "KAMERA AÇTI") {
    kameraAcmaTarihi = voice.date;
  } else if (voice.state === "KAMERA KAPATTI" && kameraAcmaTarihi !== null) {
    toplamKameraAcikSuresi += voice.date - kameraAcmaTarihi;
    kameraAcmaTarihi = null;
  }
});
  ///
          ///
          let sesTop = 0
          let gecildic = 1
          veriCek.filter(x => message.guild.members.cache.has(x._id)).sort((a, b) => b.Upstaffs.ToplamSes - a.Upstaffs.ToplamSes).forEach((veri, index) => {
            if(veri._id == cartelcim.id) sesTop = index + 1
            if(veri._id != cartelcim.id) gecildic += 1
          })

          if(sesTop > 50) {
            sesTop = `SIRALAMADA BULUNMUYOR.`
          }
          /////
          let strTop = 0
          let gecildiç = 1
          let toplamyayinbilgisi = 0
          if(kullanicidata.Streaming) {
           kullanicidata.Streaming.map(stream => {
               toplamyayinbilgisi += Number(stream.End - stream.Start)
              }) 
          }
          veriCek.filter(x => message.guild.members.cache.has(x._id)).sort((a, b) => b.toplamyayinbilgisi - a.toplamyayinbilgisi).forEach((veri, index) => {
            if(veri._id == cartelcim.id) strTop = index + 1
            if(veri._id != cartelcim.id) gecildiç += 1
          })

          if(strTop > 50) {
            strTop = `SIRALAMADA BULUNMUYOR.`
          }
        
             ///
             let ytTop = 0
             let gecildlc = 1
             
             veriCek.filter(x => message.guild.members.cache.has(x._id)).sort((a, b) => b.Upstaffs.Point - a.Upstaffs.Point).forEach((veri, index) => {
              if(veri._id == cartelcim.id) ytTop = index + 1
              if(veri._id != cartelcim.id) gecildlc += 1
            })
            if(ytTop > 50) {
              ytTop = `SIRALAMADA BULUNMUYOR.`
            }
             ///// 
             const sorumlulukPuanBul = _statSystem.staffs.find(x => x.No == Upstaffs.StaffNo) ? _statSystem.staffs.find(x => x.No == Upstaffs.staffNo).Sorumluluk : eskiRol.Sorumluluk
             const puanBelirt = _statSystem.staffs.find(x => x.No == Upstaffs.staffNo) ? _statSystem.staffs.find(x => x.No == Upstaffs.staffNo).Puan : eskiRol.Puan
          const yetkiUpdown = Upstaffs ? `${progressBar(Upstaffs ? Upstaffs.Point.toFixed(1) : 0, puanBelirt,6, Upstaffs.Point.toFixed(1))}` : "";
          const gorevUpdown = Upstaffs ? `${progressBar(Upstaffs ? Upstaffs.Görev.toFixed(1) : 0, sorumlulukPuanBul,6, Upstaffs.Görev)}` : "";
                   
          const hedefBul = sorumlulukPuanBul;
          const suankiPuan = Upstaffs ? Upstaffs.Görev.toFixed(1) : 0;
          
          const yuzdee = (suankiPuan / hedefBul) * 100;
          const yuvarla = Math.min(yuzdee, 100);
          const yüzdeGösterGörev = Math.round(yuvarla)


  const hedefPuan = puanBelirt;
  const gercekPuan = Upstaffs ? Upstaffs.Point.toFixed(1) : 0;
  
  const yuzde = (gercekPuan / hedefPuan) * 100;
  const yuvarla1 = Math.min(yuzde, 100);
  const yüzdeGösterPuan = Math.round(yuvarla1)
  const görevAlanlar = await require("../../../../database/Schemas/Plugins/Client.GörevAlanlar").findOne({ _id: cartelcim.id});
  let kamera = `${client.sureCevir(toplamKameraAcikSuresi)}`
  let yayin = 0
  if(kullanicidata.Streaming) {
   kullanicidata.Streaming.map(stream => {
       yayin += Number(stream.End - stream.Start)
      }) 
  }


let yayinn = `${client.sureCevir(yayin)}`
let mutedd = `${client.sureCevir(cezaBul.Duration - cezaBul.Date)}`
let SonGörülme = await Seens.findOne({userID: cartelcim.id}) 
let sonMesaj = SonGörülme ? SonGörülme.lastMessage ? `<t:${String(SonGörülme.lastMessage).slice(0, 10)}:R>` : `Bulunamadı.` : `Bulunamadı.`
let sonSes = SonGörülme ? SonGörülme.lastVoice ?  `<t:${String(SonGörülme.lastVoice).slice(0, 10)}:R>` : `Bulunamadı.` : `Bulunamadı.`
  let görevBul = await Tasks.findOne({ roleID: eskiRol ? eskiRol.rol : "1231131"  }) || await Tasks.findOne({ roleID: cartelcim.roles.hoist ? cartelcim.roles.hoist.id : "1231131" }) || await Tasks.findOne({ roleID: cartelcim.roles.highest ? cartelcim.roles.highest.id : "1231131" })

  return message.channel.send({

                embeds: [ new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} yetki bilgilerin aşağıda belirtilmiştir.

${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`YETKİ SÜRESİ       \`**${yetkiTarihi}**
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`YETKİ VEREN        \`**${yetkiVeren}**
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`YETKİ              \`**${yetkibul || `Yetki belirtilmedi.`}**
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`YETKİ SIRASI       \`**${Number(bulundugurol) + 1}. YETKİ**
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`TOP SES SIRASI     \`**${sesTop} SIRA.**
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`TOP STREAM SIRASI  \`**${strTop} SIRA.**
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`TOP YETKİLİ SIRASI \`**${ytTop} SIRA.**

${message.guild.emojiyiBul(emojiler.unlem)} KAZANILAN PUAN \`${Upstaffs.Point}\`

${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`YETKİ UPDOWN BAR \` ${yetkiUpdown} \`(%${yüzdeGösterPuan})\`
${message.guild.emojiyiBul(emojiler.unlem)} Yetki atlamak için \`${Math.abs(Number(Upstaffs.Point) - Number(puanBelirt))}\` puan kazanman gerekir.

${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`GÖREV ALMA TARİHİ  \` ${görevAlanlar && görevAlanlar.Tarihi ? `${tarihsel(görevAlanlar.Tarihi)}` : `${message.guild.emojiyiBul(emojiler.no_cartel)} Görev Seçmelisin!`}
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`GÖREV BİTİŞ TARİHİ \` ${görevBul && görevBul.Time ? `<t:${String(görevBul.Time).slice(0, 10)}:R>\n` : `${message.guild.emojiyiBul(emojiler.no_cartel)} Görev Seçmelisin!`}
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`GÖREV PUANI        \` ${Upstaffs.Görev !== 0 ? Upstaffs.Görev : `${message.guild.emojiyiBul(emojiler.no_cartel)} Görev Seçmelisin!`}
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`GÖREV              \` ${görevAlanlar && görevAlanlar.Görevi ? görevAlanlar.Görevi : `${message.guild.emojiyiBul(emojiler.no_cartel)} Görev Seçmelisin!`}

${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`GÖREV UPDOWN BAR \` ${gorevUpdown} \`(%${yüzdeGösterGörev})\`

${message.guild.emojiyiBul(emojiler.info)} \`KATEGORİ SIRALAMALARI\`
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`PUBLİC ODALAR    \` \`${(public*1)} PUAN.\`
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`STREAMER ODALAR  \` \`${(streamer*1)} PUAN.\`
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`SORUN ÇÖZME ODALAR\` \`${(soruncozme*1)} PUAN.\`
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`EĞLENCE ODALAR    \` \`${(eglence*1)} PUAN.\`
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`PRİVATE ODALAR    \` \`${(private*1)} PUAN.\`
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`ALONE ODALAR      \` \`${(alone*1)} PUAN.\`

${message.guild.emojiyiBul(emojiler.info)} \`BİLGİLER\`
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`KAMERA SÜRESİ      \` ${kamera}
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`YAYIN SÜRESİ       \` ${yayinn}
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`MİKROFON (MUTED) SÜRESİ\` ${mutedd}
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`SESE SON GİRİŞ TARİHİ  \` ${sonSes}
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`SON MESAJ TARİHİ       \` ${sonMesaj}
`
                )
                  ]
            }
        )

        
        function progressBar(value, maxValue, size, veri) {
          const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
          const emptyProgress = size - progress > 0 ? size - progress : 0;
           let progressStart;
              if(veri == 0) progressStart = `${message.guild.emojiyiBul(emojiler.Terfi.başlangıçBar)}`
              if(veri > 0) progressStart = `${message.guild.emojiyiBul(emojiler.Terfi.başlamaBar)}`
               const progressText = `${message.guild.emojiyiBul(emojiler.Terfi.doluBar)}`.repeat(progress);
               const emptyProgressText = `${message.guild.emojiyiBul(emojiler.Terfi.boşBar)}`.repeat(emptyProgress)
               const bar = progressStart + progressText + emptyProgressText + `${emptyProgress == 0 ? `${message.guild.emojiyiBul(emojiler.Terfi.doluBitişBar)}` : `${message.guild.emojiyiBul(emojiler.Terfi.boşBitişBar)}`}`;
          return bar;
        };
    }
}
