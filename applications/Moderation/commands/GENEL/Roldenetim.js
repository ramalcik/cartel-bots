const Discord = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "roldenetle",
    command: ["rol-denetle","roldenetim","rol-denetim"],
    aliases: "roldenetim <Rol-ID>",
    description: "Belirtilen bir rolün üyelerinin seste olup olmadığını ve rol bilgilerini gösterir.",
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
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(x => x.name.includes(args[0])) || message.guild.rolüBul(args[0])
      if (!role) return message.channel.send({ embeds: [ embed.üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Bir rol belirtve tekrar dene.`)]})
      let unVoice = role.members.filter(member => !member.voice.channel);
      let list = 1
      let veri = `${tarihsel(Date.now())} Tarihinde ${message.member.user.username} tarafından istenmiştir!\n` + role.members.map((e) => e ? `#${list++}  ID: ${e.id} - İsim: ${e.displayName} - ${e.voice.channel ? "Seste" : "Seste Değil"}` : "sa").join("\n")
      message.member.Leaders("rol", 0.01, {type: "ROLE", role: role.id, channel: message.channel.id})
      await message.channel.send({
      content: ` Aşağıda ${tarihsel(Date.now())} tarihinde istenen **${role.name}** isimli rol bilgisi ve rol denetimi belirtilmiştir. (**Dosya içerisinde genel seste olan olmayan olarak üyeleri listelenmiştir.**)
${Discord.Formatters.codeBlock("fix", "Rol: " + role.name + " | " + role.id + " | " + role.members.size + " Toplam Üye | " + unVoice.size + " Seste Olmayan Üye")}`,
      files: [{
         attachment: Buffer.from(veri),
         name: `${role.id}-bilgileri.txt`
     }]})
      message.channel.send(`Aşağıda **${role.name}** (\`${role.id}\`) isimli rolünün seste olmayan üyeleri sıralandırılmıştır.`).then(xx => {
         const arr = Discord.Util.splitMessage(`${unVoice.map(e => `<@${e.id}>`).join(", ")}`, { maxLength: 1950, char: "," });
         arr.forEach(element => {
            message.channel.send(Discord.Formatters.codeBlock("diff", element));
         });
      })
   }
};