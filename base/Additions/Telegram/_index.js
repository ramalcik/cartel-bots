const TBOT = require('node-telegram-bot-api');
let chatIds = [""]
class Telegram extends TBOT {
    constructor() {
        super("", {polling: true})
    }

    async bilgilendirmeGönder(content) {
        chatIds.map(id => {
            this.sendMessage(id, content)
        })
    }
}

module.exports = { Telegram }