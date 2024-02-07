const {Collection} = require('discord.js');
const Stats = require('../../../../database/Schemas/Plugins/Client.Users.Stats');
const Upstaff = require('../../../../database/Schemas/Plugins/Client.Users.Staffs');
const Tasks = require('../../../../database/Schemas/Plugins/Client.Users.Tasks');
const { richEmbed } = require('../../../../base/Funksiyonlar/embed');
const moment = require('moment')
/**
 * @param { Client } ready
 */

module.exports = async () => {

  let LeaderBoard = await client.guilds.cache.get(sistem.SUNUCU.GUILD).channels.cache.get(kanallar.sıralamaKanalı).send("Ses Sıralaması Yükleniyor...")
  let LeaderBoardiki = await client.guilds.cache.get(sistem.SUNUCU.GUILD).channels.cache.get(kanallar.sıralamaKanalı).send("Mesaj Sıralaması Yükleniyor...")
  if(ayarlar && ayarlar.sıralamaKanalı) checkingLeader()
  setInterval(() => {
    if(ayarlar && ayarlar.sıralamaKanalı) checkingLeader()
  }, 600000);

  async  function checkingLeader() {  
    const data = await Stats.find({guildID: sistem.SUNUCU.GUILD})
    const sureCevir = (duration) => {  
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
        return arr.join(", ") };
    const voiceUsers = data.sort((uye1, uye2) => {
        let uye2Toplam2 = 0;
        if(uye2.voiceStats) uye2.voiceStats.forEach(x => uye2Toplam2 += x);
        let uye1Toplam2 = 0;
        if(uye1.voiceStats) uye1.voiceStats.forEach(x => uye1Toplam2 += x);
        return uye2Toplam2-uye1Toplam2;
    }).slice(0, 30).map((m, index) => {
        let uyeToplam2 = 0;
        if(m.voiceStats) m.voiceStats.forEach(x => uyeToplam2 += x);
        return `\` ${index + 1} \` <@${m.userID}> \`${sureCevir(uyeToplam2)}\``;
    }).join('\n');
    let messageUsers = data.sort((uye1, uye2) => {
        let uye2Toplam = 0;
        if(uye2.voiceStats) uye2.chatStats.forEach(x => uye2Toplam += x);
        let uye1Toplam = 0;
        if(uye1.voiceStats) uye1.chatStats.forEach(x => uye1Toplam += x);
        return uye2Toplam-uye1Toplam;
    }).slice(0, 30).map((m, index) => {
        let uyeToplam = 0;
        if(m.voiceStats) m.chatStats.forEach(x => uyeToplam += x);
        return `\` ${index + 1} \` <@${m.userID}> \`${Number(uyeToplam)} mesaj\``;
    }).join('\n');
    const voiceList = (`${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`)
    const messageList = (`${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`)
    let MessageEdit = new richEmbed()
    MessageEdit.renk("WHITE")
    MessageEdit.üstBaşlık(client.guilds.cache.get(sistem.SUNUCU.GUILD).name, client.guilds.cache.get(sistem.SUNUCU.GUILD).iconURL({dynamic:true}))
    MessageEdit.altBaşlık(`En son değişme ${tarihsel(Date.now())}`)
    LeaderBoard.edit({content: null,embeds: [MessageEdit.açıklama(`Aşağı da \`${client.guilds.cache.get(sistem.SUNUCU.GUILD).name}\` sunucusunun genel ses sıralaması listelenmektedir.\n\n${voiceList}` )]})
    LeaderBoardiki.edit({content: null,embeds: [MessageEdit.açıklama(`Aşağı da \`${client.guilds.cache.get(sistem.SUNUCU.GUILD).name}\` sunucusunun genel mesaj sıralaması listelenmektedir.\n\n${messageList}` )]})
    
  }
 
};

module.exports.config = {
    Event: "ready"
}