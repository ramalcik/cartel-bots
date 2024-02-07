const { Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const Afks = require('../../../../database/Schemas/Others/Users.Afks');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed")
module.exports = {
    name: "afk",
    command: ["afk"],
    aliases: "afk <Sebep>",
    description: "Klavyeden uzak iseniz gitmeden önce bu komutu girdiğinizde sizi etiketleyenlere sizin klavye başında olmadığınızı açıklar.",
    category: "diğer",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.on("messageCreate", async (message) => {
      if(!message.guild || message.author.bot || !message.channel || message.channel.type == "dm") return;
      let GetAfk = await Afks.findById(message.member.id);
      if(message.mentions.users.size >= 1){
        let victim = message.mentions.users.first();
        let victimData = await Afks.findById(victim.id);
        if(victimData) {
          let tarih = `<t:${String(Date.parse(victimData.sure)).slice(0, 10)}:R>`;
	  if(GetAfk) {
      		await Afks.findByIdAndDelete(message.member.id)
		message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
	  }
          return message.reply({embeds: [
            new richEmbed().renk("CYAN").üstBaşlık({name: victim.tag, iconURL: victim.displayAvatarURL()}).açıklama(`${victim} kullanıcısı \`${victimData.sebep ? `${victimData.sebep}\` sebebiyle ` : ""} ${tarih} AFK moduna geçti!`)
          ]}).then(x => {
            setTimeout(() => {
                x.delete()
            }, 7500);
        })
        };
      };
      if(!GetAfk) return;
      await Afks.findByIdAndDelete(message.member.id)
      message.reply(`Merhaba **${message.author.tag}** Tekrardan Hoş Geldin.`).then(x => {
        setTimeout(() => {
            x.delete()
        }, 7500);
    })
    });
  },

   /**
   * @param {Client} client
   * @param {Message} message
   * @param {Array<String|Number>} args
   * @returns {Promise<void>}
   */

  komutClient: async function (client, message, args) {
    let GetAfk = await Afks.findById(message.member.id);
    if(GetAfk) return message.reply(`AFK durumdayken tekrardan AFK olamazsın ${message.member}!`).then(x => {
        setTimeout(() => {
            x.delete()
        }, 5000);
    })
    let sebep = args.join(' ') || `Şuan da işim var yakın zaman da döneceğim!`;
    await Afks.updateOne({_id: message.member.id}, { $set: { "sure": new Date(), "sebep": sebep } }, {upsert: true})
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)

    }
};