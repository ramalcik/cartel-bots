const { Client, Message, MessageEmbed } = require("discord.js");
const child = require("child_process")
module.exports = {
    name: "botreset",
    command: ["botreset"],
    aliases: "",
    description: "test",
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
    const botlar = ["central", "moderation", "guard1", "guard", "guard2", "stat", "stats", "invite"];

    if (!args[0] || !botlar.includes(args[0].toLowerCase())) {
        message.react("🚫");
    } else {
        const botName = args[0].toLowerCase();
        const ls = child.exec(`pm2 restart ${sistem.SUNUCU.GUILD_NAME} ${botName}`);
        ls.stdout.on('data', async function (data) {
            message.react("✅");
        });
    }
 }
};