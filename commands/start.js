const { Client, Intents, MessageEmbed, Permissions, MessageButton } = require('discord.js');
const games = require('./games.json');
const correct = require('./correct.json');

module.exports.run = async(client, msg, args) => {
    if (msg.channel.id == "814737749710077962") {
        hooman = msg.author.id
        const item = games[Math.floor(Math.random() * games.length)]
        msg.channel.send(item.games).then(m1 => {
            msg.channel.send(`\n\n**Good luck, you have 3 tries (This counts every message that you send from now until you get the answer right or you run out of tries.)**`).then(m2 => {
                const filter = m => m.author.id == hooman;
                const collector = msg.channel.createMessageCollector(
                    {filter, max: 3}
                );
                collector.on('collect', m => {
                    if (m.content.toLowerCase() == item.answers) {
                        const bathroom = correct[Math.floor(Math.random() * correct.length)]
                        msg.channel.send(bathroom)
                        collector.stop(item.answers)
                    }
                });
                collector.on('end', (collected, reason) => {
                    m1.delete()
                    m2.delete()
                    collected.forEach(msg => {
                        msg.delete();
                      })
                    if (reason && reason === item.answers) {
                        return
                    }
                    else {
                        if (collected.size == 3) {
                            msg.channel.send('https://media.discordapp.net/attachments/847825770382229514/850426337154826270/old-dirty-toilet-picture-id523086917.png')
                            return
                        }
                        
                    }
    
                });
            })
        })
    }
}