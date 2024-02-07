const { Client, Collection, Constants, Intents, Options } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice')
const fs = require('fs')
const { bgBlue, black, green } = require("chalk");
global.sistem = global.system = require('../Ayarlar/server.json');

const { server } = require('../../base/Clients/Global.Server.Clients');
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const EventEmitter = require('events');
class web extends Client {
    constructor (options) {
        super({
            options,
            intents: [
                32767,
                "GUILDS",
                "GUILD_MEMBERS",
                "GUILD_PRESENCES"
            ],
            makeCache: Options.cacheWithLimits({
                MessageManager: 2000,
                PresenceManager: 50000,
            }),
        });
   
        Object.defineProperty(this, "location", { value: process.cwd() });
        this.sistem = this.system = require('../Ayarlar/server.json');
        server.install();
        this.users.getUser = GetUser;
        this.getUser = GetUser;
        async function GetUser(id) { try { return await this.users.fetch(id); } catch (error) { return undefined; } };
    
        this.logger = require('../Funksiyonlar/Logger');
        this.richEmbed = global.richEmbed = require('../Funksiyonlar/embed');
        this.Upstaffs = global.Upstaffs = []
        this._statSystem = global._statSystem = []
        require('../Funksiyonlar/Dates');
        require('../Funksiyonlar/Numbers');
        require('../Funksiyonlar/server_functions');
        require('../Funksiyonlar/user_functions');
        this.botİsmi;
        this.commands = new Collection();
        this.slashcommands = new Collection();
        this.aliases = new Collection();
        this.eventEmitter = new EventEmitter();
        this.setMaxListeners(10000);

        // Plugins (Stat / Yetkili)

      
        

        this.on("guildUnavailable", async (guild) => { console.log(`[UNAVAIBLE]: ${guild.name}`) })
            .on("disconnect", () => this.logger.log("Bot is disconnecting...", "disconnecting"))
            .on("reconnecting", () => this.logger.log("Bot reconnecting...", "reconnecting"))
            .on("error", (e) => this.logger.log(e, "error"))
            .on("warn", (info) => this.logger.log(info, "warn"));

    

          //  process.on("unhandledRejection", (err) => { this.logger.log(err, "caution") });
           // process.on("warning", (warn) => { this.logger.log(warn, "varn") });
           process.on("warning", (warn) => { this.logger.log(warn, "varn") });
            process.on("beforeExit", () => { console.log('Sistem kapatılıyor...'); });
            process.on("uncaughtException", err => {
                const hata = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
                    console.error("Beklenmedik Hata: ", hata);
                   // process.exit(1);
            });

    }
    bağlan(token) {
        if(!token) {
            this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} isimli botun tokeni girilmediğinden dolayı bot kapanıyor...`,"error");
            process.exit()
            return;
        }
        this.login(token).then(cartel => {
            this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} BOT kullanıma aktif edilmiştir.`,"botReady")
          
            this.on("ready", async () => {
                let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD);
                if(!guild) {
                    console.log(`https://discord.com/api/oauth2/authorize?client_id=${this.user.id}&permissions=0&scope=bot%20applications.commands`)

                }
                this.Upstaffs = require('../Additions/Staff/Global.Staff.Index');
                this._statSystem = global._statSystem = require('../Additions/Staff/Sources/Global.Staff.Settings');
                if(guild) await guild.members.fetch().then(fetch => { })
              
            })
        }
        )
    }

}

module.exports = { web }