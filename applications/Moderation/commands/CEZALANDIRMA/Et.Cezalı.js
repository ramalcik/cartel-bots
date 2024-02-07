const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const {VK, DC, STREAM} = require('../../../../database/Schemas/Punitives.Activitys');
const Punitives = require('../../../../database/Schemas/Global.Punitives')
module.exports = {
    name: "etcezalı",
    command: ["etcezali","et-cezali","et-cezalı","etkinlikSlave", "etkinlikCezalı", "etkinlikcezalı"],
    aliases: "dccezalı <@cartel/ID>",
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
    if(!ayarlar && !roller && !roller.dcCezalıRolü) return message.reply(cevaplar.notSetup)
    let aktivite = "Etkinlik"
    if(!roller.dcSorumlusu.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.sorunÇözmeciler.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra))  && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    if(cartelcim.user.bot) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.bot)]})
    if(message.author.id === cartelcim.id) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    if(!cartelcim.manageable) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.dokunulmaz)]})
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetkiust)]})
    let dcCezalı = await Punitives.findOne({member: cartelcim.id, type: "Etkinlik Cezalandırma" })
    const sebeps = [
        { label: "Kışkırtma, Trol ve Dalgacı Davranış", description: "3 Gün", emoji: {name: "1️⃣"} , value: "1", date: "3d", type: 12},
        { label: "Karşı Cinse Taciz Ve Rahatsız Edici Davranış", description: "7 Gün", emoji: {name: "2️⃣"} ,value: "2", date: "7d", type: 12},
        { label: `Ortamı (${ayarlar.serverName}) Kötülemek`, description: "5 Gün", emoji: {name: "3️⃣"} ,value: "3", date: "5d", type: 12},
        { label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", description: "1 Gün", emoji: {name: "4️⃣"} ,value: "4", date: "1d", type: 12},
        { label: "Dini, Irki ve Siyasi değerlere Hakaret", description: "10 Gün", emoji: {name: "5️⃣"} ,value: "5", date: "10d", type: 12},
        { label: "Etkinliği Sabote Edicek Şekilde Davranmak", description: "3 Gün", emoji: {name: "6️⃣"}, value: "6", date: "3d", type: 12},
    ]

    let jailOptions = new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId(`sebep`)
        .setPlaceholder(`Ceza sebebi belirt.`)
        .addOptions([
            sebeps.filter(x => x.type == 12)
        ]),
       
          
    );
    

   
    let msg = await message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.displayAvatarURL({dynamic: true})).açıklama(`${cartelcim} kişisini **${aktivite}** etkinliğinde cezalıya atmak istediğinize eminmisiniz?`)], components: [jailOptions]}).catch(err => {})

    const filter = i => i.user.id == message.member.id 
    const collector = msg.createMessageComponentCollector({ filter,  errors: ["time"], max: 3, time: 30000 })

    collector.on('collect', async i => {

        if (i.customId === `sebep`) {
           let seçilenSebep = sebeps.find(x => x.value == i.values[0])
           if(seçilenSebep) {
                i.deferUpdate()  
                msg.delete().catch(err => {})
                message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined).catch(err => {})
                return cartelcim.addPunitives(seçilenSebep.type, message.member, seçilenSebep.label, message, seçilenSebep.date)
        } else {
             
               return msg.edit({ components : [], embeds: [ new richEmbed().açıklama(`${cartelcim} kişisini **${aktivite}** etkinliğinde cezalıya atmak istediğinize eminmisiniz
                              
Cezalıya atan yetkili: ${message.author}
Cezalıya atılma tarihi: ${tarihsel(dcCezalı.Date)}
Cezanın bitiş tarihi: ${tarihsel(dcCezalı.Expried)}
Cezanın sebebi: \`${dcCezalı.Reason}\`

 Kullanıcı cezalandırıldı ✅
`)]})

           }
         }
   
    });
    collector.on("end", async i => {
      
    })

    }
};

