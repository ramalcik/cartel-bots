const {MessageEmbed, Message, Util, Client} = require('discord.js')

class richEmbed extends MessageEmbed {
    constructor(opt) {
        super(opt)
        let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD)
        if(guild) {
            this.renk("RANDOM");
          } else {
            this.renk("RANDOM");
   
       
        }
    }
  başlık(title) {
      this.title = Util.verifyString(title, RangeError, 'EMBED_TITLE');
      return this;
  }
  üstBaşlık(options, deprecatedIconURL, deprecatedURL) {
    if (options === null) {
      this.author = {};
      return this;
    }

    if (typeof options === 'string') {
      options = { name: options, url: deprecatedURL, iconURL: deprecatedIconURL };
    }

    const { name, url, iconURL } = options;
    this.author = { name: Util.verifyString(name, RangeError, 'EMBED_AUTHOR_NAME'), url, iconURL };
    return this;
  }

  renk(color) {
    this.color = Util.resolveColor(color);
    return this;
  }

  açıklama(description) {
    this.description = Util.verifyString(description, RangeError, 'EMBED_DESCRIPTION');
    return this;
  }
  test(user) {
    return this.setAuthor({ name: user.username, iconURL: user.avatarURL({ dynamic: true }) });
}
  sütun(name, value, inline) {
    return this.addFields({ name, value, inline });
  }

  altBaşlık(options, deprecatedIconURL) {
    if (options === null) {
      this.footer = {};
      return this;
    }

    if (typeof options === 'string') {
      options = { text: options, iconURL: deprecatedIconURL };
    }

    const { text, iconURL } = options;
    this.footer = { text: Util.verifyString(text, RangeError, 'EMBED_FOOTER_TEXT'), iconURL };
    return this;

    }
}

module.exports = { richEmbed }
