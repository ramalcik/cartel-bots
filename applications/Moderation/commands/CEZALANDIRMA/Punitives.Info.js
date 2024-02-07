const { Client, Message, MessageEmbed} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const { richEmbed } = require('../../../../base/Funksiyonlar/embed')
const moment = require('moment');
require('moment-duration-format');
require('moment-timezone');
const ms = require('ms');

module.exports = {
    name: "info",
    command: ["cezabilgi"],
    aliases: "info <#Ceza-No>",
    description: "Belirtilen ceza numarasının bütün bilgilerini gösterir.",
    category: "diğer",
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
   
    if(!Number(args[0])) return message.channel.send({embeds: [ new richEmbed().açıklama(`Bir ceza numarası belirt ve tekrar dene.`)]})
    let res = await Punitives.findOne({ No: args[0]})
    if(!res) return message.channel.send({embeds: [ new richEmbed().açıklama(`Belirttiğin ceza numarasının veri tabanında kayıdı bulunamadı.`)]})
        // Cezalanan Üye
        let cezalanan = await client.getUser(res.Member);
        let cezalananbilgi;
        if(cezalanan != `\`Bulunamayan Üye\`` && cezalanan.username) cezalananbilgi = `${cezalanan} (\`${cezalanan.id}\`)`;
        if(!cezalananbilgi) cezalananbilgi = "<@"+res.Member+">" + `(\`${res.Member}\`)`
        // Ceza Veren Üye
        let yetkili = await client.getUser(res.Staff);
        let yetkilibilgi;
        if(yetkili != `\`Kişi Bulunamadı.\`` && yetkili.username) yetkilibilgi = `${yetkili} (\`${yetkili.id}\`)`;
        if(!yetkilibilgi) yetkilibilgi = "Bulunamadı."
        // Manuel Komut İle Kaldırıldıysa
        let kaldırılmadurumu;
        if(!res.Remover) kaldırılmadurumu = `` 
        if(res.Remover) kaldırılmadurumu = "• Ceza'yı Kaldıran: " + `${await client.getUser(res.Remover) ? message.guild.members.cache.get(res.Remover) ? message.guild.members.cache.get(res.Remover) : `<@${res.Remover}> (\`${res.Remover}\`)` : `<@${res.Remover}> (\`${res.Remover}\`)` }`
        message.channel.send({embeds: [new richEmbed().açıklama(`**Ceza Detayı** (\`#${res.No}/${res.Type}\`)
• Üye Bilgisi: ${cezalanan}
• Yetkili Bilgisi: ${yetkili}
• Ceza Tarihi: \`${tarihsel(res.Date)}\`
• Ceza Süresi: \`${res.Duration ? moment.duration(res.Duration - res.Date).format('M [Ay,] d [Gün,] h [Saat,] m [Dakika] ') : "Kalıcı"}\`
• Ceza Durumu: \`${res.Active == true ? "Aktif ✅" : "Aktif Değil ❎"}\`
${kaldırılmadurumu}`).sütun(`Ceza Sebebi`,`\`${res.Reason}\``)]})
    }
};