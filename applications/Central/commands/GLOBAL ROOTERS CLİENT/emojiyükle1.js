const { Client, Message} = require("discord.js");
const { richEmbed } = require('../../../../base/Funksiyonlar/embed')
module.exports = {
    name: "emojikur",
    command: [""],
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
        { name: "baslangicBar", url: "https://cdn.discordapp.com/emojis/988904537349820426.webp?size=44&quality=lossless" },
        { name: "baslamaBar", url: "https://cdn.discordapp.com/emojis/988904538964623380.webp?size=44&quality=lossless" },
        {name: "warning", url: "https://cdn.discordapp.com/emojis/992534211053486153.webp?size=96&quality=lossless"},
        {name: "mail", url: "https://cdn.discordapp.com/emojis/984956292152061982.webp?size=96&quality=lossless"},
        { name: "doluBar", url: "https://cdn.discordapp.com/emojis/988904540680122439.webp?size=44&quality=lossless" },
        { name: "doluBitisBar", url: "https://cdn.discordapp.com/emojis/988904543905525760.webp?size=44&quality=lossless" },
        { name: "bosBar", url: "https://cdn.discordapp.com/emojis/988904542412357662.webp?size=44&quality=lossless" },
        { name: "bosBitisBar", url: "https://cdn.discordapp.com/emojis/988904545587462206.webp?size=44&quality=lossless" },
        { name: "icon", url: "https://cdn.discordapp.com/emojis/1056279166590394408.png" },
        { name: "miniicon", url: "https://cdn.discordapp.com/emojis/1056279166590394408.png" },
        { name: "sonraki", url:"https://cdn.discordapp.com/emojis/1138547790755147846.webp?size=96&quality=lossless"},
        { name: "geri", url: "https://cdn.discordapp.com/emojis/1138547668235333696.webp?size=96&quality=lossless"},
        { name: "carpi", url: "https://cdn.discordapp.com/emojis/1138548852794855538.webp?size=96&quality=lossless"},
        { name: "tik", url: "https://cdn.discordapp.com/emojis/1138549020239867964.webp?size=96&quality=lossless"},
        { name : "info", url: "https://cdn.discordapp.com/emojis/1182978168940920963.webp?size=96&quality=lossless"},
        { name : "chat", url: "https://cdn.discordapp.com/emojis/1167848929082232882.webp?size=96&quality=lossless"}, 
        { name : "yildiz", url: "https://cdn.discordapp.com/emojis/1181623127525052416.webp?size=96&quality=lossless"}, 
        { name: "unlem", url: "https://cdn.discordapp.com/emojis/1138549098404925440.webp?size=96&quality=lossless"}

      ];
  
     
      emojis.forEach(async (x) => {
        if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
        const emoji = await message.guild.emojis.create(x.url, x.name);
        message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`\`${x.name}\` isminde emoji oluşturuldu. (${emoji.toString()})`)]})

        
      
      });

    }
};