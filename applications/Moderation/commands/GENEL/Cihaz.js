const { MessageEmbed, MessageButton, MessageActionRow,  MessageSelectMenu } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Upstaff = require('../../../../database/Schemas/Plugins/Client.Users.Staffs')
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings')
module.exports = {
    name: "cihaz",
    command: ["cihaz"],
    aliases: "cihaz",
    description: "Belirlenen yetkilinin sunucu içerisinde ki bilgileri gösterir ve yükseltir düşürür.",
    category: "diğer",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: async function (client) {
  
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(cartelcim.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    
    if (!cartelcim.presence || cartelcim.presence.status == "offline") return message.channel.send({embeds: [ new richEmbed().açıklama(`${cartelcim} kişisi çevrimdışı olduğu için cihaz bilgisine bakamadım.`)]})
    


    let cihaz = "";
		let yarragim = Object.keys(cartelcim.presence.clientStatus);
    let yarramaq = Object.keys(cartelcim.presence.status)
		if (yarragim[0] == "mobile") cihaz = "Mobil Telefon";
		if (yarragim[0] == "desktop") cihaz = "Masaüstü Uygulama";
		if (yarragim[0] == "web") cihaz = "İnternet Tarayıcısı";

        message.channel.send({embeds: [ new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kullanıcısının kullandığı cihaz;
\`•\` ${cihaz}`)]})

  }
}