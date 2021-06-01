const Discord = require('discord.js');
const answers = require('./answers.json');

module.exports.run = async(client, msg, args) => {
    tempguild = msg.guild
    let hooman = msg.author.id
    const birthdayboy = tempguild.members.cache.get(hooman)
    birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849153855325339680"), "")
    msg.channel.send(`Oh, let's hope you survive >.< Good luck!`)
    entrance = tempguild.channels.cache.get("848888985794641920")
    hallway = tempguild.channels.cache.get("848889042112217148")
    livingroom = client.channels.cache.get("847343534347386901")
    bedroom = client.channels.cache.get("847343534347386901")
    diningroom = client.channels.cache.get("847343534347386901")
    kitchen = client.channels.cache.get("847343534347386901")
    winecellar = client.channels.cache.get("847343534347386901")
    ballroom = client.channels.cache.get("847343534347386901")
    pool = client.channels.cache.get("847343534347386901")
    cabana = client.channels.cache.get("847343534347386901")
    garden = client.channels.cache.get("847343534347386901")
    campfire = client.channels.cache.get("847343534347386901")
    dungeon = client.channels.cache.get("847343534347386901")
    tower = client.channels.cache.get("847343534347386901")
    bathroom = client.channels.cache.get("847343534347386901")
    pantry = client.channels.cache.get("847343534347386901")
    sittingroom = client.channels.cache.get("847343534347386901")
    stable = client.channels.cache.get("847343534347386901")
    servant = client.channels.cache.get("847343534347386901")
    catroom = client.channels.cache.get("847343534347386901")
    throne = client.channels.cache.get("847343534347386901")


    const collector1 = entrance.createMessageCollector(
        m => m.author.id == hooman
    );
    collector1.on('collect', m => {
        if (m.content.toLowerCase() == answers[0].answer) {
            entrance.channel.send(answers[0].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849153932822708236"), "")
            collector1.stop()
        }
    });
    const collector2 = hallway.createMessageCollector(
        m => m.author.id == hooman
    );
    collector2.on('collect', m => {
        if (m.content.toLowerCase() == answers[0].answer) {
            hallway.channel.send(answers[0].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849153972790099968"), "")
            collector2.stop()
        }
    });
}