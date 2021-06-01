const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
    if (msg.author.id == "279101053750870017") {
        const channel = client.channels.cache.get(args[0])
        msg.channel.send(`Hiya, let's go?`)
        const collector = msg.channel.createMessageCollector(
            m => m.author.id == msg.author.id
          );
          for await (const m of collector) {
            if (m.content.toLowerCase() == "exit") {
                collector.stop()
            }
            else {
                channel.send(m.content)
            }
        }
        msg.channel.send(`Oh, we're done? Goodbye!`)
    }
    else {
        msg.channel.send("You don't have permission to use this, only my owner does.")
    }
    
}