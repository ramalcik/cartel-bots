const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");
const Jail = require('../../../../database/Schemas/Punitives.Jails')
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const getLimit = client.fetchJailLimit = new Map();
module.exports = {
    name: "jail",
    command: ["cezalı","cezalandır"],
    aliases: "cezalı <@cartel/ID>",
    description: "Belirtilen üyeyi cezalandırır.",
    category: "yetkili",
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
    if(!ayarlar && !roller && !roller.jailHammer || !roller.üstYönetimRolleri || !roller.yönetimRolleri || !roller.kurucuRolleri || !roller.altYönetimRolleri) return message.reply(cevaplar.notSetup)
    if(!roller.jailHammer.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(cartelcim.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(!cartelcim.manageable) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.dokunulmaz)]})
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    const sebeps = [
        { label: "Kışkırtma, Trol ve Dalgacı Davranış", description: "3 Gün", emoji: {name: "1️⃣"} , value: "1", date: "3d", type: 3},
        { label: `Ortamı (${ayarlar.serverName}) Kötülemek`, description: "5 Gün", emoji: {name: "2️⃣"} ,value: "2", date: "5d", type: 3},
        { label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", description: "1 Gün", emoji: {name: "3️⃣"} ,value: "3", date: "1d", type: 3},
        { label: "Sunucu Düzeni Ve Huzursuzluk Yaratmak", description: "4 Gün", emoji: {name: "4️⃣"} ,value: "4", date: "4d", type: 3},
        { label: "Kayıt Odalarında Gereksiz Trol Yapmak", description: "3 Gün", emoji: {name: "5️⃣"}, value: "5", date: "3d", type: 3},
    ]
    let jailButton = new MessageButton()
    .setCustomId(`onayla`)
    .setLabel(await Jail.findById(cartelcim.id) ? `Cezalı.` : getLimit.get(message.member.id) >= ayarlar.jailLimit ? `Limiti geçmiş (${getLimit.get(message.member.id) || 0} / ${ayarlar.jailLimit})` : 'Onayla')
    .setStyle('SECONDARY')
    .setDisabled(await Jail.findById(cartelcim.id) ? true : getLimit.get(message.member.id) >= ayarlar.jailLimit ? true : false )
    let iptalButton =  new MessageButton()
    .setCustomId(`iptal`)
    .setLabel('İptal')
    .setStyle('DANGER')
    let jailOptions = new MessageActionRow().addComponents(
            jailButton,
            iptalButton
    );

    let msg = await message.reply({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.displayAvatarURL({dynamic: true})).açıklama(`Belirtilen ${cartelcim} kişiyi cezalandırmak istediğinize emin misiniz?`)], components: [jailOptions]}).catch(err => {})

    const filter = i => i.user.id == message.member.id 
    const collector = msg.createMessageComponentCollector({ filter,  errors: ["time"], max: 3, time: 30000 })

    collector.on('collect', async i => {
        if (i.customId === `onayla`) {
            i.update({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.displayAvatarURL({dynamic: true})).açıklama(`Belirtilen ${cartelcim} isimli kişisini hangi sebep ile cezalandırmak istiyorsun?\n${!roller.kurucuRolleri.some(x => message.member.roles.cache.has(x)) && !sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !message.member.permissions.has('ADMINISTRATOR') ? Number(ayarlar.jailLimit) ? `Kullanılabilir Limit: \`${getLimit.get(message.member.id) || 0} / ${ayarlar.jailLimit}\`` : `` : ``}`)], components: [new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId(`sebep`)
                .setPlaceholder(`Ceza sebebi belirtin!`)
                .addOptions([
                    sebeps.filter(x => x.type == 3)
                ]),
            )]})
            }
        if (i.customId === `sebep`) {
           let seçilenSebep = sebeps.find(x => x.value == i.values[0])
           if(seçilenSebep) {
               if(getLimit.get(message.member.id) >= ayarlar.jailLimit) return i.update({components: [], embeds: [ new richEmbed().açıklama(`${cartelcim} kişisinin cezalandırma limiti dolduğundan işlem yapamadım.`)]});
                if(Number(ayarlar.jailLimit)) {
                    if(!message.member.permissions.has('ADMINISTRATOR') && !sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) {
                        getLimit.set(`${message.member.id}`, (Number(getLimit.get(`${message.member.id}`) || 0)) + 1)
                        setTimeout(() => {
                            getLimit.set(`${message.member.id}`, (Number(getLimit.get(`${message.member.id}`) || 0)) - 1)
                        },1000*60*5)
                    }
                }
          
                i.update({components: [], embeds: [ new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({ dynamic: true})).açıklama(`${cartelcim} kişisine <&${roller.cezalıRolü}> rolü verildi.`)]})
                cartelcim.removeStaff()
                cartelcim.dangerRegistrant()
                return cartelcim.addPunitives(seçilenSebep.type, message.member, seçilenSebep.label, message, seçilenSebep.date)
        } else {
               return i.update({components: [], embeds: [ new richEmbed().açıklama(`${cartelcim} kişisini cezalandıramadım.`)]})
           }
         }
        if (i.customId === `iptal`) {
            msg.delete().catch(err => {})
           
        }
    });
    collector.on("end", async i => {
        msg.delete().catch(err => {})
    })

    }
};

