const GUILD_ROLES = require("../../database/Schemas/Guards/Backup/Guild.Roles");
const GUILD_CATEGORY = require("../../database/Schemas/Guards/Backup/Guild.Category.Channels");
const GUILD_TEXT = require("../../database/Schemas/Guards/Backup/Guild.Text.Channels");
const GUILD_VOICE = require("../../database/Schemas/Guards/Backup/Guild.Voice.Channels");

const sistem = require('../Ayarlar/server.json');

class guildBackup {

    static async guildChannels() {
        const guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
        if (guild) {
            const channels = []
            await guild.channels.cache.forEach(ch => {
                channels.push(ch)
            })
            for (let index = 0; index < channels.length; index++) {
                const channel = channels[index];
                let ChannelPermissions = []
                if(channel.permissionOverwrites) channel.permissionOverwrites.cache.forEach(perm => {
                    ChannelPermissions.push({ id: perm.id, type: perm.type, allow: "" + perm.allow, deny: "" + perm.deny })
                });
                if ((channel.type === 'GUILD_TEXT') || (channel.type === 'GUILD_NEWS')) {
                    await GUILD_TEXT.findOne({ channelID: channel.id }, async (err, kanalYedek) => {
                        if (!kanalYedek) {
                            const newData = new GUILD_TEXT({
                                channelID: channel.id,
                                name: channel.name,
                                nsfw: channel.nsfw,
                                parentID: channel.parentId,
                                position: channel.position,
                                rateLimit: channel.rateLimitPeruser.username,
                                overwrites: ChannelPermissions,
                            });
                            await newData.save();
                        } else {
                            kanalYedek.name = channel.name,
                                kanalYedek.nsfw = channel.nsfw,
                                kanalYedek.parentID = channel.parentId,
                                kanalYedek.position = channel.position,
                                kanalYedek.rateLimit = channel.rateLimitPeruser.username,
                                kanalYedek.overwrites = ChannelPermissions
                            kanalYedek.save();
                        };
                    }).catch(err => {});;
                }
                if (channel.type === 'GUILD_VOICE') {
                    await GUILD_VOICE.findOne({ channelID: channel.id }, async (err, kanalYedek) => {
                        if (!kanalYedek) {
                            const newData = new GUILD_VOICE({
                                channelID: channel.id,
                                name: channel.name,
                                bitrate: channel.bitrate,
                                parentID: channel.parentId,
                                position: channel.position,
                                userLimit: channel.userLimit ? channel.userLimit : 0 ,
                                overwrites: ChannelPermissions,
                            });
                            await newData.save();
                        } else {
                            kanalYedek.name = channel.name,
                                kanalYedek.bitrate = channel.bitrate,
                                kanalYedek.parentID = channel.parentId,
                                kanalYedek.position = channel.position,
                                kanalYedek.userLimit = channel.userLimit ? channel.userLimit : 0,
                                kanalYedek.overwrites = ChannelPermissions
                            kanalYedek.save();
                        };
                    }).catch(err => {});
                }
                if (channel.type === 'GUILD_CATEGORY') {
                    await GUILD_CATEGORY.findOne({ channelID: channel.id }, async (err, kanalYedek) => {
                        if (!kanalYedek) {
                            const newData = new GUILD_CATEGORY({
                                channelID: channel.id,
                                name: channel.name,
                                position: channel.position,
                                overwrites: ChannelPermissions,
                            });
                            await newData.save();
                        } else {
                            kanalYedek.name = channel.name,
                                kanalYedek.position = channel.position,
                                kanalYedek.overwrites = ChannelPermissions
                            kanalYedek.save();
                        };
                    }).catch(err => {});;
                }
            }
            await client.logger.log(`${tarihsel(Date.now())} tarihinde Kanal güncelleme işlemleri tamamlandı.`, "backup");
        }
    }

    static async guildRoles() {
        const guild = client.guilds.cache.get(sistem.SUNUCU.GUILD);
        const roles = [] 
        await guild.roles.cache.filter(r => r.name !== "@everyone").forEach(rol => {
            roles.push(rol)
        })
        
        for (let index = 0; index < roles.length; index++) {
            const role = roles[index];
            let Overwrites = [];
            await guild.channels.cache.filter(channel => channel.permissionOverwrites && channel.permissionOverwrites.cache.has(role.id)).forEach(channel => {
                let channelPerm = channel.permissionOverwrites.cache.get(role.id);
                let perms = { id: channel.id, allow: channelPerm.allow.toArray(), deny: channelPerm.deny.toArray() };
                Overwrites.push(perms);
            });
            await GUILD_ROLES.findOne({ roleID: role.id }, async (err, data) => {
                if (!data) {
                    let newData;
                    if(role.icon) {
                        newData = new GUILD_ROLES({
                            roleID: role.id,
                            name: role.name,
                            color: role.hexColor,
                            hoist: role.hoist,
                            position: role.position,
                            icon: role.iconURL({format: 'png'}),
                            permissions: role.permissions.bitfield,
                            mentionable: role.mentionable,
                            date: Date.now(),
                            members: role.members.map(m => m.id),
                            channelOverwrites: Overwrites
                        });
                    } else {
                        newData = new GUILD_ROLES({
                            roleID: role.id,
                            name: role.name,
                            color: role.hexColor,
                            hoist: role.hoist,
                            position: role.position,
                            permissions: role.permissions.bitfield,
                            mentionable: role.mentionable,
                            date: Date.now(),
                            members: role.members.map(m => m.id),
                            channelOverwrites: Overwrites
                        });
                    }
                    newData.save();
                } else {
                    data.name = role.name;
                    data.color = role.hexColor;
                    data.hoist = role.hoist;
                    data.icon = role.iconURL({ format: 'png' });
                    data.position = role.position;
                    data.permissions = role.permissions.bitfield;
                    data.mentionable = role.mentionable;
                    data.date = Date.now();
                    data.members = role.members.map(m => m.id);
                    data.channelOverwrites = Overwrites;
                    data.save();
                };
            }).catch(err => {});
        }
        await GUILD_ROLES.find({}, (err, roles) => {
            roles.filter(r => !guild.roles.cache.has(r.roleID) && Date.now() - r.date > 1000 * 60 * 60 * 24 * 3).forEach(r => {
                r.remove()
            });
        }).catch(err => {})
        await client.logger.log(`${tarihsel(Date.now())} tarihinde Rol güncelleme işlemleri tamamlandı.`, "backup");
    };

}


module.exports = { guildBackup }