const Discord = require("discord.js")

module.exports = {
    name: 'coinflip',
    description: 'flips a coin',
    execute(message){

        const permissions = message.channel.permissionsFor(message.client.user)
        if (!permissions.has("EMBED_LINKS")) {
            return message.channel.send("I need the permissions to send `Embeds` pls.");
        }

        const heads = {face: "`HEADS`", emoji: ":orange_circle:"}
        const tails = {face: "`TAILS`", emoji: ":black_circle:"}
        const options = [heads, tails]

        var coin = options[Math.floor(Math.random() * options.length)]

        const Embed = new Discord.MessageEmbed()

        .setColor('#34eb71')
        .setTitle(`${coin.emoji}  You got ${coin.face}`)
        
        return message.channel.send(Embed);
        
    }
}