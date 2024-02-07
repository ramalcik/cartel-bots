const mongoose = require('mongoose')

const schema = mongoose.model('Guild', new mongoose.Schema({
    _id: String,
    guildID: String,
    Date: {type: Date, default: Date.now()},
    Caches: {type: Object, default: {
        leaderboardVoice: undefined,
        leaderboardText: undefined,
        latest: undefined,
        lastRecord: undefined,
        lastTagged: undefined,
        lastStaff: undefined, 
    }},

    Ayarlar: {type: Object, default: {
        // Stat Ayarları
        _chats: [],
        _voices: [],
        _staffs: [],
        izinliKategoriler: [],
        fullPuanKategoriler: [],
        ayrıkKanallar: [],

        Sistem: true,
        tamSesPuan: 5.5,
        yarımSesPuan: 1,
        davetPuan: 1,
        mesajPuan: 0.1,
        taglıPuan: 20,
        yetkiliPuan: 20,
        kayıtPuan: 2.5,
        görevPuan: 5,
        // Stat Ayarları

        
        minYaş: "14",
       
        type: true,
       c: ["cartelfx"],
        taglıalım: false,
               küfürEngel: true,
        reklamEngel: true,
        chatİzinliler: [],
        
        kurucuRolleri: [],
        yönetimRolleri: [],
        altYönetimRolleri: [],
        üstYönetimRolleri: [],
        teyitciRolleri: [],
        Yetkiler: [],
        musicRooms: [],
        kayıtsızLimit: "3",
        muteLimit: "7",
        voiceMuteLimit: "7",
        jailLimit: "5",
        banLimit: "3",
       
       
        serverName: sistem.SUNUCU.GUILD_NAME ? global.sistem.SUNUCU.GUILD_NAME : "Creatéd by CΛRTEL",
               tagsiz: "•",
             yetkiliYasaklıTag: [
            '⍫', 'Ϟ', '☨', '🜾',
            '☆', '†', 'ග', 'ζ',
            '⍭', '✯', '▽', '❃',
            '⚚', '✬', '✦', '✧', 'Ψ',
            "◭","✩", "⧨"
          ]
    }},

    talentPerms: Object,
}));

module.exports = schema;