const { MessageEmbed } = require("discord.js");
const Stats = require('../../../../database/Schemas/Plugins/Client.Users.Stats')
const InviteData = require('../../../../database/Schemas/Global.Guild.Invites');
const Users = require('../../../../database/Schemas/Client.Users');
const Upstaffs = require('../../../../database/Schemas/Plugins/Client.Users.Staffs');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const moment = require('moment');
require('moment-duration-format');
require('moment-timezone');
module.exports = {
    name: "voicedenetim",
    command: ["sesdenetim","rolstatdenetim"],
    aliases: "sesdenetim <@rol/ID>",
    description: "Belirlenen role sahip üyelerin public, register ve genel ses denetimini sağlar.",
    category: "stat",
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
    let embed = new richEmbed()
    if(!roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.üstYönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !roller.yönetimRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.yetersiz)]})
    const rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!rol) return message.reply({content: ` Denetleyebilmem için lütfen bir rol belirtiniz.`, ephemeral: true })
    if (rol.members.size === 0) return message.reply({content: ` Belirtilen rolde üye bulunamadığından işlem iptal edildi.`, ephemeral: true })
    let Sesdenetim =  await Stats.find({guildID: message.guild.id});
    Sesdenetim = Sesdenetim.filter(s => message.guild.members.cache.has(s.userID) && message.guild.members.cache.get(s.userID).roles.cache.has(rol.id));
    let PublicListele = Sesdenetim.sort((cartelcim1, cartelcim2) => {
        let cartelcim2Toplam = 0;
        cartelcim2.voiceStats.forEach((x, key) => {
            if(key == kanallar.publicKategorisi) cartelcim2Toplam += x
        });
        let cartelcim1Toplam = 0;
        cartelcim1.voiceStats.forEach((x, key) => {
            if(key == kanallar.publicKategorisi) cartelcim1Toplam += x
        });
        return cartelcim2Toplam-cartelcim1Toplam;
    }).slice(0, 15).map((m, index) => {
        let cartelcimToplam = 0;
        m.voiceStats.forEach((x, key) => { if(key == kanallar.publicKategorisi) cartelcimToplam += x });
        return `\`${index == 0 ? `` : `${index+1}.`}\` ${message.guild.members.cache.get(m.userID).toString()} \`${client.sureCevir(cartelcimToplam)}\``;
    }).join('\n');
    
    let StreamerListele = Sesdenetim.sort((cartelcim1, cartelcim2) => {
        let cartelcim2Toplam = 0;
        cartelcim2.voiceStats.forEach((x, key) => {
            if(key == kanallar.streamerKategorisi) cartelcim2Toplam += x
        });
        let cartelcim1Toplam = 0;
        cartelcim1.voiceStats.forEach((x, key) => {
            if(key == kanallar.streamerKategorisi) cartelcim1Toplam += x
        });
        return cartelcim2Toplam-cartelcim1Toplam;
    }).slice(0, 15).map((m, index) => {
        let cartelcimToplam = 0;
        m.voiceStats.forEach((x, key) => { if(key == kanallar.streamerKategorisi) cartelcimToplam += x });
        return `\`${index == 0 ? `` : `${index+1}.`}\` ${message.guild.members.cache.get(m.userID).toString()} \`${client.sureCevir(cartelcimToplam)}\``;
    }).join('\n');

    let RegisterListele = Sesdenetim.sort((cartelcim1, cartelcim2) => {
        let cartelcim2Toplam = 0;
        cartelcim2.voiceStats.forEach((x, key) => {
            if(key == kanallar.registerKategorisi) cartelcim2Toplam += x
        });
        let cartelcim1Toplam = 0;
        cartelcim1.voiceStats.forEach((x, key) => {
            if(key == kanallar.registerKategorisi) cartelcim1Toplam += x
        });
        return cartelcim2Toplam-cartelcim1Toplam;
    }).slice(0, 15).map((m, index) => {
        let cartelcimToplam = 0;
        m.voiceStats.forEach((x, key) => { if(key == kanallar.registerKategorisi) cartelcimToplam += x });
        return `\`${index == 0 ? `` : `${index+1}.`}\` ${message.guild.members.cache.get(m.userID).toString()} \`${client.sureCevir(cartelcimToplam)}\``;
    }).join('\n');

    let SesListele = Sesdenetim.sort((cartelcim1, cartelcim2) => {
        let cartelcim2Toplam = 0;
        cartelcim2.voiceStats.forEach(x => cartelcim2Toplam += x);
        let cartelcim1Toplam = 0;
        cartelcim1.voiceStats.forEach(x => cartelcim1Toplam += x);
        return cartelcim2Toplam-cartelcim1Toplam;
    }).slice(0, 15).map((m, index) => {
        let cartelcimToplam = 0;
        m.voiceStats.forEach(x => cartelcimToplam += x);
        return `\`${index == 0 ? `` : `${index+1}.`}\` ${message.guild.members.cache.get(m.userID).toString()} \`${client.sureCevir(cartelcimToplam)}\``;
    }).join('\n');


    await message.channel.send({embeds: [embed.açıklama(`${rol} (\`${rol.id}\`) rolüne sahip ilk 15 üyenin ses bilgileri aşağıda listelenmekte.`)
    .sütuns(
        {name: "Toplam Sıralama", value: SesListele ? SesListele : "Bulunamadı.", inline: true},
        {name: "Public Sıralaması", value: PublicListele ? PublicListele : "Bulunamadı.", inline: true},
        {name: "Register Sıralaması", value: RegisterListele ? RegisterListele : "Bulunamadı.", inline: true},
        {name: "Streamer Sıralaması", value: StreamerListele ? StreamerListele : "Bulunamadı.", inline: false}
    )]})
  }
};