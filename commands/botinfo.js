const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Bot info")
        .setDescription("Hier vindt je meer informatie over mij.")
        .setColor("BLURPLE")
        .addField("Bot naam", client.user.username)
        .addField("Geboorte datum", '14/09/2021 19:57')
        .addField("Bot maker", "@Dikkepistolet#4400")
        .addField("Bot profiel", "⬇")
        .setImage('https://fs19.lt/wp-content/uploads/2018/03/jd-mod-750x505.jpg')
        .setThumbnail('https://www.downloadclipart.net/large/exclamation-mark-transparent-images-png.png')
        .setTimestamp()
        .setFooter("Gestuurd", 'https://fs19.lt/wp-content/uploads/2018/03/jd-mod-750x505.jpg');

    return message.channel.send({ embeds: [botEmbed], files: [] });
}

module.exports.help = {
    name: "botinfo",
    category: "info",
    description: "Geeft informatie over mij"
}