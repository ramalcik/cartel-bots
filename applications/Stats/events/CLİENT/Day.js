const TimeManager = require("../../../../base/Additions/Stats/Time.Manager");

module.exports = async () => {
    const tm = TimeManager;
    await tm.checkDay(global.sistem.SUNUCU.GUILD);
    setInterval(async () => {
        await tm.checkDay(global.sistem.SUNUCU.GUILD);
    }, 5000);
}

module.exports.config = {
    Event: "ready"
}