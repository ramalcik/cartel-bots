const { Client, Message, Util} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives')
module.exports = {
    name: "toplubankaldır",
    command: ["toplu-ban-kaldır","bantemizle"],
    aliases: "af <[Toplu Yasaklama Kaldırır]>",
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
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
   
    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    const banneds = await message.guild.bans.fetch()
    await banneds.forEach(async member => {
      await message.guild.members.unban(member.user.id, `Yetkili: ${message.author.id}`)
      await Punitives.findOne({Member: member.user.id, Type: "Yasaklama", Active: true}).exec(async (err, res) => {
        if(res) await Punitives.updateOne({ No: res.No }, { $set: { "Active": false, Expried: Date.now(), Remover: message.member.id} }, { upsert: true })
      })
    });
    if (message) await message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    }
};