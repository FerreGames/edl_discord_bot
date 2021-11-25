const { Client, Intents, Collection } = require("discord.js");
const botConfig = require("./botConfig.json");
const fs = require("fs");

client.login(process.env.token)

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get("891300970120740864");

    if (!role) return;
 
    member.roles.add(role);

    var channel = member.guild.channels.cache.get("891303500892487710");

    if (!channel) return;

    channel.send(`Welkom op de server, ${member}`);

})

client.commands = new Collection();

const commandsFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandsFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`${command.help.name} command is geladen.`);

}


client.on("ready", function () {

    console.log(`${client.user.username} is online.`);
    client.user.setActivity("Farming Simulator 19", { type: "WATCHING" });

    const statusOptions = [
        "Jippie",
        "Er wordt gesleuteld aan mij",
        "Eindelijk"
    ]

    let counter = 0;

    let time = 5 * 1000;

    const updateStatus = () => {
        client.user.setPresence({

            status: "online",
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]
        
        });

        if(++counter >= statusOptions.length) counter = 0;

        setTimeout(updateStatus, time);

    }
    updateStatus();

});

// client.on("interactionCreate", async (interaction) => {

//     if (interaction.isButton()) {
//         if (interaction.customId === "primair") {
//             interaction.channel.send("Dit is de primaire knop");
//         }else{
//             interaction.reply("Er is een fout opgetreden");
//         }

//     }

// })

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length));

    if (!commandData) return;

    var argumpents = messageArray.slice(1);

    try {

        await commandData.run(client, message, arguments);

    } catch (error) {
        console.log(error);
        await message.reply("Er is een fout opgetreden.") 
    }
});