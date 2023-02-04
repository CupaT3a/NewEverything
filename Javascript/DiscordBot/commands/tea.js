const Discord = require("discord.js")
const members = new Map();
const timeouter = new Map();
module.exports = {
    name: 'tea',
    description: 'A nice, cup of tea.',
    execute(message, args, prefix){

        const permissions = message.channel.permissionsFor(message.client.user);
        if (!permissions.has("EMBED_LINKS")) {
            return message.channel.send("I need the permissions to send `Embeds` pls.")
        }

        const Msg = members.get(message.member.id)
        const command = `${prefix}${module.exports.name}`
        const name = message.member.user.username
        const avatar = message.author.displayAvatarURL({dynamic: true})

        async function Message(members, command, name, timeouter, avatar) {

            const timeout = timeouter.get(message.member.id)
            if (timeout > 0) {
                
                const Embed = new Discord.MessageEmbed()
                .setColor('#34eb71')
                .setAuthor(name, avatar)
                .setDescription(`:alarm_clock:  **Cooldown:** ${timeout}s`)
                return message.channel.send(Embed)

            } else {
                timeouter.set(message.member.id, 61)
                setInterval(function() {
                    var time = timeouter.get(message.member.id)
                    if (time <= 0) {
                        clearInterval()
                    } else {
                        time -= 1
                        timeouter.set(message.member.id, time)
                    }
                }, 1000)
            }

            const Embed = new Discord.MessageEmbed()
            .setColor('#34eb71')
            .setAuthor(name, avatar)
            .setTitle(`:tea:  Here is your cup of tea!`)
            .setDescription(`Type **[ ${command} ]** to drink!`)
            .setImage("https://cdn.discordapp.com/attachments/780833968126820352/780835851277434900/Cup_Of_Tea_Image_1.png")

            const msg = await message.channel.send(Embed)
            const link = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${msg.id}`
            const Msg = {
                message: msg,
                state: 2,
                link: link
            }
            members.set(message.member.id, Msg)
        }           

        if (!Msg && (!args || args[0] != "new")) {

            const Embed = new Discord.MessageEmbed()
            .setColor('#34eb71')
            .setAuthor(name, avatar)
            .setDescription(`Type **[ ${command} new ]** to get a new cup of tea!`)
            return message.channel.send(Embed)
        }
        if (!Msg && args[0] == "new") {

            Message(members, command, name, timeouter, avatar)
            return
        }

        if (Msg !== undefined && args[0] == "new") {
            return message.channel.send(`You already have a drink here: ${Msg.link}`)
        }

        if (Msg.state === 2) {

            const Embed = new Discord.MessageEmbed()
            .setColor('#34eb71')
            .setAuthor(name, avatar)
            .setTitle(`:tea:  You drank your tea!`)
            .setDescription(`Type **[ ${command} ]** to drink!`)
            .setImage("https://cdn.discordapp.com/attachments/780833968126820352/780835937071923220/Cup_Of_Tea_Image_2.png")

            message.delete()
            Msg.message.edit(Embed)
            Msg["state"] = Msg.state - 1
            return

        } else if (Msg.state === 1) {

            const morale = Math.floor(Math.random() * (40 - 20 + 1) + 20)
            const calmness = Math.floor(Math.random() * (80 - 50 + 1) + 50)

            const Embed = new Discord.MessageEmbed()
            .setColor('#34eb71')
            .setAuthor(name, avatar)
            .setTitle(`:tea:  You finished your tea!`)
            .setDescription(`How refreshing!`)
            .setImage("https://cdn.discordapp.com/attachments/780833968126820352/780835957435662346/Cup_Of_Tea_Image_3.png")
            .setFooter(`Morale +${morale}%     Calmness +${calmness}%`)

            message.delete()
            Msg.message.edit(Embed)
            members.delete(message.member.id)
            return
        }

    }
}