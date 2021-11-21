const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("❌ Je hebt de permissie `KICK_MEMBERS` nodig voor dit commando.");

    if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("❌ De bot heeft de permissie `KICK_MEMBERS` nodig voor dit commando.");

    if (!args[0]) return message.reply("❌ Gelieve een gebruiker op te geven");

    if (!args[1]) return message.reply("❌ Gelieve een reden op te geven");

    var kickUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]));

    if (!kickUser) return message.reply("❌ Ongeldige gebruiker");

    if (kickUser.permissions.has("MANAGE_MESSAGES")) return message.reply("❌ Je kunt geen staff kicken");

    var reason = args.slice(1).join(" ");

    var logChannel = ('891225091499786241');

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Gelieve te reageren binnen 30 seconden")
        .setDescription(`Wil je ${kickUser} kicken?`);

    var embed = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Gekickt:** ${kickUser} (${kickUser.id})
            **Gekickt door:** ${message.author}
            **Reden:** ${reason}`)
        .setFooter(message.member.displayName)
        .setTimestamp();

    const row = new discord.MessageActionRow().addComponents(


        new discord.MessageButton()
            .setCustomId("true")
            .setLabel("OK")
            .setStyle("DANGER"),

        new discord.MessageButton()
            .setCustomId("false")
            .setLabel("Annuleren")
            .setStyle("SECONDARY")

    );

    message.channel.send({ embeds: [embedPrompt], components: [row] }).then(async msg => {

        let authorID = message.author.id;
        let time = 30;


        time *= 1000;

        const filter = (interaction) => {
            if (interaction.user.id === authorID) return true;
            return interaction.reply("Jij kan dit niet gebruiken.");
        }

        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1
        });

        collector.on("collect", (interactionButton) => {

            const ID = interactionButton.customId;

            switch (ID) {
                case "true":
                    msg.delete();

                    kickUser.kick(reason).catch(err => {
                        if (err) return interactionButton.reply(`Er is iets fout gegaan.`);
                    });

                    interactionButton.reply({ embeds: [embed] });
                case "false":
                    msg.delete();

                    interactionButton.reply("Kick geannuleerd").then(msg => {
                        message.delete()
                        setTimeout(() => msg.delete(), 5000);
                    });
                default:
                    return  interactionButton.reply("Deze knop heeft nog geen functionaliteit.");
            }
        });
    });


}

module.exports.help = {
    name: "kick",
    category: "admin",
    description: "kickt leden"
}