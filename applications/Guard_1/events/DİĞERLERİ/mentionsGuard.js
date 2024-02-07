const { GuildMember, MessageEmbed, GuildChannel, Permissions, Message } = require("discord.js");
const fs = require('fs');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');
 /**
 * @param {Message} oldMessage
 * @param {Message} newMessage
 */


module.exports = async (oldMessage, newMessage) => {
    let embed = new richEmbed().üstBaşlık(newMessage.member.user.username, newMessage.member.user.avatarURL({ dynamic: true})).başlık("Sunucuda Duyuru Atıldı!")
    if ((newMessage.content.includes('@everyone') || newMessage.content.includes('@here'))) { 
        const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
        let Data = await Guard.findOne({guildID: oldMessage.guild.id})
        if(Data && !Data.everyoneGuard) return;
        let _findServer = await GUILDS_SETTINGS.findOne({ guildID: sistem.SUNUCU.GUILD })
        const _set = _findServer.Ayarlar
        let cartelcim = newMessage.member;
      
        let güvenlidemi = await client.checkMember(newMessage.author.id, undefined ,"Gereksiz Duyuru Kullanımı!") || _set.chatİzinliler && _set.chatİzinliler.includes(newMessage.member.id)
        if(await client.checkMember(newMessage.author.id, undefined ,"Gereksiz Duyuru Kullanımı!") || _set.chatİzinliler && _set.chatİzinliler.includes(newMessage.member.id)) return;
        await newMessage.delete()
        client.punitivesAdd(cartelcim.id, "jail")
        let ceza = `jail`
       // client.allPermissionClose()
        embed.açıklama(`${cartelcim} (\`${cartelcim.id}\`) kişisi sunucu içerisinde duyuru kullandı.

Silinen Duyuru Mesajı: ${newMessage || `Mesaj silinmedi.`} 
Silinen Tarih: ${tarihsel(Date.now()) || `Tarih bulunamadı.`}
Verilmesi Gereken Ceza: **Cezalı**
Durum: \`${güvenlidemi ? `Cezalandırıldı` : `Güvenlide olduğu için cezalandırılmadı.`}\``);
        let loged = newMessage.guild.kanalıBul("cartelfx");
        if(loged) await loged.send({embeds: [embed]});
        const owner = await newMessage.guild.fetchOwner();
        if(owner) owner.send({embeds: [embed]}).catch(err => {})
        client.processGuard({
            type: "İzinsiz Duyuru Kullanımı!",
            target: newMessage.author.id,
        })
    }
}

module.exports.config = {
    Event: "messageUpdate"
}


/**
 * @param {Client} client 
 * @param {Message} message
 */

client.on("messageCreate", async (message) => {
    let embed = new richEmbed().başlık("Sunucuda Duyuru Atıldı!")
    if ((message.content.includes('@everyone') || message.content.includes('@here'))) { 
        const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
        let Data = await Guard.findOne({guildID: message.guild.id})
        if(Data && !Data.everyoneGuard) return;
        let _findServer = await GUILDS_SETTINGS.findOne({ guildID: sistem.SUNUCU.GUILD })
        const _set = _findServer.Ayarlar
        let cartelcim = message.member;
        if(!cartelcim.permissions.has('MENTION_EVERYONE')) return;
        if(await client.checkMember(message.author.id, undefined ,"Gereksiz Duyuru Kullanımı!") || _set.chatİzinliler && _set.chatİzinliler.includes(message.member.id)) return;
        await message.delete()
        client.punitivesAdd(cartelcim.id, "jail")
        //client.allPermissionClose()
        let güvenlidemi = await client.checkMember(message.author.id, undefined ,"Gereksiz Duyuru Kullanımı!") || _set.chatİzinliler && _set.chatİzinliler.includes(newMessage.member.id)
        embed.açıklama(`${cartelcim} (\`${cartelcim.id}\`) kişisi sunucu içerisinde duyuru kullandı.
    
Silinen Duyuru Mesajı: ${message || `Mesaj silinmedi.`} 
Silinen Tarih: ${tarihsel(Date.now()) || `Tarih bulunamadı.`}
Verilmesi Gereken Ceza: **Cezalı**
Durum: \`${güvenlidemi ? `Cezalandırıldı` : `Güvenlide olduğu için cezalandırılmadı.`}\``);
        let loged = message.guild.kanalıBul("cartelfx");
        if(loged) await loged.send({embeds: [embed]});
        const owner = await message.guild.fetchOwner();
        if(owner) owner.send({embeds: [embed]})
        client.processGuard({
            type: "İzinsiz Duyuru Kullanımı!",
            target: message.author.id,
        })
    }
})