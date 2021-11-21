const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Info")
        .setDescription("Hier vindt je meer informatie over `edl_farming_pics`.")
        .setColor("BLURPLE")
        .addField("Sociale media:", "[__Instagram__](https://instagram.com/edl_farming_pics?utm_medium=copy_link)  ,   [__Youtube__](https://www.youtube.com/channel/UC21EKTMQpcPYAbshSZ-rLrQ)   ,   [__Discord__](https://discord.gg/NhRvfCCrP2)")
        .addField("Discord gegevens", "Naam: edl_farming_pics#2371 ,  id: 773892222877564938")   
        .addField("Leeftijd", "14 jaar" )
        .addField("Woonplaats", "Zeeland" )    
        .setThumbnail('https://www.downloadclipart.net/large/exclamation-mark-transparent-images-png.png')
        .setTimestamp()
        .setFooter("Gestuurd", 'https://fs19.lt/wp-content/uploads/2018/03/jd-mod-750x505.jpg');

    return message.reply({ embeds: [botEmbed], files: [] });
}

module.exports.help = {
    name: "edlinfo",
    category: "info",
    description: "Geeft informatie over edl_farming_pics"
}