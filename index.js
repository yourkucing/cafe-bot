const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: false});
const prefix = "cafe ";
const fs = require('fs').promises;
const path = require('path');
const rooms = require('./commands/room.json')

client.commands = new Map();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('cafe help', { type: 'STREAMING' });
    tempguild = client.guilds.cache.get("848797378722267136")
    tempchannel = client.channels.cache.get("849144198585778186")
	tempchannel.messages.fetch("849144591622209577").then(message => {
        const birthdayFilter = (reaction, user) => {
			return reaction.emoji.name === '💎' && !user.bot;
		};
        const birthday = message.createReactionCollector(birthdayFilter);
        birthday.on('collect', (reaction, user) => {
			const birthdayboy = tempguild.members.cache.get(user.id)
			tempchannel.send(`\`Its - Just that darn notebook. UGH! Well… I guess, maybe it will be nice to see whats in it, right? -\`\n\nhttps://drive.google.com/file/d/14xZMBzyqvsaXtfmEYL79u1R2OhS-edUg/view?usp=sharing\nReally and truly, from the bottom of our hearts - HAPPY BIRTHDAY WAIN! Thank you for EVERYTHING YOU DO!\n*(I guess the true treasure is… The friends we made along the way? ;) )*`)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849211648031981578"), "")
		})
    })
 });

 client.on('guildMemberAdd', member => {
    const guild = member.guild;
    if (guild.id === "848797378722267136" && member.id === "267130234522828801") {
        client.channels.cache.get("849289643475075143").send(`Hey **${member.displayName}**, welcome to the battlefield. Are you ready to test your physical and mental strength? Start here <#849121069109084220> :sparkles:`);
        member.roles.add(member.guild.roles.cache.find(x => x.id == "849143729172512799"), "");
    }
    else if (guild.id === "848797378722267136" && member.id != "267130234522828801") {
        client.channels.cache.get("849289643475075143").send(`Hey **${member.displayName}**, welcome to the battlefield, Sand Guardian! :sparkles:`);
        member.roles.add(member.guild.roles.cache.find(x => x.id == "849143653347885076"), "");
    }
})

 client.on('message', msg => {
    function sleep(sec) {
        return new Promise(resolve => setTimeout(resolve, sec*1000));
    }

    var message = msg.content.toLowerCase()

    if (msg.author.bot) return
    if (message.includes('hi cafe bot')) {
        msg.channel.send('Greetings ' + msg.author.toString() +'! I hope you\'re having a lovely day!');
    }

    if (message === "intas" || message === "intas!" || message === "intas." || message === "*intas*" || message === "**intas**" || message === "\"intas\"") {
        player = msg.guild.members.cache.get(msg.author.id)
        if (player.roles.cache.get("880679525669806122")) {
            player.roles.remove(msg.guild.roles.cache.get("880679525669806122"))
            player.roles.add(msg.guild.roles.cache.get("880679579616948285"))
        }
        else if (player.roles.cache.get("880679579616948285")) {
            player.roles.remove(msg.guild.roles.cache.get("880679579616948285"))
            player.roles.add(msg.guild.roles.cache.get("880679639222190142"))
        }
        else if (player.roles.cache.get("880679598747176960")) {
            player.roles.remove(msg.guild.roles.cache.get("880679598747176960"))
            player.roles.add(msg.guild.roles.cache.get("880679675146424340"))
        }
        else if (player.roles.cache.get("880679621736153118")) {
            player.roles.remove(msg.guild.roles.cache.get("880679621736153118"))
            player.roles.add(msg.guild.roles.cache.get("880679525669806122"))
        }
        else if (player.roles.cache.get("880679639222190142")) {
            player.roles.remove(msg.guild.roles.cache.get("880679639222190142"))
            player.roles.add(msg.guild.roles.cache.get("880679598747176960"))
        }
        else if (player.roles.cache.get("880679655961665567")) {
            player.roles.remove(msg.guild.roles.cache.get("880679655961665567"))
            player.roles.add(msg.guild.roles.cache.get("880679621736153118"))
        }
        else if (player.roles.cache.get("880679675146424340")) {
            player.roles.remove(msg.guild.roles.cache.get("880679675146424340"))
            player.roles.add(msg.guild.roles.cache.get("880679655961665567"))
        }
    }
    else if (message == "vardis" || message == "vardis!" || message == "vardis." || message == "*vardis*" || message == "**vardis**" || message == "\"vardis\"") {
        player = msg.guild.members.cache.get(msg.author.id)

        if (player.roles.cache.get("880679579616948285")) {
            player.roles.remove(msg.guild.roles.cache.get("880679579616948285"))
            player.roles.add(msg.guild.roles.cache.get("880679525669806122"))
        }
        else if (player.roles.cache.get("880679639222190142")) {
            player.roles.remove(msg.guild.roles.cache.get("880679639222190142"))
            player.roles.add(msg.guild.roles.cache.get("880679579616948285"))
        }
        else if (player.roles.cache.get("880679675146424340")) {
            player.roles.remove(msg.guild.roles.cache.get("880679675146424340"))
            player.roles.add(msg.guild.roles.cache.get("880679598747176960"))
        }
        else if (player.roles.cache.get("880679525669806122")) {
            player.roles.remove(msg.guild.roles.cache.get("880679525669806122"))
            player.roles.add(msg.guild.roles.cache.get("880679621736153118"))
        }
        else if (player.roles.cache.get("880679598747176960")) {
            player.roles.remove(msg.guild.roles.cache.get("880679598747176960"))
            player.roles.add(msg.guild.roles.cache.get("880679639222190142"))
        }
        else if (player.roles.cache.get("880679621736153118")) {
            player.roles.remove(msg.guild.roles.cache.get("880679621736153118"))
            player.roles.add(msg.guild.roles.cache.get("880679655961665567"))
        }
        else if (player.roles.cache.get("880679655961665567")) {
            player.roles.remove(msg.guild.roles.cache.get("880679655961665567"))
            player.roles.add(msg.guild.roles.cache.get("880679675146424340"))
        }
    }




    
    if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot) return;
    let args = msg.content.slice(prefix.length).split(new RegExp(/\s+/));
    let command = args.shift();
    
    // -----------------------------------------------------------------------------------------------------------------------------------------------------
    console.log(command)
     if(client.commands.get(command)) {
         client.commands.get(command).run(client, msg, args).catch((e) => { console.log(e); });
     }
    
    //-----------------------------------------------------------------------------------------------------------------------------------------
    
     
    });
     
     (async function registerCommands(dir = 'commands') {
         let files = await fs.readdir(path.join(__dirname, dir));
         for(let file of files) {
             let stat = await fs.lstat(path.join(__dirname, dir, file));
             if(stat.isDirectory())
                 registerCommands(path.join(dir, file));
             else {
                 if(file.endsWith(".js")) {
                     let cmdName = file.substring(0, file.indexOf(".js"));
                     let cmdModule = require(path.join(__dirname, dir, file));
                     client.commands.set(cmdName, cmdModule);
                 }
             }
         }
     })();
   

client.login(process.env.token);