const { Client, Intents, MessageEmbed, Permissions, MessageButton } = require('discord.js');
const question = require('./questions.json');

module.exports.run = async(client, msg, args) => {
    hooman = msg.author.id
    msg.channel.send(question[0]).then( msg => {
        msg.react("❤️")
        msg.react("💙")
        const filter = (reaction, user) => {
            return ['❤️', '💙'].includes(reaction.emoji.name) && user.id === hooman;
        };
        
        msg.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
        
                if (reaction.emoji.name === '❤️') {
                    msg.reply('You reacted with a red.');
                } else {
                    msg.reply('You reacted with a blue.');
                }
            })
            .catch(collected => {
                message.reply('You didnt react.');
            });
    })

}