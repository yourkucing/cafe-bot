const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
    client.channels.cache.get(args[0]).messages.fetch({limit: 99}).then(m => {
        nummessages = m.size - 1
        client.channels.cache.get(args[0]).messages.fetch({limit: nummessages}).then(k => {
            client.channels.cache.get(args[0]).bulkDelete(k)
        })
    })    
}