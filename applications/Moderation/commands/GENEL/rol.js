const { Client, Message, MessageEmbed } = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const Users = require('../../../../database/Schemas/Client.Users');

module.exports = {
    name: "rol",
    command: ["rol"],
    aliases: "rol <@cartel/ID>",
    description: "",
    category: "kurucu",
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
        if(!args.length) {
            return message.channel.send({ content: `Hatalı patlanım`})
        }
        const action = args.shift().toLowerCase();
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const role = message.guild.roles.cache.find(r => r.id === args[1]);
     
        if(!action) return message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Bir işlem belirtmelisin!`)]})
        if(!member) return message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(cevaplar.üye)]})
        if(!role) return message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Bir rol belirtmelisin!`)]})
        if (action === 'ver') {
            member.roles.add(role)
                .then(() => message.channel.send(`${role.name} rolü başarıyla ${member.user.tag} kullanıcısına verildi.`))
                .catch(error => {
                    console.error(error);
                    message.channel.send('Rol verme işlemi başarısız oldu.');
                });
        } else if (action === 'al') {
            member.roles.remove(role)
                .then(() => message.channel.send(`${role.name} rolü başarıyla ${member.user.tag} kullanıcısından alındı.`))
                .catch(error => {
                    console.error(error);
                    message.channel.send('Rol alma işlemi başarısız oldu.');
                });
        } else {
            return message.channel.send(`Doğru kullanım: ${prefix}rol [ver/al] @üye/id rolID`);
        }
    }
};