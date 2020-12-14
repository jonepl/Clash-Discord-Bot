# Clash of Clans Discord Bot (Mango Wars)

## Installation

### Required Apps

* Install [NodeJS](https://nodejs.org/en/)
* Create an account and server in [Discord](https://discord.com/login)

### Required Libraries

* Discord.js

```
$ npm install discordjs
```

## Setting up Discord Bot

* Register an account using the [Discord Developer Portal](https://discordapp.com/developers/)
    * Create a new application
    * Convert your new application into a bot
    
    NOTE: your clientId will be accessible in the General Information tab. You will need this in the next step

* Once your bot is created set its permission using [Permissions Calculator](https://discordapp.com/developers/). 

    * Enter the ClientId your grabbed in the previous step.        
    * Use the link at the bottom of the page to install your app into your discord server 

## Setting up Clash of Clans API

* Create and an account in the [Clash of Clan API](https://developer.clashofclans.com/#/)
*  Navigate to My Account and create a Bearer Key. You will need to find out you public IP and pass this value into the API call within your code.
* Add your Bearer key to your 

## Project Setup

Navigate to the directory that you like your project to live and create your project with the following command.

```shell
$ npm init
```

Install DiscordJS

```shell
$ npm install discord.js
```

### Simple Example

```javascript
//config.js

module.exports = {
    "discord": {
        "clanId": "<ClientId>",
        "prefix": "!",
        "token": "<Token>"
    },
    "api": {
        "baseUri": "https://your-endpoint.io/api",
        "headers": {
            'Authorization': 'Bearer <clash-api-token>',
        }
    }
}

```

```javascript
//index.js

const config = require('./config.js')
const Discord = require('discord.js');
const client = new Discord.Client();

// This will run when bot is ready
client.once('ready', () => {
    console.log("Your app is online");
})

// This will run for every message
client.once('message', () => {

    if(!message.content.startWith(prefix) || message.author.bot)
        return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('pong!');
    }
})


client.login(config.discord.token)

```

## References

**Discord Bot Token:** [Discord Developer Portal](https://discordapp.com/developers/) > Bot > Token

**Discord Bot Client ID:** [Discord Developer Portal](https://discordapp.com/developers/) > General Information > ClientId

**Discord Bot Public API Key:** [Discord Developer Portal](https://discordapp.com/developers/) > General Information > PublicKey

**Discord Install link:** [Permissions Calculator](https://discordapp.com/developers/) > Link

**Bearer Authentication:** [Clash of Clan API](https://developer.clashofclans.com/#/) > My Account > Create New Key

**Youtube Tutorial:**

1. https://www.youtube.com/watch?v=j_sD9udZnCk&ab_channel=CodeLyon

2. https://www.youtube.com/watch?v=nTGtiCC3iQM&ab_channel=CodeLyon


### Links

Clash API: https://developer.clashofclans.com/#/

Discord Developer Portal: https://discordapp.com/developers/

Permissions Calculator: https://discordapi.com/permissions.html


# Running App

This Discord server app uses Nodemon. Start the app with the following command

```
$ npm run watch
```