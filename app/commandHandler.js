'use strict';

const https = require('https');
const config = require('../config/config')

const options = {
    host: config.api.baseUri,
    headers: config.api.headers
}

module.exports = class CommandHandler {
    constructor(config) {
        this.options = {
            host: config.api.baseUri,
            headers: config.api.headers
        };
    }

    ping(message, args = null) {
        sendMessage(message, 'pong!');
    }

    lineup(message, args = null) {
        generateLineup(message, args);
    }
}

function generateLineup(message, args) {

    getClanMembers()
        .then(appendThLevels)
        .then(createLineup)
        .then((lineup) => {
            sendMessage(message, lineup);
        });
}

// Get all members for your clan
function getClanMembers() {

    let uri = `${config.api.baseUri}clans/%23${config.discord.clanId}/members`

    return new Promise((resolve, reject) => {

        https.get(uri, options, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                let clanMembers = JSON.parse(data);
                resolve(clanMembers.items);
            });

        }).on("error", (err) => {
            reject(err);
            console.log("Error: " + err.message);
        });
    });
}

// Append the Townhall level to all clan member info retrieve from Clash API
function appendThLevels(clanMembers) {

    let members = clanMembers;

    return new Promise((resolve, reject) => {

        let promises = [];
        for (let i = 0; i < members.length; i++) {

            let tag = (members[i].tag).replace("#", "%23");
            let url = `${config.api.baseUri}players/${tag}`
            promises.push(getApiData(url))
        }

        Promise.all(promises)
            .then((memberInfo) => {
                for (let i = 0; i < memberInfo.length; i++) {
                    members[i]["townHallLevel"] = JSON.parse(memberInfo[i]).townHallLevel;
                }

                resolve(members);

            }).catch((err) => {
                reject(err);
            });
    })
}

// Fetches and returns data within a promise
function getApiData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, options, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            resp.on('end', () => {
                resolve(data);
            });

            resp.on('error', (err) => {
                reject(err);
            })

        }).on("error", (err) => {
            reject(err);
            console.log("Error: " + err.message);
        });
    })
}

// Takes all player data and formats it to be sent
function createLineup(playerData) {
    let players = playerData;
    let lineup = "";
    let vetted = "";
    let vettedCount = 0;
    let unvetted = "";
    let unvettedCount = 0;

    return new Promise((resolve, reject) => {
        for (let i = 0; i < players.length; i++) {

            if (players[i].role === 'member') {
                unvettedCount++;
                unvetted += `${unvettedCount}. ${players[i].name} TH:${players[i].townHallLevel}\n`

            } else if (players[i].role === 'admin' || players[i].role === 'coLeader' || players[i].role === 'leader') {
                vettedCount++
                vetted += `${vettedCount}. ${players[i].name} TH:${players[i].townHallLevel}\n`
            }
        }

        lineup = `**Vetted** (Elders+)\n------------\n${vetted}\n\n` + `**Unvetted** (Members)\n------------\n${unvetted}\n`;
        resolve(lineup);

    }).catch((err) => {
        console.log(err);
        reject(err);
    });
}

function sendMessage(message, text) {
    message.channel.send(text)
}