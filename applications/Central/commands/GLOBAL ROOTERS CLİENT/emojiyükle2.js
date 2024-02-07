const { Client, Message, MessageEmbed} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed")
module.exports = {
    name: "emojikur2",
    command: ["x"],
    aliases: "",
    description: "",
    category: "-",
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
    const emojis = [
        { name: "cartel_onay", url: "https://cdn.discordapp.com/emojis/1068635426560163961.webp?size=96&quality=lossless" },
        { name: "cartel_red", url: "https://cdn.discordapp.com/emojis/753907650617540709.webp?size=96&quality=lossless" },
        { name: "serverTag", url: "https://media.discordapp.net/attachments/836639098696368138/836639301730566154/829760837174165505.gif" },
        { name: "voiceDeaf", url: "https://cdn.discordapp.com/emojis/1117425426931912756.webp?size=96&quality=lossless"},
        { name: "boostluNitro", url: "https://cdn.discordapp.com/emojis/1053668151537176626.png"},
        { name: "klasikNitro", url: "https://cdn.discordapp.com/emojis/1056279152732409976.gif"},
        { name: "exxen", url: "https://cdn.discordapp.com/emojis/899301271985602600.png?size=44"},
        { name: "spotify", url: "https://cdn.discordapp.com/emojis/1053668141672173642.png"},
        { name: "netflix", url: "https://cdn.discordapp.com/emojis/1066419991924178984.png"},
        { name: "youtube", url: "https://cdn.discordapp.com/emojis/972311869840842792.png"},
        { name: "bluetv", url: "https://cdn.discordapp.com/emojis/907344822187229234.png?size=96"},
        

    ];

  
      emojis.forEach(async (x) => {
        if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
        const emoji = await message.guild.emojis.create(x.url, x.name);
        message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`)]})
      });

    }
};