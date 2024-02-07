const { Client, Message, MessageActionRow, MessageButton} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Users = require('../../../../database/Schemas/Client.Users');
 const Punitives = require("../../../../database/Schemas/Global.Punitives")
module.exports = {
    name: "isim",
    command: ["i","nick", "k"],
    aliases: "isim <@cartel/ID> <İsim/Nick>",
    description: "Belirtilen üyenin ismini ve yaşını güncellemek için kullanılır.",
    category: "teyit",
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
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!roller.teyitciRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    let uyarısıVar = await Punitives.findOne({Member: cartelcim.id, Type: "Uyarılma"})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(cartelcim.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(!cartelcim.manageable) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.dokunulmaz)]})
        if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    if(ayarlar.taglıalım && ayarlar.taglıalım != false && !cartelcim.user.username.includes(ayarlar.tag) && !cartelcim.roles.cache.has(roller.boosterRolü) && !cartelcim.roles.cache.has(roller.vipRolü) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.taglıalım)]})
   
    if(Date.now()-cartelcim.user.createdTimestamp < 1000*60*60*24*7 && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yenihesap)]})
    if(cartelcim.roles.cache.has(roller.şüpheliRolü) && cartelcim.roles.cache.has(roller.cezalıRolü) && cartelcim.roles.cache.has(roller.underworldRolü) &&  cartelcim.roles.cache.has(roller.yasaklıTagRolü) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username,message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.cezaliüye)]})
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    if(!isim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Bir isim belirmelisin!`)]})
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(ayarlar.isimYaş && !yaş) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(`Bir yaş belirtmelisin!`)]})
    if (ayarlar.isimYaş && yaş < ayarlar.minYaş) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersizyaş)]})
    if(ayarlar.isimYaş) {
            setName = `${isim} | ${yaş}`;
    } else {
            setName = `${isim}`;
    }
    if(ayarlar.zorunluTeyit && !cartelcim.voice.channel  && !cartelcim.roles.cache.has(roller.boosterRolü) && !cartelcim.roles.cache.has(roller.vipRolü) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({ embeds: [ new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({ dynamix: true})).açıklama(`${cartelcim}, kişisinin kayıt işlemi gerçekleştirilemedi.Kişi sesli kanalda olduktan sonra tekrar deneyin.`)]})
    let sesMute = await Punitives.find({Member: cartelcim.id, Type: "Ses Susturulma"})
    let chatMute = await Punitives.find({Member: cartelcim.id, Type: "Metin Susturulma"})
    let Cezali = await Punitives.find({Member: cartelcim.id, Type: "Cezalandırılma"})
    let Uyari = await Punitives.find({Member: cartelcim.id , Type: "Uyarılma"})
let cezaPuanı = await cartelcim.cezaPuan()
if(cezaPuanı >= 100 && !message.member.permissions.has('ADMINISTRATOR') && (roller.sorunÇözmeciler && !roller.sorunÇözmeciler.some(x => message.member.roles.cache.has(x))) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) return message.channel.send({
embeds: [

    new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true}))
    .açıklama(`🚫 ${cartelcim.toString()} kişisinin toplam \`${cezaPuanı}\` ceza puanı 
olduğu için kayıt işlemi iptal edildi. Sunucumuzda tüm 
işlemlerin kayıt altına alındığını unutmayın. Sorun Teşkil eden, 
sunucunun huzurunu bozan ve kurallara uymayan kullanıcılar 
sunucumuza kayıt olamazlar. 
Belirtilen üye toplamda ${Cezali} adet cezalı,
${chatMute} adet chat-mute, ${sesMute} adet voice-mute, ${Uyari} adet uyarı almış.
           
    
    `)

]
})
const embedxd = new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true}))
    
    if(ayarlar.isimYaş) {
            setName = `${isim} | ${yaş}`;
    } else {
            setName = `${isim}`;
    }

    cartelcim.setNickname(`${ayarlar.type ? cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ``}${setName}`).catch(err => message.channel.send({embeds: [ new richEmbed().açıklama(cevaplar.isimapi)]}));
    var filter = msj => msj.author.id === message.author.id && msj.author.id !== client.user.id;
        let isimLog = message.guild.kanalıBul("isim-log")
    if(isimLog) isimLog.send({embeds: [new richEmbed().açıklama(`${cartelcim} kişisinin ismi ${message.member} tarafından \`${tarihsel(Date.now())}\` tarihinde "${ayarlar.isimYaş ? `${isim} | ${yaş}` : `${isim}`}" olarak güncellendi.`)]})
   const embedcik = embedxd.açıklama(`${cartelcim} kişisinin ismi "${ayarlar.isimYaş ? `${isim} | ${yaş}` : `${isim}`}" ismine değiştirildi.
    `)


        const cinsiyetrow = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId("erkekxy")
                .setLabel("ERKEK")
                .setDisabled(roller.erkekRolleri.some(x => cartelcim.roles.cache.has(x)) ? true : false && roller.kadınRolleri.some(x => cartelcim.roles.cache.has(x)) ? true : false)
                .setStyle("PRIMARY"),
                new MessageButton()
                .setCustomId("kadinxx")
                .setLabel("KADIN")
                .setDisabled(roller.kadınRolleri.some(x => cartelcim.roles.cache.has(x)) ? true : false && roller.erkekRolleri.some(x => cartelcim.roles.cache.has(x)) ? true : false)
                .setStyle("DANGER")
        )
      
        var  filter = i => i.user.id === message.member.id;
        const secimcik = await message.channel.send({embeds: [embedcik], components: [cinsiyetrow]})
        const collector = secimcik.createMessageComponentCollector({ filter: filter, time: 20000});

collector.on('collect', async i => {
if (i.customId === 'erkekxy') {
        cinsiyetrow.components[0].setDisabled(true)
        cinsiyetrow.components[1].setDisabled(true)
        i.deferUpdate();

    await secimcik.edit({ components: [cinsiyetrow], embeds: [new richEmbed().açıklama(`${cartelcim} kişisinin ismi "${ayarlar.isimYaş ? `${isim} | ${yaş}` : `${isim}`}" ismine değiştirildi.

**ERKEK** olarak kaydedildi.`)]})

    cartelcim.setNickname(`${ayarlar.type ? cartelcim.user.username.includes(ayarlar.tag)  ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ``}${setName}`).catch(err => message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username,message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.isimapi)]}));
    cartelcim.Register(`${setName}`, "Erkek", message.member);
    client.Upstaffs.addPoint(message.member.id,_statSystem.points.record, "Kayıt")
 
}
if (i.customId === 'kadinxx') {
    i.deferUpdate();
        cinsiyetrow.components[1].setDisabled(true)
        cinsiyetrow.components[0].setDisabled(true)

    await secimcik.edit({components: [cinsiyetrow],  embeds: [new richEmbed().açıklama(`${cartelcim} kişisinin ismi "${ayarlar.isimYaş ? `${isim} | ${yaş}` : `${isim}`}" ismine değiştirildi.

**KADIN** olarak kaydedildi.`)] })
    
    cartelcim.setNickname(`${ayarlar.type ? cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ``}${setName}`).catch(err => message.channel.send({embeds: [ new richEmbed().üstBaşlık(message.member.user.username,message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.isimapi)]}));
    cartelcim.Register(`${setName}`, "Kadın", message.member);
    client.Upstaffs.addPoint(message.member.id,_statSystem.points.record, "Kayıt")
 
}
});
collector.on('end', collected => {});
return;

    }
};

