const { Client, Message, MessageEmbed, MessageButton, MessageActionRow, MessageAttachment } = require("discord.js");
const Canvas = require('canvas')
Canvas.registerFont(`../../images/fonts/theboldfont.ttf`, { family: "Bold" });
const Users = require('../../../../database/Schemas/Client.Users');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
let cooldown = new Map()
module.exports = {
    name: "ship",
    command: ["shippe","love","sanal8"],
    aliases: "ship @cartel/ID",
    description: "Bir üyenin coin bilgisini görüntüler.",
    category: "eco",
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
        if(!message.channel.name.includes("ship")) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})). setDescription(`Kullanmaya çalıştığın komut sadece ${message.guild.channels.cache.filter(x => x.name.includes("ship")).map(x => x).join(", ")} kanalında geçerlidir.`)]})
         if(cooldown.get(message.member.id)) return message.reply({content: `Bu komutu **5** saniyede bir kullanabilirsiniz.`})
        let person = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if (!person || message.author.id === person.id) {
            person = message.guild.members.cache
           .filter(m => m.id !== message.author.id && !roller.kayıtsızRolleri.some(x => m.roles.cache.get(x))) 
           .random();
           if(roller.erkekRolleri.some(x => message.member.roles.cache.has(x))) person = message.guild.members.cache
           .filter(m => m.id !== message.author.id && !roller.kayıtsızRolleri.some(x => m.roles.cache.get(x)) && roller.kadınRolleri.some(x => m.roles.cache.get(x))) 
           .random();
           if(roller.kadınRolleri.some(x => message.member.roles.cache.has(x))) person = message.guild.members.cache
           .filter(m => m.id !== message.author.id && !roller.kayıtsızRolleri.some(x => m.roles.cache.get(x)) && roller.erkekRolleri.some(x => m.roles.cache.get(x))) 
           .random();
           
        }

        person = message.guild.members.cache.get(person.id)
        let özel = [
            "719117042904727635"
        ]
        person._views()
       
        let replies = [
            '5% Aşık!',     '3% Aşık!',
            '10% Aşık!',    '14% Aşık!',
            '17% Aşık!',    '20% Aşık!',
            '22% Aşık!',    '25% Aşık!',
            '24% Aşık!',    '27% Aşık!',
            '32% Aşık!',    '36% Aşık!',
            '34% Aşık!',    '39% Aşık!',
            '42% Aşık!',    '45% Aşık!',
            '47% Aşık!',    '51% Aşık!',
            '54% Aşık!',    '56% Aşık!',
            '59% Aşık!',    '58% Aşık!',
            '60% Aşık!', '63% Aşık!',
            '65% Aşık!', '64% Aşık!',
            '68% Aşık!',  '70% Aşık!',
            '74% Aşık!',  '78% Aşık!',
            '79% Aşık!',  '80% Aşık!',
            '83% Aşık!',  '86% Aşık!',
            '84% Aşık!',  '89% Aşık!',
            '91% Aşık!',  '93% Aşık!',
            '95% Aşık!',  '97% Aşık!',
            '98% Aşık!',  '99% Aşık!',
            '100% Aşık!', 'Evlenmeye mahkumsunuz.'
        ]
        
        let emoti = Math.floor((Math.random()*replies.length))
        let love = replies[emoti]
        let emoticon;
        if(emoti <= 44 && emoti >= 23) {
           emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_2.png?v=1593651528429'); 
        } else if(emoti < 23 && emoti >= 12) {
            emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_3-1.png?v=1593652255529'); 
        } else if(emoti < 11) {
            emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_1.png?v=1593651511900'); 
        }
        const canvas = Canvas.createCanvas(384, 128);
        const ctx = canvas.getContext('2d');
        const emotes = await Canvas.loadImage(emoticon);
        const avatar1 = await Canvas.loadImage(message.member.displayAvatarURL({ format: "png" }));
        const avatar2 = await Canvas.loadImage(person.displayAvatarURL({ format: "png" }));
        ctx.beginPath();
        ctx.moveTo(0 + Number(10), 0);
        ctx.lineTo(0 + 384 - Number(10), 0);
        ctx.quadraticCurveTo(0 + 384, 0, 0 + 384, 0 + Number(10));
        ctx.lineTo(0 + 384, 0 + 128 - Number(10));
        ctx.quadraticCurveTo(
        0 + 384,
        0 + 128,
        0 + 384 - Number(10),
        0 + 128
        );
        ctx.lineTo(0 + Number(10), 0 + 128);
        ctx.quadraticCurveTo(0, 0 + 128, 0, 0 + 128 - Number(10));
        ctx.lineTo(0, 0 + Number(10));
        ctx.quadraticCurveTo(0, 0, 0 + Number(10), 0);
        ctx.closePath();
        ctx.clip();
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 384, 128);
        let background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1087332446644752426/1172235479555522631/IMG_20231109_220449.jpg?ex=655f945d&is=654d1f5d&hm=e050c4adb6dcae5da218778f2a6272a30addd38ebb6a9f802085defeaa500d4f&");
        ctx.drawImage(background, 0, 0, 384, 129);
        ctx.beginPath();
        ctx.globalAlpha = 0.5
        ctx.fillStyle = "#000000";
        
      
        
        ctx.fillStyle = "#000000";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(55, 5, 275, 115);
    ctx.globalAlpha = 1;
        
        ctx.drawImage(avatar1, 70, 12, 100, 100);
        ctx.drawImage(avatar2, 215, 12, 100, 100);
        ctx.drawImage(emotes, 150, 20, 75, 75);
      
        const img = new MessageAttachment(canvas.toBuffer(), 'ship.png')
        message.reply({components: [], content: `${person}`,content: `${person} & ${message.member}
Aşık mısınız? **${love}**`, files: [img]})
    
        cooldown.set(message.author.id, true)
        setTimeout(() => {
            if(cooldown.get(message.member.id)) cooldown.delete(message.author.id)
        }, 5000);
        
    }
};