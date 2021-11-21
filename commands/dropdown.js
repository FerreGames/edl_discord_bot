const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const options = [
        {
            label: "YT Abonnee",
            value: "910245066042376262"
        },
        {
            label: "IG Volger",
            value: "910246189608370237"
        },
        {
            label: "TikTok Volger",
            value: "910246709060304986"
        }
    ];

    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setcustomId("roles")
                .setMinValues(0)
                .setMaxValues(3)
                .setPLaceHolder("Selecteer je rol(len)")
                .addOptions(options)
        );    
}

module.exports.help = {
    name: "dropdown",
    category: "general",
    description: "Geeft een rollen menu die je zelf kan toevoegen"
}