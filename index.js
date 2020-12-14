const Discord = require('discord.js');
const https = require('https');
const fs = require('fs');
const config = require('./config/config.js')

const CommandHandler = require('./app/commandHandler')
const commandHandler = new CommandHandler(config);

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Mongo Wars is online')
})

client.on('message', message => {

    if (!message.content.startsWith(config.discord.prefix) || message.author.bot) return;

    const args = message.content.slice(config.discord.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {

        commandHandler.ping(message, args)

    } else if (command === 'lineup') {
        commandHandler.lineup(message, args)
    }
})

client.login(config.discord.token);