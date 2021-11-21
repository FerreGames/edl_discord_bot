module.exports.run = async (client, message, args) => {

    var statusTxt = args.join(" ");

    if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply("❌ Je mag dit commando niet gebruiken");

    client.user.setPresence({

        status: "online",
        activities: [
            {
                name: statusTxt
            }
        ]
    });

    return;

}

module.exports.help = {
    name: "status",
    category: "admin",
    description: "verandert de status van de bot"
}