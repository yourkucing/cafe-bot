const channelModel = require('./channelSchema');
const { Client, Intents, MessageEmbed, Permissions } = require('discord.js');

module.exports.run = async(client, msg, args) => {
    eboylog = client.channels.cache.get('867744429657292810')
	author = msg.author
    guild = client.guilds.cache.get(msg.guild.id)
    eboylog.send(`CAFE: **${author.username}** [${author.id}] used the **disable-cards** command in **${guild}** [${msg.guild.id}].`)

    if (!msg.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        msg.channel.send("You don't have Administrator permissions to use this.")
        return
    }
    else {
        channelID = msg.channel.id
        channelModel.findOneAndDelete({
            channelID: channelID
        }).then(r => {
            if (r) {
                msg.react(`✅`)
            }
            else {
                msg.channel.send(`\`Something went wrong. It might have already been disabled. (You can check by trying to enable and then disable it.) Please try again or contact Maryam#9206 if error persists.\``)
            }
        })
    }
}