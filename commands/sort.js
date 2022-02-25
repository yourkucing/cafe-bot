const { Client, Intents, MessageEmbed, Permissions, MessageButton } = require('discord.js');
const question = require('./questions.json');

module.exports.run = async(client, msg, args) => {
    hooman = msg.author.id
    msg.channel.send(question[0]).then( message => {
        message.react("❤️")
        message.react("💙")
        const filter = (reaction, user) => {
            return ['❤️', '💙'].includes(reaction.emoji.name) && user.id === hooman;
        };
        
        message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                console.log(collected.first())
                const reaction = collected.first();
        
                if (reaction.emoji.name === '❤️') {
                    message.channel.send('You reacted with a red.');
                } else {
                    message.channel.send('You reacted with a blue.');
                }
            })
            .catch(collected => {
                message.channel.send('You didnt react.');
            });
    })

}