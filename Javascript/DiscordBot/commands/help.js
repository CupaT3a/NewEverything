const Discord = require("discord.js")

module.exports = {
    name: 'help',
    description: 'help',
    execute(message, args, prefix){

        const help = {
            command: "Help",
            alias: "`help`",
            description: "Displays all commands",
            usage: `<${prefix}help> <command>`
        }
        const ping = {
            command: "Ping",
            alias: "`ping`",
            description: "See if the bot responds",
            usage: `<${prefix}ping>`
        }

        const spam = {
            command: "Spam",
            alias: "`spam`",
            description: "Spams text",
            usage: `<${prefix}spam> <text>`
        }
        const kill = {
            command: "Kill",
            alias: "`kill`",
            description: "Teapotbot kills someone",
            usage: `<${prefix}kill> <member>`
        }
        const coinflip = {
            command: "Coinflip",
            alias: "`coinflip`",
            description: "Teapotbot flips a coin",
            usage: `<${prefix}coinflip>`
        }

        const meme = {
            command: "Meme",
            alias: "`meme` `meme5`",
            description: "Displays a meme",
            usage: `<${prefix}meme> OR <${prefix}meme5>`
        }
        const dmeme = {
            command: "Dank Meme",
            alias: "`dmeme` `dmeme5`",
            description: "Displays a dank meme",
            usage: `<${prefix}dmeme> OR <${prefix}dmeme5>`
        }
        const aww = {
            command: "Aww",
            alias: "`aww` `aww5`",
            description: "Displays a cute image",
            usage: `<${prefix}aww> OR <${prefix}aww5>`
        }

        function Command(info, prefix) {

            const Embed = new Discord.MessageEmbed()
                .setColor('#34eb71')
                .setTitle(`**Command - ${info.command}**`)
                .setDescription(`Type **${prefix}<command>** to execute a command!`)
                .addField("Aliases", `${info.alias}`)
                .addField("Description", `${info.description}`)
                .addField("Usage", `${info.usage}`)
                .setTimestamp()

            return message.channel.send(Embed);

        }

        if (!args[0]) {
            const Help = new Discord.MessageEmbed()
            
            .setColor("#34eb71")
            .setTitle("**Teapotbot - Help**")
            .setDescription(`Type ${prefix}<command> to execute a command!`)
            .addField(':gear:  General', '`help` `ping`',  true)
            .addField(':musical_note:  Music (Not Available)', '`play` `skip` `stop`', true)
            .addField(':grinning:  Fun', '`spam` `kill` `coinflip`', true)
            .addField(':joy:  Reddit', '`meme` `dmeme` `aww`', true)
            .setTimestamp()
        
            return message.channel.send(Help);

        } else if (args[0] === "help") {
            Command(help, prefix)

        } else if (args[0] === "ping") {
            Command(ping, prefix)

        } else if (args[0] === "spam") {
            Command(spam, prefix)

        } else if (args[0] === "kill") {
            Command(kill, prefix)

        } else if (args[0] === "coinflip") {
            Command(coinflip, prefix)

        } else if (args[0] === "meme" || args[0] === "meme5") {
            Command(meme, prefix)

        } else if (args[0] === "dmeme" || args[0] === "dmeme5") {
            Command(dmeme, prefix)

        } else if (args[0] === "aww" || args[0] === "aww5") {
            Command(aww, prefix)

        } else {
            return message.channel.send("No such command")
        }

    }
}