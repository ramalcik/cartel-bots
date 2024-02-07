const Punitives = require('../../../../database/Schemas/Global.Punitives');
const table = require('table')
const { richEmbed } = require("../../../../base/Funksiyonlar/embed")
module.exports = {
    name: "cezalar",
    command: ["sicil"],
    aliases: "cezalar <@cartel/ID>",
    description: "Belirlenen üyenin bütün ceza verisini gösterir.",
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
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.getUser(args[0]) || message.member;
    if(!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
    await Punitives.find({Member: cartelcim.id}).exec(async (err, res) => {
        if(err) return message.reply('')
        if(!await Punitives.findOne({Member: cartelcim.id})) return message.channel.send({ embeds: [ new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`${cartelcim} kişisinin ceza-i bilgilerine ulaşılamadı.`)]})
        let data = [["ID", "🔵", "Ceza Tarihi", "Ceza Türü", "Ceza Sebebi"]];
        data = data.concat(res.map(value => {          
            return [
                `#${value.No}`,
                `${value.Active == true ? "✅" : "❎"}`,
                `${tarihsel(value.Date)}`,
                `${value.Type}`,
                `${value.Reason}`
            ]
        }));
        let veriler = table.table(data, {
           columns: { 0: { paddingLeft: 1 }, 1: { paddingLeft: 1 }, 2: { paddingLeft: 1 }, 3: { paddingLeft: 1, paddingRight: 1 }, },
           border : table.getBorderCharacters(`void`),  
           drawHorizontalLine: function (index, size) {
               return index === 0 || index === 1 || index === size;
           }
        });
        message.channel.send(`:no_entry_sign: <@${cartelcim.id}> kişisinin ceza bilgileri aşağıda belirtilmiştir. Tekli bir cezaya bakmak için \`.ceza ID\` komutunu uygulayınız.\n\`\`\`${veriler}\`\`\``).then(x => {
            setTimeout(() => {
                x.delete()
            }, 60000);
        }).catch(cartel => {
            message.channel.send({content: `:no_entry_sign: <@${cartelcim.id}> kişisinin cezaları **Discord API** sınırını geçtiği için metin belgesi hazırlayıp gönderdim, oradan cezaları kontrol edebilirsin.\nTekli bir cezaya bakmak için \`.ceza bilgi ID\` komutunu uygulayınız.`,     files: [{
                attachment: Buffer.from(veriler),
                name: `${cartelcim.id}-cezalar.txt`
            }]}); 
        });
    })
    }
};