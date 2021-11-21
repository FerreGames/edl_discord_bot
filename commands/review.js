const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    const amountStars = args[0];

    if (!amountStars || amountStars < 1 || amountStars > 5) return message.reply("Geef een aantal sterren op tussen 1 en 5.");

    const messageReview = args.splice(1, args.length).join(" ") || '*Geen bericht meegegeven*';

    const reviewChannel = message.member.guild.channels.cache.get("898623427416563772");

    if (!reviewChannel) return message.reply("Kanaal niet gevonden");

    var stars = "";

    for (var i = 0; i < amountStars; i++) {

        stars += ":star: ";

    }

    message.delete();

    const review = new discord.MessageEmbed()
        .setTitle(`${message.author.username} heeft een review geschreven! 🎉`)
        .setColor("#00ff00")
        .setThumbnail("https://fs19.lt/wp-content/uploads/2018/03/jd-mod-750x505.jpg")
        .addField("Sterren:", `${stars}`)
        .addField("Review:", `${messageReview}`);

    message.channel.send("✅ Je hebt succesvol een review geschreven.");

    return reviewChannel.send({ embeds: [review] });

}

module.exports.help = {
    name: "review",
    category: "general",
    description: "Gebruik dit commando om te laten weten wat je van de server vindt"
}