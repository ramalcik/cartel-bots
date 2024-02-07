const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");
const Jail = require('../../../../database/Schemas/Punitives.Jails')
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const getLimit = new Map();
module.exports = {
    name: "reklam",
    command: ["ads","reklam-cezalandır"],
    aliases: "reklam <@cartel/ID>",
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
    if(!roller.jailHammer.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.altYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(cartelcim.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(!cartelcim.manageable) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.dokunulmaz)]})
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    let jailButton = new MessageButton()
    .setCustomId(`onayla`)
    .setLabel(await Jail.findById(cartelcim.id) ? `Cezalı.` : getLimit.get(message.member.id) >= ayarlar.reklamLimit ? `Limiti geçmiş (${getLimit.get(message.member.id) || 0} / ${ayarlar.reklamLimit})` : 'Onayla')
    .setStyle('SECONDARY')
    .setDisabled(await Jail.findById(cartelcim.id) ? true : getLimit.get(message.member.id) >= ayarlar.reklamLimit ? true : false )
    let iptalButton =  new MessageButton()
    .setCustomId(`iptal`)
    .setLabel('İptal')
    .setStyle('DANGER')
    let jailOptions = new MessageActionRow().addComponents(
            jailButton,
            iptalButton
    );

    let msg = await message.reply({content: `Belirtilen ${cartelcim} kişiyi reklam gerekçesiyle kalıcı bir şekilde cezalandırmak istiyor musun?`, components: [jailOptions]}).catch(err => {})

    const filter = i => i.user.id == message.member.id 
    const collector = msg.createMessageComponentCollector({ filter,  errors: ["time"], max: 3, time: 30000 })

    collector.on('collect', async i => {
        if (i.customId === `onayla`) {
            i.deferUpdate()  
            msg.delete().catch(err => {})
            message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
            cartelcim.removeStaff()
            cartelcim.dangerRegistrant()
            if(Number(ayarlar.reklamLimit)) {
                if(!message.member.permissions.has('ADMINISTRATOR') && !sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra))) {
                    getLimit.set(`${message.member.id}`, (Number(getLimit.get(`${message.member.id}`) || 0)) + 1)
                    setTimeout(() => {
                        getLimit.set(`${message.member.id}`, (Number(getLimit.get(`${message.member.id}`) || 0)) - 1)
                    },1000*60*5)
                }
            }
            return cartelcim.addPunitives(31, message.member, "Sunucu içerisinde reklam yapmak!", message)

            }
        if (i.customId === `iptal`) {
            return await i.update({ content: `${cartelcim} kişisinin cezalandırılma işlemi başarıyla iptal edildi.`, components: [], embeds: [] });
        }
    });
    collector.on("end", async i => {
        msg.delete().catch(err => {})
    })

    }
};

