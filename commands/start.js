const Discord = require('discord.js');
const games = require('./games.json');

module.exports.run = async(client, msg, args) => {
    const item = games[Math.floor(Math.random() * games.length)]
    msg.channel.send(item.games)
}