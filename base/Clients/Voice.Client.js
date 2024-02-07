const { Client, VoiceChannel, GuildMember, Guild } = require('discord.js');

let sys = require('../Ayarlar/welcome.json');

const {
    createAudioPlayer,
    createAudioResource,
    NoSubscriberBehavior,
    AudioPlayerStatus,
    joinVoiceChannel,
} = require('@discordjs/voice');
const play = require('play-dl');

class cartel extends Client {
    constructor(options) {
        super({
            options,
            intents: [
               32767]
                 })

        this.player = createAudioPlayer({
            inlineVolume : true,
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play,
            },
        });
        this.voiceSys = global.voiceSys = sys
        this.url = this.voiceSys.youtube
        this.stream;
        this.message;
        this.channelId;
        this.playing;
        this.voiceConnection;
        this.staffJoined = false;
           
           }
    bağlan(content, index) {
        this.login(content).then(x => {
            console.log(`WELCOME BOTU AKTİF EDİLMİŞTİR.`)
        }).catch(x => {
            console.log(`${index} SATIRDAKİ WELCOME BOTUNA GİRİŞ YAPILAMADI.`)
        
        })

      }

    async _start(channelId, a) {
        let guild = this.guilds.cache.get(this.voiceSys.SUNUCU.GUİLD);
        if(!guild) return console.log("Sunucu Bulunamadı.");
        let channel = guild.channels.cache.get(channelId);
        if(!channel) return console.log("Kanal Bulunamadı.");
        this.channelId = channelId;
    
        let connection = this.voiceConnection 
        let stream;
        let resource;
        if(this.voiceSys.YerelDosya) {
            resource = this.stream = createAudioResource(this.voiceSys.file); 
        } else {
            stream = await play.stream(this.url);
            resource = this.stream = createAudioResource(stream.stream, {
                inputType: stream.type,
            }); 
        }
        
        let player = this.player
        
        player.on(AudioPlayerStatus.Playing, () => {
       
        });
        player.on(AudioPlayerStatus.Paused, () => {
            
        });
        player.on('idle', async () => {
            if(this.staffJoined == true) return;
            if(this.voiceSys.YerelDosya) {
                resource = this.stream = createAudioResource(this.voiceSys.file); 
            } else {
                stream = await play.stream(this.url);
                resource = this.stream = createAudioResource(stream.stream, {
                    inputType: stream.type,
                }); 
            }
            this.player.play(resource);
        });
        if(this.staffJoined == true) return;
        player.play(resource)
        connection.subscribe(player);

   }
}

module.exports = { cartel };


Guild.prototype.rolüBul = function(content) {
   this.roles.cache.find(r => r.name === content) || this.roles.cache.find(r => r.id === content)
}

Guild.prototype.kanalıBul = function(content) {
  this.channels.cache.find(k => k.name === content) || this.channels.cache.find(k => k.id === content) || this.client.channels.cache.find(e => e.id === content) || this.client.channels.cache.find(e => e.name === content)
  }

VoiceChannel.prototype.hasStaff = function(checkMember = false) {
    if(this.members.some(m => (checkMember !== false ? m.user.id !== checkMember.id : true) && !m.user.bot && m.roles.highest.position >= m.guild.roles.cache.get("1196897462363889717").position)) return true;
    return false;
}

VoiceChannel.prototype.getStaffs = function(checkMember = false) {
    return this.members.filter(m => (checkMember !== false ? m.user.id !== checkMember.id : true) && !m.user.bot && m.roles.highest.position >= m.guild.roles.cache.get("1196897462363889717").position).size
}

    GuildMember.prototype.isStaff = function() {
    if(
        !this.user.bot &&
        (
            this.permissions.has("ADMINISTRATOR") ||
           this.roles.highest.position >= this.guild.roles.cache.get("1196897462363889717").position
        )
    ) return true;
    return false;
}