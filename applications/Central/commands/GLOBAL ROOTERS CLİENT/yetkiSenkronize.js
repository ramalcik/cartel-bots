const Upstaffs = require('../../../../database/Schemas/Plugins/Client.Users.Staffs')

const moment = require('moment');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
require('moment-duration-format');
require('moment-timezone');

module.exports = {
    name: "ysenk",
    command: ["yetkisenkronize","y"],
    aliases: "y u <@cartel/ID> <Yetki S.Kodu>",
    description: "Belirlenen üyeyi terfi sistemine senkronize eder.",
    category: "-",
    uzantı: true,
    
   /**
   * @param {Client} client 
   */
  önClient: function (client) {
    client.sureCevir = (date) => { return moment.duration(date).format('H [saat,] m [dakika,] s [saniye]'); };
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  komutClient: async function (client, message, args) {
    let embed = new richEmbed()
    if(!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username)) return;
    let işlem = args[0]
    if(işlem !== "u" && işlem !== "r") return;
    if(işlem === "u") {
    let kullArray = message.content.split(" ");
    let kullArgs = kullArray.slice(1);
    let cartelim = message.mentions.members.first() || message.guild.members.cache.get(kullArgs[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === kullArgs.slice(1).join(" ") || x.user.username === kullArgs[1])
    if(!cartelim) return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
    if(!cartelim.user.username.includes(ayarlar.tag)) return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
    if(message.author.id === cartelim.id)  return message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(cevaplar.kendi)]})
    let yetkiKodu = parseInt(args[2]);
    if(isNaN(yetkiKodu)) return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
    if(yetkiKodu > _statSystem.staffs.length) return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
    await Upstaffs.updateOne({ _id: cartelim.id }, { $set: { "staffNo": yetkiKodu, "staffExNo": yetkiKodu - 1, "Points": 0, "ToplamPuan": 0, "yetkiVerilmeTarihi": Date.now() } }, {upsert: true}); 
    let yeniYetki = _statSystem.staffs.filter(x => x.No == yetkiKodu - 1);
    if(yeniYetki) yeniYetki = yeniYetki[yeniYetki.length-1];
    if(yeniYetki) {
        if(!cartelim.roles.cache.has(yeniYetki.rol)) cartelim.roles.add(yeniYetki.rol)
        if(!cartelim.roles.cache.has(roller.ilkYetki)) await cartelim.roles.add(roller.ilkYetki);
    }
    message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
    message.guild.kanalıBul("terfi-log").send({embeds: [embed.açıklama(`${message.member} isimli yetkili ${cartelim} kişiyi <t:${String(Date.now()).slice(0, 10)}:R> ${yeniYetki.rol ? message.guild.roles.cache.get(yeniYetki.rol) : "Bulunamadı!"} role senkronize etti.`)]})
    } else if(işlem === "r") {
      const rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
      if(!rol) return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
      if(rol.members.size === 0) return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
        rol.members.forEach(async cartelim => {
          if (cartelim.user.bot) return;
            if (_statSystem.staffs.some(x => cartelim.roles.cache.has(x.rol))) {
              let cartel = _statSystem.staffs.find(x => cartelim.roles.cache.has(x.rol))
	      let No = Number(cartel.No)
          if(!cartelim.roles.cache.has(roller.ilkYetki)) await cartelim.roles.add(roller.ilkYetki);
              await Upstaffs.updateOne({ _id: cartelim.id }, { $set: { "staffNo": No + Number(1), "staffExNo": No, "Points": 0, "ToplamPuan": 0, "yetkiVerilmeTarihi": Date.now() } }, {upsert: true}); 
              message.channel.send(`${message.guild.emojiyiBul(emojiler.onay_cartel)} ${cartelim} kişisi \`${rol.name}\` yetkisine senkronize edildi.`);
            } else return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
        
        });
        message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
        message.channel.send(embed.açıklama(`${message.member} isimli yetkili ${rol} isimli roldeki üyeleri senkronize etti.`));
    }
  }
};


