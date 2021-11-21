const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const row = new discord.MessageActionRow().addComponents(


        new discord.MessageButton()
            .setCustomId("primair")
            .setLabel("PRIMAIR")
            .setStyle("PRIMARY"),

        new discord.MessageButton()
            .setCustomId("secundair")
            .setLabel("SECUNDAIR")
            .setStyle("SECONDARY"),

        new discord.MessageButton()
            .setCustomId("succes")
            .setLabel("SUCCES")
            .setStyle("SUCCESS"),

        new discord.MessageButton()
            .setCustomId("gevaar")
            .setLabel("GEVAAR")
            .setStyle("DANGER"),

        new discord.MessageButton()
            .setLabel("LINK")
            .setStyle("LINK")
            .setURL("https://bit.ly/3iVW0Qg")

    );

    const rowSecond = new discord.MessageActionRow().addComponents(


        new discord.MessageButton()
            .setCustomId("emoji")
            .setLabel("emoji")
            .setStyle("SUCCESS")
            .setEmoji("😎")

    );

    message.channel.send({ content: "Test bericht", components: [row, rowSecond] });

    const filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true;
        return interaction.reply("Jij kan dit niet gebruiken.");
    }
 
    const collector = message.channel.createMessageComponentCollector({
        filter,
        max: 1
    });
 
    collector.on("collect", (interactionButton) => {
 
        const id = interactionButton.customId;
 
        switch (id) {
            case "primair":
                return interactionButton.reply("Dit is de primaire knop");
            case "emoji":
                return interactionButton.reply("Dit is de emoji knop");
            default:
                return interactionButton.reply("Deze knop heeft nog geen functionaliteit.");
        }
    });

}

module.exports.help = {
    name: "knop",
    category: "general",
    description: "knop"
}