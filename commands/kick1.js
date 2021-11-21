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

                kickUser.kick(reason).catch(err => {
                    if (err) return message.channel.send(`Er is iets fout gegaan.`);
                });

                message.channel.send({ embeds: [embed] });

            } else if (emojiDetails.emoji.name === "❌") {

                msg.delete();

                message.channel.send("Kick geanulleerd").then(msg => {
                    message.delete()
                    setTimeout(() => msg.delete(), 5000);
                });

            }

        });
    });

}

module.exports.help = {
    name: "kick1",
    category: "admin",
    description: "Kickt leden"
}