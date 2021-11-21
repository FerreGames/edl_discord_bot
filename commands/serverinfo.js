const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Server info")
        .setDescription("Hier vindt je meer informatie over deze server.")
        .setColor("BLURPLE")
        .setThumbnail('https://www.downloadclipart.net/large/exclamation-mark-transparent-images-png.png')
        .addFields(
            {name: "Bot naam", value:client.user.username},
            {name: "je bent de server gejoined op", value: message.member.joinedAt.toString()},
            {name: "Totaal aantal leden", value: message.guild.memberCount.toString() },
            
        )
        .setTimestamp()
        .setFooter("Gestuurd", 'https://fs19.lt/wp-content/uploads/2018/03/jd-mod-750x505.jpg');
        


    return message.channel.send({embeds: [botEmbed], files: [] });
}

module.exports.help = {
    name: "serverinfo",
    category: "info",
    description: "Geeft meer informatie over deze server"
}