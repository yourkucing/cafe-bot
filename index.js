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
                                sleep(5).then(r => {
                                    msg.channel.send(`**The Challenge**\n\nPeregrine pulled his attention away from the conversation, trailing his fingers over the wine bottles. He pulled one out particularly, handling it with care. “Before you arrived, I had found this bottle of wine that looks pretty old. But the label looks faded out. Could you perhaps decipher the year marked on it? I won’t answer another question until you do.”`)
                                    msg.channel.send(`https://cdn.discordapp.com/attachments/887018748945514649/979230164753977384/Wpuzzle1.png`)
                                    msg.channel.send(`\`You have unlimited tries until you get the right answer or you say "I don't know". Good luck.\``)
                                    countingModel.findOneAndUpdate({name: "k1"},
                                    {
                                        $set:
                                        {
                                            num: 0
                                        }
                                    }).then(ans => {
                                        const filter = m => m.author.id == msg.author.id;
                                        const collector = msg.channel.createMessageCollector(
                                            {filter}
                                        );
                                        collector.on('collect', m => {
                                            if (m.content.toLowerCase() == "once in a blue moon") {
                                                msg.channel.send(`“Ah!” Peregrine looked back at the bottle. “Indeed, that is very old! I can’t wait to taste some of this wine! Well, perhaps if you are done questioning me, I could take this back home with me. And there is something you need to know. Miss Mallard and her niece were quite close when they were young girls. Almost like siblings. However, they drifted apart when Miss Crane was in college and only recently when Miss Mallard moved away, Miss Crane returned to take care of Dr. Mallard.”\n\nPeregrine gave a saucy wink, and chuckled to himself. “Spicy, isn’t it? Now, if you are done questioning me, I would suggest that you question those rude employees of the Manor, the cook, or  the young driver. They were very eager to kick me out last night.”`)
                                                collector.stop()
                                            }
                                            else if (m.content.toLowerCase() == "i don't know") {
                                                msg.channel.send(`Peregrine sighed. “Alas, such a pity. Nevertheless I am taking this bottle with me. Now, if you are done, I would like to go and taste this wine. You should probably go talk to the driver. He would likely know more about this terrible business.”`)
                                                collector.stop()
                                            }
                                        });
                                        collector.on('end', (collected, reason) => {
                                            return
                                        });
                                    })
                                })
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
                            nummessages = m.size - 1
                            msg.guild.channels.cache.get(ballroomID).messages.fetch({limit: nummessages}).then(k => {
                                msg.guild.channels.cache.get(ballroomID).bulkDelete(k)
                                msg.guild.channels.cache.get(ballroomID).send(`Soft music fills the large space of the ballroom, beautifully-decorated for dancing that may have occurred had not been for the disaster that followed dinner the previous night before. Over the music is the faint clicking of heels as a lone figure spins herself around in an elegant, straw-yellow dress that swished on the polished floor. Her face is concealed by a wide-brimmed hat, but the scuffle of shoes by the entrance is enough to alert the woman. She turns toward the door, face initially scrunched into a frown, but her features quickly shift into curiosity. From the front, the detective is able to note the string of pearls and matching earrings that the woman is showing off, and she’s even equipped with frilled gloves to complete the ensemble.`)
                                msg.guild.channels.cache.get(billiardroomID).messages.fetch({limit: 99}).then(m => {
                                    nummessages = m.size - 1
                                    msg.guild.channels.cache.get(billiardroomID).messages.fetch({limit: nummessages}).then(k => {
                                        msg.guild.channels.cache.get(billiardroomID).bulkDelete(k)
                                        msg.guild.channels.cache.get(billiardroomID).send(`Lord Cuckoo was an imposing older gentleman. Outwardly, he looked sharp, dressed in form fitting, expensive clothing. His expression, however, told of much nastier things. He looked up from pacing as soon as the door opened, and stalked over, furious.\n\n“About fucking time. I’m not going to stand for being treated like some – Some animal! You haven’t even told us why we’re here.” He crossed his arms. “I get that Mallard was offed. Good for him. But do you know who I am? I’m Lord fucking Cuckoo. That name means something around these parts. And now we’re hauled back just to be questioned? I demand an immediate apology! I’ll – Write to your supervisors! If any of this leaks to the press, it's your head on the platter.”`)
                                        msg.guild.channels.cache.get(childhoodbedroomID).messages.fetch({limit: 99}).then(m => {
                                            nummessages = m.size - 1
                                            msg.guild.channels.cache.get(childhoodbedroomID).messages.fetch({limit: nummessages}).then(k => {
                                                msg.guild.channels.cache.get(childhoodbedroomID).bulkDelete(k)
                                                msg.guild.channels.cache.get(childhoodbedroomID).send(`Miss Mallard was sitting on her bed, her eyes staring into a corner of the room, her mind a blank. Once in a while, she would curl her right fingers into a fist, pushing the nails against her palm. Maybe… Just maybe this was all a nightmare and she would wake up… She let up a small sob.\n\nAs the detective walked in, Miss Mallard got up from the bed so fast that she almost stumbled into the detective and just managed to catch herself in time. “D-detective!” She quickly straightened up, using the back of her right arm to wipe her tears. Her lips trembled, the tears threatening to flow freely once more as she stared at the detective.\n\n“Please,” she whispered. “He’s my father. I need… Please… I need you to… find out…” She quickly gripped his right hand with both of hers. “I’m his only… Please, he doesn’t deserve this…”`)
                                                msg.guild.channels.cache.get(conservatoryID).messages.fetch({limit: 99}).then(m => {
                                                    nummessages = m.size - 1
                                                    msg.guild.channels.cache.get(conservatoryID).messages.fetch({limit: nummessages}).then(k => {
                                                        msg.guild.channels.cache.get(conservatoryID).bulkDelete(k)
                                                        msg.guild.channels.cache.get(conservatoryID).send(`Mr. Jay sat on one of the low brick walls in the Conservatory, opening and closing his hand, stretching it a few times. It was taking longer and longer to work the cramps out. A discarded basket full of dead leaves and flowers sat at his feet. It's clear from the look of the flower beds that he was doing his best to fill the time.\n\nWhen the door opened, the man stood. It was an ingrained politeness that came from years of working for the upper tax brackets. "Are you with the police, then? That detective the lawyers called in?" Jay didn't make a move towards the man, instead choosing to sit himself back down on the wall. He hoped the detective didn't mind. "I told the others I wouldn't be running off, but they asked me to stay put until you arrived. Seem to think I don't have much to do, but my work here is never done. Even if... well, I'm not our of a job quite yet, now, am I? Just a new boss for the time being."\n\nHe  leans forward onto his knees, "I suppose 'I don't know' isn't going to cut it for your answers?"`)
                                                        msg.guild.channels.cache.get(diningroomID).messages.fetch({limit: 99}).then(m => {
                                                            nummessages = m.size - 1
                                                            msg.guild.channels.cache.get(diningroomID).messages.fetch({limit: nummessages}).then(k => {
                                                                msg.guild.channels.cache.get(diningroomID).bulkDelete(k)
                                                                msg.guild.channels.cache.get(diningroomID).send(`Mr. Penguin stood with his back to the door, hands folded politely behind him. He only turned when he heard the door click closed. “Ah, good morning. I’ve been waiting for you.” He strode to the table, and pulled out a chair for the detective. “Please, have a seat. I’m sure we have much to discuss. I’m Mr. Penguin, by the way. The butler.”`)
                                                                msg.guild.channels.cache.get(garageID).messages.fetch({limit: 99}).then(m => {
                                                                    nummessages = m.size - 1
                                                                    msg.guild.channels.cache.get(garageID).messages.fetch({limit: nummessages}).then(k => {
                                                                        msg.guild.channels.cache.get(garageID).bulkDelete(k)
                                                                        msg.guild.channels.cache.get(garageID).send(`Mr. Falcon was barely a mister at all. At just 17 years old, he was dressed more for attending a concert, than for one who just committed murder. He was sat in the garage, staring at his hands, and flinched when the door opened. He stood, quickly.\n\n“Oh, finally. I mean – Not that I was waiting on you or – Anything.” He half-heartedly offered his hand to shake. “I’m Tony. Falcon. Tony Falcon. I’m the driver. They said you wanted to talk to me, or something?”`)
                                                                        msg.guild.channels.cache.get(guestbedroomID).messages.fetch({limit: 99}).then(m => {
                                                                            nummessages = m.size - 1
                                                                            msg.guild.channels.cache.get(guestbedroomID).messages.fetch({limit: nummessages}).then(k => {
                                                                                msg.guild.channels.cache.get(guestbedroomID).bulkDelete(k)
                                                                                msg.guild.channels.cache.get(guestbedroomID).send(`Kestrel was seated at the writing desk in the guest room when the person entered. She was focused on a note, scribbling away; and held up a finger that in and of itself sent out an obvious command that would not accept any other response than obedience: wait until I am finished.\n\nAfter a few more scrawling lines, she put down the pen, folded the paper she had been writing in, and placed it in her breast pocket. Only then did she look up, her gaze taking in the newcomer and assessing them.\n\nNot standing or offering her hand, she crossed her legs and folded her hands on top of them. “I presume you are here to either release me from this room so that I may continue with my business, collect Andrea and leave… or to interrogate me. If it is the former, say so now and step aside.” But they did not move, so she sighed. “As I thought. Very well. Ask your questions and let’s be done with this.”`)
                                                                                msg.guild.channels.cache.get(kitchenID).messages.fetch({limit: 99}).then(m => {
                                                                                    nummessages = m.size - 1
                                                                                    msg.guild.channels.cache.get(kitchenID).messages.fetch({limit: nummessages}).then(k => {
                                                                                        msg.guild.channels.cache.get(kitchenID).bulkDelete(k)
                                                                                        msg.guild.channels.cache.get(kitchenID).send(`The aroma of freshly brewed chamomile tea wafted through the doorway of the kitchen like a warm invitation. A woman with dark hair tied in a loose knot behind her neck, and who looked to be in her early thirties, stood facing the kitchen counter; her back turned toward the door as she poured herself a cup from the steaming kettle. There was a small breakfast table near the center of the room that was still set for the staff’s morning meal that was never eaten. There were pots and pans on the stove ready to be used for cooking, though the task seemed to have been abandoned before it was even started.\n\nThe woman stirred her tea delicately with a spoon before turning around and noticing that someone had entered for the first time. “Oh!” She placed a hand on her cheek in surprise, and subsequently sloshed a little bit of tea over the rim of the cup. “You startled me, Detective, I didn’t hear you come in.” Her expression was somber, and she made her way over to the table while dabbing at the spilled tea with a cloth napkin. “I thought I’d make myself some tea while waiting. It’s been a difficult morning.” She took a sip and then moved to set the cup down on the table, though it rattled against the saucer as it was placed. She made her way over to the detective with an outstretched hand.\n\n“I’m Miss Crane. Dr. Mallard is my Uncle.” She paused, hearing herself. “I mean, he was my Uncle.” She seemed caught off guard by her own mistake and focused on a pot that was sitting on the stove for a moment. “It’s odd, messing up tenses like that. Yesterday it was ‘is’, and now it’s ‘was’.” Her olive green eyes lifted to meet the detective’s before they fluttered back down and she looked away again. “I know you must be very busy with everything going on, so I’ll answer whatever questions you have, and you can be on your way.” She moved back over to the table to take a seat, and gestured to a chair for the detective to do the same if he so wished.`)
                                                                                        msg.guild.channels.cache.get(libraryID).messages.fetch({limit: 99}).then(m => {
                                                                                            nummessages = m.size - 1
                                                                                            msg.guild.channels.cache.get(libraryID).messages.fetch({limit: nummessages}).then(k => {
                                                                                                msg.guild.channels.cache.get(libraryID).bulkDelete(k)
                                                                                                msg.guild.channels.cache.get(libraryID).send(`The Manor’s library looked and smelt as all old money libraries should. Nothing particularly remarkable about it, save for a staggering display of wealth that might inspire an appetite for the rich. The shelves were a rich mahogany, labyrinthine aisles upon aisles of them lined with just about every volume under the sun, and the midmorning light streaked across plush red velvet carpeting, dust particles whirling in the illumination.\n\nThere was one portentous nook the light didn't quite reach, and out of it materialized a slender and lanky older woman of most bizarre appearance. She had an open face with shiny, impish eyes, and aside from a few frizzy strands framing her face, her sleek black hair was pulled back into a chignon so tight it must have been clinging to her very thoughts. Altogether, her outfit was an offence against taste and decency. Ceramic beetles hung from her ears, her mildly moth-eaten turtleneck was patterned with hotdogs, and the leggings beneath her pencil skirt were striped like the Wicked Witch. Incidentally, she also wore a sequined pair of red kitten heels.\n\nWithout reservation, she took the detective’s hand in both of hers for a handshake that stopped just short of inducing paralysis. “You must be the detective, then!” Her gaze was touched with a bit of mania, but shrewd as well, and gave the impression that she immediately knew everything there was to know about the detective and may or may not utilize it against them.`)
                                                                                                msg.guild.channels.cache.get(libraryID).send(`“I’m Ms. Wren, the librarian, *obviously*.” She gestured with loose wrists at the books surrounding them. You'd never guess that someone had just died if you were judging by her grin. “Just Min if you're feeling impolite and Lady Annika on Saturday nights. And this—” She reached for something tucked beneath her arm, presenting it with great prudence. It was a duck. A mallard duck, to be precise, and the detective needed no particular acumen to discern that it was no longer among the living and in fact very poorly taxidermied, “—is Fernando. Say hello to the nice detective, Fernando.”\n\n...\n\n“Don’t you mind Fernando. He's not used to company.”\n\nMs. Wren hopped over, throwing herself down into a chair behind a large desk opposite another chair, and framed her face. Fernando stared glassily ahead from her lap.\n\n“Oooh, this is positively thrilling.” She rubbed her hands together like a fly. “I've never been interrogated by a *real life* detective before. Well, there was that one time…”`)
                                                                                                msg.guild.channels.cache.get(loungeID).messages.fetch({limit: 99}).then(m => {
                                                                                                    nummessages = m.size - 1
                                                                                                    msg.guild.channels.cache.get(loungeID).messages.fetch({limit: nummessages}).then(k => {
                                                                                                        msg.guild.channels.cache.get(loungeID).bulkDelete(k)
                                                                                                        msg.guild.channels.cache.get(loungeID).send(`Professor Cuckoo paced the lounge, running his hands through his hair and humming some non-tune. At the site of the detective, he stopped and gave a worried smile. He had a disheveled look about him- more than the usual disheveled Professor look he usually had- but smoothed out his rumpled cardigan in a useless attempt to look a little more put together.\n\n“Detective! Good to see you, good to see you. This whole thing is awful, isn’t it?” He frowned and pushed up his glasses, before blinking rapidly. “Oh, goodness. I didn’t even introduce myself. I’m Professor Cuckoo. I am- was… Was a friend of Dr. Mallard.” He holds out a hand for the detective to shake, and pats the detective’s hand a few times before dropping it. “Ask any questions you need, I just hope we can get to the bottom of all this.”`)
                                                                                                        msg.guild.channels.cache.get(servantsquartersID).messages.fetch({limit: 99}).then(m => {
                                                                                                            nummessages = m.size - 1
                                                                                                            msg.guild.channels.cache.get(servantsquartersID).messages.fetch({limit: nummessages}).then(k => {
                                                                                                                msg.guild.channels.cache.get(servantsquartersID).bulkDelete(k)
                                                                                                                msg.guild.channels.cache.get(servantsquartersID).send(`Ms. Gannet sat on the little bed staring at the floor. She was a petite woman with pale blonde hair and light blue eyes that seemed anxious. Her room was pretty bare save for a small bag of luggage at the end of the bed, a dresser and lamp next to the bed. When the detective walked in she stood up and cleared her throat, meeting their eyes reluctantly. “Good day, Detective,” she said without much feeling, “I hope this won’t take long, I don’t know much of anything.” Her gaze went past the detective towards the door, it was obvious she didn’t want to be there.`)
                                                                                                                msg.guild.channels.cache.get(winecellarID).messages.fetch({limit: 99}).then(m => {
                                                                                                                    nummessages = m.size - 1
                                                                                                                    msg.guild.channels.cache.get(winecellarID).messages.fetch({limit: nummessages}).then(k => {
                                                                                                                        msg.guild.channels.cache.get(winecellarID).bulkDelete(k)
                                                                                                                        msg.guild.channels.cache.get(winecellarID).send(`Peregrine was grumpy and exhausted. He had been kept waiting in this damp and cold cellar for a long time. First, his breakfast had been rudely interrupted by the investigators who then pulled him down here only to lock him up. His stomach grumbled. He wondered how much more time the detective would take to come down here. He had already walked through the caskets and checked every bottle of wine. He was bored. It was a pity that he did not have a bottle opener with him. He vaguely considered breaking open a bottle of wine, but the wastage that would ensue stopped him from doing it. He sat down again on an empty barrel and sighed possibly for the hundredth time, waiting for his turn to be questioned.`)
                                                                                                                        msg.guild.channels.cache.get(thestudyID).messages.fetch({limit: 99}).then(m => {
                                                                                                                            nummessages = m.size - 1
                                                                                                                            msg.guild.channels.cache.get(thestudyID).messages.fetch({limit: nummessages}).then(k => {
                                                                                                                                msg.guild.channels.cache.get(thestudyID).bulkDelete(k)
                                                                                                                                msg.guild.channels.cache.get(thestudyID).send(``)
                                                                                                                                
                                                                                                                            })
                                                                                                                        })
                                                                                                                    })
                                                                                                                })
                                                                                                            })
                                                                                                        })
                                                                                                    })
                                                                                                })
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
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