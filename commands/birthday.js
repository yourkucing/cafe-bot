const { Client, Intents, MessageEmbed, Permissions, MessageButton } = require('discord.js');
const birthdayModel = require('../../models/birthdaySchema')
const paginationEmbed = require('discordjs-button-pagination');

module.exports.run = async(client, msg, args) => {
    eboylog = client.channels.cache.get('867744429657292810')
	author = msg.author
    guild = client.guilds.cache.get(msg.guild.id)
    eboylog.send(`**${author.username}** [${author.id}] used the **birthday** command in **${guild}** [${msg.guild.id}].`)

    hooman = msg.author.id
    server = msg.guild.id
    months = {january: 01, february: 02, march: 03, april: 04, may: 05, june: 06, july: 07, august: 08, september: 09, october: 10, november: 11, december: 12, jan: 01, feb: 02, mar: 03, apr: 04, jun: 06, jul: 07, aug: 08, sep: 09, oct: 10, nov: 11, dec: 12}
    if (!args || args.length == 0) {
        birthdaykids = await birthdayModel.find({serverID: server}).sort({birthday: 'asc'})
        if (!birthdaykids || birthdaykids.length == 0) {
            msg.channel.send(`\`No birthdays have been registered on this server. To do so, please do uwu birthday date month [eg. uwu birthday 17 march]\``)
            return
        }
        else {
            if (birthdaykids.length > 10) {
                pageno = Math.ceil(birthdaykids.length/10)
                const birthdayarray = []
                let k = 10
                for (let i = 0; i < birthdaykids.length; i += 10) {
                    const current = birthdaykids.slice(i, k)
                    let j = i
                    k += 10
                    birthdays = ""
                    for (m in current) {
                        users = msg.guild.members.cache.get(current[m].userID)
                        if (!users) {
                            console.log(current[m].userID)
                            continue
                        }
                        else {
                            birthdays += `**${++j}.**  **${users.nickname}**: ${current[m].birthday.getDate()} ${current[m].birthday.toLocaleString('default', { month: 'long' })}\n`
                        }
                    }
                    const embed = new MessageEmbed()
                    .setColor('#FF69B4')
                    .setTitle(`Birthdays`)
                    .setDescription(`These are all the birthdays of the people in this server.`)
                    .addFields({name: `Birthdays`, value: `${birthdays}`});

                    birthdayarray.push(embed)
                }
                const button1 = new MessageButton()
                    .setCustomId("previousbtn")
                    .setLabel("Previous")
                    .setStyle("DANGER");

                const button2 = new MessageButton()
                    .setCustomId("nextbtn")
                    .setLabel("Next")
                    .setStyle("SUCCESS");


                const buttonList = [button1, button2];

                paginationEmbed(msg, birthdayarray, buttonList).catch(e => {console.log(e)})
            }
            else {
                birthdaylist = ""
                n = 1
                const embed = new MessageEmbed()
                .setColor('#FF69B4')
                .setTitle(`Birthdays`)
                .setDescription(`These are all the birthdays of the people in this server.`);
                for (x in birthdaykids) {
                    users = msg.guild.members.cache.get(birthdaykids[x].userID)
                    birthdaylist += `**${n}.** **${users.nickname}**: ${birthdaykids[x].birthday.getDate()} ${birthdaykids[x].birthday.toLocaleString('default', { month: 'long' })}\n`
                    n++
                }
                embed.addFields({name: `Birthdays`, value: `${birthdaylist}`})
                msg.channel.send({embeds: [embed]})
            }
        }
    }
    else if (args[0].toLowerCase() == "delete") {
        msg.channel.send(`Are you sure you want to delete your birthday in this server? (Answer yes or no.)`)
        const filter = m => m.author.id == msg.author.id;
        msg.channel.awaitMessages({filter, max: 1, time: 30000}).then(collected => {
            if (collected.first().content.toLowerCase() == 'yes') {
                birthdayModel.deleteOne({userID: hooman, serverID: server}).then(result => {
                    if (!result) {
                        msg.channel.send(`Sorry ${msg.author}, you did not have any birthday in this server!`)
                    }
                    else {
                        msg.channel.send(`Birthday deleted!`)
                    }
                });
            }
            else {
                msg.channel.send(`Oh, no deletion occurred then!`)
            }
        }).catch(collected => {
            msg.channel.send('Oh, it must have been an accident then!');
            });
    }
    else {
        date = args[0]
        if (!args[1]) {
            msg.channel.send(`Please include your month too. It should be in this format: eg. 17 March`)
            return
        }
        month = args[1].toLowerCase()
        if (isNaN(args[0])) {
            msg.channel.send(`**${args[0]}** is not a date. Please try again.`)
            return
        }
        else if (!(month in months)) {
            msg.channel.send(`Invalid month. Please try again.`)
            return
        }
        else {
            birthdayModel.find({serverID: server, userID: hooman}).then(s => {
                if(s.length != 0) {
                    msg.channel.send(`Your birthday is already in the system for this server. You can check using \`uwu birthday\`.`)
                }
                else {
                    date = parseInt(date)
                    month = months[month]
                    birthday = `2000-${month}-${date}`
                    birthdayModel.create({
                        serverID: server,
                        userID: hooman,
                        channelID: msg.channel.id,
                        birthday: new Date(birthday)
                    }).then(r => {
                        if (r) {
                            msg.react(`✅`)
                        }
                        else {
                            msg.channel.send(`\`Something went wrong. Please try again or contact Maryam#9206 if error persists.\``)
                        }
                    })
                }
            })
        }
    }
}