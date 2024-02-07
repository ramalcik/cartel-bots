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
const table = require('table');
const { StageInstanceManager } = require("discord.js");
const { createCanvas, loadImage } = require("canvas")
module.exports = {
    name: "stat",
    command: ["stat"],
    aliases: "stat <@cartel/ID>",
    description: "Belirlenen üye veya kendinizin istatistik bilgilerine bakarsınız",
    category: "stat",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.guneCevir = (date) => { return moment.duration(date).format('d [gün]'); };
    client.cartelSaatYap = (date) => { return moment.duration(date).format('H'); };
    client.on("voiceStreamingStart", (member, voiceChannel) => {
      ScreenData.set(member.id, {
          channelId: voiceChannel.id,
          Start: Date.now(),
      })
    });

    client.on("voiceStreamingStop", async (member, voiceChannel) => {
      let yarram = ScreenData.get(member.id)
      if(yarram) {
        await Users.updateOne({_id: member.id}, {$push: {"Streaming": {
          id: voiceChannel.id,
          Start: yarram.Start,
          End: Date.now()
      }
      }}, {upsert: true})
      let logKanal = member.guild.kanalıBul("streamer-log")
      let yayınSüresi = moment.duration(Date.now() - yarram.Start).format('h [saat,] m [dakika]')
      if(logKanal) logKanal.send({embeds: [new richEmbed().açıklama(`${member} kişi ${voiceChannel} kanalında **${yayınSüresi}** boyunca yayın açtı.

**Ses kanalında bulunan üyeler**:
\`\`\`
${member.voice.channel.members.size <= 8 ? member.voice.channel.members.map(x => x.user.username).join("\n") : `${member.voice.channel.members.array().slice(0, 8).map(x => x.user.username).join("\n")} ve ${member.voice.channel.members.size - 8} kişi daha.`}
\`\`\``).altBaşlık(`${member.user.username} • ${voiceChannel.name} • ${yayınSüresi}`, member.user.avatarURL({dynamic: true}))]}).catch(err => {})
      }
    });
    client.sureCevir = (duration) => {  
      let dr = moment.duration(duration).format('Y [yıl,] M [ay,] d [gün,] h [saat,] m [dk]')
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

    if(!roller.botKomutRolü && !roller.Yetkiler.some(cartelfx => message.member.roles.cache.has(cartelfx))  && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !_statSystem.staffs.some(xxx => message.member.roles.cache.has(xxx.rol)) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinin yetkili rolü bulunamadı.`)]})
    let embed = new richEmbed()
    let embeddaq = new richEmbed()
    let embeddaqcik = new richEmbed()
   
    let data = await  Stats.findOne({ guildID: sistem.SUNUCU.GUILD, userID: cartelcim.id })

   
        let Upstaffs = await Upstaff.findOne({_id: cartelcim.id})
        let top = await Stats.find();
        let kullanicidata =  await Users.findOne({_id: cartelcim.id})
if(!Upstaffs) return message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true, size: 2048})).açıklama(`${cartelcim} kişisinin veritabanında verisine ulaşamadım.`)]})
        let siralamagetir = top.filter(x => message.guild.members.cache.has(x.userID)).sort((a, b) => Number(b.lifeTotalVoiceStats) - Number(a.lifeTotalVoiceStats))
        let genelsiralama =  siralamagetir.find(x => x.userID == cartelcim.id) ? Number(siralamagetir.indexOf(siralamagetir.find(x => x.userID == cartelcim.id))) + 1 : `SIRALAMADA BULUNMUYOR!`



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
                if(key == kanallar.publicKategorisi) public += value
                if(key == kanallar.registerKategorisi) register += value
                if(key == kanallar.streamerKategorisi) streamer += value
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
    
          if(ayarlar && ayarlar.statRozet) {
            let rozetbir = roller.statRozetOne
            let rozetiki = roller.statRozetTwo
            let rozetuc = roller.statRozetThree
            let rozetdort = roller.statRozetFour
            let rozetbes = roller.statRozetFive
            if(parseInt(public) < ms("14h")) {
              cartelcim.roles.remove(rozetbir).catch(err => {})
              cartelcim.roles.remove(rozetiki).catch(err => {})
              cartelcim.roles.remove(rozetuc).catch(err => {})
              cartelcim.roles.remove(rozetdort).catch(err => {})
              cartelcim.roles.remove(rozetbes).catch(err => {})
            }
            if(parseInt(public) < ms("15h")) embeddaq.sütun("Ses Rozet Durumu", `Herhangi Bir Rozete Sahip Değilsin! <@&${rozetbir}> rozetini elde etmek için sohbet kanallarıda  \`${getContent(ms("15h") - public)}\` geçirmen gerekiyor.`, false)
            if(parseInt(public) > ms("15h") && parseInt(public) < ms("30h")) embeddaq.sütun("Ses Rozet Durumu", `Tebrikler <@&${rozetbir}> rozetine sahipsin! Bir sonraki <@&${rozetiki}> rozetini elde etmek için sohbet kanallarıda  \`${getContent(ms("30h") - public)}\` geçirmen gerekiyor.`, false)
            if(parseInt(public) > ms("30h") && parseInt(public) < ms("45h")) embeddaq.sütun("Ses Rozet Durumu", `Tebrikler <@&${rozetiki}> rozetine sahipsin! Bir sonraki <@&${rozetuc}> rozetini elde etmek için sohbet kanallarıda  \`${getContent(ms("45h") - public)}\` geçirmen gerekiyor.`, false)
            if(parseInt(public) > ms("45h") && parseInt(public) < ms("60h")) embeddaq.sütun("Ses Rozet Durumu", `Tebrikler <@&${rozetuc}> rozetine sahipsin! Bir sonraki <@&${rozetdort}> rozetini elde etmek için sohbet kanallarıda  \`${getContent(ms("60h") - public)}\` geçirmen gerekiyor.`, false)
            if(parseInt(public) > ms("60h") && parseInt(public) < ms("80h")) embeddaq.sütun("Ses Rozet Durumu", `Tebrikler <@&${rozetdort}> rozetine sahipsin! Bir sonraki <@&${rozetbes}> rozetini elde etmek için sohbet kanallarıda  \`${getContent(ms("80h") - public)}\` geçirmen gerekiyor.`, false)
            if(parseInt(public) > ms("80h")) embeddaq.sütun("Ses Rozet Durumu", `İnanılmazsın! <@&${rozetbes}> rozetine sahipsin! Bu rozeti taşımak sana bir his vermeli!`, false)
            if(parseInt(public) > ms("15h") && parseInt(public) < ms("30h") && !cartelcim.roles.cache.has(rozetbir)) {
              if(parseInt(public) > ms("15h") && parseInt(public) < ms("30h") && !cartelcim.roles.cache.has(rozetbir)) {
                cartelcim.roles.add(rozetbir)
                embeddaq.sütun("✨ Tebrikler, yeni rozet!", `Toplam sohbet odalarında süren 15 saati geçtiği için <@&${rozetbir}> rolünü kazandın! Bir sonraki <@&${rozetiki}> rolünü elde etmek için \`${getContent(ms("30h") - public)}\` geçirmen gerekiyor.`, false)
              }
            }
            if(parseInt(public) > ms("30h") && parseInt(public) < ms("45h") && !cartelcim.roles.cache.has(rozetiki)) {
              if(!cartelcim.roles.cache.has(rozetiki)) {
                cartelcim.roles.remove(rozetbir).catch(err => {})
                cartelcim.roles.add(rozetiki)
                embeddaq.sütun("✨ Tebrikler, yeni rozet!", `Toplam sohbet odalarında süren 30 saati geçtiği için <@&${rozetiki}> rolünü kazandın! Bir sonraki <@&${rozetuc}> rolünü elde etmek için \`${getContent(ms("45h") - public)}\` geçirmen gerekiyor.`, false)
              }
            }
            if(parseInt(public) > ms("45h") && parseInt(public) < ms("60h") && !cartelcim.roles.cache.has(rozetuc)) {
              if(!cartelcim.roles.cache.has(rozetuc)) {
                cartelcim.roles.remove(rozetiki).catch(err => {})
                cartelcim.roles.add(rozetuc)
                embeddaq.sütun("✨ Tebrikler, yeni rozet!", `Toplam sohbet odalarında süren 45 saati geçtiği için <@&${rozetuc}> rolünü kazandın! Bir sonraki <@&${rozetdort}> rolünü elde etmek için \`${getContent(ms("60h") - public)}\` geçirmen gerekiyor.`, false)
              }
            }
            if(parseInt(public) > ms("60h") && parseInt(public) < ms("80h") && !cartelcim.roles.cache.has(rozetdort)) {
              if(!cartelcim.roles.cache.has(rozetdort)) {
                cartelcim.roles.remove(rozetuc).catch(err => {})
                cartelcim.roles.add(rozetdort)
                embeddaq.sütun("✨ Tebrikler, yeni rozet!", `Toplam sohbet odalarında süren 60 saati geçtiği için <@&${rozetdort}> rolünü kazandın! Bir sonraki <@&${rozetbes}> rolünü elde etmek için \`${getContent(ms("80h") - public)}\` geçirmen gerekiyor.`, false)
              }
            }
            if(parseInt(public) > ms("80h") && !cartelcim.roles.cache.has(rozetbes)) {
              if(!cartelcim.roles.cache.has(rozetbes)) {
                cartelcim.roles.remove(rozetdort).catch(err => {})
                cartelcim.roles.add(rozetbes)
                embeddaq.sütun("✨ Tebrikler, yeni rozet!", `Toplam sohbet odalarında süren 80 saati geçtiği için <@&${rozetbes}> rolünü kazandın! Üstün aktifliğinden dolayı sana teşekkür ederiz.`, false)
              }
            }

        
          }
  

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
  




        
        function yönetimBar(value, maxValue, size, veri) {
                  
          if(veri < 0) value = 0
          const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
          const emptyProgress = size - progress > 0 ? size - progress : 0;
          let progressStart;
          if(veri <= 0) progressStart = `${message.guild.emojiyiBul(emojiler.Terfi.başlangıçBar)}`
          if(veri > 0) progressStart = `${message.guild.emojiyiBul(emojiler.Terfi.başlamaBar ? emojiler.Terfi.başlamaBar : emojiler.Terfi.başlamaBar)}`
          const progressText = `${message.guild.emojiyiBul(emojiler.Terfi.doluBar)}`.repeat(progress);
          const emptyProgressText = `${message.guild.emojiyiBul(emojiler.Terfi.boşBar)}`.repeat(emptyProgress)
          const bar = progressStart + progressText + emptyProgressText + `${emptyProgress == 0 ? `${message.guild.emojiyiBul(emojiler.Terfi.doluBitişBar)}` : `${message.guild.emojiyiBul(emojiler.Terfi.boşBitişBar)}`}`;
          return bar;
        };

        let platform = { web: '🌍', desktop: '💻', mobile: '📱' }
        if(cartelcim.presence && cartelcim.presence.status !== 'offline') { bilgi = `${platform[Object.keys(cartelcim.presence.clientStatus)[0]]}` } else { bilgi = '🔴' }
     const  yetkiSayfalama = new MessageActionRow().addComponents(
      new MessageButton()
      .setCustomId('geri')
       .setEmoji(message.guild.emojiyiBul("geri"))
       .setStyle("SECONDARY"),
       new MessageButton()
       .setCustomId('sonra')
       .setEmoji(message.guild.emojiyiBul("sonraki"))
       .setStyle("SECONDARY"),

       new MessageButton()
       .setCustomId("x")
       .setEmoji(`${bilgi}`)
       .setStyle("SECONDARY")
       .setDisabled(true)
       
      
     )
    //STAT İNDEKSLERİ (BAŞLANGIÇ)

     const puanBilgisi = await Upstaff.findOne({ _id: cartelcim.id })
    const eskiRol = _statSystem.staffs[_statSystem.staffs.indexOf(_statSystem.staffs.find(x => x.No == (puanBilgisi ? puanBilgisi.staffExNo : 0)))] || _statSystem.staffs[_statSystem.staffs.length-1];
     if(!puanBilgisi) return message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true, size: 2048})).açıklama(`${cartelcim} isimli yetkilinin verileri bulunamadı.`)]})
     let görevBul = await Tasks.findOne({ roleID: eskiRol ? eskiRol.rol : "1231131"  }) || await Tasks.findOne({ roleID: cartelcim.roles.hoist ? cartelcim.roles.hoist.id : "1231131" }) || await Tasks.findOne({ roleID: cartelcim.roles.highest ? cartelcim.roles.highest.id : "1231131" })
     let anneni = await Upstaff.findOne({_id: cartelcim.id})
     let userData = await Users.findOne({_id: cartelcim.id}) 
     let sorumlusu = message.guild.members.cache.get(userData.yetkiVeren)
     let SonGörülme = await Seens.findOne({userID: cartelcim.id}) 
    
    
     
     

         const puanBelirt = _statSystem.staffs.find(x => x.No == puanBilgisi.staffNo) ? _statSystem.staffs.find(x => x.No == puanBilgisi.staffNo).Puan : eskiRol.Puan
        const sorumlulukPuanBul = _statSystem.staffs.find(x => x.No == puanBilgisi.StaffNo) ? _statSystem.staffs.find(x => x.No == puanBilgisi.staffNo).Sorumluluk : eskiRol.Sorumluluk
         const s = puanBilgisi ?  `${progressBar(puanBilgisi ? puanBilgisi.Point.toFixed(1) : 0, puanBelirt,8, puanBilgisi.Point.toFixed(1))}` : "";
         const sorumlubar = puanBilgisi ? `${progressBar(puanBilgisi ? puanBilgisi.Mission.Sorumluluk.toFixed(1) : 0, sorumlulukPuanBul,8, puanBilgisi.Mission.Sorumluluk)}` : "";
         const gorevBar = puanBilgisi ? `${progressBar(puanBilgisi ? puanBilgisi.Görev.toFixed(1) : 0, sorumlulukPuanBul,8, puanBilgisi.Görev)}` : "";
      /*   const puan = 50;
         const puanHedef = 100;
             const barUzunluk = 192;
             const barYukseklik = 20;
         
             const canvas = createCanvas(barUzunluk, barYukseklik);
             const ctx = canvas.getContext('2d');
         
             const progress = Math.min(Math.max(0, puan / puanHedef), 1);
             const barUzunlugu = Math.floor(barUzunluk * progress);
         
             ctx.fillStyle = 'gray';
             ctx.fillRect(0, 0, barUzunluk, barYukseklik);
         
             ctx.fillStyle = 'white';
             ctx.fillRect(0, 0, barUzunlugu, barYukseklik);
         
             ctx.fillStyle = 'white';
             ctx.font = '12px Arial';
             ctx.fillText(`Puan: ${puan} / ${puanHedef}`, 10, barYukseklik - 5);
        
         */

             let canvas = createCanvas(1080, 400);
             let ctx = canvas.getContext("2d");
             let background = await loadImage("https://cdn.discordapp.com/attachments/1139065333328650290/1150526774422290472/IMG_20230911_002200.png");
             ctx.drawImage(background, 0, 0, 1080, 400);
          

             ctx.save();

             const yarram = await loadImage(cartelcim.displayAvatarURL({ size: 128, format: 'png' }));
             
             ctx.beginPath();
             ctx.arc(70, 73, 63, 0, Math.PI * 2, false);
             ctx.closePath();
             ctx.clip();
             
             ctx.drawImage(yarram, 20, 8, 95, 96.5); 
             
             ctx.restore();
             ctx.font = '55px "Marlin Geo Black"'; 
             ctx.fillStyle = 'white'
             let uname = cartelcim.user.username; 
             if (uname.length > 10) { 
               uname = uname.slice(0, 5); 
             } 
         
             ctx.fillText(`${uname}`, canvas.width / 9, 85); 
     
             ctx.font = '45px "Marlin Geo Black"';
             ctx.fillStyle = 'white'
             ctx.fillText(`${tarihsel(cartelcim.user.createdAt)}`, canvas.width / 1.63, 75, 150, 400);
             
             ctx.font = '29px "Marlin Geo Black"';
             ctx.fillStyle = 'white'
             ctx.fillText(`${tarihsel(cartelcim.joinedAt)}`, canvas.width / 1.23, 75, 200, 400);
             
             
             ctx.font = '17px "Marlin Geo Black"';
             ctx.fillStyle = '#090909';
             ctx.fillText(`${client.sureCevir(genelSesToplam)}`, canvas.width / 4.84, 208, 100, 400);

        
            ctx.font = '17px "Marlin Geo Black"'; 
            ctx.fillStyle = '#090909'; 
            ctx.fillText(`${toplammesaj} mesaj`, canvas.width / 4.55, 250, 100, 400); 
            let toplamyayinbilgisi = 0
            if(kullanicidata.Streaming) {
             kullanicidata.Streaming.map(stream => {
                 toplamyayinbilgisi += Number(stream.End - stream.Start)
                }) 
            }
            let kameracik = 0;

            const kameraBul = kullanicidata.Voices.find(x => x.state === "KAMERA AÇTI");
            const kameraaa = kullanicidata.Voices.find(xx => xx.state === "KAMERA KAPATTI");
            
            if (kameraBul) {
                if (Array.isArray(kameraBul)) {
                    kameraBul.forEach(stream => {
                        kameracik += Number(kameraaa.date - stream.date);
                    });
                } else {
                    kameracik = 0;
                }
            } else {
                kameracik = 0; 
            }

                 
            ctx.font = '17px "Marlin Geo Black"'; 
            ctx.fillStyle = '#090909'; 
            ctx.fillText(`${client.sureCevir(toplamyayinbilgisi)}.`, canvas.width / 4.75, 303, 100, 400); 


          
            
           
       const attachment = new MessageAttachment(canvas.toBuffer(), 'bar.png');
         //çalışmıyor =>  const sorumlulukBar = _statSystem.staffs.some(xs => cartelcim.roles.cache.has(xs.rol)) && _statSystem.staffs.length > 0 ? `${progressBar(puanBilgisi ? puanBilgisi.Mission.Sorumluluk.toFixed(1) : 0, puanBilgisi.Mission.Sorumluluk.toFixed(1))}` : ""*/
  ///////İNDEKSLER
  function repeat(arg1, arg2) {
    let result = '';
    for (let i = 0; i < arg2; i++) {
      result += arg1;
    }    
    return result;
  }
  ////////
  
  
  /////
  
   let sonMesaj = SonGörülme ? SonGörülme.lastMessage ? `<t:${String(SonGörülme.lastMessage).slice(0, 10)}:R>` : `Bulunamadı.` : `Bulunamadı.`
   let sonSes = SonGörülme ? SonGörülme.lastVoice ?  `<t:${String(SonGörülme.lastVoice).slice(0, 10)}:R>` : `Bulunamadı.` : `Bulunamadı.`
  let xd = `${client.sureCevir(Date.now() - puanBilgisi.yetkiVerilmeTarihi)}`
      let x = `${userData.yetkiVeren ? sorumlusu ? `${sorumlusu}` : `<@${userData.yetkiVeren}> (\`Sunucudan Ayrılmış!\`)`  : `\`Otomatik başlatılmış. \`` }`
   let xs = ` ${anneni.yetkiVerilmeTarihi ? ` <t:${String(Date.parse(anneni.yetkiVerilmeTarihi)).slice(0, 10)}:R>` : `"Bulunamadı."`}`

const sesS = []
   const rolde = moment(puanBilgisi.Rolde).format("LLL")
  
    
  const carpicik = `${message.guild.emojiyiBul("carpi")}`
  const yesilcik = `${message.guild.emojiyiBul("tik")}`
   let sorumlu = await Sorumluluk.find({})
   let kayitliGun = moment().diff(moment(anneni.yetkiVerilmeTarihi), "days") + 1;

   let sonucMetni = ""; 
   
   for (let gun = 1; gun <= 3; gun++) {
     if (gun <= kayitliGun) {
       sonucMetni += yesilcik; 
     } else {
       sonucMetni += carpicik; 
     }
   }
let kgun = moment().diff(moment(anneni.Rolde),"days") + 1;

let mtn = ""; 

for (let gun = 1; gun <= 7; gun++) {
  if (gun <= kgun) {
    mtn += yesilcik; 
  } else {
    mtn += carpicik; 
  }
}
   
   ///////////////////
   let liderlikler = sorumlu.filter(x => x.name.includes("Lider") || x.name.includes("lider"))
        let sorumluluklar = sorumlu.filter(x => x.name.includes("Sorumlu") || x.name.includes("sorumlu") || x.name.includes("Sorumlusu") || x.name.includes("sorumlusu"))
        let diğerler = sorumlu.filter(x => !x.name.includes("Sorumlu") && !x.name.includes("sorumlu") && !x.name.includes("Sorumlusu") && !x.name.includes("sorumlusu") && !x.name.includes("Lider") && !x.name.includes("lider"))
        let genelsorumluluklar = [] 
        liderlikler.map(x =>  genelsorumluluklar.push(x.name)) 
        sorumluluklar.map(x =>  genelsorumluluklar.push(x.name))
        diğerler.map(x => genelsorumluluklar.push(x.name))
    
   let yarraminYetkilisi = ``;
  
   let durumNeBakion = Math.floor((puanBilgisi ? puanBilgisi.Point.toFixed(1) : 0)/puanBelirt*100)
   let sorumlulukaga = Math.floor((puanBilgisi ? puanBilgisi.Mission.Sorumluluk.toFixed(1): 0)/sorumlulukPuanBul*100)
   let gorevAga = Math.floor((puanBilgisi ? puanBilgisi.Görev.toFixed(1): 0)/sorumlulukPuanBul*100)
   if(sorumlulukaga < 5 ) yarraminYetkilisi = `Sorumluluk puanını yükseltmelisin.`
   if(sorumlulukaga < 10 ) yarraminYetkilisi = `Sorumluluk puanlarını yükseltmelisin.`
   if(gorevAga < 15) yarraminYetkilisi = `Görevlerini tamamlamalısın.`
   if(gorevAga < 25) yarraminYetkilisi = `Görev puanlarını yükseltmelisin.`
  if(durumNeBakion < 30) yarraminYetkilisi = `Verilerini yükseltmelisin.`
if(durumNeBakion >= 60) yarraminYetkilisi = `Devam etmelisin.`
  if(durumNeBakion >= 100 ) yarraminYetkilisi = `Toplantıda değerlendirileceksin.`
  
const testtttttttt = []
  

var emoji = "";
if (public <  ms("15h")) {
  emoji = "🟥";
} else if (public  >= ms("15h") && public < ms("30h")) {
  emoji = "🟨";
} else {
  emoji = "✅";
}
  let bireysel = userData.Meetings ? userData.Meetings.sort((a, b) => b.Date - a.Date).filter(x => x.Status && x.Meeting != "BİREYSEL" && x.Status == "KATILDI") : []
   const testt = userData.Meetings ? userData.Meetings.sort((a, b) => b.Date - a.Date).filter(x => x.Status && x.Meeting == "GENEL" && x.Status == "KATILDI") : []
   const toplantı = `${testt}` ? `${yesilcik}`: `${carpicik}`
   const bireyselToplanti = `${bireysel}` ? `${yesilcik}`: `${carpicik}`


let siralamabul = await Upstaff.find({})
let siralamacik = 0
let geçildic = 1
let yetkisiralama = 0
siralamabul.filter(x => message.guild.members.cache.has(x._id)).sort((a, b) => b.ToplamPuan - a.ToplamPuan).forEach((veri, index) => {
  if(veri._id == cartelcim.id) siralamacik = index + 1
  if(veri._id != cartelcim.id) geçildic += 1
})
siralamabul.filter(x => message.guild.members.cache.has(x._id)).sort((a, b) => b.Yetkili - a.Yetkili).forEach((veri, index) => {
  if(veri._id == cartelcim.id) yetkisiralama = index + 1
  
})
let belirt = _statSystem.staffs.sort((a, b) => {
  let a_rol = message.guild.roles.cache.get(a.rol)
  let b_rol = message.guild.roles.cache.get(b.rol)
  if(a_rol && b_rol) return b_rol.rawPosition - a_rol.rawPosition
  })
  let pub = 0;
  let kayit = 0;
  let genel = 0;  





   
  const hedefPuan = puanBelirt;
const gercekPuan = puanBilgisi ? puanBilgisi.Point.toFixed(1) : 0;

const yuzde = (gercekPuan / hedefPuan) * 100;
const yuvarla1 = Math.min(yuzde, 100);
const yüzdeGösterPuan = Math.round(yuvarla1)
//////////////////////////////////////
const hedefBul = sorumlulukPuanBul;
const suankiPuan = puanBilgisi ? puanBilgisi.Görev.toFixed(1) : 0;

const yuzdee = (suankiPuan / hedefBul) * 100;
const yuvarla = Math.min(yuzdee, 100);
const yüzdeGösterGörev = Math.round(yuvarla)


//////////////////////////////////////

const hdfBul = sorumlulukPuanBul;
const guncel = puanBilgisi ? puanBilgisi.Mission.Sorumluluk.toFixed(1) : 0;

const yüzde = (guncel / hdfBul) * 100;
const yuvarla2 = Math.min(yüzde, 100);
const yüzdeGösterSrml = Math.round(yuvarla2)

//////////////////////////////////////
let bulundugurol =  belirt.indexOf(belirt.find(x => x.rol == eskiRol.rol))
let text = ``;

const görevAlanlar = await require("../../../../database/Schemas/Plugins/Client.GörevAlanlar").findOne({ _id: cartelcim.id});

if (görevAlanlar && görevAlanlar.Görevi) {
  text = görevAlanlar.Görevi;
} else {
  text = `Görev seçmelisin!`;
}
let metn = ``;
if(görevAlanlar && görevAlanlar.Tarihi) {
  metn = `\`• Görev Seçme Tarihi    :\` ${tarihsel(görevAlanlar.Tarihi)}`
}
const today = moment();
const targetBul = puanBelirt;
const gunlukLimit = 7;
let suan = puanBilgisi.Point;

const yuzdeUlasilan = Math.min(suan / targetBul, 100);

const minimumGnlKazanc = (targetBul * 0.5) / gunlukLimit;
const gunlukHedef = targetBul / gunlukLimit;
const kalanGunler = gunlukLimit - 1;
let metiN = "";

if (kalanGunler > 0) {
  const gunlerdeKazanc = Math.max(minimumGnlKazanc, (targetBul - suan) / kalanGunler);
  suan += gunlerdeKazanc;

  if (kalanGunler === 1) {
    suan = 0; 
  }

  const gunler = Math.ceil((targetBul - suan) / gunlerdeKazanc);
  const tahminiTarih = today.clone().add(gunler, 'days');
  metiN = tahminiTarih.format('YYYY-MM-DD');
} else {
  suan = 0;
  metiN = "Hedefe ulaşıldı";
}
 const günBul =  moment().diff(moment(puanBilgisi.yetkiVerilmeTarihi), 'days')
 const günGöster = günBul === 0 ? 1 : günBul;
const gunFarki = Math.min(3, moment().diff(moment(puanBilgisi.yetkiVerilmeTarihi), 'days'));
message.channel.send({ content: null,components:[yetkiSayfalama],embeds: [ new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true, size: 2048}))

.açıklama(`${cartelcim} kişisinin ${günGöster} günlük yetkili durumu;

 ${message.guild.emojiyiBul("unlem")} Genel bilgiler

${metn}
\`• Rol                   : \` ${Number(bulundugurol) + 1}. ROL
\`• Sıralama              : \` #${siralamacik}
\`• Yetkiyi veren/tarihi  : \` ${x} / ${xs}
\`• Değerlendirme Saati   : \` ${client.sureCevir(aylık)} ${emoji}
\`• Yetki Süresi          : \`  ${sonucMetni} (${gunFarki} gün / 3 gün)
\`• Son Ses Aktifliği     : \` ${sonSes} 
\`• Son Mesaj Aktifliği   : \` ${sonMesaj}
\`• Genel Toplantı Katılım : \` ${toplantı}
\`• Bireysel Toplantı Katılım : \` ${bireyselToplanti}

 ${message.guild.emojiyiBul("unlem")} Oranlar

\`• Görev                 :\` ${text}
\`• Sorumluluk            :\` ${genelsorumluluklar.join(", ") || `Sorumluluk Bulunamadı.`} 
\`• Yetki İlerleme Oranı  :\` 
${s} (%${yüzdeGösterPuan})
\`• Görev İlerleme Oranı  :\`
${gorevBar} (%${yüzdeGösterGörev})
\`• Sorumluluk İlerleme Oranı  :\`
${sorumlubar} (%${yüzdeGösterSrml})

Durum: \`${yarraminYetkilisi}\`   
`)]})
  
.then(msg => {
  const filter = i => i.user.id == message.member.id 
  const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 50000 })
  collector.on("collect", async (i) => {
    if(i.customId === "sonra") {
      msg.delete().catch(err => {})
      let kom = client.commands.find(x => x.name == "point")
      kom.komutClient(client, message, args)
     
  }
  collector.on("end", async () => {
    yetkiSayfalama.components[0].setDisabled(true)
    yetkiSayfalama.components[1].setDisabled(true)
    await i.deferUpdate()
  });
  })
})


  
function capitalizeIt(str) {
  if (str && typeof (str) === "string") {
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
      if (str[i]) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
    }
    return str.join(" ");
  } else {
    return str;
  }
}


function getContent(duration) {
  let arr = []
  if (duration / 3600000 > 1) {
    let val = parseInt(duration / 3600000)
    let durationn = parseInt((duration - (val * 3600000)) / 60000)
    arr.push(`${val} saat`)
    arr.push(`${durationn} dk.`)
  } else {
    let durationn = parseInt(duration / 60000)
    arr.push(`${durationn} dk.`)
  }
  return arr.join(", ")
}
function calculateDaysToReachGoal(targetPoints, dailyAverage) {
  const remainingDays = Math.ceil(targetPoints / dailyAverage);
  return remainingDays;
}
  
  }
}
  