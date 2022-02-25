const { Client, Intents, MessageEmbed, Permissions, MessageButton } = require('discord.js');
const question = require('./questions.json');

module.exports.run = async(client, msg, args) => {
    hooman = msg.author.id
    a = 0
    b = 0
    c = 0
    d = 0
    msg.channel.send(question[0]).then( message => {
        message.react("❤️")
        message.react("💙")
        const filter = (reaction, user) => {
            return ['❤️', '💙'].includes(reaction.emoji.name) && user.id === hooman;
        };
        
        message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
        
                if (reaction.emoji.name === '❤️') {
                    a += 1
                } else {
                    b += 1
                }

                msg.channel.send(question[1]).then(message => {
                    message.react("❤️")
                    message.react("💙")
                    const filter = (reaction, user) => {
                        return ['❤️', '💙'].includes(reaction.emoji.name) && user.id === hooman;
                    }
                    message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
                
                        if (reaction.emoji.name === '❤️') {
                            a += 1
                        } else {
                            b += 1
                        }
                        msg.channel.send(question[2]).then(message => {
                            message.react("❤️")
                            message.react("💙")
                            const filter = (reaction, user) => {
                                return ['❤️', '💙'].includes(reaction.emoji.name) && user.id === hooman;
                            }
                            message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
                            .then(collected => {
                                const reaction = collected.first();
                        
                                if (reaction.emoji.name === '❤️') {
                                    a += 1
                                } else {
                                    b += 1
                                }
                                msg.channel.send(question[3]).then(message => {
                                    message.react("❤️")
                                    message.react("💙")
                                    const filter = (reaction, user) => {
                                        return ['❤️', '💙'].includes(reaction.emoji.name) && user.id === hooman;
                                    }
                                    message.awaitReactions({ filter, max: 1, time: 60000, errors: ['time'] })
                                    .then(collected => {
                                        const reaction = collected.first();
                                
                                        if (reaction.emoji.name === '❤️') {
                                            a += 1
                                        } else {
                                            b += 1
                                        }
                                        
                                        if (a == Math.max(a,b)) {
                                            house = "a"
                                        }
                                        else if (b == Math.max(a, b)) {
                                            house = "b"
                                        }
                                        msg.channel.send(`You are sorted in ${house}!`)
                                    }).catch(collected => {
                                        msg.channel.send('You didnt react.');
                                    })
                                })
                            }).catch(collected => {
                                msg.channel.send('You didnt react.');
                            })
                        })
                    }).catch(collected => {
                        msg.channel.send('You didnt react.');
                    })

                })
            })
            .catch(collected => {
                msg.channel.send('You didnt react.');
            });
    })

}