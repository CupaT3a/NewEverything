const Discord = require('discord.js');
const fetch = require('node-fetch');
const timeout = new Map();

module.exports = {
    name: 'aww',
    description: 'aww',
    execute(message, args, command){

        const Embedpermissions = message.channel.permissionsFor(message.client.user);
        if (!Embedpermissions.has("EMBED_LINKS")) {
            return message.channel.send("I need the permissions to send `Embeds` pls.");
        }

        const cooldown = timeout.get(message.author.id)
        const name = message.author.username
        const avatar = message.author.displayAvatarURL({dynamic: true})

        function loadAww() {
            return fetch('https://www.reddit.com/r/aww.json?limit=800&?sort=top&t=day')
            .then(res => res.json())
            .then(json => json.data.children);
        }

        function postRandomAww(message) {

            return loadAww().then(posts => {

                const {title, url, permalink, score} = posts[Math.floor(Math.random() * posts.length)].data;
                const link = `https://www.reddit.com${permalink}`

                const Embed = new Discord.MessageEmbed()
                .setColor('#34eb71')
                .setTitle(title)
                .setDescription(`:arrow_up:  **${score}**`)
                .setURL(link)
                .setAuthor('r/aww')
                .setImage(url)
                .setTimestamp()
                .setFooter("Made by CupOfT3a & JamesMeow");
                return message.channel.send(Embed);
            
            })
        }

        function Cooldown(timeout) {
            timeout.set(message.author.id, 11)
            setInterval(function() {
                var cooldown = timeout.get(message.author.id)
                if (cooldown <= 0) {
                    clearInterval()
                } else {
                    cooldown -= 1
                    timeout.set(message.author.id, cooldown)
                }
            }, 1000)
        }

        if (cooldown > 0) {
            const Embed = new Discord.MessageEmbed()
            .setColor('#34eb71')
            .setAuthor(name, avatar)
            .setDescription(`:alarm_clock:  **Cooldown:** ${cooldown}s`)
            return message.channel.send(Embed)
        }
        if(command === 'aww') {
            
            postRandomAww(message)
            Cooldown(timeout)

        } else if (command === 'aww5') {

            postRandomAww(message)
            postRandomAww(message)
            postRandomAww(message)
            postRandomAww(message)
            postRandomAww(message)
            Cooldown(timeout)
            
        }
    }
}