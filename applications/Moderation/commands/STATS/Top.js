const { Client, Message, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Stats = require('../../../../database/Schemas/Plugins/Client.Users.Stats')
const moment = require('moment');
require('moment-duration-format');
require('moment-timezone');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Users = require("../../../../database/Schemas/Client.Users")
module.exports = {
    name: "top",
    command: ["topmesaj","topstat","topses"],
    aliases: "top",
    description: "Belirlenen üye veya kullanan üye eğer ki yetkiliyse onun yetki atlama bilgilerini gösterir.",
    category: "stat",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
     const embed = new richEmbed()
    

    let data = await Stats.find({guildID: message.guild.id})
       let data2 = await Users.find()
        data = data.filter(m => message.guild.members.cache.has(m.userID));
        let genelsesbirinci;
        let publicbirinci;
        let mesajbirinci;
        let streamerbirinci;
        let registerbirinci;
        genelPublic = ``
        let PublicListele = data.sort((cartelcim1, cartelcim2) => {
            let cartelcim2Toplam = 0;
            if(cartelcim2.voiceStats) cartelcim2.voiceStats.forEach((x, key) => {
                if(key == kanallar.publicKategorisi) cartelcim2Toplam += x
            });
            let cartelcim1Toplam = 0;
            if(cartelcim1.voiceStats) cartelcim1.voiceStats.forEach((x, key) => {
                if(key == kanallar.publicKategorisi) cartelcim1Toplam += x
            });
            return cartelcim2Toplam-cartelcim1Toplam;
        }).map((m, index) => {
            let cartelcimToplam = 0;
            if(index == 0) publicbirinci = `<@${m.userID}>`
            m.voiceStats.forEach((x, key) => { if(key == kanallar.publicKategorisi) cartelcimToplam += x });


            if(m.userID === message.member.id) {
                if((index + 1) > 20) genelPublic = `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam)}\` **(Siz)**`
            }

            return `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).slice(0, 20).join('\n');
        genelStreamer = ``
        let streamerListele = data.sort((cartelcim1, cartelcim2) => {
            let cartelcim2Toplam = 0;
            if(cartelcim2.voiceStats) cartelcim2.voiceStats.forEach((x, key) => {
                if(key == kanallar.streamerKategorisi) cartelcim2Toplam += x
            });
            let cartelcim1Toplam = 0;
            if(cartelcim1.voiceStats) cartelcim1.voiceStats.forEach((x, key) => {
                if(key == kanallar.streamerKategorisi) cartelcim1Toplam += x
            });
            return cartelcim2Toplam-cartelcim1Toplam;
        }).map((m, index) => {
            let cartelcimToplam = 0;
            if(index == 0) streamerbirinci = `<@${m.userID}>`
            m.voiceStats.forEach((x, key) => { if(key == kanallar.streamerKategorisi) cartelcimToplam += x });
            if(m.userID === message.member.id) {
                if((index + 1) > 20) genelStreamer = `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam)}\` **(Siz)**`
            }

            return `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).slice(0, 20).join('\n');

        genelRegister = ``
        let registerListele = data.sort((cartelcim1, cartelcim2) => {
            let cartelcim2Toplam = 0;
            if(cartelcim2.voiceStats) cartelcim2.voiceStats.forEach((x, key) => {
                if(key == kanallar.registerKategorisi) cartelcim2Toplam += x
            });
            let cartelcim1Toplam = 0;
            if(cartelcim1.voiceStats) cartelcim1.voiceStats.forEach((x, key) => {
                if(key == kanallar.registerKategorisi) cartelcim1Toplam += x
            });
            return cartelcim2Toplam-cartelcim1Toplam;
        }).map((m, index) => {
            let cartelcimToplam = 0;
            if(index == 0) registerbirinci = `<@${m.userID}>`
            
            m.voiceStats.forEach((x, key) => { if(key == kanallar.registerKategorisi) cartelcimToplam += x });
            if(m.userID === message.member.id) {
                if((index + 1) > 20) genelRegister = `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam)}\` **(Siz)**`
            }
            return `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).slice(0, 20).join('\n');

       let genelSes = ``;
       let sesSıralaması = data.sort((cartelcim1, cartelcim2) => {
            let cartelcim2Toplam2 = 0;
            if(cartelcim2.voiceStats) cartelcim2.voiceStats.forEach(x => cartelcim2Toplam2 += x);
            let cartelcim1Toplam2 = 0;
            if(cartelcim1.voiceStats) cartelcim1.voiceStats.forEach(x => cartelcim1Toplam2 += x);
            return cartelcim2Toplam2-cartelcim1Toplam2;
        }).map((m, index) => {
            let cartelcimToplam2 = 0;
            if(index == 0) genelsesbirinci = `<@${m.userID}>`
            if(m.voiceStats) m.voiceStats.forEach(x => cartelcimToplam2 += x);
            if(m.userID === message.member.id) {
                if((index + 1) > 20) genelSes = `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam2)}\` **(Siz)**`
            }
            return `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam2)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).slice(0, 20).join('\n');
        let genelMesaj = ``
        let mesajSıralaması = data.sort((cartelcim1, cartelcim2) => {
            let cartelcim2Toplam = 0;
            if(cartelcim2.chatStats) cartelcim2.chatStats.forEach(x => cartelcim2Toplam += x);
            let cartelcim1Toplam = 0;
            if(cartelcim1.chatStats) cartelcim1.chatStats.forEach(x => cartelcim1Toplam += x);
            return cartelcim2Toplam-cartelcim1Toplam;
        }).map((m, index) => {
            let cartelcimToplam = 0;
            if(m.chatStats) m.chatStats.forEach(x => cartelcimToplam += x);
            if(index == 0) mesajbirinci = `<@${m.userID}>`
            if(m.userID === message.member.id) {
                if((index + 1) > 20) genelMesaj = `\`${index + 1}.\` <@${m.userID}> \`${cartelcimToplam} mesaj\` **(Siz)**`
            }
            return `\`${index + 1}.\` <@${m.userID}> \`${Number(cartelcimToplam)} mesaj\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).slice(0, 20).join('\n');


        let genelseseniyi
        let genelToplamSes = ``;
        let genelsesSıralaması = data.sort((cartelcim1, cartelcim2) => {
             let cartelcim2Toplam2 = 0;
             if(cartelcim2.lifeVoiceStats) cartelcim2.lifeVoiceStats.forEach(x => cartelcim2Toplam2 += x);
             let cartelcim1Toplam2 = 0;
             if(cartelcim1.lifeVoiceStats) cartelcim1.lifeVoiceStats.forEach(x => cartelcim1Toplam2 += x);
             return cartelcim2Toplam2-cartelcim1Toplam2;
         }).map((m, index) => {
             let cartelcimToplam2 = 0;
             if(index == 0) genelseseniyi = `<@${m.userID}>`
             if(m.lifeVoiceStats) m.lifeVoiceStats.forEach(x => cartelcimToplam2 += x);
             if(m.userID === message.member.id) {
                if((index + 1) > 20) genelToplamSes = `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam2)}\` **(Siz)**`
            }
             return `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam2)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
         }).slice(0, 25).join('\n');
         let genelmesajbirinci
         let genelToplamMesaj = ``
         let genelmesajSıralaması = data.sort((cartelcim1, cartelcim2) => {
             let cartelcim2Toplam = 0;
             if(cartelcim2.lifeChatStats) cartelcim2.lifeChatStats.forEach(x => cartelcim2Toplam += x);
             let cartelcim1Toplam = 0;
             if(cartelcim1.lifeChatStats) cartelcim1.lifeChatStats.forEach(x => cartelcim1Toplam += x);
             return cartelcim2Toplam-cartelcim1Toplam;
         }).map((m, index) => {
             let cartelcimToplam = 0;
             if(m.lifeChatStats) m.lifeChatStats.forEach(x => cartelcimToplam += x);
             if(index == 0) genelmesajbirinci = `<@${m.userID}>`
             if(m.userID === message.member.id) {
                if((index + 1) > 20) genelToplamMesaj = `\`${index + 1}.\` <@${m.userID}> \`${cartelcimToplam} mesaj\` **(Siz)**`
            }
             return `\`${index + 1}.\` <@${m.userID}> \`${Number(cartelcimToplam)} mesaj\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
         }).slice(0, 25).join('\n');

       


if (!args[0]) {
return message.channel.send({ embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`**30** günlük **Ses** Top **25** sıralaması aşağıda belirtilmiştir.

${genelsesSıralaması ? genelsesSıralaması + `\n${genelToplamSes ? genelToplamSes : ``}` : "`Ses aktifliği bulunamadı."}

`)]})
}

if (args[0] == "st") {   
    let kom = client.commands.find(x => x.name == "topstreaming")
    kom.komutClient(client, message, args)
}


if (args[0] == "inv") {
    let kom = client.commands.find(x => x.name == "topdavet")
    kom.komutClient(client, message, args)
}

 if (args[0] == "tag") {
    let kom = client.commands.find(x => x.name == "toptaglı")
    kom.komutClient(client, message, args)

 }

  if (args[0] == "yetkili") {
   let kom = client.commands.find(x => x.name == "topyetkili")
   kom.komutClient(client, message, args)

  }

  if (args[0] == "teyit") {
    let kom = client.commands.find(x => x.name == "topteyit")
   kom.komutClient(client, message, args)
  }
   if (args[0] == "görev") {
    let kom = client.commands.find(x => x.name == "topgörev")
    kom.komutClient(client, message, args)
   }
    if (args[0] == "mesaj") {
        return message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`**30** günlük **Mesaj** Top **25** sıralaması aşağıda belirtilmiştir.
        
${mesajSıralaması ? mesajSıralaması + `\n${genelMesaj ? genelMesaj : ``}` : "`Bu sunucuda mesaj aktifliği bulunamadı."}       
`)]})
    }


             
  }
};