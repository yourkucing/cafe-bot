const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS] });
const prefix = "cafe ";
const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');
const birthdayModel = require('./commands/birthdaySchema');

client.commands = new Map();

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to the database!');
}).catch((err) => {
	console.log(err)
});

const checkforBirthdays = async() => {
	day = new Date().getDate()
	month = new Date().getMonth() + 1
	if (new Date().getUTCHours() == 6 && new Date().getUTCMinutes() == 0) {
		birthday = new Date(`2000-${month}-${day}`)
		const query = {
			birthday: birthday
		}
	
		birthdayModel.find(query).then(results => {
			if (results) {
				for (const post of results) {
					userID = post.userID
					guildID = post.serverID
					channelID = post.channelID
					
					eboylog = client.channels.cache.get('867744429657292810')
					eboylog.send(`(CAFE) User ID: ${userID}'s birthday is supposed to be today.`)
					const guild = client.guilds.cache.get(guildID)
					const channel = client.channels.cache.get(channelID)
					const user = guild.members.cache.get(userID)
					if (!user) {
						continue
					}
					else {
						channel.send(`Happy birthday, <@${userID}>! I hope you have an amazing birthday uwu. I dub thee the coolest person on the face on this Earth and today is YOUR day. Go out there and wreck havoc! :3`)
						eboylog = client.channels.cache.get('867744429657292810')
						eboylog.send(`(CAFE) Birthday message has been sent for user ID: ${userID}.`)
					}
				}
			}
		})
	}

	setTimeout(checkforBirthdays, 1000 * 60)
}

function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

function Roman(){
    var startWeek = 1; //Today's IG week in GMT timezone
    var startYear = 1; //Today's IG year in GMT timezone
    var startDate = '2021,10,25'; //Today's date in GMT timezone
    //var currentDate = '2021,12,2'; // Use this to check if code works.
    var c = new Date();
    var n = c.toUTCString();
    
    var s = n.split(" ");
    
    var month = s[2];
    if (month == 'Jan'){t=1};
    if (month == 'Feb'){t=2};
    if (month == 'Mar'){t=3};
    if (month == 'Apr'){t=4};
    if (month == 'May'){t=5};
    if (month == 'Jun'){t=6};
    if (month == 'Jul'){t=7};
    if (month == 'Aug'){t=8};
    if (month == 'Sep'){t=9};
    if (month == 'Oct'){t=10};
    if (month == 'Nov'){t=11};
    if (month == 'Dec'){t=12};
    
    var currentDate = s[3]+','+t+','+s[1];
    var currentDay = s[0];
    
    var number = getNumberOfDays(startDate,currentDate);
    
    if(currentDay=='Mon,'){daynumber = 1;}
    if(currentDay=='Tue,'){daynumber = 2;}
    if(currentDay=='Wed,'){daynumber = 3;}
    if(currentDay=='Thu,'){daynumber = 4;}
    if(currentDay=='Fri,'){daynumber = 5;}
    if(currentDay=='Sat,'){daynumber = 6;}
    if(currentDay=='Sun,'){daynumber = 7;}
    
    var days = (daynumber+number)%7;
    
    var weekDifference = number/14;
    var yearDifference = number/168;
    
    var week = ((Math.floor(startWeek + weekDifference))%(12))+1;
    
    var year = Math.floor(startYear + yearDifference);
    
    var month;
    
    if (week==1){month='September';
    }
    if (week==2){month='October';
    }
    if (week==3){month='November';
    }
    if (week==4){month='December';
    }
    if (week==5){month='January';
    }
    if (week==6){month='February';
    }
    if (week==7){month='March';
    }
    if (week==8){month='April';
    }
    if (week==9){month='May';
    }
    if (week==10){month='June';
    }
    if (week==11){month='July';
    }
    if (week==12){month='August';
    }
    
    var d;
    var RLyear = 1963+Number(year);
    
    IGtime = new Date().toDateString() + ': IG ' + month + ' '+ RLyear
    return IGtime;
    }


const checkforDate = async() => {
	if (new Date().getDay() == 1 && new Date().getUTCHours() == 6 && new Date().getUTCMinutes() == 0) {
		const channel = client.channels.cache.get("810721573375442975")
        channel.send(`**${Roman()}**`)
	}

	setTimeout(checkforDate, 1000 * 60)
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('cafe help', { type: 'STREAMING' });

    checkforDate().catch((err) => {
		console.log(err)
	})

    checkforBirthdays().catch((err) => {
		console.log(err)
	})
 });

 client.on('guildMemberRemove', member => {
	userID = member.id
	serverID = member.guild.id
	birthdayModel.deleteOne({serverID: member.guild.id, userID: member.id}).then().catch(e => console.log(e))
})

 client.on('messageCreate', msg => {
    function sleep(sec) {
        return new Promise(resolve => setTimeout(resolve, sec*1000));
    }

    var message = msg.content.toLowerCase()

    if (msg.author.bot) return
    if (message.includes('hi cafe bot')) {
        msg.channel.send('Greetings ' + msg.author.toString() +'! I hope you\'re having a lovely day!');
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
    
    if (command == "time") {
        msg.channel.send(`**${Roman()}**`)
    }

 
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