const { Client, Message, Collection } = Discord = require("discord.js");
const Roles = require('../../../../database/Schemas/Guards/Guild.Protection.Roles.Backup');
const util = require("util")
const { richEmbed } = require('../../../../base/Funksiyonlar/embed')
let kapatılanPermler = new Collection()
module.exports = {
    name: "yetkileri",
    command: ["yt"],
    aliases: "",
    description: "",
    category: "-",
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
    let type = args[0]
    if(!type) return message.react(message.guild.emojiyiBul(emojiler.no_cartel) ? message.guild.emojiyiBul(emojiler.no_cartel).id : undefined)
    
    switch (type) {
        case "kapat": {
            const perms = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"];
            let roller = message.guild.roles.cache.filter(rol => rol.editable).filter(rol => perms.some(yetki => rol.permissions.has(yetki)))
            message.channel.send({embeds: [new richEmbed().açıklama(`${roller.map(x => x).join(", ")} rolün(lerin), koruması başarıyla <t:${String(Date.now()).slice(0, 10)}:R> açıldı ve izinleri kapatıldı.`)]}).then(x => {
                message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
                setTimeout(() => {
                    x.delete()
                }, 8500);
            })
            roller.forEach(async (rol) => {
                await Roles.updateOne({Role: rol.id}, {$set: {"guildID": message.guild.id, Reason: "Koruma Komutu Çalıştırıldı!", "Permissions": rol.permissions.bitfield }}, {upsert: true})
                await kapatılanPermler.set(rol.id, rol.permissions.bitfield)
                await rol.setPermissions(0n)
            })
            return;
        }
            
        case "aç": {
            let Roller = await Roles.find({})
            Roller.filter(x => message.guild.roles.cache.get(x.Role)).forEach(async (data) => {
                let rolgetir = message.guild.roles.cache.get(data.Role)
                if(rolgetir) rolgetir.setPermissions(data.Permissions);
            })
            await Roles.deleteMany({guildID: message.guild.id})
            return message.channel.send({embeds: [new richEmbed().açıklama(`${Roller.map((x, key) => message.guild.roles.cache.get(x.Role)).join(", ")} rolün(lerin), koruması başarıyla <t:${String(Date.now()).slice(0, 10)}:R> kapatıldı ve izinleri tekrardan açıldı.`)]}).then(x => {
                message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
                setTimeout(() => {
                    x.delete()
                }, 8500);
            })
        }
    }
  
  }
};