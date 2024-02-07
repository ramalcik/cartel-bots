const { Client, Collection, MessageActionRow, MessageButton, Options} = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice')
const fs = require('fs')
const GUILD_ROLE_DATAS = require("../../database/Schemas/Guards/Backup/Guild.Roles")
const Query = require("./query");
const sistem = global.sistem = require('../Ayarlar/server.json');

// SENKRON
const GUARD_SETTINGS = require('../../database/Schemas/Guards/Global.Guard.Settings');
const GUILD_SETTINGS = require('../../database/Schemas/Global.Guild.Settings');
// SENKRON

// GUARD LİMİT
const ms = require('ms');
const dataLimit = new Map()
// GUARD LİMİT
let TAC = []
let { black } = require("chalk");
const { richEmbed } = require("../Funksiyonlar/embed")
const EventEmitter = require("events")
class cartel extends Client {
      constructor (options) {
        super(options)
            Object.defineProperty(this, "location", { value: process.cwd() });
            this.sistem = this.system = require('../Ayarlar/server.json');
            sunucu.getir({ server: this.sistem.SUNUCU.GUILD})
            this.users.getUser = GetUser;
            this.getUser = GetUser;
            async function GetUser(id) { try { return await this.users.fetch(id); } catch (error) { return undefined; } };
          
            this.logger = require('../Funksiyonlar/Logger');
            this.richEmbed = global.richEmbed = require('../Funksiyonlar/embed');
            this.Upstaffs = global.Upstaffs = []
            this._statSystem = global._statSystem = []
            require('../Funksiyonlar/Dates');
            require('../Funksiyonlar/Numbers');
            require('../Funksiyonlar/server');
            require('../Funksiyonlar/user');
            this.botİsmi;
            this.commands = new Collection();
            this.aliases = new Collection();
            this.eventEmitter = new EventEmitter();
            this.setMaxListeners(10000);
            this.Distributors = global.Distributors = [];

            this.Economy = require('../Additions/Economy/_index') || []        
        }

        async komutYükle() {
           
            let dirs = fs.readdirSync("./commands", { encoding: "utf8" });
            this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} ${dirs.length} category in client loaded.`, "category");
            await sunucu.getir({ server: this.sistem.SUNUCU.GUILD})
            dirs.forEach(dir => {
                let files = fs.readdirSync(`../../applications/${this.botİsmi}/commands/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
                this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} ${files.length} commands loaded in ${dir} category.`, "load");
                files.forEach(file => {
                    let referans = require(`../../applications/${this.botİsmi}/commands/${dir}/${file}`);
                                      if(referans.önClient != undefined && typeof referans.önClient == "function") referans.önClient(this);
                    this.commands.set(referans.name, referans);
                    if (referans.command) referans.command.forEach(alias => this.aliases.set(alias, referans));
                });
            });
        }

        async eventYükle() {
            
            let dirs = fs.readdirSync('./events', { encoding: "utf8" });
            dirs.forEach(dir => {
                let files = fs.readdirSync(`../../applications/${this.botİsmi}/events/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
                files.forEach(file => {
                    let referans = require(`../../applications/${this.botİsmi}/events/${dir}/${file}`);
                    this.on(referans.config.Event, referans);
                });
            });
         }
    
         async startDistributors() {
            let Data = await GUARD_SETTINGS.findOne({guildID: global.sistem.SUNUCU.GUILD})
            if(Data && Data.urlSpam && Data.spamURL && (Data.selfTokens && Data.selfTokens.length > 0)) {
                let guild = this.guilds.cache.get(global.sistem.SUNUCU.GUILD)
                setInterval(async () => {
                    Data = await GUARD_SETTINGS.findOne({guildID: guild.id})
                    if(Data && !Data.urlSpam && (Data.selfTokens && Data.selfTokens.length < 0)) return;
                    if(!guild) return 
                    if (guild.vanityURLCode && (guild.vanityURLCode == Data.spamURL)) return;
                    let log = this.channels.cache.find(x => x.name.includes("guard") || x.name == "cartelfx")
                    if(log) log.send({content: `@everyone`,embeds: [
                        new EmbedBuilder()
                            
                            .setAuthor({name: guild.name, iconURL: guild.iconURL({dynmaic: true})})
                            .setDescription(`**${guild.name}** sunucusunun **Özel URL** değiştiğinden dolayı güvenlik amacıyla sistem üzerinde belirlenen "${Data.spamURL}" urlsi otomatik olarak tekrar güncellendi.`)
                                                       ]})
                    Data.selfTokens.map(self_token => {
                        request({method: "PATCH", url: `https://discord.com/api/v10/guilds/${guild.id}/vanity-url`,
                        headers: { 
                            "Authorization": `${self_token}`,
                            "User-Agent": `Discordbot cartel`,
                            "Content-Type": `application/json`,
                            "X-Audit-Log-Reason": `URL Tekrarlayici`
                        },
                        body: { "code": Data.spamURL },
                        json: true
                    });
                    
                    })
                }, 1000);
            } 
    sistem.TOKENLER.Dağıtıcılar.forEach(async (token) => {
        let botClient = new Client({
            intents: [
               32767
            ],
          
        
          });
       
          botClient.on("ready", async () => {
            setInterval(async () => {
                client.user.setPresence({
                    activities: [{ name: global.sistem.botStatus.Name, type: "LISTENING" }],
                    status: global.sistem.botStatus.Status
                });
                const channel = client.channels.cache.get(global.sistem.SUNUCU.VoiceChannelID)
                joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                    selfDeaf: true,
                    selfMute: false,
                });
            }, 60 * 1000);
            let guild = botClient.guilds.cache.get(global.sistem.SUNUCU.GUILD);
            if(!guild) {
                console.log(`https://discord.com/api/oauth2/authorize?client_id=${botClient.user.id}&permissions=0&scope=bot%20applications.commands`)
                return 
            }
            this.logger.log(`${botClient.user.username} isimli dağıtıcı başarıyla aktif oldu.`, "dist")
            Distributors.push(botClient)
            botClient.queryTasks = new Query();
            botClient.queryTasks.init(1000);
          })
          await botClient.login(token).catch(err => {
            this.logger.log(`${black.bgHex('#D9A384')("Dağıtıcı Token Arızası" + ` : ${token}`)}`,"error")
          })
    })
}

closeDistributors() { 
    if(this.Distributors && this.Distributors.length) {
        if(this.Distributors.length >= 1) {
            this.Distributors.forEach(x => {
                x.destroy()
            })
        }
    }
}

async checkMember(id, type, process = "İşlem Bulunamadı.") {
    let guild = this.guilds.cache.get(sistem.SUNUCU.GUILD)
    if(!guild) return false;
    let cartelcim = guild.members.cache.get(id)
    if(!cartelcim) return;
    let Whitelist = await GUARD_SETTINGS.findOne({guildID: sistem.SUNUCU.GUILD})
    let Sunucu = await GUILD_SETTINGS.findOne({guildID: sistem.SUNUCU.GUILD})
    if(!Sunucu) return false;
    if(!Whitelist) return false;
    let guildSettings = Sunucu.Ayarlar
    if(!guildSettings) return false;
    if(!Whitelist.guildProtection) return true;
    if(cartelcim.id === this.user.id || cartelcim.id === cartelcim.guild.ownerId || Whitelist.unManageable.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g)) || Whitelist.BOTS.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))) return true; 
    if(!type) return false;
    switch (type) {
        case "guild": {
            if(Whitelist.fullAccess.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))  || Whitelist.guildAccess.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))) return this.checkProcessLimit(cartelcim, Whitelist.auditLimit, Whitelist.auditInLimitTime, process)  
            return false;
        }
        case "emoji": {
            if(Whitelist.fullAccess.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))  || Whitelist.emojiAccess.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))) return this.checkProcessLimit(cartelcim, Whitelist.auditLimit, Whitelist.auditInLimitTime, process)  
            return false;
        }
        case "bot": {
            if(Whitelist.fullAccess.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))  || Whitelist.botAccess.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))) return this.checkProcessLimit(cartelcim, Whitelist.auditLimit, Whitelist.auditInLimitTime, process)  
            return false;
        }
        case "member": {
            if(Whitelist.fullAccess.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))  || Whitelist.memberAccess.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))) return this.checkProcessLimit(cartelcim, Whitelist.auditLimit, Whitelist.auditInLimitTime, process)  
            return false;
        }
        case "channels": {
            if(Whitelist.fullAccess.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))  || Whitelist.channelsAccess.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))) return this.checkProcessLimit(cartelcim, Whitelist.auditLimit, Whitelist.auditInLimitTime, process)  
            return false;
        }
        case "roles": {
            if(Whitelist.fullAccess.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))  || Whitelist.rolesAcess.some(g => cartelcim.id === g || cartelcim.roles.cache.has(g))) return this.checkProcessLimit(cartelcim, Whitelist.auditLimit, Whitelist.auditInLimitTime, process)  
            return false;
        }
    }
    return false;
}


async checkProcessLimit(cartelcim, limit, zaman, process) {
    let id = cartelcim.id
    let limitController = dataLimit.get(id) || []
    let type = { _id: id, proc: process, date: Date.now() }
    let Whitelist = await GUARD_SETTINGS.findOne({guildID: sistem.SUNUCU.GUILD})
    if(!Whitelist.limit) return true;
    limitController.push(type)
    dataLimit.set(id, limitController)
    setTimeout(() => { if (dataLimit.has(id)) { dataLimit.delete(id) } }, ms(zaman))
    if (limitController.length >= limit) { 
        let loged = cartelcim.guild.kanalıBul("cartelfx");
        let taslak = `${cartelcim} (\`${cartelcim.id}\`) isimli güvenli listesinde ki yönetici işlem sınırını aştığı için "__${process}__" zoruyla cezalandırıldı.
\`\`\`fix
Son Yapılan işlemleri;
${limitController.sort((a, b) => b.date - a.date).map((x, index) => `${index+1}. | ${x.proc} | ${tarihsel(x.date)}`).join("\n")}
        \`\`\``
        if(loged) loged.send(taslak);
        let Sunucu = await GUILD_SETTINGS.findOne({guildID: sistem.SUNUCU.GUILD})
        let guildSettings = Sunucu.Ayarlar
        if(Sunucu && guildSettings) {
            guildSettings.staff.forEach(x => {
                let botOwner = cartelcim.guild.members.cache.get(x)
                if(botOwner) botOwner.send(taslak).catch(err => {})
            })
        }
        let taç = cartelcim.guild.members.cache.get(cartelcim.guild.ownerId)
        if(taç) taç.send(taslak).catch(err => {})
        return false 
    } else {
        return true
    }
}    

async queryManage(oldData, newData) {
    const guildSettings = require('../../database/Schemas/Global.Guild.Settings');
    let veriData = await guildSettings.findOne({ guildID: sistem.SUNUCU.GUILD })
    let sunucuData = veriData.Ayarlar
    if(sunucuData) {              
        if(oldData === sunucuData.tagRolü) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.tagRolü": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.muteRolü) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.muteRolü": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.cezalıRolü) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.cezalıRolü": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.şüpheliRolü) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.şüpheliRolü": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.yasaklıTagRolü) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.yasaklıTagRolü": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.vipRolü) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.vipRolü": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.Katıldı) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.Katıldı": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.ilkYetki) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.ilkYetki": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.etkinlikKatılımcısı) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.etkinlikKatılımcısı": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.cekilisKatılımcısı) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.cekilisKatılımcısı": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.TerfiLog) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.TerfiLog": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.kurallarKanalı) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.kurallarKanalı": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.hoşgeldinKanalı) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.hoşgeldinKanalı": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.chatKanalı) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.chatKanalı": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.toplantıKanalı) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.toplantıKanalı": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.davetKanalı) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.davetKanalı": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.publicKategorisi) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.publicKategorisi": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.registerKategorisi) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.registerKategorisi": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.streamerKategorisi) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.streamerKategorisi": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.photoChatKanalı) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.photoChatKanalı": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.sleepRoom) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.sleepRoom": newData}}, {upsert: true})
        }
        if(oldData === sunucuData.ilkYetki) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.ilkYetki": newData}}, {upsert: true})
        }
        if(sunucuData.erkekRolleri && sunucuData.erkekRolleri.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.erkekRolleri": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.erkekRolleri": newData}}, {upsert: true})
        }
        if(sunucuData.kadınRolleri && sunucuData.kadınRolleri.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.kadınRolleri": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.kadınRolleri": newData}}, {upsert: true})
        }
        if(sunucuData.kayıtsızRolleri && sunucuData.kayıtsızRolleri.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.kayıtsızRolleri": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.kayıtsızRolleri": newData}}, {upsert: true})
        }
        if(sunucuData.Yetkiler && sunucuData.Yetkiler.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.Yetkiler": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.Yetkiler": newData}}, {upsert: true})
        }
        if(sunucuData.teyitciRolleri && sunucuData.teyitciRolleri.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.teyitciRolleri": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.teyitciRolleri": newData}}, {upsert: true})
        }
        if(sunucuData.kurucuRolleri && sunucuData.kurucuRolleri.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.kurucuRolleri": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.kurucuRolleri": newData}}, {upsert: true})
        }
                     if(sunucuData.izinliKanallar && sunucuData.izinliKanallar.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.izinliKanallar": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.izinliKanallar": newData}}, {upsert: true})
        }
          if(sunucuData.üstYönetimRolleri && sunucuData.üstYönetimRolleri.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.üstYönetimRolleri": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.üstYönetimRolleri": newData}}, {upsert: true})
        }
        if(sunucuData.altYönetimRolleri && sunucuData.altYönetimRolleri.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.altYönetimRolleri": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.altYönetimRolleri": newData}}, {upsert: true})
        }
        if(sunucuData.yönetimRolleri && sunucuData.yönetimRolleri.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.yönetimRolleri": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.yönetimRolleri": newData}}, {upsert: true})
        }

        if(sunucuData.banHammer && sunucuData.banHammer.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.banHammer": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.banHammer": newData}}, {upsert: true})
        }
        if(sunucuData.jailHammer && sunucuData.jailHammer.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.jailHammer": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.jailHammer": newData}}, {upsert: true})
        }
        if(sunucuData.voiceMuteHammer && sunucuData.voiceMuteHammer.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.voiceMuteHammer": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.voiceMuteHammer": newData}}, {upsert: true})
        }
        if(sunucuData.muteHammer && sunucuData.muteHammer.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.muteHammer": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.muteHammer": newData}}, {upsert: true})
        }
        if(sunucuData.warnHammer && sunucuData.warnHammer.includes(oldData)) {
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$pull: {"Ayarlar.warnHammer": oldData}}, {upsert: true})
            await guildSettings.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"Ayarlar.warnHammer": newData}}, {upsert: true})
        }
        
    }
}
rolVer(sunucu, role) {
    let length = (sunucu.members.cache.filter(member => member && !member.roles.cache.has(role.id) && !member.user.bot).array().length + 5);

    const sayı = Math.floor(length / Distributors.length);
   if(sayı < 1) sayı = 1

    let Dists = Distributors.length;
    let countUser = length % Dists;
    let cartelcimlercik = []
    sunucu.members.cache.filter(member => member && !member.roles.cache.has(role.id) && !member.user.bot).map(x => {
        cartelcimlercik.push(x.id)
    })
    Distributors.forEach((guard, _index) => {
      const members = cartelcimlercik.splice(0, (_index == 0 ? sayı + countUser : sayı));
      if (members.length <= 0) return client.logger.log(`[${role}] Olayında kayıtlı üye olmadığından veya rol üyelerine dağıtıldığından dolayı rol dağıtımı gerçekleştirmedim.`, "log");
      guard.queryTasks.query(async () => {
          return new Promise(async (resolve) => { 
              for (let index = 0; index < members.length; index++) {
                  if(!role) {
                      client.logger.log(`[${role}] - ${bot.user.username} - Rol Silindi Dağıtım İptal`, "log");
                      break;
                  }
                  let cartelcimid = members[index];
                  let cartelcim = guard.guilds.cache.get(global.sistem.SUNUCU.GUILD).members.cache.get(cartelcimid)
                  if (!cartelcim || (cartelcim && cartelcim.roles.cache.has(role.id))) continue;
                  await cartelcim.roles.add(role.id).catch(() => {
                      client.logger.log(`${cartelcim.user.username} - kişisine rol verilemedi.`, "log");
                  })
              }
              resolve();
          })
        })
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
      })
  }

  rolKur(role, newRole) {
    GUILD_ROLE_DATAS.findOne({ roleID: role }, async (err, data) => {
      let length = data.members.length
      const sayı = Math.floor(length / Distributors.length);
     if(sayı < 1) {
        const channelPerm = data.channelOverwrites.filter(e => client.guilds.cache.get(sistem.SUNUCU.GUILD).channels.cache.get(e.id))
        for await (const perm of channelPerm) {
          const bott = Distributors[0]
          const guild2 = bott.guilds.cache.get(sistem.SUNUCU.GUILD)
          let kanal = guild2.channels.cache.get(perm.id);
          let newPerm = {};
          perm.allow.forEach(p => {
            newPerm[p] = true;
          });
          perm.deny.forEach(p => {
            newPerm[p] = false;
          });
          kanal.permissionOverwrites.create(newRole, newPerm).catch(error => client.logger.error(error));
        }
        return
     }
      const channelPerm = data.channelOverwrites.filter(e => client.guilds.cache.get(sistem.SUNUCU.GUILD).channels.cache.get(e.id))
      for await (const perm of channelPerm) {
        const bott = Distributors[0]
        const guild2 = bott.guilds.cache.get(sistem.SUNUCU.GUILD)
        let kanal = guild2.channels.cache.get(perm.id);
        let newPerm = {};
        perm.allow.forEach(p => {
          newPerm[p] = true;
        });
        perm.deny.forEach(p => {
          newPerm[p] = false;
        });
        kanal.permissionOverwrites.create(newRole, newPerm).catch(error => client.logger.error(error));
      }
      
      let Dists = Distributors.length;
      let countUser = length % Dists;
      Distributors.forEach((guard, _index) => {
        const members = data.members.splice(0, (_index == 0 ? sayı + countUser : sayı));
        if (members.length <= 0) return client.logger.log(`[${role}] Olayında kayıtlı üye olmadığından veya rol üyelerine dağıtıldığından dolayı rol dağıtımı gerçekleştirmedim.`, "log");
        guard.queryTasks.query(async () => {
            return new Promise(async (resolve) => { 
                for (let index = 0; index < members.length; index++) {
                    if(!newRole) {
                        client.logger.log(`[${role}] - ${bot.user.username} - Rol Silindi Dağıtım İptal`, "log");
                        break;
                    }
                    let cartelcimid = members[index];
                    let cartelcim = guard.guilds.cache.get(global.sistem.SUNUCU.GUILD).members.cache.get(cartelcimid)
                    if (!cartelcim || (cartelcim && cartelcim.roles.cache.has(newRole.id))) continue;
                    await cartelcim.roles.add(newRole.id).catch(() => {
                        client.logger.log(`${cartelcim.user.username} - kişisine rol verilemedi.`, "log");
                    })
                }
                resolve();
            })
          })
          function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
        })


        const newData = new GUILD_ROLE_DATAS({
            roleID: newRole.id,
            name: newRole.name,
            color: newRole.hexColor,
            hoist: newRole.hoist,
            position: newRole.position,
            permissions: newRole.permissions.bitfield,
            mentionable: newRole.mentionable,
            time: Date.now(),
            members: data.members.filter(e => newRole.guild.members.cache.get(e)),
            channelOverwrites: data.channelOverwrites.filter(e => newRole.guild.channels.cache.get(e.id))
          });
          newData.save();
    })
  }
  
async processGuard(opt) {
    await GUARD_SETTINGS.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {
        "Process": {
            date: Date.now(),
            type: opt.type,
            target: opt.target,
            member: opt.member ? opt.member : undefined,
        }
    }}, {upsert: true});
}

async punitivesAdd(id, type) {
    let cartelcim = client.guilds.cache.get(sistem.SUNUCU.GUILD).members.cache.get(id);
    if (!cartelcim) return;
    if (type == "jail") { 
    if(cartelcim.voice.channel) await cartelcim.voice.disconnect().catch(err => {})
    return await cartelcim.roles.cache.has(roller.boosterRolü) ? cartelcim.roles.set([roller.boosterRolü, roller.şüpheliRolü]) : cartelcim.roles.set([roller.şüpheliRolü]).catch(err => {}); 
    }

    if (type == "ban") return await cartelcim.ban({ reason: "Guard Tarafından Siki Tuttu." }).catch(err => {}) 
};

async allPermissionClose() {
    const Roles = require('../../database/Schemas/Guards/Guild.Protection.Roles.Backup');
    let sunucu = client.guilds.cache.get(sistem.SUNUCU.GUILD);
    if(!sunucu) return;
    
    const perms = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"];
    let roller = sunucu.roles.cache.filter(rol => rol.editable).filter(rol => perms.some(yetki => rol.permissions.has(yetki)))
    roller.forEach(async (rol) => {
        await Roles.updateOne({Role: rol.id}, {$set: {"guildID": sunucu.id, Reason: "Guard Tarafından Devre-Dışı Kaldı!", "Permissions": rol.permissions.bitfield }}, {upsert: true})
        await rol.setPermissions(0n)
    });

    if(roller) {
        let Rows = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel("Rol İzinleri Aktif Et")
                .setStyle("PRIMARY")
                .setCustomId("proc_off")
                .setEmoji("943285259733184592")

        )
        let kanal = sunucu.kanalıBul("cartelfx")
        const owner = await sunucu.fetchOwner();
        if(owner) owner.send({embeds: [new richEmbed().setDescription(`**Merhaba!** ${sunucu.name}
Aşağı da listelenmekte olan rol(lerin) önemli izinleri başarıyla kapatıldı. ${sunucu.emojiyiBul(emojiler.onay_cartel) ? sunucu.emojiyiBul(emojiler.onay_cartel) : ":white_check_mark:"}

**İzinleri Kapatılan Rol(ler)**
${roller.size >= 1 ? roller.map(x => `\` • \` ${x} (\`${x.id}\`)`).join("\n ") : `\` • \` İzinleri Kapatılan deleted-role!`}

Yukarda bulunan rol(lerin) izinlerini tekrardan aktif etmek için, ${sunucu.name} sunucusunda bulunan \`#cartelfx\` kanalında ki düğmeden aktif edebilirsin.`)]}).catch(err => {})

        if(kanal) kanal.send({content:`@everyone`, embeds: [new richEmbed().setDescription(`**Merhaba!** ${sunucu.name}
Aşağı da listelenmekte olan rol(lerin) önemli izinleri başarıyla kapatıldı. ${sunucu.emojiyiBul(emojiler.onay_cartel) ? sunucu.emojiyiBul(emojiler.onay_cartel) : ":white_check_mark:"}

**İzinleri Kapatılan Rol(ler)**
${roller.size >= 1 ? roller.map(x => `\` • \` ${x} (\`${x.id}\`)`).join("\n ") : `\` • \` İzinleri Kapatılan deleted-role!`}

Aşağıda bulunan düğme ile tekrardan aktif edebilirsin. Bunun için sunucu sahibi veya bot sahibi olmalısın.`)], components: [Rows]}).then(async (msg) => {
            let tacsahip = await sunucu.fetchOwner();
            var filter = i =>  i.customId == "proc_off" && (sistem.Rooter.Users.includes(i.user.id) || i.user.id === tacsahip.id)
            let collector = msg.createMessageComponentCollector({ filter, max: 1 })
            collector.on('collect', async (i) => {
                let checkRoles = await Roles.find({})
                if(checkRoles) checkRoles.filter(x => msg.guild.roles.cache.get(x.Role)).forEach(async (data) => {
                    let rolgetir = msg.guild.roles.cache.get(data.Role)
                    if(rolgetir) rolgetir.setPermissions(data.Permissions).catch(err => {});
                })
                Rows.components[0].setStyle("SUCCESS").setLabel("Rol İzinleri Aktif Edildi").setDisabled(true)
                msg.edit({components: [Rows]})
                i.reply({embeds: [new richEmbed().setDescription(`
Başarıyla ${sunucu.name} sunucusunun **${checkRoles ? checkRoles.length >= 1 ? checkRoles.length : 0 : 0}** rolünün izinleri tekrardan aktif edildi. ${sunucu.emojiyiBul(emojiler.onay_cartel) ? sunucu.emojiyiBul(emojiler.onay_cartel) : ":white_check_mark:"}

${checkRoles.length >= 1 ? ` **İzinleri Tekrardan Açılan Rol(ler)**:\n`+ checkRoles.map(x => `\` • \` ${sunucu.roles.cache.get(x.Role)} (\`${x.Role}\`)`).join("\n") : `\` • \` İzinleri Kapatılan deleted-role!`}`)],

                ephemeral: true})
                await Roles.deleteMany({guildID: sunucu.id})
            })
        })
    }
}


        bağlan(token) {
            if(!token) {
                this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} isimli botun tokeni girilmediğinden dolayı bot kapanıyor...`,"error");
                process.exit()
                return;
            }
            this.login(token).then(cartel => {
                this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} İSİMLİ BOT AKTİF EDİLDİ.`,"botReady")
              
                this.on("ready", async () => {
                    let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD);
                    if(!guild) {
                        console.log(`https://discord.com/api/oauth2/authorize?client_id=${this.user.id}&permissions=0&scope=bot%20applications.commands`)

                    }
                                  this.Upstaffs = require('../Additions/Staff/Global.Staff.Index');
                    this._statSystem = global._statSystem = require('../Additions/Staff/Sources/Global.Staff.Settings');
                    if(guild) await guild.members.fetch().then(fetch => { })
                  
                })
            

                this.on("ready", () => {
                    client.user.setPresence({
                        activities: [{ name: sistem.botStatus.Name, type: "LISTENING" }],
                        status: "dnd"
                    })
                      const channel = client.channels.cache.get(sistem.SUNUCU.VoiceChannelID)
                        joinVoiceChannel({
                            channelId: channel.id,
                            guildId: channel.guild.id,
                            adapterCreator: channel.guild.voiceAdapterCreator,
                            selfDeaf: true,
                            selfMute: false,
                        });
                  })}).catch(() => {
                this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} İSİMLİ BOTUN TOKENİ ARIZALI, 5 SANİYENİN ARDINDAN YENİDEN DENENECEKTİR.`,"reconnecting")
                setTimeout(() => {
                    this.login().catch(cartel => {
                        this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} İSİMLİ BOTUN TOKENİ ARIZALI.`,"error")
                        process.exit()
                    })
                }, 5000 )
            })
        }

}
class mongoose {
    static bağlan(options) {
        const active = options && options.active !== undefined ? options.active : true;
        const url = options && options.url !== undefined ? options.url : 'mongodb://localhost:27017/v13';

        if(active) {
            require("mongoose").set('strictQuery', true);
            require("mongoose").connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then(() => {
                setTimeout(() => {
                    client.logger.log(`${black.bgHex('#D9A384')(client.botİsmi.toUpperCase())} this client is connected to Mongoose.`, "mongodb");
                }, 3000)
            }).catch((err) => {
                client.logger.log(`${black.bgHex('#D9A384')(client.botİsmi.toUpperCase())} this client is failed connect to Mongoose.` + err, "error");
                return process.exit()
            });
        }
    }
}
class sunucu {
    static async getir(options) {
        const id = options && options.server;

        if (!id) {
            client.logger.log("Sunucu kimliği girilmediği için sunucu verisi getirilemedi...", "error");
            return;
        }

        await GUILD_SETTINGS.updateOne({ guildID: id }, { $set: { _id: 1 } }, { upsert: true });

        try {
            let data = await GUILD_SETTINGS.findOne({ guildID: id });

            if (data) {
                ayarlar = client._settings = global.ayarlar = global._settings = kanallar = client._channels = global.kanallar = global.channels = roller = client._roles = global.roller = global._roles = data;
                emojiler = client._emojis = global.emojiler = global._emojis = require('../Ayarlar/emojiler.json');
                cevaplar = client._reply = global.cevaplar = global._reply = require('../Ayarlar/cevaplar');
            } else {
                await GUILD_SETTINGS.updateOne({ guildID: id }, { $set: { _id: 1 } }, { upsert: true });
                client.logger.log(`${black.bgHex('#D9A384')} Sunucu verisi önceden getirilmediği için yeniden yüklendi. `, "warn");
            }
        } catch (err) {
            client.logger.log("An error occurred while installing server data: " + err, "error");
        }
    }
}

module.exports = { cartel, mongoose, sunucu}