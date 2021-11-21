const botConfig = require("../botConfig.json");

module.exports.run = async (client, message, args) => {

    try {

        var prefix = botConfig.prefix;

        var respone = "**Bot commands**\r\n\n";
        var general = "**__Algemeen__**\r\n";
        var info = "\n**__Informatie__**\r\n";
        var admin = "\n**__Admin__**\r\n";

        client.commands.forEach(command => {

            switch (command.help.category) {

                case "general":
                    general += `${prefix}${command.help.name} : ${command.help.description}\r\n`;
                    break;

                case "info":
                    info += `${prefix}${command.help.name} : ${command.help.description}\r\n`;
                    break;

                case "admin":
                    admin += `${prefix}${command.help.name} : ${command.help.description}\r\n`;
                    break;

            }

        });

        respone += general + info + admin;

        message.author.send(respone).then(() => {
            return message.reply("Alle commands staan in je DM's.");
        }).catch(() => {
            return message.reply("Je DM's staan uitgeschakeld. Ik heb geen bericht kunnen sturen.");
        })

    } catch (error) {
        message.reply("Er is een fout opgetreden");
        console.log(error)
    }

}

module.exports.help = {
    name: "help",
    category: "info",
    description: "Geeft dit bericht"
}