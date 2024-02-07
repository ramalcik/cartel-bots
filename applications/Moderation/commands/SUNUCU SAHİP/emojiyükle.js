const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

module.exports = {
    name: "emojiyükle",
    command: ["emojioluştur", "emojiekle", "emekle", "emyükle"],
    aliases: "emojiyükle <Emoji/Emoji Bağlantısı> <Emoji Adı>",
    description: "",
    category: "kurucu",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} msg 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, msg, args) {
        if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === msg.member.user.username) && !msg.member.permissions.has('ADMINISTRATOR') && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
        const hasEmoteRegex = /<a?:.+:\d+>/gm
        const emoteRegex = /<:.+:(\d+)>/gm
        const animatedEmoteRegex = /<a:.+:(\d+)>/gm
        let isim = `Rand_${Math.round((Math.random()*9999))}`
        if(args[1]) isim = `${args[1]}`
        const message = msg.content.match(hasEmoteRegex)
          if (emoji = emoteRegex.exec(message)) return EmojiYükle("https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1", isim, msg)
          else 
          if (emoji = animatedEmoteRegex.exec(message)) return EmojiYükle("https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1", isim, msg)
          else {
            let [link, ad] = args.slice(0).join(" ").split(" ");
            if (!link) return msg.channel.send(`Lütfen bir bağlantı belirtmelisin! __Örn:__ \`${sistem.botSettings.Prefixs[0]}${module.exports.name} <Bağlantı> <Emoji Ismi>\``).then(x => setTimeout(() => { x.delete() }, 7500));
            if (!ad) return msg.channel.send(`Lütfen bir emoji ismi belirtmelisin! __Örn:__ \`${sistem.botSettings.Prefixs[0]}${module.exports.name} <Bağlantı> <Emoji Ismi>\``).then(x => setTimeout(() => { x.delete() }, 7500));
            EmojiYükle(link, ad, msg)
          }
        }
    };
    
    function EmojiYükle(link, ad, message) {
      message.guild.emojis.create(link, ad)
      .then(emoji => message.channel.send({embeds: [new richEmbed().setDescription(`Başarıyla \`${emoji.name}\` adında emoji oluşturuldu. (${emoji})`)]}).then(x => {
        message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)  
          }))
    
      .catch(console.error);
    }