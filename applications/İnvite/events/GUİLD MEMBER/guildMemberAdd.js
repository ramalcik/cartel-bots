const { Collection } = require('discord.js')
const alwaysJoined = new Collection()
const Users = require('../../../../database/Schemas/Client.Users');
const Jails = require('../../../../database/Schemas/Punitives.Jails');
const VMutes = require('../../../../database/Schemas/Punitives.Vmutes');
const Mutes = require('../../../../database/Schemas/Punitives.Mutes');
const Forcebans = require('../../../../database/Schemas/Punitives.Forcebans');
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Settings = require('../../../../database/Schemas/Global.Guild.Settings');
const Welcome = require('../../../../database/Schemas/Others/Guild.Welcome.Settings');
const {VK, DC, STREAM} = require('../../../../database/Schemas/Punitives.Activitys');
const { richEmbed } = require('../../../../base/Funksiyonlar/embed');
const getInvite = new Collection()


 /**
 * @param {Client} client 
 */

client.on("ready", () => {
  setInterval(() => {
    console.log(`[Giriş-Çıkış Temizleme] ${alwaysJoined.length || 0} veri temizlendi.`)
    alwaysJoined.map((çıkgir, id) => {
      alwaysJoined.delete(id)
    })
  }, 1000 * 60 * 60 * 1)

})

module.exports = async (member) => {
    if(member.guild.id != global.sistem.SUNUCU.GUILD) return;
 
    let User = await Users.findOne({ _id: member.id }) 
    let Jail = await Jails.findOne({ _id: member.id });
    let Forceban = await Forcebans.findOne({ _id: member.id });
    let Underworld =  await Punitives.findOne({Member: member.id, Type: "Underworld", Active: true})
    const _findServer = await Settings.findOne({ guildID: sistem.SUNUCU.GUILD })
    const _set = global._set = _findServer.Ayarlar
    let OneWeak = Date.now()-member.user.createdTimestamp <= 1000*60*60*24*7;
    member = member.guild.members.cache.get(member.id)
    let cezaPuan = await member.cezaPuan()
    let amkSürekliÇıkıyoGiriyo = alwaysJoined.get(member.id) || 0
    if(amkSürekliÇıkıyoGiriyo >= 3) {
      let hgKanalı = member.guild.channels.cache.get(_set.hoşgeldinKanalı)
      if(hgKanalı) hgKanalı.send({embeds: [new richEmbed().açıklama(`${member} sunucuya sürekli fazla giriş yaptığı için sunucudan yasaklandı.`)]}).then(x => {})
      alwaysJoined.delete(member.id)
      return await member.ban({reason: "Sürekli Çıkış/Giriş işlemi uygulamak."})
    } else {
      if(!member) return;
      let getir = alwaysJoined.get(member.id) || 0
      alwaysJoined.set(member.id, getir + 1)
    }
   
      await member.setNickname(`Kayıtsız`).catch(err => {});
      if(member && member.manageable && _set.type && _set.isimYaş) await member.setNickname(`${member.user.username.includes(_set.tag) ? _set.tag : (_set.tagsiz ? _set.tagsiz : (_set.tag || ""))} İsim | Yaş`)
      if(member && member.manageable && !_set.type && _set.isimYaş) await member.setNickname(`İsim | Yaş`)
      if(member && member.manageable && !_set.type && !_set.isimYaş) await member.setNickname(`Kayıtsız`)
      if(member && member.manageable && _set.type && !_set.isimYaş) await member.setNickname(`${member.user.username.includes(_set.tag) ? _set.tag : (_set.tagsiz ? _set.tagsiz : (_set.tag || ""))} Kayıtsız`)
      const GUILD_INVITE = require('../../../../database/Schemas/Global.Guild.Invites');
      const inviterData = await GUILD_INVITE.findOne({ guildID: member.guild.id, userID: member.user.id });
    if(OneWeak) {
        await member.setRoles(_set.şüpheliRolü)
        await member.guild.channels.cache.get(_set.hoşgeldinKanalı).send({embeds: [new richEmbed().üstBaşlık(member.user.username, member.user.avatarURL({ dynamic: true})).açıklama(`${member} üyesi, sunucumuza katıldı. Ancak hesabı, olağandan önce açıldığı için <@&${_set.şüpheliRolü}> rolüyle karşılandı.`)]});
        return member.guild.kanalıBul("şüpheli-log").send({embeds: [new richEmbed().üstBaşlık(member.user.username, member.user.avatarURL({ dynamic: true})).açıklama(`${member} üyesi, sunucumuza katıldı. Ancak hesabı, olağandan önce açıldığı için <@&${_set.şüpheliRolü}> rolüyle karşılandı, ${inviterData ? inviterData.inviter : `ÖZEL URL`} tarafından davet edilmiş.`)]});
    };
    if(_set.yasakTaglar && _set.yasakTaglar.some(tag => member.user.username.includes(tag))) {
        await member.setRoles(_set.yasaklıTagRolü)
member.send(`**Merhaba!** ${member}
İsminde bulunan **\` ${_set.yasakTaglar.find(x => member.user.username.includes(x))} \`** bu tag yasaklandığı için sizi yasaklı kategorisine ekledik.
\`\`\`
Üzerinizde bulunan yasaklı tag çıkarıldığında kayıtlı iseniz otomatik kayıt olacaksınız kayıtlı değilseniz kayıtsıza tekrardan düşeceksiniz.
\`\`\``).catch(err => {})
        await member.guild.kanalıBul("yasaklı-tag-log").send({embeds: [new richEmbed().açıklama(`${member} sunucuya katıldı fakat isminde yasaklı tag barındırdığından dolayı yasaklı olarak işaretlendi.`)]});
        return member.guild.channels.cache.get(_set.hoşgeldinKanalı).send({embeds: [new richEmbed().üstBaşlık(member.user.username, member.user.avatarURL({ dynamic: true})).açıklama(`${member} sunucumuza katıldı, ancak ismindeki \`Yasaklı Tag\` sebebiyle cezalandırıldı`)]});
    };
    if(Jail) {
        await member.setRoles(_set.jailRolü)
        return member.guild.channels.cache.get(_set.hoşgeldinKanalı).send({embeds: [new richEmbed().üstBaşlık(member.user.username, member.user.avatarURL({ dynamic: true})).açıklama(`${member} sunucumuza katıldı, ancak önceki bir cezalandırılması nedeniyle tekrar cezalandırıldı.`)]});
    };
    if(Underworld) {
      await member.setRoles(_set.underworldRolü)
      return member.guild.channels.cache.get(_set.hoşgeldinKanalı).send({embeds: [new richEmbed().üstBaşlık(member.user.username, member.user.avatarURL({ dynamic: true})).açıklama(`${member} sunucumuza katıldı fakat aktif bir Underworld cezası bulunduğu için tekrardan Underworld'e gönderildi.`)]});
    };
    if(Forceban) {
        await member.ban({ reason: 'Forceban tarafından yasaklandı.' })
        return member.guild.channels.cache.get(_set.hoşgeldinKanalı).send({embeds: [new richEmbed().üstBaşlık(member.user.username, member.user.avatarURL({ dynamic: true})).açıklama(`${member} sunucumuza katıldı. fakat Kalkmazban sistemi ile yasaklandığından dolayı sunucumuzda tekrar yasaklandı.`)]});
    };
    if(cezaPuan >= 50) {
    	await member.setRoles(_set.jailRolü)
	    await member.send({embeds: [new richEmbed().açıklama(`Merhaba Kullanıcı; \`\`\` Ceza puanın 50'nin üzerinde olduğu için cezalı olarak olarak belirlendin.
\`\`\`fix
Ceza Puanın: \`${cezaPuan}\``)]}).catch(x => {});
      return member.guild.channels.cache.get(_set.hoşgeldinKanalı).send({embeds: [new richEmbed().üstBaşlık(member.user.username, member.user.avatarURL({ dynamic: true})).açıklama(`${member} isimli kullanıcı sunucumuza katıldı, fakat Ceza puanı \`50\` üzeri olduğu için cezalı olarak belirlendi.`)]});
    }
      await rolTanımlama(member,_set.kayıtsızRolleri);
   


client.on('inviteCreate', async invite => {
    invite.guild.invites.fetch().then((guildInvites) => {
        const cacheInvites = new Collection();
        guildInvites.map((inv) => {
          cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
        });
        getInvite.set(invite.guild.id, cacheInvites);
      });
})

client.on('inviteDelete', async invite => {
    setTimeout(async () => {
        invite.guild.invites.fetch().then((guildInvites) => {
          const cacheInvites = new Collection();
          guildInvites.map((inv) => {
            cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
          });
          getInvite.set(invite.guild.id, cacheInvites);
        });
      }, 5000)
})

client.on('ready', async () => {
    const guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
    guild.invites.fetch().then((guildInvites) => {
      const cacheInvites = new Collection();
      guildInvites.map((inv) => {
        cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
      });
      getInvite.set(guild.id, cacheInvites);
    });
})

    ayarlar = _set
    const guildInvites = getInvite.get(member.guild.id) || new Collection()
    const invites = await member.guild.invites.fetch();
    const invite = invites.find((inv) => guildInvites.has(inv.code) && inv.uses > guildInvites.get(inv.code).uses) || guildInvites.find((x) => !invites.has(x.code)) || member.guild.vanityURLCode;
    const cacheInvites = new Collection();
    invites.map((inv) => { cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter }); });
    getInvite.set(member.guild.id, cacheInvites);
    
      let hoşgeldinKanal = member.guild.channels.cache.get(_set.hoşgeldinKanalı) || member.guild.kanalıBul(_set.hoşgeldinKanalı)
      
      let Data = await Welcome.findOne({guildId: member.guild.id})
      const total = inviterData ? inviterData.total : 0;
  const sunucuname = member.guild.name
                 hoşgeldinKanal.send({content:` ${member} sunucumuza hoş geldin.

Hesabın **${global.tarihsel(member.user.createdAt)}** 1tarihinde ${global.timeTag(Date.parse(member.user.createdAt))} oluşturulmuş.
                 
Ceza-i İşlemler kurallara göre verilmektedir, sunucuya kayıt olduktan sonra ${member.guild.kanalıBul(_set.kurallarKanalı)} kanalını okuduğunuzu varsayarak ceza uygulanacaktır.
                 
Sunucumuza katılan ${global.sayılıEmoji(member.guild.memberCount)} üyesin.
                 
${member.guild.channels.cache.filter(x => x.parentId == kanallar.registerKategorisi && x.type == "GUILD_VOICE").random()} sesli kanalına katılıp "İsim" verip kayıt olabilirsin.
                 
Tagımızı alarak veya takviye yaparak bize destek olabilirsiniz.`}).catch(err => { 
  client.logger.log("Lütfen sunucu üzerinden hoşgeldin kanalını belirtin. Bir üye girdi fakat hoşgeldin mesajı atamadım.","error")
})
}

async function rolTanımlama(üye, rol) {
    let Mute = await Mutes.findOne({ _id: üye.id });
    let Vk = await VK.findOne({_id: üye.id});
    let Dc = await DC.findOne({_id: üye.id});
    let Stream = await STREAM.findOne({_id: üye.id});
    let startRoles = [...rol]

    if(Mute) startRoles.push(_set.muteRolü)
    if(_set.vkCezalıRolü && Vk) startRoles.push(_set.vkCezalıRolü)
    if(_set.dcCezalıRolü && Dc) startRoles.push(_set.dcCezalıRolü)
    if(_set.streamerCezalıRolü && Stream) startRoles.push(_set.streamerCezalıRolü)
    if(_set.type && üye.user.username.includes(_set.tag)) await startRoles.push(_set.tagRolü)
    await üye.roles.set(startRoles).then(async (cartel) => {})
}

module.exports.config = {
    Event: "guildMemberAdd"
};