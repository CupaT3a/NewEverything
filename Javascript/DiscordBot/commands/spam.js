const Discord = require("discord.js")
var timeout;

module.exports = {
    name: 'spam',
    description: 'errr....',
    execute(message, args, command, prefix){

        const permissions = message.channel.permissionsFor(message.client.user);
        if (!permissions.has("EMBED_LINKS")) {
            return message.channel.send("I need the permissions to send `Embeds` pls.")
        }

        const name = message.author.username
        const avatar = message.author.displayAvatarURL({dynamic: true})

        if (timeout > 0) {

            const Embed = new Discord.MessageEmbed()
            .setColor('#34eb71')
            .setAuthor(name, avatar)
            .setDescription(`:alarm_clock:  **Cooldown:** ${timeout}s`)
            return message.channel.send(Embed)
            
        } else {
            timeout = 11
            setInterval(function() {
                timeout -= 1
            }, 1000)
        }
        

        if (!args[0]) {
            return message.channel.send('What do you want me to spam?!');

        }

            message.channel.send(message.content.slice(prefix.length).slice(command.length));
            message.channel.send(message.content.slice(prefix.length).slice(command.length));
            message.channel.send(message.content.slice(prefix.length).slice(command.length));
            message.channel.send(message.content.slice(prefix.length).slice(command.length));
            message.channel.send(message.content.slice(prefix.length).slice(command.length));

            
    }
}