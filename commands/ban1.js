const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply("❌ Je hebt de permissie `BAN_MEMBERS` nodig voor dit commando.");

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("❌ De bot heeft de permissie `BAN_MEMBERS` nodig voor dit commando.");

    if (!args[0]) return message.reply("❌ Gelieve een gebruiker op te geven");

    if (!args[1]) return message.reply("❌ Gelieve een reden op te geven");

    var banUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id);

    if (!banUser) return message.reply("❌ Ongeldige gebruiker");

    if (banUser.permissions.has("MANAGE_MESSAGES")) return message.reply("❌ Je kunt geen staff bannen");

    var reason = args.slice(1).join(" ");

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Gelieve te reageren binnen 30 seconden")
        .setDescription(`Wil je ${banUser} bannen?`);

    var embed = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Gebant:** ${banUser} (${banUser.id})
            **Gebant door:** ${message.author}
            **Reden:** ${reason}`)
        .setFooter(message.member.displayName)
        .setTimestamp();


    message.channel.send({ embeds: [embedPrompt] }).then(async msg => {

        let authorID = message.author.id;
        let time = 30;
        let reactions = ["✅", "❌"];

        time *= 1000;

        for (const reaction of reactions) {
            await msg.react(reaction);
        }

        const filter = (reaction, user) => {
            return reactions.includes(reaction.emoji.name) && user.id === authorID;
        };

        msg.awaitReactions({ filter, max: 1, time: time }).then(collected => {
            var emojiDetails = collected.first();

            if (emojiDetails.emoji.name === "✅") {

                msg.delete();

                banUser.ban({reason: reason}).catch(err => {
                    if (err) return message.channel.send(`Er is iets fout gegaan.`);
                });

                message.channel.send({ embeds: [embed] });

            } else if (emojiDetails.emoji.name === "❌") {

                msg.delete();

                message.channel.send("ban geanulleerd").then(msg => {
                    message.delete()
                    setTimeout(() => msg.delete(), 5000);
                });

            }

        });
    });

}

module.exports.help = {
    name: "ban1",
    category: "admin",
    description: "bant leden"
}