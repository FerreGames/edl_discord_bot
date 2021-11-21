const { DiscordAPIError } = require("discord.js");

module.exports.run = async (client, message, args) => {

    return message.reply('Dit commando is nog in de maak');
}

module.exports.help = {
    name: "reactierol",
    category: "admin",
    description: "Coming soon..."
}