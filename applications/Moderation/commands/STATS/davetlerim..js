const { Client, Message, MessageEmbed} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Invite = require('../../../../database/Schemas/Global.Guild.Invites')
module.exports = {
    name: "invite",
    command: ["davet","davetlerim"],
    aliases: "invite <@cartel/ID>",
    description: "Belirtilen üye veya komutu kullanan üyenin davet bilgilerini görüntüler.",
    category: "stat",
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
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const data = await Invite.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = data ? data.total ? data.total  : 0: 0;
    const regular = data ? data.regular ? data.regular  : 0: 0;
    const bonus = data ? data.bonus ? data.bonus  : 0: 0;
    const leave = data ? data.leave ? data.leave  : 0: 0;
    const fake = data ? data.fake ? data.fake  : 0: 0;
    const invMember = await Invite.find({ Inviter: member.user.id });
    const bazıları = invMember ? invMember.filter(value => message.guild.members.cache.get(value.userID)).slice(0, 7).map((value, index) => message.guild.members.cache.get(value.userID)).join(", ") : undefined
    const daily = invMember ? message.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && Date.now() - usr.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? message.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && Date.now() - usr.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
    const tagged = invMember ? message.guild.members.cache.filter((usr) => invMember.some((x) => x.userID === usr.user.id) && usr.user.username.includes(ayarlar.tag)).size : 0;
    message.channel.send({
      embeds: [new richEmbed().üstBaşlık(member.user.username, member.user.avatarURL({ dynamic: true })).açıklama(`${member} kişi toplam **${total + bonus}** (**Bonus**: \` +${bonus} \`) davete sahip. (**${regular}** giren, ${ayarlar.type ? ` **${tagged}** taglı, ` : ``}**${leave}** ayrılmış, **${fake}** sahte, **${daily}** günlük, **${weekly}** haftalık)

`)]
    });

    }
};