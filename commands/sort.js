const { Client, Intents, MessageEmbed, Permissions, MessageButton } = require('discord.js');
const question = require('./questions.json');

module.exports.run = async(client, msg, args) => {
    hooman = msg.author.id
    msg.channel.send(question[0]).then( message => {
        message.react("❤️")
        message.react("💙").then( m1 => {
            const filter = (reaction, user) => {
                return user.id === hooman;
            };
            
            m1.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    console.log(collected.first())
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '❤️') {
                        msg.channel.send('You reacted with a red.');
                    } else {
                        msg.channel.send('You reacted with a blue.');
                    }
                })
                .catch(collected => {
                    msg.channel.send('You didnt react.');
                });
        })

    })

}