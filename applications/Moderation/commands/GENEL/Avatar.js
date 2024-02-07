const { Client, Message, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
module.exports = {
    name: "avatar",
    command: ["av", "pp"],
    aliases: "avatar <@cartel/ID>",
    description: "Belirtilen üyenin profil resmini büyültür.",
    category: "diğer",
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
    let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    let avatar = victim.avatarURL({ dynamic: true, size: 2048 });
    let urlButton = new MessageButton()
    .setURL(`${avatar}`)
    .setLabel(`Resim Adresi`)
    .setStyle('LINK')    
    let urlOptions = new MessageActionRow().addComponents(
        urlButton
    );
    embed
        .üstBaşlık(victim.tag, avatar)
        .setImage(avatar)
    let cartelcim = message.guild.members.cache.get(victim.id)
    if(cartelcim) cartelcim._views()
    message.reply({embeds: [embed], components: [urlOptions]});
    }
};