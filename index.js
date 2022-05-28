const { Client, Intents } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], disableEveryone: false, partials: ['MESSAGE', 'REACTION']});
const prefix = "cafe ";
const fs = require('fs').promises;
const path = require('path');
const mongoose = require('mongoose');
const birthdayModel = require('./commands/birthdaySchema');
const channelModel = require('./commands/innsmouth/channelSchema');
const innsmouthModel = require('./commands/innsmouth/innsmouthSchema');
const card = require('./commands/innsmouth/cards.json')
const ballroom = require('./commands/wain/ballroom.json')
const billiardroom = require('./commands/wain/billiardroom.json')
const childhoodbedroom = require('./commands/wain/childhoodbedroom.json')
const conservatory = require('./commands/wain/conservatory.json')
const diningroom = require('./commands/wain/diningroom.json')
const garage = require('./commands/wain/garage.json')
const guestbedroom = require('./commands/wain/guestbedroom.json')
const kitchen = require('./commands/wain/kitchen.json')
const library = require('./commands/wain/library.json')
const lounge = require('./commands/wain/lounge.json')
const servantsquarters = require('./commands/wain/servantsquarters.json')
const winecellar = require('./commands/wain/winecellar.json')
const countingModel = require('./commands/wain/countingSchema')

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

 client.on('guildMemberAdd', member => {
     userID = member.id
     serverID = member.guild.id
     if (userID == "267130234522828801" && serverID == "979221828876791839") {
        const detectiverole = member.guild.roles.cache.get('979263010461855774')
        member.roles.add(detectiverole.id)
     }
 })

 client.on('guildMemberRemove', member => {
	userID = member.id
	serverID = member.guild.id
	eboylog = client.channels.cache.get('867744429657292810')
	birthdayModel.deleteOne({serverID: member.guild.id, userID: member.id}).then().catch(e => eboylog.send(`(CAFE): <@279101053750870017>, unable to delete birthday from database [${userID}].\n${e}`))
})

 client.on('messageCreate', msg => {
    function sleep(sec) {
        return new Promise(resolve => setTimeout(resolve, sec*1000));
    }

    if (msg.author.bot) return

    channelModel.findOne({channelID: msg.channel.id}).then(userexistence => {
        if (userexistence) {
            if (msg.content.toLowerCase().includes("cafe disable-cards")) {
            }
            else {
                for (let x in card) {
                    if (msg.content.toLowerCase() == card[x].answers) {
                        return
                    }
                }
                userID = msg.author.id
                innsmouthModel.findOne({userID: userID}).then(cards => {
                    if (cards) {}
                    else {
                        dice = (Math.floor(Math.random() * 100) + 1)
                        if (dice >= 80) {
                            const randomCards = card[Math.floor(Math.random() * card.length)];
                            msg.channel.send(randomCards.games).then( m1 => {
                                msg.channel.send(`\n\n**This card will self-destruct in 20 seconds. You will have 10 minutes to give the right answer, and you will only have ONE try. Good luck. You will need it.**\n(Ps. if you're not planning on answering, just put in "exit". If not, when everything self-destructs, it will delete the next message you sent after this too.)`).then( m2 => {
                                    setTimeout(() => m1.delete(), 20000)
                                    const filter = m => m.author.id == userID;
                                    const collector = msg.channel.createMessageCollector(
                                        {filter, time: 600000, max: 1}
                                    );
                                    collector.on('collect', m => {
                                        if (m.content.toLowerCase() == randomCards.answers) {
                                            innsmouthModel.create({
                                                userID: userID
                                            }).then(r => {
                                                msg.author.send("Congratulations. The Institute recognizes your talent and skills. Should you choose to accept we welcome you to the TSI. Adventure, research and Death awaits.\n\nhttps://discord.gg/qsphy3Z8su")
                                                collector.stop(randomCards.answers)
                                            })
                                        }
                                    });
                                    collector.on('end', (collected, reason) => {
                                        m2.delete()
                                        collected.forEach(msg => {
                                            msg.delete();
                                          })
                                        
                                    });
                                })
                            })
                        }
                    }
                })
            }

        }
    })

    var message = msg.content.toLowerCase()

    if (msg.guild.id == "979221828876791839") {
        winecellarID = "979258357309382759"
        garageID = "979258754526744586"
        loungeID = "979258451089850388"
        libraryID = "979258595092869242"
        diningroomID = "979258638218715168"
        conservatoryID = "979258678844747836"
        kitchenID = "979258836416348170"
        billiardroomID = "979258920117886976"
        ballroomID = "979258946206445588"
        thestudyID = "979259110841278464"
        servantsquartersID = "979258524834099210"
        childhoodbedroomID = "979258799800074270"
        guestbedroomID = "979259001281867788"

        if (msg.channel.id == winecellarID) {
            for (let x in winecellar) {
                if (message.includes(winecellar[x].question)) {
                    msg.channel.send(winecellar[x].answer)
                    countingModel.findOneAndUpdate({name: "k1"},
                    {
                        $inc:
                        {
                            num: 1
                        }
                    },
                    {
                        returnDocument: "after"
                    }).then(r => {
                        if (r) {
                            if (r.num == 3) {
                                msg.channel.send("HERE'S YOUR CHALLENGE MUAHAHAHA")
                                countingModel.findOneAndUpdate({name: "k1"},
                                {
                                    $set:
                                    {
                                        num: 0
                                    }
                                }).then()
                            }
                        }
                    })
                }
            }
        }
        if (msg.channel.id == garageID) {
            for (let x in garage) {
                if (message.includes(garage[x].question)) {
                    msg.channel.send(garage[x].answer)
                    countingModel.findOneAndUpdate({name: "k2"},
                    {
                        $inc:
                        {
                            num: 1
                        }
                    },
                    {
                        returnDocument: "after"
                    }).then(r => {
                        if (r) {
                            if (r.num == 3) {
                                msg.channel.send("HERE'S YOUR CHALLENGE MUAHAHAHA")
                                countingModel.findOneAndUpdate({name: "k2"},
                                {
                                    $set:
                                    {
                                        num: 0
                                    }
                                }).then()
                            }
                        }
                    })
                }
            }
        }
        if (msg.channel.id == loungeID) {
            for (let x in lounge) {
                if (message.includes(lounge[x].question)) {
                    msg.channel.send(lounge[x].answer)
                    countingModel.findOneAndUpdate({name: "k3"},
                    {
                        $inc:
                        {
                            num: 1
                        }
                    },
                    {
                        returnDocument: "after"
                    }).then(r => {
                        if (r) {
                            if (r.num == 3) {
                                msg.channel.send("HERE'S YOUR CHALLENGE MUAHAHAHA")
                                countingModel.findOneAndUpdate({name: "k3"},
                                {
                                    $set:
                                    {
                                        num: 0
                                    }
                                }).then()
                            }
                        }
                    })
                }
            }
        }
        if (msg.channel.id == libraryID) {
            for (let x in library) {
                if (message.includes(library[x].question)) {
                    msg.channel.send(library[x].answer)
                    countingModel.findOneAndUpdate({name: "k4"},
                    {
                        $inc:
                        {
                            num: 1
                        }
                    },
                    {
                        returnDocument: "after"
                    }).then(r => {
                        if (r) {
                            if (r.num == 3) {
                                msg.channel.send("HERE'S YOUR CHALLENGE MUAHAHAHA")
                                countingModel.findOneAndUpdate({name: "k4"},
                                {
                                    $set:
                                    {
                                        num: 0
                                    }
                                }).then()
                            }
                        }
                    })
                }
            }
        }
        if (msg.channel.id == diningroomID) {
            for (let x in diningroom) {
                if (message.includes(diningroom[x].question)) {
                    msg.channel.send(diningroom[x].answer)
                    countingModel.findOneAndUpdate({name: "k5"},
                    {
                        $inc:
                        {
                            num: 1
                        }
                    },
                    {
                        returnDocument: "after"
                    }).then(r => {
                        if (r) {
                            if (r.num == 3) {
                                msg.channel.send("HERE'S YOUR CHALLENGE MUAHAHAHA")
                                countingModel.findOneAndUpdate({name: "k5"},
                                {
                                    $set:
                                    {
                                        num: 0
                                    }
                                }).then()
                            }
                        }
                    })
                }
            }
        }
        if (msg.channel.id == conservatoryID) {
            for (let x in conservatory) {
                if (message.includes(conservatory[x].question)) {
                    msg.channel.send(conservatory[x].answer)
                    countingModel.findOneAndUpdate({name: "k6"},
                    {
                        $inc:
                        {
                            num: 1
                        }
                    },
                    {
                        returnDocument: "after"
                    }).then(r => {
                        if (r) {
                            if (r.num == 3) {
                                msg.channel.send("HERE'S YOUR CHALLENGE MUAHAHAHA")
                                countingModel.findOneAndUpdate({name: "k6"},
                                {
                                    $set:
                                    {
                                        num: 0
                                    }
                                }).then()
                            }
                        }
                    })
                }
            }
        }
        if (msg.channel.id == kitchenID) {
            for (let x in kitchen) {
                if (message.includes(kitchen[x].question)) {
                    msg.channel.send(kitchen[x].answer)
                    countingModel.findOneAndUpdate({name: "k7"},
                    {
                        $inc:
                        {
                            num: 1
                        }
                    },
                    {
                        returnDocument: "after"
                    }).then(r => {
                        if (r) {
                            if (r.num == 3) {
                                msg.channel.send("HERE'S YOUR CHALLENGE MUAHAHAHA")
                                countingModel.findOneAndUpdate({name: "k7"},
                                {
                                    $set:
                                    {
                                        num: 0
                                    }
                                }).then()
                            }
                        }
                    })
                }
            }
        }
        if (msg.channel.id == billiardroomID) {
            for (let x in billiardroom) {
                if (message.includes(billiardroom[x].question)) {
                    msg.channel.send(billiardroom[x].answer)
                    countingModel.findOneAndUpdate({name: "k8"},
                    {
                        $inc:
                        {
                            num: 1
                        }
                    },
                    {
                        returnDocument: "after"
                    }).then(r => {
                        if (r) {
                            if (r.num == 3) {
                                msg.channel.send("HERE'S YOUR CHALLENGE MUAHAHAHA")
                                countingModel.findOneAndUpdate({name: "k8"},
                                {
                                    $set:
                                    {
                                        num: 0
                                    }
                                }).then()
                            }
                        }
                    })
                }
            }
        }
        if (msg.channel.id == ballroomID) {
            for (let x in ballroom) {
                if (message.includes(ballroom[x].question)) {
                    msg.channel.send(ballroom[x].answer)
                    countingModel.findOneAndUpdate({name: "k9"},
                    {
                        $inc:
                        {
                            num: 1
                        }
                    },
                    {
                        returnDocument: "after"
                    }).then(r => {
                        if (r) {
                            if (r.num == 3) {
                                msg.channel.send("HERE'S YOUR CHALLENGE MUAHAHAHA")
                                countingModel.findOneAndUpdate({name: "k9"},
                                {
                                    $set:
                                    {
                                        num: 0
                                    }
                                }).then()
                            }
                        }
                    })
                }
            }
        }
        if (msg.channel.id == thestudyID) {
            if (message != "answer") {
                msg.channel.send("OPE THAT'S WRONG. UNFORTUNATELY YOU HAVE TO RESTART. BYEBYE. This will self-destruct in 5 seconds.")
                sleep(5).then(r => {
                    //msg.author.roles.set([])
                    //.then(member => {
                        //member.roles.add(msg.guild.roles.cache.get('979263010461855774'))
                        msg.guild.channels.cache.get(ballroomID).messages.fetch({limit: 99}).then(m => {
                            msg.guild.channels.cache.get(ballroomID).bulkDelete(m)
                            msg.guild.channels.cache.get(ballroomID).send(`Soft music fills the large space of the ballroom, beautifully-decorated for dancing that may have occurred had not been for the disaster that followed dinner the previous night before. Over the music is the faint clicking of heels as a lone figure spins herself around in an elegant, straw-yellow dress that swished on the polished floor. Her face is concealed by a wide-brimmed hat, but the scuffle of shoes by the entrance is enough to alert the woman. She turns toward the door, face initially scrunched into a frown, but her features quickly shift into curiosity. From the front, the detective is able to note the string of pearls and matching earrings that the woman is showing off, and she’s even equipped with frilled gloves to complete the ensemble.`)
                        })
                    })
                    //.catch(console.error);
                //})
            }
        }
        if (msg.channel.id == servantsquartersID) {
            for (let x in servantsquarters) {
                if (message.includes(servantsquarters[x].question)) {
                    msg.channel.send(servantsquarters[x].answer)
                    countingModel.findOneAndUpdate({name: "k10"},
                    {
                        $inc:
                        {
                            num: 1
                        }
                    },
                    {
                        returnDocument: "after"
                    }).then(r => {
                        if (r) {
                            if (r.num == 3) {
                                msg.channel.send("HERE'S YOUR CHALLENGE MUAHAHAHA")
                                countingModel.findOneAndUpdate({name: "k10"},
                                {
                                    $set:
                                    {
                                        num: 0
                                    }
                                }).then()
                            }
                        }
                    })
                }
            }
        }
        if (msg.channel.id == childhoodbedroomID) {
            for (let x in childhoodbedroom) {
                if (message.includes(childhoodbedroom[x].question)) {
                    msg.channel.send(childhoodbedroom[x].answer)
                    countingModel.findOneAndUpdate({name: "k11"},
                    {
                        $inc:
                        {
                            num: 1
                        }
                    },
                    {
                        returnDocument: "after"
                    }).then(r => {
                        if (r) {
                            if (r.num == 3) {
                                msg.channel.send("HERE'S YOUR CHALLENGE MUAHAHAHA")
                                countingModel.findOneAndUpdate({name: "k11"},
                                {
                                    $set:
                                    {
                                        num: 0
                                    }
                                }).then()
                            }
                        }
                    })
                }
            }
        }
        if (msg.channel.id == guestbedroomID) {
            for (let x in guestbedroom) {
                if (message.includes(guestbedroom[x].question)) {
                    msg.channel.send(guestbedroom[x].answer)
                    countingModel.findOneAndUpdate({name: "k12"},
                    {
                        $inc:
                        {
                            num: 1
                        }
                    },
                    {
                        returnDocument: "after"
                    }).then(r => {
                        if (r) {
                            if (r.num == 3) {
                                msg.channel.send("HERE'S YOUR CHALLENGE MUAHAHAHA")
                                countingModel.findOneAndUpdate({name: "k12"},
                                {
                                    $set:
                                    {
                                        num: 0
                                    }
                                }).then()
                            }
                        }
                    })
                }
            }
        }
    }
    
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