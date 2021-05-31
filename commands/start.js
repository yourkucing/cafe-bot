const Discord = require('discord.js');
const games = require('./games.json');
const correct = require('./correct.json');

module.exports.run = async(client, msg, args) => {
    hooman = msg.author.id
    const item = games[Math.floor(Math.random() * games.length)]
    msg.channel.send(item.games)
    msg.channel.send(`\n\n**Good luck, you have 5 tries (This counts every message that you send from now until you get the answer right or you run out of tries.)**`)
    const collector = msg.channel.createMessageCollector(
        m => m.author.id == hooman, {max: 5, time: 1200000}
    );
    collector.on('collect', m => {
        if (m.content.toLowerCase() == item.answers) {
            m.delete()
            const bathroom = correct[Math.floor(Math.random() * correct.length)]
            msg.channel.send(bathroom)
            collector.stop(item.answers)
        }
    });
    collector.on('end', collected => {
        if (collected.size == 5) {
            msg.channel.send(`You did not get it! That's 5 tries. You opened an ugly bathroom.`)
            return
        }
    });
}