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
const { createCanvas, loadImage} = require("canvas")
const Punitives = require("../../../../database/Schemas/Global.Punitives")
module.exports = {
    name: "me",
    command: ["me"],
    aliases: "me <@cartel/ID>",
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

    
    let embed = new richEmbed()
    let embeddaq = new richEmbed()
    let embeddaqcik = new richEmbed()
   
    let data = await  Stats.findOne({ guildID: sistem.SUNUCU.GUILD, userID: cartelcim.id })

   
        let Upstaffs = await Upstaff.findOne({_id: cartelcim.id})
        let top = await Stats.find();
        let kullanicidata =  await Users.findOne({_id: cartelcim.id})

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
        })
        let SonGörülme = await Seens.findOne({userID: cartelcim.id}) 
        let sonMesaj = SonGörülme ? SonGörülme.lastMessage ? `<t:${String(SonGörülme.lastMessage).slice(0, 10)}:R>` : `Bulunamadı.` : `Bulunamadı.`
        let sonSes = SonGörülme ? SonGörülme.lastVoice ?  `<t:${String(SonGörülme.lastVoice).slice(0, 10)}:R>` : `Bulunamadı.` : `Bulunamadı.`
        await message.channel.send({ 
            embeds: [
                new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({ dynamic: true}))
                .açıklama(`${cartelcim} istatistik bilgilerin aşağıda belirtilmiştir.

${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`SON MESAJ ATILMA TARİHİ   \` ${sonMesaj}
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`HESAP OLUŞTURMA TARİHİ    \` **${tarihsel(cartelcim.user.createdAt)}**
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`SUNUCUYA GİRİŞ TARİHİ     \` **${tarihsel(cartelcim.joinedAt)}**

${message.guild.emojiyiBul(emojiler.chat)} __GÜNLÜK/HAFTALIK MESAJ İSTATİKLERİ__

${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`GÜNLÜK MESAJ İSTATİĞİ  \` **${günlükmesaj}** MESAJ
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`HAFTALIK MESAJ İSTATİĞİ \` **${haftalıkmesaj}** MESAJ

${message.guild.emojiyiBul(emojiler.voiceDeaf)} __GÜNLÜK/HAFTALIK SES İSTATİKLERİ__

${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`GÜNLÜK SES İSTATİĞİ  \` **${client.sureCevir(günlükses)}**
${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`HAFTALIK SES İSTATİĞİ \` **${client.sureCevir(haftalikSesToplam)}**

${message.guild.emojiyiBul(emojiler.yildiz)} __KANAL İSTATİSTİK BİLGİLERİ__

${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`MESAJ VERİLERİ\`
${Object.keys(aylıkm).length > 0 ? Object.keys(aylıkm).sort((x, y) => aylıkm[y] - aylıkm[x]).splice(0, 10).map((data, index) => {
  let channel = message.guild.channels.cache.get(data);
  return `\`-\` ${channel ? channel : "#kanal-silinmiş" }: \`${aylıkm[data]} MESAJ\``;
}).join("\n") : "Veri bulunamadı"}

${message.guild.emojiyiBul(emojiler.Terfi.miniicon)} \`SES VERİLERİ\`
${Object.keys(aylık).length > 0 ? Object.keys(aylık).sort((x, y) => aylık[y] - aylık[x]).splice(0, 100).map((data, index) => {
  let channel = message.guild.channels.cache.get(data);
  return `\`-\` ${channel ? channel : "#kanal-silinmiş"}: \`${client.sureCevir(aylık[data])}\``;
  }).join("\n") : "Bulunamadı."}

`)
            ]
        })
    }
}