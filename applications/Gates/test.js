let { cartel } = require('../../base/Clients/Voice.Client');
const {
    joinVoiceChannel,
} = require('@discordjs/voice');
const voices = require("../../base/Ayarlar/welcome.json")
for (let index = 0; index < voices.tokens.length; index++) {
    let token = voices.tokens[index]
    let channel = voices.channels < 1 ? voices.channels[0] : voices.channels[index]
    if(channel) {
        let client = new cartel()
        client.bağlan(token, index + 1)
                client.on("voiceStateUpdate", async (oldState, newState) => { 
            if(oldState.member.id === client.user.id && oldState.channelId && !newState.channelId) {
                client.user.setPresence({ activities: [{name: voiceSys.Durum}], status: "dnd" })
                let guild = client.guilds.cache.get(voiceSys.SUNUCU.GUİLD);
                if(!guild) return console.log("Sunucu Bulunamadı.");
                let Channel = global.Voice = guild.channels.cache.get(channel);
                if(!Channel) return console.log("Kanal Bulunamadı.");
                client.voiceConnection = await joinVoiceChannel({
                    channelId: Channel.id,
                    guildId: Channel.guild.id,
                    adapterCreator: Channel.guild.voiceAdapterCreator,
                    group: client.user.id
                });
            }
        })
        
        client.on('ready', async () => {
            client.user.setPresence({ activities: [{name: voiceSys.Durum}], status: "dnd" })
            let guild = client.guilds.cache.get(voiceSys.SUNUCU.GUİLD);
            if(!guild) return console.log("Sunucu Bulunamadı.");
            let Channel = global.Voice = guild.channels.cache.get(channel);
            if(!Channel) return console.log("Kanal Bulunamadı.");
            client.voiceConnection = await joinVoiceChannel({
                channelId: Channel.id,
                guildId: Channel.guild.id,
                adapterCreator: Channel.guild.voiceAdapterCreator,
                group: client.user.id
            });
            if(!Channel.hasStaff()) await client._start(channel)
            else client.staffJoined = true, client.playing = false, await client._start(channel);
            
        })
        
        client.on('voiceStateUpdate', async (oldState, newState) => { 
            if(
                newState.channelId && (oldState.channelId !== newState.channelId) &&
                newState.member.isStaff() &&
                newState.channelId === channel &&
                !newState.channel.hasStaff(newState.member)
            ) {
                client.staffJoined = true;
                client.player.stop()
                return;
            }
            if( 
                oldState.channelId && 
                (oldState.channelId !== newState.channelId) && 
                newState.member.isStaff() && 
                oldState.channelId === channel &&
                !oldState.channel.hasStaff()
            ) {
                client.staffJoined = false;
                client._start(channel, true)
                return 
            }
        })
    }
}

