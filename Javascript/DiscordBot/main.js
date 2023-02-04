const Discord = require('discord.js');

const client = new Discord.Client();

prefix = 'tp'

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Teapot is Brewing.');
});

client.on('message', message =>{

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
       
    } else if (command === 'help'){
        client.commands.get('help').execute(message, args, prefix);
   
    } else if (command === 'spam'){
        client.commands.get('spam').execute(message, args, command, prefix);

    } else if (command === 'meme'){
        client.commands.get('meme').execute(message, args, command);

    } else if (command === 'meme5'){
        client.commands.get('meme').execute(message, args, command);

    } else if (command === 'aww'){
        client.commands.get('aww').execute(message, args, command);

    } else if (command === 'aww5'){
        client.commands.get('aww').execute(message, args, command);

    } else if (command === 'dmeme'){
        client.commands.get('dankmeme').execute(message, args, command);

    } else if (command === 'dmeme5'){
        client.commands.get('dankmeme').execute(message, args, command);

    } else if (command === 'coinflip'){
        client.commands.get('coinflip').execute(message);

    } else if (command === 'tea'){
        client.commands.get('tea').execute(message, args, prefix);

    } else {
        message.channel.send('Command Not Recognised Lmao')
    }



























    

});