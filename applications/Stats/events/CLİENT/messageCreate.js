const { Message, MessageEmbed, Util } = require("discord.js");
const Users = require('../../../../database/Schemas/Client.Users');
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');
const Settings = require('../../../../database/Schemas/Global.Guild.Settings');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const commandBlocks = require('../../../../database/Schemas/Others/Users.Command.Blocks');
const ms = require('ms');
const spamCommandCount = new Map()
 /**
 * @param {Message} message 
 */

module.exports = async (message) => { 
    // Sync Data's
    let Data = await GUILDS_SETTINGS.findOne({ _id: 1 })
    ayarlar = client._settings = global.ayarlar = global._settings = kanallar = client._channels = global.kanallar = global.channels =  roller = client._roles = global.roller = global._roles = Data.Ayarlar
    emojiler = client._emojis = global.emojiler = global._emojis = require('../../../../base/Ayarlar/emojiler.json');
    cevaplar = client._reply = global.cevaplar = global._reply = require('../../../../base/Ayarlar/cevaplar');
    var reload = require('require-reload')(require);
    _statSystem = global._statSystem =  reload('../../../../base/Additions/Staff/Sources/Global.Staff.Settings.js');
    // Sync Data's

    if (message.author.bot || message.channel.name !== "emoji-yükleme") return;

    const regex = /<(a?):\w+:(\d+)>|https?:\/\/[^ ]+\.(?:png|jpg|gif|jpeg)/g;
    const emojisAndLinks = message.content.match(regex);

    if (!emojisAndLinks) return;

    try {
        const guild = message.guild;
        emojisAndLinks.forEach(async emojiOrLink => {
            let emojiName;
            if (!emojiOrLink.startsWith('http')) {
                const [, , emojiID] = emojiOrLink.match(/<(a?):\w+:(\d+)>/);
                const emojiInfo = Util.parseEmoji(emojiOrLink);
                emojiName = emojiInfo.name || `emote-${Math.floor(Math.random() * 1000)}`;
                const emoji = await guild.emojis.create(`https://cdn.discordapp.com/emojis/${emojiID}.png`, emojiName);
                message.channel.send({ content: `${emoji.name} (${emoji}) emojisi yüklendi.` });
                return;
            }
            const emojiParts = emojiOrLink.split('/');
            emojiName = emojiParts[emojiParts.length - 1].split('.')[0];
            const emoji = await guild.emojis.create(emojiOrLink, emojiName);
            message.channel.send({ content: `${emoji.name} (${emoji}) emojisi yüklendi.` });
        });
    } catch (error) {
        console.error('Emoji eklenirken bir hata oluştu:', error);
    }

};

module.exports.config = {
    Event: "messageCreate"
};
