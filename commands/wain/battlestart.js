const Discord = require('discord.js');
const answers = require('./answers.json');

module.exports.run = async(client, msg, args) => {
    let hooman = msg.author.id
    entrance = msg.guild.channels.cache.get("847343534347386901")
    hallway = msg.guild.channels.cache.get("847343534347386901")
    livingroom = msg.guild.channels.cache.get("847343534347386901")
    bedroom = msg.guild.channels.cache.get("847343534347386901")
    diningroom = msg.guild.channels.cache.get("847343534347386901")
    kitchen = msg.guild.channels.cache.get("847343534347386901")
    winecellar = msg.guild.channels.cache.get("847343534347386901")
    ballroom = msg.guild.channels.cache.get("847343534347386901")
    pool = msg.guild.channels.cache.get("847343534347386901")
    cabana = msg.guild.channels.cache.get("847343534347386901")
    garden = msg.guild.channels.cache.get("847343534347386901")
    campfire = msg.guild.channels.cache.get("847343534347386901")
    dungeon = msg.guild.channels.cache.get("847343534347386901")
    tower = msg.guild.channels.cache.get("847343534347386901")
    bathroom = msg.guild.channels.cache.get("847343534347386901")
    pantry = msg.guild.channels.cache.get("847343534347386901")
    sittingroom = msg.guild.channels.cache.get("847343534347386901")
    stable = msg.guild.channels.cache.get("847343534347386901")
    servant = msg.guild.channels.cache.get("847343534347386901")
    catroom = msg.guild.channels.cache.get("847343534347386901")
    throne = msg.guild.channels.cache.get("847343534347386901")


    const collector1 = entrance.createMessageCollector(
        m => m.author.id == hooman, {max: 5, time: 1200000}
    );
    collector1.on('collect', m => {
        if (m.content.toLowerCase() == answers[0].answer) {
            msg.channel.send(bathroom)
            collector.stop(answers[0].message)
        }
    });
    const collector2 = hallway.createMessageCollector(
        m => m.author.id == hooman, {max: 5, time: 1200000}
    );
    collector2.on('collect', m => {
        if (m.content.toLowerCase() == answers[0].answer) {
            msg.channel.send(bathroom)
            collector.stop(answers[0].message)
        }
    });
}