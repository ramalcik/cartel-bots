const { Client, Message, MessageButton, MessageActionRow, MessageAttachment, MessageSelectMenu } = require("discord.js");
const Stats = require('../../../../database/Schemas/Plugins/Client.Users.Stats')
const Upstaff = require('../../../../database/Schemas/Plugins/Client.Users.Staffs');
const Users = require('../../../../database/Schemas/Client.Users')
const moment = require('moment');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const tm = require('../../../../base/Additions/Stats/Time.Manager')
const ms = require('ms');
require('moment-duration-format');
require('moment-timezone');
const table = require('table');
const { StageInstanceManager } = require("discord.js");
let ScreenData = new Map()
const Invite = require('../../../../database/Schemas/Global.Guild.Invites')
module.exports = {
    name: "verilerim",
    command: ["verilerim"],
    aliases: "verilerim <@cartel/ID>",
    description: "Belirlenen üye veya kendinizin istatistik bilgilerine bakarsınız",
    category: "stat",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.guneCevir = (date) => { return moment.duration(date).format('d [gün]'); };
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
      let yayınSüresi = moment.duration(Date.now() - yarram.Start).format('Y [yıl,] M [ay,] d [gün,] h [saat,] m [dakika] s [saniye]')
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

    if(!roller.Yetkiler.some(cartelfx => message.member.roles.cache.has(cartelfx))  && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !_statSystem.staffs.some(xxx => message.member.roles.cache.has(xxx.rol)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`${message.member} kişisinin yetkili rolü bulunamadı.`)]})
    let embed = new richEmbed()
    let embedcik = new richEmbed()
    let embedcikcik = new richEmbed()
   
    let data = await  Stats.findOne({ guildID: sistem.SUNUCU.GUILD, userID: message.member.id })
let userData = await Users.findOne({_id: message.member.id})
    

        
        let top = await Stats.find();
        let kullanicidata =  await Users.findOne({_id: message.member.id})
        let siralamagetir = top.filter(x => message.guild.members.cache.has(x.userID)).sort((a, b) => Number(b.lifeTotalVoiceStats) - Number(a.lifeTotalVoiceStats))
        let genelsiralama =  siralamagetir.find(x => x.userID == message.member.id) ? Number(siralamagetir.indexOf(siralamagetir.find(x => x.userID == message.member.id))) + 1 : `SIRALAMADA BULUNMUYOR!`



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
        message.member._views()
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
                if(key == kanallar.streamerKategorisi) streamer += value
                if(key == kanallar.registerKategorisi) register += value
                if(key == kanallar.sorunCozmeKategorisi) soruncozme += value

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
       
        let datastream = kullanicidata
        let totalStreaming = 0
        let listedStreaming = '';
        if(datastream && !datastream.Streaming) {
            listedStreaming = `Bulunamadı.`
        } else {
          datastream.Streaming.map(stream => {
            totalStreaming += Number(stream.End - stream.Start)
          }) 
        }
        const dataa = await Invite.findOne({ guildID: message.guild.id, userID: message.member.user.id });
        const total = dataa ? dataa.total ? dataa.total  : 0: 0;
                const invMember = await Invite.find({ Inviter: message.member.user.id });
              const tagged = invMember ? message.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) &&  usr.user.username.includes(ayarlar.tag)).size : 0;
        let toplamYayın = moment.duration(totalStreaming).format('h [saat,] m [dk.]')
        if (!args[0]) {
          message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).setThumbnail(message.member.user.avatarURL({dynamic: true})).açıklama(`${message.member} (${message.member.roles.highest}) kişisinin ${day} günlük ses ve yetkili verileri

**• Tüm Kanal Sıralaması**
${Object.keys(aylık).length > 0 ? Object.keys(aylık).sort((x, y) => aylık[y] - aylık[x]).splice(0, 100).map((data, index) => {
let channel = message.guild.channels.cache.get(data);
return `\`${index + 1}.\` ${channel ? channel : "#kanal-silinmiş"}: \`${client.sureCevir(aylık[data])}\``;
}).join("\n") : "Bulunamadı."}

**• Tüm Mesaj Kanal Sıralaması**
${Object.keys(aylıkm).length > 0 ? Object.keys(aylıkm).sort((x, y) => aylıkm[y] - aylıkm[x]).splice(0, 100).map((data, index) => {
  let channel = message.guild.channels.cache.get(data);
  return `\`${index + 1}.\` ${channel ? channel : "#kanal-silinmiş" }: \`${aylıkm[data]} mesaj\``;
}).join("\n") : "Veri bulunamadı"}
`)]})
        }
        if(args[0] == "1") {
          message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).setThumbnail(message.member.user.avatarURL({dynamic: true})).açıklama(`${message.member} (${message.member.roles.highest}) kişisinin **1** günlük ses ve yetkili verileri

          **• Tüm Kanal Sıralaması**
          ${Object.keys(günlük).length > 0 ? Object.keys(günlük).sort((x, y) => günlük[y] - günlük[x]).splice(0, 100).map((data, index) => {
          let channel = message.guild.channels.cache.get(data);
          return `\`${index + 1}.\` ${channel ? channel : "#kanal-silinmiş"}: \`${client.sureCevir(günlük[data])}\``;
          }).join("\n") : "Bulunamadı."}
          
          **• Tüm Mesaj Kanal Sıralaması**
          ${Object.keys(günlükmesaj).length > 0 ? Object.keys(günlükmesaj).sort((x, y) => günlükmesaj[y] - günlükmesaj[x]).splice(0, 100).map((data, index) => {
            let channel = message.guild.channels.cache.get(data);
            return `\`${index + 1}.\` ${channel ? channel : "#kanal-silinmiş" }: \`${günlükmesaj[data]} mesaj\``;
          }).join("\n") : "Veri bulunamadı"}
          `)]})
        }
    }
    }