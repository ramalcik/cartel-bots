const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const {VK, DC, STREAM} = require('../../../../database/Schemas/Punitives.Activitys');
module.exports = {
    name: "streamercezalı",
    command: ["streamercezali","streamer-cezali","streamer-cezalı","streamcezalı","streamcezali","stream-cezalı","stream-cezali"],
    aliases: "streamcezalı <@cartel/ID>",
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
    if(!ayarlar && !roller && !roller.streamerCezalıRolü) return message.reply(cevaplar.notSetup)
    let aktivite = "Streamer"
    if(!roller.streamerSorumlusu.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.sorunÇözmeciler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(cartelcim.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(!cartelcim.manageable) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.dokunulmaz)]})
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    const sebeps = [
        { label: "Kışkırtma, Trol ve Dalgacı Davranış", description: "3 Gün", emoji: {name: "1️⃣"} , value: "1", date: "3d", type: 9},
        { label: "Karşı Cinse Taciz Ve Rahatsız Edici Davranış", description: "3 Gün", emoji: {name: "2️⃣"} ,value: "2", date: "3d", type: 9},
        { label: `Ortamı (${ayarlar.serverName}) Kötülemek`, description: "5 Gün", emoji: {name: "3️⃣"} ,value: "3", date: "5d", type: 9},
        { label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", description: "1 Gün", emoji: {name: "4️⃣"} ,value: "4", date: "1d", type: 9},
        { label: "Dini, Irki ve Siyasi değerlere Hakaret", description: "5 Gün", emoji: {name: "5️⃣"} ,value: "5", date: "5d", type: 9},
        { label: "Yayınlarda Pornografi Ve Uygunsuz İçerik Paylaşma", description: "7 Gün", emoji: {name: "6️⃣"}, value: "6", date: "7d", type: 9},
    ]
    let jailButton = new MessageButton()
    .setCustomId(`onayla`)
    .setLabel(await STREAM.findById(cartelcim.id) ? `Cezalı.` : 'Onayla')
    .setStyle('SECONDARY')
    .setDisabled(await STREAM.findById(cartelcim.id) ? true : false )
    let iptalButton =  new MessageButton()
    .setCustomId(`iptal`)
    .setLabel('İptal')

    .setStyle('DANGER')
    let jailOptions = new MessageActionRow().addComponents(
            jailButton,
            iptalButton
    );

    let msg = await message.reply({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.displayAvatarURL({dynamic: true})).açıklama(`Belirtilen ${cartelcim} kişiyi yayıncı odalarıda cezalandırmak istiyor musun?`)], components: [jailOptions]}).catch(err => {})

    const filter = i => i.user.id == message.member.id 
    const collector = msg.createMessageComponentCollector({ filter,  errors: ["time"], max: 3, time: 30000 })

    collector.on('collect', async i => {
        if (i.customId === `onayla`) {
            i.update({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.displayAvatarURL({dynamic: true})).açıklama(`Belirlenen ${cartelcim} isimli kişisini hangi sebep ile yayıncı odalarından cezalandırmak istiyorsun?`)], components: [new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId(`sebep`)
                .setPlaceholder(`${cartelcim.user.username} için ceza sebebi belirtin!`)
                .addOptions([
                    sebeps.filter(x => x.type == 9)
                ]),
            )]})
            }
        if (i.customId === `sebep`) {
           let seçilenSebep = sebeps.find(x => x.value == i.values[0])
           if(seçilenSebep) {
                i.deferUpdate()  
                msg.delete().catch(err => {})
                message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
                return cartelcim.addPunitives(seçilenSebep.type, message.member, seçilenSebep.label, message, seçilenSebep.date)
        } else {
               return i.update({components: [], embeds: [ new richEmbed().açıklama(`İşlem sırasında hata oluştu lütfen bot sahibine başvurun.`)]})
           }
         }
        if (i.customId === `iptal`) {
            msg.delete().catch(err => {})
            return await i.update({ content: `${cartelcim} kişisinin **${aktivite}** cezalandırılma işlemi başarıyla iptal edildi.`, components: [], embeds: [] , ephemeral: true});
        }
    });
    collector.on("end", async i => {
        msg.delete().catch(err => {})
    })

    }
};

