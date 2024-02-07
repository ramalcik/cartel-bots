const { VoiceState, MessageEmbed } = require("discord.js");
const forceBans = require('../../../../database/Schemas/Punitives.Forcebans');
const Mutes = require('../../../../database/Schemas/Punitives.Mutes');
const VMute = require('../../../../database/Schemas/Punitives.Vmutes');
const Jails = require('../../../../database/Schemas/Punitives.Jails');
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const { richEmbed } = require("../../../../base/Funksiyonlar/embed");
/**
 * @param {VoiceState} oldState 
 * @param {VoiceState} newState 
 */
module.exports = async (oldState, newState) => {
  if ((!oldState.channel && newState.channel) || (oldState.channel && newState.channel)) {
      let member = newState.member;
      if (!member || member.user.bot) return;
      if (kanallar && kanallar.sorunCozmeKategorisi && newState.channel.parentId == ayarlar.sorunCozmeKategorisi) return;
      
      let data = await VMute.findOne({ _id: member.id });

      if (data) {
          if (data.Duration && Date.now() >= data.Duration) {
              if (member.voice.channel) await member.voice.setMute(false).catch(err => {});
              await Punitives.updateOne({ No: data.No }, { $set: { "Active": false, Expried: Date.now()} }, { upsert: true });
              await VMute.findByIdAndDelete(member.id);
          } else if (member.voice.channel && !member.voice.serverMute) {
              if (member.voice.channel) await member.voice.setMute(true);
          }
      }
  }

  if (newState.channel && newState.channel.name.includes('+18')) {
      const botMember = newState.member.guild.me;
      if (botMember.permissions.has("MOVE_MEMBERS")) {
          const age = parseInt(newState.member.displayName.match(/\d+/));
          if (!isNaN(age) && age < 18) {
              newState.member.send({ embeds: [new richEmbed().üstBaşlık(newState.member.user.username, newState.member.user.avatarURL({ dynamic: true })).açıklama(`${newState.member}, sunucuda yaşınız **18 yaş** altı olduğu için katılmaya çalıştığınız **${newState.channel.name}** kanalından çıkarıldınız.`)]});
              newState.setChannel(null);
          }
      } else {
          console.log(`${newState.member} kişisi +18 kanaldan çıkarılamadı.`);
      }
  }
}



module.exports.config = {
    Event: "voiceStateUpdate"
}

client.on("voiceChannelJoin", async (member, channel) => {
      
  if(!member) return;
  if (member.user.bot) return;
  if((kanallar.ayrıkKanallar && kanallar.ayrıkKanallar.some(x => channel.id == x))|| channel.parentId == kanallar.streamerKategorisi || channel.parentId == kanallar.registerKategorisi) return;
  let data = await VMute.findOne({ _id: member.id })
  if(!data) {
    if(member.voice && member.voice.serverMute) await member.voice.setMute(false).catch(err => {});
  }
 
})

client.on("voiceChannelSwitch", async (member, old, channel) => {
  if(!member) return;
  if (member.user.bot) return;
  if((kanallar.ayrıkKanallar && kanallar.ayrıkKanallar.some(x => channel.id == x))|| channel.parentId == kanallar.streamerKategorisi || channel.parentId == kanallar.registerKategorisi) return;
  let data = await VMute.findOne({ _id: member.id })
  if(!data) {
    if(member.voice && member.voice.serverMute) await member.voice.setMute(false).catch(err => {});
  }
})