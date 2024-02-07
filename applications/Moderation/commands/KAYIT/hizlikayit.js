const { Client, Message, MessageActionRow, MessageButton} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Users = require('../../../../database/Schemas/Client.Users');
const Mutes = require('../../../../database/Schemas/Punitives.Mutes');
 const ayaramk = require('../../../../database/Schemas/Global.Guild.Settings')
 const {VK, DC, STREAM} = require('../../../../database/Schemas/Punitives.Activitys');
module.exports = {
    name: "hızlıkayıt",
    command: ["hızlıKayıt"],
    aliases: "hızlıKayıt",
    description: "",
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
    if (!sistem.Rooter.Users.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) {
        return message.channel.send({ embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true })).açıklama(``)] });
    }

    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    client.on('interactionCreate', async (i) => {
      let member = await i.guild.members.cache.get(i.user.id)

        if (i.customId == "crtl") {
            const User = await Users.findOne({ _id: i.user.id});

            if (!User || !User.Gender || !User.Name) {
                return i.reply({ content: "Sistemde Eski Kaydınız Bulunmamaktadır.", ephemeral: true });
            }

            const isKayıtsız = member.roles.cache.some(role => ayarlar.kayıtsızRolleri.includes(role));

              if (User.Gender === "Erkek") {
                await member.roles.add(ayarlar.erkekRolleri);
                await member.roles.remove(ayarlar.kayıtsızRolleri);
                await member.setNickname(`${ayarlar.tagsiz || ""} ${User.Name}`);
                return i.reply({ content: "Kaydınız tamamlandı.", ephemeral: true });
              }
            
              if (User.Gender === "Kadın") {
                await member.roles.add(ayarlar.kadınRolleri);
                await member.roles.remove(ayarlar.kayıtsızRolleri);
                await member.setNickname(`${ayarlar.tagsiz || ""} ${User.Name}`);
                return i.reply({ content: "Kaydınız tamamlandı.", ephemeral: true });
              }
            }

          })
          

const _findServer = await ayaramk.findOne({ guildID: sistem.SUNUCU.GUILD })
    const ayarlar = global.ayarlar = _findServer.Ayarlar
    const hızliKayitAMK = new MessageActionRow().addComponents(
         new MessageButton()
         .setCustomId('crtl')
         .setLabel('HIZLI KAYIT OL')
         .setStyle('DANGER'),
    )

     message.channel.send({ components: [hızliKayitAMK],
        content: 
        `                                      **${sistem.SUNUCU.GUILD_NAME.toUpperCase()} HIZLI KAYIT SİSTEMİ**

Merhaba! ${sistem.SUNUCU.GUILD_NAME} sunucu üyeleri aşağıda bulunan butonu kullanarak daha önceden kayıtlı olduğunuz isim ve roller ile kayıt olabilir ve kayıt işleminizi hızlandırabilirsiniz.

Yeni bir isim veya yaş ile kayıt olmak istiyorsanız, sesli teyit vermeniz gerekmektedir. Ses teyit verip başarıyla kayıt olduktan sonra istediğiniz zaman bu butonu yeni isim ve yaşınızla kayıt olmak için kullanabileceksiniz!

Eğer sunucumuzda yeniyseniz ve hiç kayıt olmadıysanız, sesli kayıt olmak durumundasınız. Bu durumda, hoş geldin, umarım güzel zamanlar geçirirsiniz.`
     })





    async function rolTanımlama(üye, rol) {
        let Mute = await Mutes.findOne({ _id: üye.id });
        let Vk = await VK.findOne({_id: üye.id});
        let Dc = await DC.findOne({_id: üye.id});
        let Stream = await STREAM.findOne({_id: üye.id});
        let startRoles = [...rol]
    
        if(Mute) startRoles.push(ayarlar.muteRolü)
        if(ayarlar.vkCezalıRolü && Vk) startRoles.push(ayarlar.vkCezalıRolü)
        if(ayarlar.dcCezalıRolü && Dc) startRoles.push(ayarlar.dcCezalıRolü)
        if(ayarlar.streamerCezalıRolü && Stream) startRoles.push(ayarlar.streamerCezalıRolü)
        if(ayarlar.type && üye.user.username.includes(ayarlar.tag)) await startRoles.push(ayarlar.tagRolü)
        await üye.roles.set(startRoles).then(async (cartel) => {})
    }

  }
}