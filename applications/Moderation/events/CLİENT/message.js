const { Message, MessageEmbed } = require("discord.js");
const Users = require('../../../../database/Schemas/Client.Users');
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');
const Settings = require('../../../../database/Schemas/Global.Guild.Settings');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
const commandBlocks = require('../../../../database/Schemas/Others/Users.Command.Blocks');
const ms = require('ms');
const spamCommandCount = new Map()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const { Util } = require("discord.js");
let sayi = 0;
let iltifat = [
  "Yaşanılacak en güzel mevsim sensin.",
  "Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
  "Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
  "Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
  "Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
  "Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
  "Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
  "Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
  "Bir gamzen var sanki cennette bir çukur.",
  "Gecemi aydınlatan yıldızımsın.",
  "Ponçik burnundan ısırırım seni",
  "Bu dünyanın 8. harikası olma ihtimalin?",
  "fıstık naber?",
  "Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
  "Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
  "Müsaitsen aklım bu gece sende kalacak.",
  "Gemim olsa ne yazar liman sen olmadıktan sonra...",
  "Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
  "Sabahları görmek istediğim ilk şey sensin.",
  "Mutluluk ne diye sorsalar, cevabı gülüşünde ve o sıcak bakışında arardım.",
  "Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
  "Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
  "Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
  "Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
  "Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
  "Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
  "Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
  "Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
  "Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
  "Telaşımı hoş gör, ıslandığım ilk yağmursun.",
  "Gülüşün ne güzel öyle, cumhuriyetin bir gelişi gibi sanki",
  'Ne yaparsan yap, sen her zaman çok doğalsın.',
  'Sen, tanıdığım en cesur insansın. Keşke senin gibi olabilseydim.',
  'Sen tanıdığım en tatlı insansın.',
  'Seninle konuşmak, ferah bir nefes almak gibidir.',
  'Bugün harika iş çıkardın. Seninle çalışmayı çok seviyorum.',
  'Enerjinin bulaşıcı olduğunu kendi gözlerimle gördüm. Sen mükemmel bir insansın.',
  'O kadar nazik ve anlayışlısın ki etrafındaki herkesi daha iyi bir insan yapmayı başarıyorsun.',
  'En kötü durumları bile eğlenceli bir hale dönüştürmene bayılıyorum.',
  'Keşke senin kadar mükemmel bir insan olabilseydim.',
  'Yaratıcılığın çok yüksek bir seviyede.',
  'İnsanlara güvenmeni seviyorum. Bu anlayışının bir kısmını bana gönderir misin?',
  'Ünlü olduğun zaman, hayran kulübünün tek başkanı olmak istiyorum.',
  'Çocuklarına çok iyi örnek oluyorsun. Her şeyi doğru yapmana bayılıyorum.',
  'Sen yeri doldurulamaz bir insansın.',
  'Farkında olduğundan daha harikasın.',
  'Senin gibi bir arkadaşımın olması özel hissetmeme neden oluyor.',
  'Beni hiçbir zaman hayal kırıklığına uğratmıyorsun. Ne olursa olsun sana güvenebileceğimi biliyorum.',
  'Senin yanında olduğum zaman kendimi çok şanslı ve özel hissediyorum.',
  'Makyaj doğal güzelliğini kapatıyor resmen...',
  'Saçların denizin huzurunu yansıtıyor.',
  'Senin gülümsemen benim en derin mutluluğum.',
  'Harika bir tarzın var. Tarzına sahip olmayı çok isterdim.',
  'Sen herkesin hayatında olması gereken bir insansın.',
  'Masallardaki prensesin şekil bulmuş halisin.',
  'Şarkılarımın, şiirlerimin ilham kaynağısın.',
  'Yanında hissetmediğim güven ve huzuru hissediyorum.',
  'Bu kadar tatlı olmayı nasıl başarıyorsun?',
  'Gözlerin en güzel ışık kaynağım.',
  'En güzel iyikimsin.',
  'Yaşadığım tüm kötülüklere sen karşıma alıp izleyerek baş edebilirim.',
  'Çiçekleri kıskandıran bir güzelliğe sahipsin.',
  'Sen benim tüm imkansızlıklarıma rağmen hayattaki en değerlimsin',
  'Sen benim en güzel manzaramsın.',
  'Enerjin içimi aydınlatıyor.'
];

 /**
 * @param {Message} message 
 */

module.exports = async (message) => { 
  //İSTEK
  if (message.channel.name === "selfie" && message.attachments.size > 0) {
    const attachment = message.attachments.first();
    const emojis = ['1203330296163074098', '1203330666670850078', "1203330427490934835", "1203330595695099904", "1203330448978346015", "1203330594201935924", "1203330431358079008", "1203330671762743336", "1203330437536157716", "1203330581950242866", "1203330452409028618"];
    for (const emoji of emojis) {
      await message.react(emoji);
  }
           }
               let Data = await GUILDS_SETTINGS.findOne({ _id: 1 })
    ayarlar = client._settings = global.ayarlar = global._settings = kanallar = client._channels = global.kanallar = global.channels =  roller = client._roles = global.roller = global._roles = Data.Ayarlar
    
    const adapter = new FileSync("../../base/Ayarlar/emojiler.json");
    const db = low(adapter)
    emojiler = client._emojis = global.emojiler = global._emojis = db.value();
    cevaplar = client._reply = global.cevaplar = global._reply = require('../../../../base/Ayarlar/cevaplar');
    var reload = require('require-reload')(require);
    _statSystem = global._statSystem =  reload('../../../../base/Additions/Staff/Sources/Global.Staff.Settings.js');

    if (message.author.bot || !global.sistem.botSettings.Prefixs.some(x => message.content.startsWith(x)) || !message.channel || message.channel.type == "dm") return;
    let args = message.content.substring(global.sistem.botSettings.Prefixs.some(x => x.length)).split(" ");
    let komutcuklar = args[0].toLocaleLowerCase()
    let cartel = message.client;
    args = args.splice(1);
    let calistirici;
    let TalentPerms;
    if(await Data.talentPerms) {

     TalentPerms = await Data.talentPerms.filter(x => !Array.isArray(x.Commands)).find(x => x.Commands == komutcuklar) || await Data.talentPerms.filter(x => Array.isArray(x.Commands)).find(x => x.Commands.some(kom => kom == komutcuklar))

    }
     if (Data) {
    let ayarlar = Data.Ayarlar;

    if (ayarlar && ayarlar.chatİltifat) {
      if (message.channel.id === ayarlar.chatKanalı) {
        sayi++;
        if (sayi >= 20) {
          sayi = 0;
          let rand = iltifat[Math.floor(Math.random() * iltifat.length)];
          message.reply(rand);
        }
      }
    
    }
  }
    if(ayarlar.type && [".tag", "!tag", "tag"].includes(message.content.toLowerCase())) { 
      if((!message.mentions.members.first() || !message.guild.members.cache.get(args[0]))) return ayarlar.tag ? message.channel.send({content: `${ayarlar.tag}`}) : ``.then(x => {
      client.logger.log("Bu sunucuya ait veritabanında tag ayarı bulunamadı. Lütfen tag belirleyiniz...","error")
     
      }) 
    }


    if([".link", "!link", "link"].includes(message.content.toLowerCase())) return message.channel.send(message.guild.vanityURLCode ? `discord.gg/${message.guild.vanityURLCode}` : `discord.gg/${(await message.channel.createInvite()).code}`);
    if(message.member.roles.cache.has(roller.cezalıRolü) || message.member.roles.cache.has(roller.şüpheliRolü) || message.member.roles.cache.has(roller.underworldRolü) || message.member.roles.cache.has(roller.yasaklıTagRolü) || (roller.kayıtsızRolleri && roller.kayıtsızRolleri.some(rol => message.member.roles.cache.has(rol)))) return;
    
    if(cartel.commands.has(komutcuklar) || cartel.aliases.has(komutcuklar) || TalentPerms) {
      if((kanallar.izinliKanallar && !kanallar.izinliKanallar.some(x => message.channel.id == x)) && !message.member.permissions.has("ADMINISTRATOR") && !sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !["temizle","sil","booster","b","snipe","afk","kilit", "çekiliş"].some(x => komutcuklar == x) ) {
        return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({ dynamic: true})).açıklama(`Belirttiğin komut kullanılama açık değil.`)]})
         }
      if (!sistem.Rooter.Users && sistem.Rooter.Users.some(user => user.isim === message.member.user.username) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(x=> message.member.roles.cache.has(x))) {
        let cBlock = await commandBlocks.findOne({_id: message.member.id })
        if(cBlock) return;
        let spamDedection = spamCommandCount.get(message.author.id) || []
        let cmd = { lastContent: message.content, Channel: message.channel.id, Command: komutcuklar }
        spamDedection.push(cmd)
        spamCommandCount.set(message.author.id, spamDedection)
        if (spamDedection.length >= 15) {
          let kanalıBul = message.guild.kanalıBul("command-safe")
          if(kanalıBul) kanalıBul.send({embeds: [new richEmbed()
            .açıklama(`${message.author} kişi sürekli komut kullanımı sebebiyle bot tarafından otomatik yasaklandı, bu yasaklanmanın itirazını Sunucu sahibi ve bot sahibine iletmelidir.`)
            .sütun(`Son Gönderilen İçerikler`, `${spamDedection.map(x => `\`${x.lastContent}\``).join("\n")}`,true)
            .sütun("Son Kullanılan Komutlar", `${spamDedection.map((x,index) => `\`${index+1}.\` \`${sistem.botSettings.Prefixs[0]}${x.Command}\` (${message.guild.channels.cache.get(x.Channel)})` ).join("\n")}`, true)
          ]})
          message.channel.send(`${message.author} Sürekli olarak komut kullanımı sebebiyle bot tarafından komut kullanımınız \`Devre-Dışı\` bırakıldı.`).then(x => {
          setTimeout(() => {
            x.delete()
          }, 7500);
          })
          
          await commandBlocks.updateOne({_id: message.member.id}, { $set: { Date: Date.now(), lastData: spamDedection } }, {upsert: true})
          if(spamCommandCount.has(message.author.id)) spamCommandCount.delete(message.author.id);
        }
        setTimeout(() => { if (spamCommandCount.has(message.author.id)) { spamCommandCount.delete(message.author.id) } }, ms("1m"))
      }  

      try {
          await Users.updateOne({ _id: message.author.id }, { $push: { "CommandsLogs": { Komut: komutcuklar, Kanal: message.channel.id, Tarih: Date.now() } } }, { upsert: true })
          client.logger.log(`${message.author.tag} kişisi "${message.channel.name}" kanalında ${komutcuklar} komutunu kullandı`, "cmd");
          if(TalentPerms) {
            let embed = new richEmbed()
            var rolismi = TalentPerms.Name || "Belirsiz"
            let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if((TalentPerms.Permission && TalentPerms.Permission.length && !TalentPerms.Permission.some((id) => message.member.roles.cache.has(id))) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username,message.member.user.avatarURL({dynamic: true})).açıklama(`Belirttiğiniz rolü vermek için ${TalentPerms.Permission ? TalentPerms.Permission.filter(x => message.guild.roles.cache.get(x)).map(x => message.guild.roles.cache.get(x)).join(", ") + "rolüne sahip olmalısın.": ""}`)]}); 
            if (!cartelcim) return message.channel.send({embeds: [new richEmbed().üstBaşlık(message.member.user.username, message.member.user.avatarURL({dynamic: true})).açıklama(cevaplar.üye)]})
            if (TalentPerms.Roles.some(role => cartelcim.roles.cache.has(role))) {
              await Users.updateOne({ _id: cartelcim.id }, { $push: { "Roles": { rol: TalentPerms.Roles, mod: message.author.id, tarih: Date.now(), state: "Kaldırma" } } }, { upsert: true })
              TalentPerms.Roles.forEach(x => cartelcim.roles.remove(x))
              message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisinden  ${TalentPerms.Roles.map(x => message.guild.roles.cache.get(x)).join(", ")} ${TalentPerms.Roles.length > 1 ? 'rollerini' : "rolünü"} aldım.`)]})
              message.guild.kanalıBul("rol-al-log").send({embeds: [embed.açıklama(`${cartelcim} kişiden <t:${String(Date.now()).slice(0, 10)}:R> ${message.author} tarafından ${TalentPerms.Roles.map(x => message.guild.roles.cache.get(x)).join(", ")} adlı ${TalentPerms.Roles.length > 1 ? 'rolleri' : "rol"} geri alındı.`)]})
            }
            else  { 
              let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
              await Users.updateOne({ _id: cartelcim.id }, { $push: { "Roles": { rol: TalentPerms.Roles, mod: message.author.id, tarih: Date.now(), state: "Ekleme" } } }, { upsert: true })
              cartelcim.roles.add(TalentPerms.Roles); 
              message.channel.send({embeds: [new richEmbed().üstBaşlık(cartelcim.user.username, cartelcim.user.avatarURL({dynamic: true})).açıklama(`${cartelcim} kişisine ${TalentPerms.Roles.map(x => message.guild.roles.cache.get(x)).join(", ")} ${TalentPerms.Roles.length > 1 ? 'rollerini' : "rolünü"} verdim.`)]})
              message.react(message.guild.emojiyiBul(emojiler.onay_cartel) ? message.guild.emojiyiBul(emojiler.onay_cartel).id : undefined)
              message.guild.kanalıBul("rol-ver-log").send({embeds: [embed.açıklama(`${cartelcim} kişiye <t:${String(Date.now()).slice(0, 10)}:R> ${message.author} tarafından ${TalentPerms.Roles.map(x => message.guild.roles.cache.get(x)).join(", ")} adlı ${TalentPerms.Roles.length > 1 ? 'rolleri' : "rol"} verildi.`)]})  
            }
          }
          calistirici = cartel.commands.get(komutcuklar) || cartel.aliases.get(komutcuklar);
          if(calistirici) {
            if((calistirici.Permissions && calistirici.Permissions.length && !calistirici.Permissions.some((id) => message.member.roles.cache.has(id) || message.member.permissions.has(id) || message.member.id == id) ) && !roller.kurucuRolleri.some(rolAra => message.member.roles.cache.has(rolAra)) && !message.member.permissions.has("ADMINISTRATOR") && !sistem.Rooter.Users.includes(message.author.id)) {
               return message.reply({embeds: [new richEmbed().açıklama(`Bu komutu kullanmak için ${calistirici.Permissions ? calistirici.Permissions.filter(x => message.guild.roles.cache.get(x)).map(x => message.guild.roles.cache.get(x)).join(", ") + " rol(lerine) sahip olmalısın!": "yeterli yetkiye sahip değilsin."} `)]}).then(x => {
                setTimeout(() => {
                  x.delete().catch(err => {})
                }, 7500);
               });
            }
            calistirici.komutClient(client, message, args);
          }
      } catch (err) {
        message.channel.send({content: `Bu komut çalıştırılırken hata oluştu... \`\`\`${err}\`\`\` `}).then(x => { 
          client.logger.log(`${komutcuklar} isimli komut çalıştırılırken hata oluştu.`,"error")
          setTimeout(() => {
            x.delete()
          }, 7500)
        })
     }
    } 

  }


module.exports.config = {
    Event: "messageCreate"
}

