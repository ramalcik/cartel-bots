const Discord = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "rolsay",
    command: ["rol-say"],
    aliases: "rolsay <Rol-ID>",
    description: "Belirtilen roldeki üyeleri sayar.",
    category: "yönetim",
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
    let embed = new richEmbed()
    if(!roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]}) 
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if (!role) return message.reply({content: ` Sayabilmem için lütfen bir rol belirtiniz.`, ephemeral: true })
    const member = role.members.map(e => `<@!${e.id}>`).join(",")
    message.member.Leaders("rol", 0.01, {type: "ROLE", role: role.id, channel: message.channel.id})
    await message.channel.send(Discord.Formatters.codeBlock("js", `Sunucumuzda ${role.name} | ${role.id} rolünde ${role.members.size < 1 ? "kimse bulunmuyor" : role.members.size + " kişi bulunuyor"}`))
    if (role.members.size >= 1) {
        const arr = Discord.Util.splitMessage(member, { maxLength: 1950, char: "," });
        arr.forEach(element => {
            message.channel.send(Discord.Formatters.codeBlock("js", element));
        });
    }
   }
};