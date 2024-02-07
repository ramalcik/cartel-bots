const { richEmbed } = require('../../../../base/Funksiyonlar/embed');

module.exports = async (member) => {
        const textcik = [ new richEmbed().açıklama(`Merhaba! ${member}, sunucumuza sunucu takviyesi bastığın için sana teşekkür ediyoruz ve seni sayıp seviyoruz.`)]
    
            member.send({embeds: [textcik]})
    }
module.exports.config = {
    Event: "guildMemberBoost"
}