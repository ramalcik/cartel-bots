const { Client, Message, MessageEmbed, Guild } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

module.exports = {
    name: "say",
    command: ["istatistik"],
    aliases: "say",
    description: "Sunucunun bütün verilerini gösterir",
    category: "yönetim",
    uzantı: true,

    önClient: function (client) {
      // Ön client işlemleri
    },

    komutClient: async function (client, message, args, guild) {
        if (
            !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) &&
            !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) &&
            !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) &&
            !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) &&
            !message.member.permissions.has('ADMINISTRATOR')
        ) {
            return message.channel.send({
                embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true })).açıklama(cevaplar.yetersiz)]
            });
        }
        message.channel.send({
            embeds: [
                new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true }))
                    .açıklama(`
Sunucumuz da **${global.sayılıEmoji(message.guild.memberCount)}** üye bulunmakta.\n
Sunucumuz da **${global.sayılıEmoji(message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size)}** aktif üye bulunmakta. ${ayarlar.type ? `\nSunucumuz da **${global.sayılıEmoji(message.guild.members.cache.filter(u => u.user.username.includes(ayarlar.tag)).size)}** taglı üye bulunmakta.` : ``}\n
Sunucumuzu boostlayan **${global.sayılıEmoji(message.guild.premiumSubscriptionCount)}** üye bulunmakta.\n
Ses kanallarında ${global.sayılıEmoji(message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").map(channel => channel.members.size).reduce((a, b) => a + b))} üye bulunmakta.`)]})
           }
};