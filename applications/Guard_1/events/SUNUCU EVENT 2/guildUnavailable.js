const { GuildMember, MessageEmbed, Message, Guild } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");

 /**
 * @param {Guild} guild
 */


module.exports = async (guild) => {
    let embed = new richEmbed().başlık("Sunucu Kullanılmaz Halde!")
    client.allPermissionClose()
    embed.açıklama(`Sunucu kullanılmaz hale getirildiği için otomatik olarak sunucu içerisindeki tüm yönetici, rol yönet, kanal yönet ve diğer izinleri tamamiyle kapattım.`);
    let loged = guild.kanalıBul("cartelfx");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
}

module.exports.config = {
    Event: "guildUnavailable"
}
