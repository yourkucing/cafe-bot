const { Client, Intents, MessageEmbed } = require('discord.js');
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
const countingModel = require('./commands/wain/countingSchema');
const { channel } = require('diagnostics_channel');

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
/*  	client.channels.fetch("979257748040589332").then(channel => {
		channel.messages.fetch("980875214005080095").then(message => {
			message.react("❤️").then(m =>
                {
                    message.react("🧡").then(a => {
                        message.react("💛").then(b => {
                            message.react("💚").then(c => {
                                message.react("💙").then(d => {
                                    message.react("💜").then(e => {
                                        message.react("🖤").then(f => {
                                            message.react("🤎").then(g => {
                                                message.react("🤍").then(h => {
                                                    message.react("❤️‍🔥").then(i => {
                                                        message.react("💘").then(j => {
                                                            message.react("💟")
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
	}) */
 });

 client.on('guildMemberAdd', member => {
     userID = member.id
     serverID = member.guild.id
     if (userID == "267130234522828801" && serverID == "979221828876791839") {
        member.roles.add("979263010461855774")
     }
 })

 client.on('guildMemberRemove', member => {
	userID = member.id
	serverID = member.guild.id
	eboylog = client.channels.cache.get('867744429657292810')
	birthdayModel.deleteOne({serverID: member.guild.id, userID: member.id}).then().catch(e => eboylog.send(`(CAFE): <@279101053750870017>, unable to delete birthday from database [${userID}].\n${e}`))
})

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return
    messageID = reaction.message.id
    guild = client.guilds.cache.get(reaction.message.guild.id)
    channelID = guild.channels.cache.get(reaction.message.channel.id)
    msg = channelID.messages.cache.get(messageID)
    if (messageID == "980875214005080095") {
        if (reaction.emoji.name == "❤️") {
            const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('THE DAUGHTER')
            .setImage("https://cdn.discordapp.com/attachments/720470821902090258/979248960608825374/ezgif.com-gif-maker2.png")
            .setDescription(`**Miss Mallard** is the only child of Dr. Mallard. She is 28, and has been making her own way in life since the age of 22.`);
            channelID.send({embeds: [embed]}).then(repliedMessage => {
                msg.reactions.cache.find(reaction => reaction.emoji.name == "❤️").users.remove(user.id)
                setTimeout(() => repliedMessage.delete(), 10000);
              })
              .catch();
        }
        else if (reaction.emoji.name == "🧡") {
            const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('THE GIRLFRIEND')
            .setImage("https://cdn.discordapp.com/attachments/720470821902090258/979248961128898560/ezgif.com-gif-maker.png")
            .setDescription(`**Colonel Kestral** is in her early 30s. She is intimidating to look at, and she's well-decorated from her time in the army. She is closely guarded with her secrets, and judges other based on strength and willpower.`);
            channelID.send({embeds: [embed]}).then(repliedMessage => {
                msg.reactions.cache.find(reaction => reaction.emoji.name == "🧡").users.remove(user.id)
                setTimeout(() => repliedMessage.delete(), 10000);
              })
              .catch();
        }
        else if (reaction.emoji.name == "💛") {
            const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('THE CHEF')
            .setImage("https://cdn.discordapp.com/attachments/720470821902090258/979248961728688168/ezgif.com-gif-maker1.png")
            .setDescription(`**Ms. Gannet** is in her mid-30s, and is the daughter of a single mother who has had to pay her way to get to America and care for her family of 3. Ms. Gannet cares deeply for her family, and has worked for the Mallard household for the past 10 years.`);
            channelID.send({embeds: [embed]}).then(repliedMessage => {
                msg.reactions.cache.find(reaction => reaction.emoji.name == "💛").users.remove(user.id)
                setTimeout(() => repliedMessage.delete(), 10000);
              })
              .catch();
        }
        else if (reaction.emoji.name == "💚") {
            const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('THE NIECE')
            .setImage("https://cdn.discordapp.com/attachments/720470821902090258/979251377375178832/ezgif.com-gif-maker.png")
            .setDescription(`**Miss Crane** is in her early 30s, and has lived in Mallard Manor for the past 3 years. After her own parents passed away when she was young, she came to live in the Mallard household, treated as a daughter by Dr. Mallard, and as a sister by Miss Mallard. When she learned of Dr. Mallard's illness, she came to stay with him and help run the household.`);
            channelID.send({embeds: [embed]}).then(repliedMessage => {
                console.log(msg)
                msg.reactions.cache.find(reaction => reaction.emoji.name == "💚").users.remove(user.id)
                setTimeout(() => repliedMessage.delete(), 10000);
              })
              .catch();
        }
        else if (reaction.emoji.name == "💙") {
            const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('THE GARDENER')
            .setImage("https://cdn.discordapp.com/attachments/720470821902090258/979252851014533130/ezgif.com-gif-maker1.png")
            .setDescription(`**Mr. Jay** is in his early 60s, and has worked the Mallard yards for years. He is nearly ready to retire, but continues to put it off due to his love of the gardens. He seems to be a kindly enough old man, but doesn't pay attention to any of the goings-ons of the household, beyond his lovely plants.`);
            channelID.send({embeds: [embed]}).then(repliedMessage => {
                console.log(msg)
                msg.reactions.cache.find(reaction => reaction.emoji.name == "💙").users.remove(user.id)
                setTimeout(() => repliedMessage.delete(), 10000);
              })
              .catch();
        }
        else if (reaction.emoji.name == "💜") {
            const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('THE SCHOLAR')
            .setImage("https://cdn.discordapp.com/attachments/720470821902090258/979254512852303892/ezgif.com-gif-maker3.png")
            .setDescription(`**Professor Cuckoo** is in his early 50s, and is the younger brother of Lord Cuckoo. He lives at the family manor, and teaches at a local university. Books and learning is his passion, and he would much rather be reading than speaking to others.`);
            channelID.send({embeds: [embed]}).then(repliedMessage => {
                msg.reactions.cache.find(reaction => reaction.emoji.name == "💜").users.remove(user.id)
                setTimeout(() => repliedMessage.delete(), 10000);
              })
              .catch();
        }
        else if (reaction.emoji.name == "🖤") {
            const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('THE DRIVER')
            .setImage("https://cdn.discordapp.com/attachments/720470821902090258/979256385919385650/ezgif.com-gif-maker5.png")
            .setDescription(`**Mr. Falcon** is only 17, and doesn't know much about anything. He was hired on as Dr. Mallard's driver because his father and Dr. Mallard were old colleagues, and his father believes Mr. Falcon needed some real world work experience.`);
            channelID.send({embeds: [embed]}).then(repliedMessage => {
                msg.reactions.cache.find(reaction => reaction.emoji.name == "🖤").users.remove(user.id)
                setTimeout(() => repliedMessage.delete(), 10000);
              })
              .catch();
        }
        else if (reaction.emoji.name == "🤎") {
            const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('THE LIBRARIAN')
            .setImage("https://cdn.discordapp.com/attachments/720470821902090258/979453371100573726/ezgif.com-gif-maker6.png")
            .setDescription(`**Mrs. Wren** is in her late 50s, and has worked for the Mallard Manor for the past 30 years. Not only does she know the library like the back of her hand, she knows all the goings-ons of the entire Manor. And then some!`);
            channelID.send({embeds: [embed]}).then(repliedMessage => {
                msg.reactions.cache.find(reaction => reaction.emoji.name == "🤎").users.remove(user.id)
                setTimeout(() => repliedMessage.delete(), 10000);
              })
              .catch();
        }
        else if (reaction.emoji.name == "🤍") {
            const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('THE BUTLER')
            .setImage("https://cdn.discordapp.com/attachments/720470821902090258/979924152041488414/ezgif.com-gif-maker7.png")
            .setDescription(`**Mr. Penguin** is 60 years old, and has worked as a butler in the Mallard household for years. His is always incredibly professional and formal, with immaculate manners.`);
            channelID.send({embeds: [embed]}).then(repliedMessage => {
                msg.reactions.cache.find(reaction => reaction.emoji.name == "🤍").users.remove(user.id)
                setTimeout(() => repliedMessage.delete(), 10000);
              })
              .catch();
        }
        else if (reaction.emoji.name == "❤️‍🔥") {
            const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('THE TEMPTRESS')
            .setImage("https://cdn.discordapp.com/attachments/720470821902090258/979255531757797386/ezgif.com-gif-maker4.png")
            .setDescription(`**Lady Cuckoo** is in her early 50s, and enjoys the lifestyle of the upper crust. She is nearly 10 years younger than her husband Lord Cuckoo, and married more for wealth than for true love.`);
            channelID.send({embeds: [embed]}).then(repliedMessage => {
                msg.reactions.cache.find(reaction => reaction.emoji.name == "❤️‍🔥").users.remove(user.id)
                setTimeout(() => repliedMessage.delete(), 10000);
              })
              .catch();
        }
        else if (reaction.emoji.name == "💘") {
            const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('THE BETRAYED')
            .setImage("https://cdn.discordapp.com/attachments/720470821902090258/980318588487487508/ezgif.com-gif-maker9.png")
            .setDescription(`**Lord Cuckoo** is in his early 60s. He is an incredibly wealthy man due to family wealth, and married a younger woman. However, he himself has accomplished little in his life, and is constantly worried about being compared to his peers.`);
            channelID.send({embeds: [embed]}).then(repliedMessage => {
                msg.reactions.cache.find(reaction => reaction.emoji.name == "💘").users.remove(user.id)
                setTimeout(() => repliedMessage.delete(), 10000);
              })
              .catch();
        }
        else if (reaction.emoji.name == "💟") {
            const embed = new MessageEmbed()
            .setColor('#FF69B4')
            .setTitle('THE BUSYBODY')
            .setImage("https://cdn.discordapp.com/attachments/910649799609581598/979925818031628328/ezgif.com-gif-maker8.png")
            .setDescription(`**Professor Peregrine** is the man next door. Literally! The 40-something year old professor spends more time with his ear to the wall than at the school he supposedly teaches. He wasn't well liked by Dr. Mallard, but he somehow continues to find himself at their doorstep, no matter the situation.`);
            channelID.send({embeds: [embed]}).then(repliedMessage => {
                msg.reactions.cache.find(reaction => reaction.emoji.name == "💟").users.remove(user.id)
                setTimeout(() => repliedMessage.delete(), 10000);
              })
              .catch();
        }
    }
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
            if (message == "mrs. wren" || message == "mrs wren") {
                msg.author.roles.add("979263326565572648")
            }
            if (message == "mr. falcon" || message == "mr falcon") {
                msg.author.roles.add("979263402218237972")
            }
            else {
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
                                                    msg.channel.send(`“Ah!” Peregrine looked back at the bottle. “Indeed, that is very old! I can’t wait to taste some of this wine! Well, perhaps if you are done questioning me, I could take this back home with me. And there is something you need to know. Miss Mallard and her niece were quite close when they were young girls. Almost like siblings. However, they drifted apart when Miss Crane was in college and only recently when Miss Mallard moved away, Miss Crane returned to take care of Dr. Mallard.”\n\nPeregrine gave a saucy wink, and chuckled to himself. “Spicy, isn’t it? Now, if you are done questioning me, I would suggest that you question those rude employees of the Manor, the… Librarian, I believe, Mrs. Wren. Or else that young driver fellow, Mr. Falcon. They were very eager to kick me out last night.”`)
                                                    collector.stop()
                                                }
                                                else if (m.content.toLowerCase() == "i don't know") {
                                                    msg.channel.send(`Peregrine sighed. “Alas, such a pity. Nevertheless I am taking this bottle with me. Now, if you are done, I would like to go and taste this wine. You should probably go talk to the driver, Mr. Falcon. He would likely know more about this terrible business.”`)
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
        }
        if (msg.channel.id == garageID) {
            if (message == "mrs. wren" || message == "mrs wren") {
                msg.author.roles.add("979263326565572648")
            }
            if (message == "miss crane") {
                msg.author.roles.add("979263197905301564")
            }
            else {
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
                                    sleep(5).then(r => {
                                        msg.channel.send(`**The Challenge**\n\nMr. Falcon was clearly tiring of the questions. He slouched in place, and kept shooting back suspicious glances. “How do I even know you’re a real detective, or whatever? Maybe you’re the real killer, and you’re trying to throw suspicions off yourself by saying you’re a detective. Heard that on the radio, one time, that that happened.”\n\nHe gave a half shrug, willfully. “Maybe I’d trust you more if you told me some real cool story. Some sort of super cool detective shit. If so, I’ll tell you everything I know.”`)
                                        msg.channel.send(`https://cdn.discordapp.com/attachments/720470821902090258/979231323237519360/puzzle.png`)
                                        msg.channel.send(`\`You have unlimited tries until you get the right answer or you say "I don't know". Good luck.\``)
                                        countingModel.findOneAndUpdate({name: "k2"},
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
                                                if (m.content.toLowerCase() == "photograph") {
                                                    msg.channel.send(`“Whooooa.” Mr. Falcon had given up on pretending to be cool, staring with open-mouthed awe. “Okay, that’s a cool story. You’re a real detective, for sure. I knew that. Always did.”\n\nHe sat up and ran a hand through his hair. “Okay, so like, this is all on the down low, right? But I heard that last night, Dr. Mallard had that yelling match with his daughter – Miss Mallard – And he threatened to take her out of his will for good. But that means, like, he hadn’t taken her out before. So if he died before he did that – which he did – she’d be the first in line for the money, right?”\n\nMr. Falcon leaned back, grinning as if he had just solved the entire case. “I mean, I’m not saying anything. But ever since I’ve been working here, I haven’t heard her name being mentioned, like, EVER. Dr. Mallard would always go all red in the face, and anything that was said was always said in whispers. And she came at a reaaaaalllly suspicious time, didn’t she? Showed up, boom, he’s dead.” He shrugged. “Not sayin’ nothin’. But if I was, my bet would be on her.”\n\nWith the gossip aside, he realized maybe the detective would want to talk to people beside himself. “I guess you might wanna talk to more people. Maybe try Mrs. Wren? Or Miss Crane? They’re both really smart. I bet they know something. Good luck, though, detective. You’re the realest out here, you know?”`)
                                                    collector.stop()
                                                }
                                                else if (m.content.toLowerCase() == "i don't know") {
                                                    msg.channel.send(`“Ahhh, you almost got me. Answering those other questions like a schmuck.” Mr. Falcon folded his arms. “That was a shit story. You probably read that in some sort of penny detective novel. Nah, man, I don’t believe it for a second. If you really want to ask someone, talk to Mrs. Wren. Or else just leave. Fake detectives aren’t worth my time.”`)
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
        }
        if (msg.channel.id == loungeID) {
            if (message == "the study" || message == "study") {
                msg.author.roles.add("980877815325003846")
            }
            else {
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
                                    sleep(5).then(r => {
                                        msg.channel.send(`**The Challenge**\n\nThe professor fidgets with his pockets and produces a small scrap of paper with scrawled writing on. He looks down a little surprised, and then smiles.\n\n“Oh, detective. Would you mind helping me solve something? I figure that’s in your skill set,” he asks, raising the scrap of paper. “Dr. Mallard often gave me book suggestions, things he thought I’d find interesting. But he had the most terrible of doctor’s handwriting, see? It was always a task to figure out what in God’s name he was trying to tell me, most of the time I’d have to break down and ask him. But since… Well, that’s not an option anymore… Maybe you could help me out a bit?”\n\nHe allows the detective to take the scrap from his hand and lets out a small, relieved sigh when the detective agrees to help.`)
                                        msg.channel.send(`https://cdn.discordapp.com/attachments/720470821902090258/979232716509835264/puzzle.png`)
                                        msg.channel.send(`A game of chess is in progress. The players are apparently beginners but are eager to learn and are noting down their moves. Here is a part of the game:\n\n……………..,D3-QD8, ND5-xD3,QD2-NxD5,BE2-NE3,............\n\nWant a hint? || D3,D8,D5,D3,D2,D5,E2,E3 ||\n\nNeed a second hint? || 43,48,45,43,4B,45,52,53 - hexadecimal ASCII code ||`)
                                        msg.channel.send(`\`You have unlimited tries until you get the right answer or you say "I don't know". Good luck.\``)
                                        countingModel.findOneAndUpdate({name: "k3"},
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
                                                if (m.content.toLowerCase() == "checkers") {
                                                    msg.channel.send(`Professor Cuckoo’s eyes well up slightly, and he looks away from the detective. “Sorry, it’s just… Thank you, really detective. This means a lot to me, to know his last little message to me. I appreciate your help.”\n\nHe takes the scrap back and takes a few deep steadying breaths, preparing himself for some kind of confession.\n\n“Listen, detective… You’re crafty, clearly, you pick up on the details. So this probably doesn’t come as a giant surprise, but me and Dr. Mallard were, well, we were a little more than friends.” His hands clench nervously, meeting the detective’s eyes for a moment before staring back down at the scrap. “Sorry, it’s just that you’re the first person I’ve told. Ever, really. I wish that wasn’t the truth but, well, Mallard just wasn’t comfortable being out. He was raised in the kind of environment that just beat self hatred into him, told him it was shameful… But we really had something. I could see him coming out of his shell, slowly but surely, shedding all those barriers. If anyone had known the real him, the doctor I knew, they would know how much he changed.” The professor wipes away tears, sniffles a little, but he looks more stable now that he’s put the truth out there. “Of course, what happened with his daughter… I was devastated , I felt like we had been set back to square one again. All of that fear just welled up in him and he shut down. I think he was afraid that it was his fault that she was a ‘deviant’, like he hadn’t raised her like a good straight man would. But that came out as anger towards her instead.” He shakes his head slowly.`)
                                                    msg.channel.send(`“If you ask me? I have no idea who would do this to my dear doctor. People hated him, sure, the facade he put up… but his cancer was taking him over. I don’t understand why they’d decide to kill a dying man, if they wanted him out of this world. I can only hope you’ll figure this all out. I think I trust you to do it, though,” the professor nods, and suddenly looks up. “You know what? If you do figure things out, you should go over to the study. That’s all I can think of. Sorry if I wasn’t much help, you know, and sorry for dumping all this on you, but… Just, solve it for me, won’t you? I think its time for you to go to the **Study**.\n\nProfessor Cuckoo gives the detective a sad smile and shakes the man’s hand again. He slowly sits down on the nearest chair in the lounge, exhausted but with a chest much lighter from secrets.`)
                                                    collector.stop()
                                                }
                                                else if (m.content.toLowerCase() == "i don't know") {
                                                    msg.channel.send(`The professor frowns, taking back the scrap of paper quickly.\n\n“No, I don’t think so. Sorry, I just thought,” his frown deepens and he clears his throat, buttoning up his cardigan. “Well, I thought you might actually have the skills to solve something like this. I just hope you’ll solve my friend’s murder a little more easily than a simple case of quick hand, but maybe you’re not really much of a detective.” He looks the detective up and down and narrows his eyes. “Who hired you, anyways? I hope you’re an actual professional and not just some hack who believes all the lies about Dr. Mallard being a ‘horrible person’ or whatever the others here have told you. Bias is a terrible thing, you know.”\n\nThe professor folds up the scrap of paper carefully, fingers shaking a little now. “Just… go and do some REAL detective work, alright? There’s at least one person here who actually cares, so don’t think you can slack off. Go to the **Study** and leave me along!”\n\nHe seems too angry now to answer any further questions.`)
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
        }
        if (msg.channel.id == libraryID) {
            if (message == "miss crane") {
                msg.author.roles.add("979263197905301564")
            }
            if (message == "professor cuckoo") {
                msg.author.roles.add("979263070805323817")
            }
            else {
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
                                sleep(5).then(r => {
                                    msg.channel.send(`**The Challenge**\n\nMs. Wren inhaled suddenly and deeply, laying her hands flat on the desk as though bracing to stand and be done with all of this. “Well, it's about bedtime for Fernando,” The morning light beamed across the carpet, significantly. Fernando was still as taxidermied as ever. “So we'd better be — what's that, my dear? You'd like a bedtime story first?” She angled her head. “Oh, come now, you’ve read that one about a million times. No, Ms. Crane already checked that one out, I told you that.”\n\nThere was a stretch of silence as she pat Fernando atop the head placatingly. “Oooh!” With an unreadable smile, she lifted her gaze to meet the eyes of the only other living entity in the room. “I suppose the nice detective could make our choice for us. That's fresh. What say you, detective?” Her dark eyes bore into them.`)
                                    msg.channel.send(`https://cdn.discordapp.com/attachments/887018748945514649/979230164070309958/Wpuzzle3.png`)
                                    msg.channel.send(`\`You have unlimited tries until you get the right answer or you say "I don't know". Good luck.\``)
                                    countingModel.findOneAndUpdate({name: "k4"},
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
                                            if (m.content.toLowerCase() == "that hits the spot") {
                                                msg.channel.send(`Ms. Wren flipped the offered book around in her hands. A smile stretched across her lips and her eyebrows twitched with some modicum of approval. “Dan Brown…The Lost Symbol… hmm fitting. Do you fancy yourself a Robert Langdon sort, detective?” She gave them another subtle look up and down like she was analysing their very soul. “This investigation should be a breeze for you, then.”\n\nShe seated herself again with the book and Fernando, propping it open on her knees. “Speaking of hidden details! I'm sure you’ve already heard of Dr. Mallard’s… dalliance.” She started casually, gauging the detective's expression as she wet her index finger and flipped a page.\n\n“But did you know that beast Lord Cuckoo had got his knickers twisted for all the wrong reasons? It wasn't his wife who'd been pussyfooting around with the Dr. behind his back, but his very own brother!” She burst into a short and slightly forced bout of laughter. “Everyone presumed it was the Lady. I mean, she's just got that atmosphere about her, doesn't she? No disrespect, I'm sure she's a fine woman, aside from her taste in men, very well endowed. And Dr. Mallard would wreck a thousand homes before he felt a tinge of remorse.”\n\n“Well, I even thought so myself about the Lady, until I caught the pair, Dr. Mallard and Professor Cuckoo, defiling that very aisle over there,” she pointed, “contesting to see who could reach the other’s throat with their tongue first.” Her knuckles tinged with white around the book as she let that sit for a beat. “Isn't that the funniest thing?” She didn't sound like she found it very funny. “All that outcry from Dr. Mallard about his daughter and her love, and yet…” She trailed off with a sigh. “Anyhow. What a ghastly little pairing. All the more horrible for its sheer sanctimony.”`)
                                                msg.channel.send(`“But it makes you think, doesn't it? About that sad wretch Lord Cuckoo. Where his thoughts on the situation may have strayed and perhaps led to… actions? Of course, you and I know the truth about Dr. Mallard’s dalliance, but Lord Cuckoo has always been physically unable to extract his visage from his ass long enough to see beyond it. Thinks the whole entire world is after him. Why, the man’s wrought like a neurotic chihuahua, and sturdy as a plastic fork. Who's to say Dr. Mallard wasn't the tough steak to his plastic fork? Who's to say he didn’t… snap, perhaps, take matters with Dr. Mallard into his own hands? Now there's something to think about.”\n\nThere was a long and significant stretch of silence, save for the sound of pages being turned. Fernando was apparently a very fast reader.\n\n“Well, I hate to cut this short, but I’m afraid that's all I can offer you today, dearie. If you want the whole good truth, I recommend you consult Miss Crane.” She flipped another page. “Or even that poor sap Professor Cuckoo, if you'd like to know more about the affair. God knows, I'd want to know what was going through his sap mind during *that* entire ordeal.” She gave a shudder, and Fernando jumped in her lap.\n\n“See ya,” she singsonged without lifting her gaze from the book, wiggling her fingers, “wouldn't wanna be ya.”`)
                                                collector.stop()
                                            }
                                            else if (m.content.toLowerCase() == "i don't know") {
                                                msg.channel.send(`Ms. Wren traced a finger over the title of the offered book, which was gilded in gold lettering. *Great Expectations*. She didn't seem at all very moved. “Ah, the Dickens. It's in the name, really, isn't it? Foreseeable. But I suppose it'll do!”\n\n“Will that be all for today? Yes? Brilliant. Lovely chatting with you, dear. Mm. Do send my regards to Miss Crane, if you can.” She seated herself again, lifting the book in front of her face with an air of finality, and acknowledged the detective’s presence in the room no more.`)
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
        }
        if (msg.channel.id == diningroomID) {
            if (message == "miss mallard") {
                msg.author.roles.add("979262714406903808")
            }
            if (message == "colonel kestral") {
                msg.author.roles.add("979263158805999666")
            }
            else {
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
                                sleep(5).then(r => {
                                    msg.channel.send(`**The Challenge**\n\nMr. Penguin stood, and strolled to the side, pulling out silverware. “Detective, I appreciate that you have a job to do, but I do, as well. This is taking a lot of time and it doesn’t change the fact that the Dr is deceased and luncheon must still be served. I have never once been less than punctual. So - if you can tell me how to properly set the table - with three forks in use - and help me set it, then I will tell you what I know. “`)
                                    msg.channel.send(`https://cdn.discordapp.com/attachments/720470821902090258/979233647792095232/puzzle.png`)
                                    msg.channel.send(`\`You have unlimited tries until you get the right answer or you say "I don't know". Good luck.\``)
                                    countingModel.findOneAndUpdate({name: "k5"},
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
                                            if (m.content.toLowerCase() == "draperies") {
                                                msg.channel.send(`Mr. Penguin overlooks the detective’s work. He’s a professional man, but his surprise and approval still showed through. “Well, well. It seems you had a decent upbringing. Perhaps better than my dear  - er Miss Mallard. Things were alright when Mrs Mallard was still alive . .more or less. She had the most musical laugh, the Missus did. Of course, it was heard less and less as time went by. I’m not not one to speak out of turn, but the Dr was not much of a healer, in my opinion. His bile was turned to his daughter soon enough and it got bad enough that he threw her out - banished her, when she was a mere 22. Such a strong will and beauty . .like her mother . . Ahem. The ‘Good Dr’ even threatened to remove her as his heir. Though I don’t recall the lawyer ever coming here.  She worked for everything, paid for all she needed herself. Miss Mallard has not expected anything from her father, what other reason would she have to even come back here but to reconcile?\n\nAs I’m thinking, I do recall that as I left the study and as returning to the Dining Hall . or kitchen, I can’t remember which, I passed Lord Cuckoo going in the other direction. TOWARDS the study. Normally I would have assisted him in finding the facilities, but I was - upset. The Dr attempting . . to make ME throw his daughter out for the second time! I was not thinking clearly. I simply went and did my duties. Perhaps I . . well, the Dr and Lord Cuckoo have had many arguments the last month. Yelling at each other in the study. I could not say what they were talking about. I would have thought they were chums, as the Cuckoos have been practically living here lately. In all honesty, I would not put it past Lord Cuckoo to do something as vicious as this. Like to like, I say and the Dr and Lord Cuckoo were two of a kind!”\n\nHe shook his head. “Miss Mallard is innocent. I KNOW it. Go speak to her, or even Colonel Kestral, and you’ll be satisfied.”`)
                                                collector.stop()
                                            }
                                            else if (m.content.toLowerCase() == "i don't know") {
                                                msg.channel.send(`Mr. Penguin watched the detective coldly. “What a shame. Not surprising these days, but people don’t take the time to learn the important things. Just as I have nothing more to say to you. Excuse me, Sir, but I must make sure the silver is polished and the table set. Speak to Miss Mallard, if you really must continue to bother the household. Good day.”`)
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
        }
        if (msg.channel.id == conservatoryID) {
            if (message == "professor peregrine") {
                msg.author.roles.add("979263235289124885")
            }
            if (message == "mr. falcon" || message == "mr falcon") {
                msg.author.roles.add("979263402218237972")
            }
            else {
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
                                sleep(5).then(r => {
                                    msg.channel.send(`**The Challenge**\n\n"I should tell you, no one's really bothered by this all. We were all prepared for the eventuality. Not this means, perhaps. The real secret is that the lawyers just don't want to give up any of the money. If you really want to be helpful, you can deadhead the petunias over there." He gestures to several clumps of bright pink flowers in the raised bed across from them.`)
                                    msg.channel.send(`https://cdn.discordapp.com/attachments/720470821902090258/979232185586442250/puzzle.png`)
                                    msg.channel.send(`\`You have unlimited tries until you get the right answer or you say "I don't know". Good luck.\``)
                                    countingModel.findOneAndUpdate({name: "k6"},
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
                                            if (m.content.toLowerCase() == "vase") {
                                                msg.channel.send(`"I used to plant flowers for the Misses when they were little girls, you know," Jay says softly. "Petunias were for Miss Crane. They need a little extra nurture and care, but they can be the centerpiece of any garden." He brushes a finger over the soft petals. "She's really come into her own. I was concerned when she started acting as Mistress of the household, but she has such a kind spirit about her and equally as wise. Some young folk would try to prove they're in charge, try to change the way things work for that feeling of power. Especially young ones raised by.... Not Miss Crane, of course. She understands there are systems in place and does her best to accommodate to them. She even takes advice from some of us old fogeys. Mrs. Wren, the house librarian, is really quite lovely towards Miss Crane. The two of them are practically connected at the hip at times. She's a sweet girl, Miss Crane and Miss Mallard both. They're dealing with the loss of the man who raised them. You just let be."\n\nJay shakes his head. "If you're looking for the suspicious-- look at the man who wormed his way into Dr. Mallard's life. That Professor Cuckoo has been spending a lot of time with the Doctor as of late with enough secret rendezvous to make you question the way he treats his daughter. Or, all the better, that nosy Professor Peregrine. Can't keep the man from trampling my creeping pholx with all the windows he looks through. Why don't you give him a run for his money?"`)
                                                collector.stop()
                                            }
                                            else if (m.content.toLowerCase() == "i don't know") {
                                                msg.channel.send(`"For the love of all things good, stop," he brushes the detective away. "Some detective, hm. Those aren't even petunias. I knew I should've just done it myself. That's the saying anyway, isn't it? Are you finished asking your questions? You sound like that nosy Professor Peregrine. Can't keep the man from trampling my creeping pholx with all the windows he looks through. Why don't you give him a run for his money?"`)
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
        }
        if (msg.channel.id == kitchenID) {
            if (message == "professor cuckoo") {
                msg.author.roles.add("979263070805323817")
            }
            else {
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
                                sleep(5).then(r => {
                                    msg.channel.send(`**The Challenge**\n\nMiss Crane’s stomach growled after answering the questions, and she glanced over at the hanging wall clock. She had missed breakfast already, and soon she would be missing lunch too.\n\n“I’m feeling a bit peckish, Detective.” She stated simply before moving to stand from the table. “Normally Ms. Gannet cooks all the meals for the family and staff, but since she isn’t here right now, I’m wondering what sort of culinary skills you might have.” Miss Crane smiled while she moved over to the stove where the pots and pans from this morning were still waiting to be used.\n\n“I can make a decent cup of tea, but I’m afraid cooking has always eluded me. Surely being a detective isn’t all you know how to do.” She gives him a coy glance. “Come now, I’m in the mood for some eggs benedict. Let’s see what you’ve got when it comes to working a hot pan and a spatula.”`)
                                    msg.channel.send(`https://cdn.discordapp.com/attachments/887018748945514649/979230164435238942/Wpuzzle2.png`)
                                    msg.channel.send(`\`You have unlimited tries until you get the right answer or you say "I don't know". Good luck.\``)
                                    countingModel.findOneAndUpdate({name: "k7"},
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
                                            if (m.content.toLowerCase() == "around the clock") {
                                                msg.channel.send(`Miss Crane blinked in a bit of surprise at how well the food came out. It looked more than edible, and when she took a bite, it tasted even better! She was very impressed by the detective’s skills in the kitchen and now harbored a sizable amount of respect for the man. “This is really delicious.” She put the fork down and looked at the detective. Her tone and expression became serious again.\n\n“You know…my Uncle really wasn’t a good man. I found out that he was blackmailing Ms. Gannet into taking far less pay than she deserved because her mother is in the country illegally.” She picked the fork back up and pushed around the eggs on her plate. “He was actually underpaying most of the staff here even though he could afford to give them a better wage.”\n\nMiss Crane took another deep breath and let it out slowly. “I don’t want to be the sort of person who points fingers, but there’s something about Mr. Peregrine that doesn’t sit right with me. He’s always sticking his nose where it doesn’t belong so he can involve himself in whatever’s going on. He doesn’t invite himself over often, but it was just really odd how he inserted himself into that dinner last night too, out of any night he could have done so. Ms. Gannet even told me that she caught him trying to sneak back into the house the night before. What was he doing? I wouldn’t trust a word that comes out of his mouth.” She shakes her head.\n\n“I’m sure others know more than me. You should try speaking to Professor Cuckoo if you haven’t already.”`)
                                                collector.stop()
                                            }
                                            else if (m.content.toLowerCase() == "i don't know") {
                                                msg.channel.send(`When the contents in the pan turned out more burned than anything even remotely edible, Miss Crane scoffed. “If I wanted charred eggs, I would have made it myself.” She started to clean up the mess around the man. “I’ve answered all your questions, Detective. That’s everything I know.” She seemed impatient with his presence now as she quickly dumped the spoiled food in the bin.\n\n“You should go talk to Professor Cuckoo. He was close with my Uncle and probably one of his only friends. I bet he knows a thing or two about what happened.”\n\nShe moved over to the sink and turned on the faucet to begin washing the dishes with finality. It was clear she was finished with this conversation.`)
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
        }
        if (msg.channel.id == billiardroomID) {
            if (message == "miss gannet" || message == "ms gannet" || message == "ms. gannet") {
                msg.author.roles.add("979263354663227442")
            }
            if (message == "lady cuckoo") {
                msg.author.roles.add("979263137108873256")
            }
            else {
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
                                sleep(5).then(r => {
                                    msg.channel.send(`**The Challenge**\n\nLord Cuckoo paced the room, unhappy with the line of questioning. He stopped by every little detail, finding faults with everything. The stained curtains, the missing hunting rifle, the crooked wall sconce. He drew to a billiard table, and stopped. “Alright, ‘detective’. You want answers from me, don’t you? You’re such a dog shit detective you think that I’ll just – Stop, drop, and roll for you as soon as you give the word. But what you’re accusing me is a real crime, and I don’t take lightly to that.”\n\nHe rolled up his sleeves, and gestured to the billiards game. “Play me. Play me like a real man, and if you can beat me, I’ll tell you as much as I know. You’ll see that I didn’t do this, and you can get on with your day. And if you can’t beat me, if you’re too weak – Fucking leave me alone and find some real fucking information elsewhere. I can’t tolerate losers.`)
                                    msg.channel.send(`https://cdn.discordapp.com/attachments/659568958789124126/979208343128244234/LHGZ_ZGHL_HGZL_GHZL_.png`)
                                    msg.channel.send(`\`You have unlimited tries until you get the right answer or you say "I don't know". Good luck.\``)
                                    countingModel.findOneAndUpdate({name: "k8"},
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
                                            if (m.content.toLowerCase() == "stop") {
                                                msg.channel.send(`Lord Cuckoo drew back from the billiard table, eyebrows high. He offered his hand to shake. “Well, I think I misjudged you, detective. That was some damn good playing. Fine, okay, what do you want? Information?”\n\nLord Cuckoo leaned against the table and considered. “I didn’t go straight home, like I said I did. After that bastard blew up on his own daughter, he made eyes at my wife, and went off to his office, like he was expecting her to follow. She was terribly upset about the whole thing, and a gentleman defends his woman’s honor. So I go down to his office to give him a piece of my mind.”\n\nLord Cuckoo shrugged, struggling to hide a disgusted sneer. “He's been trying to have his way with my wife for YEARS. So I spoke to him, bluntly, and let him know in no uncertain terms is has to stop. He tries to laugh it off, deny it – Even called the Lady names. Ugly. Deflated. As if he hasn’t been oogling her all night!” Lord Cuckoo seethed. “Well, yeah, maybe I hit him, or whatever. But I never killed him. I collected Professor and Lady Cuckoo, and we left, dignity intact. Whatever happened to him was far after I spoke with him. In fact, I think I even passed someone as I came out of the study. Whoever that was, they can tell you. I had nothing to do with any of it.”\n\nHe straightened, suddenly. “I know how it all sounds, right? But it wasn’t me. Hell, I think he deserved it, and I’d like to shake the hand of the man who took that shot. If I had to guess? Probably the butler. Can’t imagine working for that pig. And it’s always the butler whodunnit, isn’t it?”\n\nHe let out a barking laugh. “You want more information? Talk to that cook, Gannet. Or, hell, even my wife, Lady Cuckoo. Women in the kitchen always hear all the whispers, don’t they?”\n\nHe gave a half-hearted salute. “You’re not all bad, detective. Best of luck with things.”`)
                                                collector.stop()
                                            }
                                            else if (m.content.toLowerCase() == "i don't know") {
                                                msg.channel.send(`Lord Cuckoo pulled back as he won, not even attempting to hide his cocky smirk. “Ah, too bad, detective. If you even are one.”\n\nHe leaned his billiard cue against the table. “I don’t really think there’s much more for us to say to one another, is there? You’re an even worse detective than you are a billiard player, and no matter what I say to you, its not going to help you, since I didn’t. do. It.” Lord Cuckoo waved his hand in a universal ‘shoo’ motion. “Look, if you want to bother someone, go bother that cook, Gannet. But I don’t have time to humor the likes of you.”`)
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
        }
        if (msg.channel.id == ballroomID) {
            if (message == "mr. jay" || message == "mr jay") {
                msg.author.roles.add("979263378587537449")
            }
            if (message == "professor peregrine") {
                msg.author.roles.add("979263235289124885")
            }
            else {
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
                                sleep(5).then(r => {
                                    msg.channel.send(`**The Challenge**\n\nAs Lady Cuckoo finishes up her last string of words, the music playing in the ballroom shifts to an upbeat waltz. Excitement immediately flares in her facial expression and she turns away from the detective, flitting over to the dance floor. Soon, she’s off in her own world, humming to herself as she completes the steps to a waltz that seem to be from years of preparation. Despite her carefree nature, the steps are practiced and detail-oriented as she places her feet purposely. Her heels do nothing to hinder her, only acting as punctuation to her marked steps with each click and clack they produce.\n\nSuddenly, her eyes pop open and her dress dramatically swishes as Lady Cuckoo turns to stare down the detective with a mischievous grin. The woman practically teleports in front of the detective, offering one gloved hand to the man’s shoulder and the other to his waist. “The ultimate test of class. Of high living. If you really belong here, solving this case with people wearing underwear worth tens of thousands of dollars alone, then a dance should be nothing to you. Right?” She winks and whisks him off onto the floor, leaving him to fend for himself against Lady Cuckoo and the music.`)
                                    msg.channel.send(`Blog song here: https://g.co/arts/WYVLiycaMTetnpub9`)
                                    msg.channel.send(`\`You have unlimited tries until you get the right answer or you say "I don't know". Good luck.\``)
                                    countingModel.findOneAndUpdate({name: "k9"},
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
                                            if (m.content.toLowerCase() == "beehive") {
                                                msg.channel.send(`The music slowly fades away into nothingness and the only sound left to fill the room is Lady Cuckoo breathing heavily. She raises her eyebrows in appreciation and perhaps something more, gazing into the detective’s eyes as she regains her breath. “Maybe I will follow up with you after this, after all. You’re a far better dance partner than my husband - don’t tell him,” she reveals, giggling. Despite the jokes, however, something… sadder hides behind her eyes.\n\nThe woman drops the detective’s hands, sighing. “I know I’ve been awfully nice so far, but I do miss him. Even if he was a bit creepy. He was always a little bit obsessed with me and my family, including my husband and his younger brother. Would you believe that he almost never talks to Lord Cuckoo? I mean, you’d think he’d be interested in getting to know us both, but he’s still over at my house and inviting me over as if the man doesn’t even exist.” Lady Cuckoo shakes her head, tsking. “At least he was friends with Professor Cuckoo. But… truth be told, I think he was only ever in it for the drama. Gave him some sort of energy or whatever.”\n\nShe looks out onto the floor one last time before refocusing on the detective. “If you’d really like to know… you want a lead? That girlfriend of Miss Mallard has been nothing but trouble. I heard she marched right into Dr. Mallard’s manor, pushed her little lifestyle onto everyone that lived there, and didn’t even try to be discreet. Everyone and their brother knew how much that Colonel hated Dr. Mallard, that’s for sure. Then she comes to the manor anyways for this dinner, and now he’s dead?” Lady Cuckoo rolls her eyes, frowning. “Yeah, sure. You tell me that’s a coincidence. But if you want more information, you ought to reach out to Mr. Jay or Professor Peregrine. They’ve got the juiciest drama around here.”`)
                                                collector.stop()
                                            }
                                            else if (m.content.toLowerCase() == "i don't know") {
                                                msg.channel.send(`“My SHOES!!” Lady Cuckoo wails, the music quickly drowned out by her banshee screams. “Do you know how much you’ve just COST me, you peasant? These are one-in-a- kind shipped directly from Paris! A single scuff on them diminishes the value by a trifold, let alone all of your stomp marks! They ought to ban you from every dance floor in the WORLD with those left feet of yours!!” She daintily lifts one of the heels from her feet to examine them and lifts the back of her hand to her forehead. “Oh! I just think I’m going to be faint.”\n\nThe woman’s demeanor entirely shifted, Lady Cuckoo looks at the detective as though he were a piece of gum on the bottom of a desk. “I’ll fax my lawyer’s information in three to five business days. In the meantime, if you want to go bother someone else, go find Mr. Jay. Maybe he’ll be more *forgiving* to such careless mistakes.” Lady Cuckoo lifts her nose up into the air and struts off, hastily putting distance between herself and the detective in the lengthy ballroom.`)
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
        }
        if (msg.channel.id == thestudyID) {
            if (!message.includes("miss crane")) {
                if (message.includes("professor peregrine")) {
                    msg.channel.send(`The man laughed as all the eyes went to him, then paused, looking for the detective to go on. When there was no next accusation, Professor Peregrine began to scoff. “What, me? You think - What?!” From the door, several police officers entered, and began to cuff Professor Peregrine’s hands behind his back. The rest of the suspects stood aside, no one raising a hand to help him. “You can’t! I know I snuck back in, but - I didn’t do it! You have the wrong man! You - You’re WRONG! Someone tell this - This IDIOT how wrong he is! You can’t arrest me!”\n\nThe cops pulled Professor Peregrine away. The detective felt as if there was something… off about his reaction. Maybe a few details had slipped past, the first time. Was Professor Peregrine really the killer at all?\n\n**The server will reset in 1 minute**`)
                }
                else if (message.includes("professor cuckoo")) {
                    msg.channel.send(`Professor Cuckoo stared at the detective, speechless. His face grew pale, and his hands shook. “You thought I killed - You thought -” He made a distressed sound and backed away a few steps, until his back hit the wall. “I would never. I would never kill Robert.”\n\nSeveral police officers entered, and began to cuff Professor Cuckoo’s hands behind his back. The man looked desperately between Miss Mallard and Lord Cuckoo. “Please. Please believe me. I loved him. I would never kill him. Please. Please, you have to understand. There’s been some kind of misunderstanding.”\n\nThe cops pulled Professor Cuckoo away. The detective felt as if there was something… off about his reaction. Maybe a few details had slipped past, the first time. Was Professor Cuckoo really the killer at all?\n\n**The server will reset in 1 minute**`)
                }
                else if (message.includes("ms. gannet") || message.includes("ms gannet")) {
                    msg.channel.send(`Ms. Gannet had been hard to get into the Study to begin with, and at the accusation, she began to laugh. “Of course. Of course, I’m about to escape all this, and - This was part of his plan, wasn’t it? Mallard could never let me escape his grip.”\n\nSeveral police officers entered, and began to cuff Ms. Gannet’s hands behind her back. She was shaking with nerves, but managed to spit at the detective’s feet. “I was just trying to provide for my family. This whole time, I was just doing what was right for them. I didn’t kill your rich ass white man. But now? I wish I had.”\n\nThe cops pulled Ms. Gannet away. The detective felt as if there was something… off about her reaction. Maybe a few details had slipped past, the first time. Was Ms. Gannet really the killer at all?\n\n**The server will reset in 1 minute**`)
                }
                else if (message.includes("mrs. wren") || message.includes("mrs wren")) {
                    msg.channel.send(`Mrs. Wren let out a gail of laughter. “Oh, so you’re just a bad detective. What a pity, I had quite hoped you might be good. Or at least interesting.”\n\nSeveral police officers entered, and began to cuff Mrs. Wren’s hands behind her back. Mrs. Wren let them, cheerfully, not too concerned about just being accused of murder. “You know, detective, there’s something so special about knowledge. The more you have, the closer you come to the truth. And you, silly boy - Well, you have lots more to learn.” She tried to reach out and touch his face, but the handcuffs prevented her. She frowned. “Come find me when you’ve learned. I can help you. And Miss Crane?” She called to the pale-faced woman as she was being led away. “No, dear, don’t cry. Just make sure to watch out for Fernado until I get back, alright?”\n\nThe cops pulled Mrs. Wren away. The detective felt as if there was something… off about her reaction. Maybe a few details had slipped past, the first time. Was Mrs. Wren really the killer at all?\n\n**The server will reset in 1 minute**`)
                }
                else if (message.includes("mr. penguin") || message.includes("mr penguin")) {
                    msg.channel.send(`For the first time since the detective’s arrival, Mr. Penguin looked slightly unraveled. Miss Mallard reached for him immediately, and he waved her away. “Surely there’s been a mistake.” He looked over to the detective, pulling himself straighter. “I know there’s a joke about it ‘always being the butler’, but I thought so much better of you, dear man. I would never do this.”\n\nSeveral police officers arrived, and began to cuff Mr. Penguin’s hands behind his back. Miss Mallard protested, trying to pull them off of him, but Mr. Penguin stood firm, and let it happen. “I’ve worked in this manor for the past 30 years. I would never kill anyone. You’ve made a horrible mistake.”\n\nThe cops pulled Mr. Penguin away, while Miss Mallard sobbed, and Colonel Kestral held her. The detective felt as if there was something… off about his reaction. Maybe a few details had slipped past, the first time. Was Mr. Penguin really the killer at all?\n\n**The server will reset in 1 minute**`)
                }
                else if (message.includes("mr. jay") || message.includes("mr jay")) {
                    msg.channel.send(`The older man stared, in disbelief, at the detective. “Me? I’m sorry, my hearing is starting to go. I thought you said that - I had killed him?”\n\nSeveral police officers entered, and began to cuff Mr. Jay’s hands behind his back. Miss Crane let out a gasp of horror and tried to bat the cops away from the older man. “Please. I’ve only been tending to the gardens. I wouldn’t kill Dr. Mallard. I would never kill anyone.” Mr. Jay tried to take a step toward, the detective, but the cops forced him back. “Please.”\n\nThe cops pulled Mr. Jay away. The detective felt as if there was something… off about his reaction. Maybe a few details had slipped past, the first time. Was Mr. Jay really the killer at all?\n\n**The server will reset in 1 minute**`)
                }
                else if (message.includes("mr. falcon") || message.includes("mr falcon")) {
                    msg.channel.send(`Mr. Falcon began to laugh, before he saw everyone staring at him. “Whoa. Wait, hang on a second, this isn’t cool. Are you being, like, for real right now?”\n\nSeveral police officers entered, and began to cuff Mr. Falcon’s hands behind his back. The kid began to panic, trying to wiggle away as he hyperventilated. “This isn’t cool! I’m 17! I’m not a killer! I - Don’t touch me! My father will hear about this!”\n\nThe cops pulled Mr. Falcon away as he blubbered like a child. The detective felt as if there was something… off about his reaction. Maybe a few details had slipped past, the first time. Was Mr. Falcon really the killer at all?\n\n**The server will reset in 1 minute**`)
                }
                else if (message.includes("miss mallard")) {
                    msg.channel.send(`Miss Crane and Colonel Kestral immediately made disbelieving sounds, and Kestral threw her arms around Miss Mallard to protect her, but Miss Mallard just stared at the detective in quiet shock. Finally, when she found her voice, she whispered, “you - you think I killed my own father?”\n\nSeveral police officers entered, and began to cuff Miss Mallard’s hands behind her back. Colonel Kestral actually fought the first officer off, but Miss Mallard calmed her and offered her hands up. “It’s okay, my love. I’m sure - I’m sure this is all a big misunderstanding. I’m sure it’ll - Be settled.”\n\nThe cops began to pull Miss Mallard away, but she turned one last time to the detective. “I didn’t do this. You have to understand that. Sometimes I hated him, but I would never kill my own father. You - You have to keep looking. You have to find who really did this.” She was pulled away. The detective felt as if there was something… off about her reaction. Maybe a few details had slipped past, the first time. Was Miss Mallard really the killer at all?\n\n**The server will reset in 1 minute**`)
                }
                else if (message.includes("lord cuckoo")) {
                    msg.channel.send(`Lady Cuckoo was the first to react, unable to hide a laugh. Professor Cuckoo made a sound of distress, but Lord Cuckoo kept getting redder and redder. “I can’t - You - You DARE accuse me?”\n\nSeveral police officers entered, and began to cuff Lord Cuckoo’s hands behind his back. He fought them away best he could, until they overpowered him. “I’m Lord Cuckoo! I come from money! I’m - I’m more important than any of you will ever be. You can’t - Get your hands off me, you scum!”\n\nThe cops pulled Lord Cuckoo away. The detective felt as if there was something… off about his reaction. Maybe a few details had slipped past, the first time. Was Lord Cuckoo really the killer at all?\n\n**The server will reset in 1 minute**`)
                }
                else if (message.includes("lady cuckoo")) {
                    msg.channel.send(`Lady Cuckoo’s eyebrows raised. Professor Cuckoo let out a sound of distress, but Lady Cuckoo just let out a small laugh. “Of course. All this drama, all this gossip and you accuse _me_ . You truly are an idiot, aren’t you?”\n\nSeveral police officers entered, and began to cuff Lady Cuckoo’s hands behind her back. Lord Cuckoo attempted to fight a few of them off, but Lady Cuckoo didn’t fight. “You know, I never slept with him,” she addressed the entire room. “Everyone talks. They claim I’m some sort of cheat, or a slut. That’s why you accused me, isn’t it? You think I was having an affair?” She let out a patronizing laugh. “You men are all the same. Everything is about sex to you. I didn’t do it. Any of it. You’ll see.”\n\nThe cops pulled Lady Cuckoo away. The detective felt as if there was something… off about her reaction. Maybe a few details had slipped past, the first time. Was Lady Cuckoo really the killer at all?\n\n**The server will reset in 1 minute**`)
                }
                else if (message.includes("colonel kestral")) {
                    msg.channel.send(`As soon as her name was called, Miss Mallard let out a note of alarm, and threw her arms around Colonel Kestral. Kestrel herself just pulled herself straighter, staring at the detective with burning eyes. “Me? You think - _I_ did it?”\n\nSeveral police officers entered. Colonel Kestral growled at one, who cowered, but in general she allowed them to cuff her hands behind her back. “I hated him. He was an awful person, and what he did to Andrea was horrible. But he wasn’t worth my time.” She twisted to look around the room. “None of you are, after how Andrea was treated here. Him - Mallard - His legacy can’t be to keep making us all miserable one last time. I’m innocent.” She looked back at the detective. “I’m innocent of everything, besides loving Andrea Mallard. That is, and has always been, my only crime. If only it wasn’t seen as a crime, to all you old fucks.”\n\nThe cops pulled Colonel Kestral away as Miss Mallard sobbed. The detective felt as if there was something… off about her reaction. Maybe a few details had slipped past, the first time. Was Colonel Kestral really the killer at all?\n\n**The server will reset in 1 minute**`)
                }
                sleep(60).then(r => {
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
                                                                                                                msg.guild.channels.cache.get(servantsquartersID).send(`Ms. Gannet sat on the little bed staring at the floor. She was a petite woman with dark hair and dark eyes that seemed anxious. Her room was pretty bare save for a small bag of luggage at the end of the bed, a dresser and lamp next to the bed. When the detective walked in she stood up and cleared her throat, meeting their eyes reluctantly. “Good day, Detective,” she said without much feeling, “I hope this won’t take long, I don’t know much of anything.” Her gaze went past the detective towards the door, it was obvious she didn’t want to be there.`)
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
            else {
                msg.channel.send(`Miss Crane felt her heart beating wildly in her chest as the detective made the accusation. At first she just stood there in disbelief, feeling like the walls were suddenly closing in around her. Her throat ran dry as she tried to swallow the lump that had formed there, but she wasn’t going to be able to lie her way out of this one anymore. She inhaled a deep breath and relented.\n\n“Alright, fine! So I did it.” Miss Crane gave a little shrug of her shoulders and then let out the breath. It felt good to get it out, so she continued. “It was a necessary evil. You don’t know how horrifically he treated Andrea for loving someone of the same gender, and he was a total hypocrite at the same time! I thought that the affair he was having with Professor Cuckoo would mean that we could bring the family together again and all would be well between them, but it wasn’t! He still treated her like she was disgusting even though he was doing the same thing behind everyone’s backs!” She waved her hands around as she spoke, becoming quite emotional.`)
                msg.channel.send(`“I couldn’t believe he could still act like that towards his own flesh and blood despite everything, so when Ms. Gannet told me where he went after dinner, I planned on confronting him about it. I don’t know what came over me, but I had to have snapped because I grabbed the gun along the way before going to his study.” Miss Crane gripped the edge of the counter to try and support herself while letting it all out since she had started shaking with fury all over again. “I told him exactly what I thought about him doing what he did to Andrea and called him out on all the hypocrisies, but he laughed in my face! I had no proof about any of it, and he was going to write Andrea and I both out of the will without a single smudge across his own name. I had to do something…he couldn’t get away with treating human beings like that. His own daughter, and also the staff members who work here for less than they deserve while some are blackmailed to accept it.”\n\nShe took a few calming breaths as the truth poured out of her. After a pause, she spoke again more quietly. “So I shot him, and I burned the new copy of the will he was writing up so that Andrea would be able to inherit what she so rightfully deserved. And so the people who work here could finally work for me; someone who cares about them and pays them a decent wage.” After she finished speaking, Miss Crane looked to the detective almost defiantly, as if challenging him to think she was some malicious killer regardless of her reasoning for doing it.`)
                sleep(5).then(r => {
                    msg.channel.send(`**Congratulations! You’ve solved the murder of Who Killed Dr. Mallard. WELL DONE! We all believed in you!**\n\n**HAPPIEST OF BIRTHDAYS, Wain, from all of us! You’ve had so many great ideas and adventures for us, and we wanted to give you one back from all of us. Hope your birthday is fantastic, and the riddles and puzzles weren’t… _Too_ torturous**\n\n**We have a little momento of the journey here** - https://aesthete-space.w3spaces.com/Wain_bday.html\n\n**Congrats again, and happy birthday! You’re not too shabby at this whole detective thing. Might be able to give Sherlock a run for his money.**`)
                    msg.channel.send("https://media.discordapp.net/attachments/979257682844332072/980929413304684615/Product_1.jpeg")
                })
            }
        }
        if (msg.channel.id == servantsquartersID) {
            if (message == "mr. jay" || message == "mr jay") {
                msg.author.roles.add("979263378587537449")
            }
            if (message == "lady cuckoo") {
                msg.author.roles.add("979263137108873256")
            }
            else {
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
                                sleep(5).then(r => {
                                    msg.channel.send(`**The Challenge**\n\nMs. Gannet seemed to be getting warm and anxious to be out of the room. She either wanted to be miles away from the detective with his questions or worlds away from the Mallard household. Either way her ability to give the detective her complete attention wavered, she pulled a folded photograph from a pocket in her skirt and gently stroked the back with her thumb as if it may bring her some sort of comfort. “Can I go? I’ve told you everything I know.”`)
                                    msg.channel.send(`https://cdn.discordapp.com/attachments/720470821902090258/979231786162868234/puzzle.png`)
                                    msg.channel.send(`\`You have unlimited tries until you get the right answer or you say "I don't know". Good luck.\``)
                                    countingModel.findOneAndUpdate({name: "k10"},
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
                                            if (m.content.toLowerCase() == "pudding") {
                                                msg.channel.send(`Her eyebrows raised as he asked her about the photo, hesitating slightly before unfolding it and sharing it with the detective. The photo itself was worn and a bit discolored, it was obvious the cook had carried it with her everyday and held it in her hand to bring her comfort in difficult moments. The faces of an older woman, a younger Ms. Gannet and two younger people looked up at the detective from the photo. Her face became warm looking at them. “My mother and siblings, Hannah and Steven. They’re waiting for me.”\n\nSoftening to the detective she folded the photo and turned back to him, “I’m going home. As soon as I heard about Dr. Mallard, I gave Miss Crane my notice. I’m eager to be rid of him, rid of this place. It feels more like a prison than a home and my family needs me, I need them.”\n\nShe paused for a moment biting her lip, “I think this may have something to do with Professor Cuckoo. I hear things in passing, people don’t really see you when you work in the kitchen and they might let things slip that they normally wouldn’t. And I’ve seen the Professor and the Doctor talk to each other, real quiet like, a few times. I don’t understand why they would be whispering about something, but it can’t be good if they didn’t want anyone to hear about it. Someone like Dr. Mallard… well… I wouldn’t put it past him if he was trying to–steal the Professor’s work. I don’t know that for a fact mind you, but it would be very like him.”\n\n“If you haven’t spoken to her, I would ask Lady Cuckoo, or Mr. Jay. He might be out of the way, but Mr. Jay certainly sees things around these parts.”`)
                                                collector.stop()
                                            }
                                            else if (m.content.toLowerCase() == "i don't know") {
                                                msg.channel.send(`Overcome with impatience and tired of the detective’s questions, Ms. Gannet tucked the photo back into her skirt and sighed with exasperation. “I don’t have anything else to tell you, detective. Clearly you’ve got no reason to keep holding me here and I no longer have an obligation to Dr. Mallard or his estate.” She waited a moment for the detective to excuse her, when they didn’t she offered, “You should speak to Lady Cuckoo if you want to know anything else.” With that she sat back down and refused to look at the detective, waiting for them to leave.`)
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
        }
        if (msg.channel.id == childhoodbedroomID) {
            if (message == "colonel kestral") {
                msg.author.roles.add("979263158805999666")
            }
            if (message == "lord cuckoo") {
                msg.author.roles.add("979263106419142747")
            }
            else {
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
                                sleep(5).then(r => {
                                    msg.channel.send(`**The Challenge**\n\nMiss Mallard sat on the bed slowly and looked up at the detective. “My father wasn’t always so bad, you know? He wasn’t… I don’t know why anyone would…” She suddenly looked around her room, and scrambled to the floor, towards the bookshelf and started taking out the books there. “I… I have a photo album around here… Somewhere. I need to show you that he… he wasn’t always so bad.” She was crying freely at this point, desperately trying to wipe away the tears so that she could see. If she could just… find…\n\nShe turned towards the detective. “Please… Please help me find… I just… You’ll see…” Her eyes stared up at him as she pleaded with him. “He’s my father… I need the photo album…”`)
                                    msg.channel.send(`https://www.thinglink.com/mediacard/1585878111168233475`)
                                    msg.channel.send(`\`You have unlimited tries until you get the right answer or you say "I don't know". Good luck.\``)
                                    countingModel.findOneAndUpdate({name: "k11"},
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
                                            if (m.content.toLowerCase() == "cucumber") {
                                                msg.channel.send(`“Oh!” The woman smiled, quickly wiping her tears and sniffling. “Thank you, oh my goodness. I do not know how I can… repay you.” She looked at the photo album, slowly flipping through it. She seemed to have calmed down a little bit and was distracted in her own thoughts. “He was not… always so bad… I told Jennifer about him, you know? Like… how he was before all the anger and arguments. And to be honest, I had… given up on him. But Jennifer… Colonel Kestral, I mean. She insisted.”\n\n“She was the only reason why I had even showed up to the dinner. She was… determined for us to fix our relationship… I mean, after everything, I just wanted my father to reach out. To apologise.” Her fingers slowly traced over a picture of her father. “I thought he might regret… losing me. And… that look that he gave me when I first came out to him. It was so full of disgust, like I was some… shit at the bottom of his shoes… I did not ever want to see it again.”\n\n“But… he was my father. I gave up on him, but I never wanted him to… to be gone…” She continued staring at the photo album, before shaking her head. “I’m sorry but… I would like to be alone now. Y-you can talk to Colonel Kestral or… Lord Cuckoo… but I just want to…” Her voice trailed off as she started crying once more.`)
                                                collector.stop()
                                            }
                                            else if (m.content.toLowerCase() == "i don't know") {
                                                msg.channel.send(`The woman slumped back on the bed. “I… lost it.” Her eyes looked dazed as she said it aloud once more. “I lost it. It was the only thing I have left… of our… of us… and I lost it.” Her entire demeanor suddenly changed as she pushed the pillows and blankets off her bed onto the ground hard. Looking back up at the detective, she suddenly glared at him. “What are you still doing here? Please leave. Leave me alone! Talk to Jennifer - Colonel Kestral -  if you must but leave me alone! Do your job, you’re a detective, aren’t you?!” She grabbed a pillow from the ground and threw it at the detective before turning facedown onto the bed and sobbing.`)
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
        }
        if (msg.channel.id == guestbedroomID) {
            if (message == "ms. gannet" || message == "miss gannet" || message == "ms gannet") {
                msg.author.roles.add("979263354663227442")
            }
            if (message == "lord cuckoo") {
                msg.author.roles.add("979263106419142747")
            }
            else {
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
                                sleep(5).then(r => {
                                    msg.channel.send(`**The Challenge**\n\nKestrel looks them up and down, assessing them before speaking. “I didn’t achieve the title of ‘Colonel’ for no reason. You come in here, asking me questions and expecting to be told private and personal information. But to get you have to give as well. I assumed that Dr. Mallard would be a good man at heart. I was wrong. I will not be so quick to make character assumptions with you.” She steps closer, intimidation and power radiating from her. “No, you must prove to me that you are capable before we proceed any further.”`)
                                    msg.channel.send(`https://cdn.discordapp.com/attachments/720470821902090258/979234300144812052/puzzle.png`)
                                    msg.channel.send(`Want a hint? || Barcode128 ||\n\nNeed a second hint? || 211214,213113,124112,121124,142112,241112,112214,141221,212222,122114,221114,121124,114212,114212,2331112 ||`)
                                    msg.channel.send(`\`You have unlimited tries until you get the right answer or you say "I don't know". Good luck.\``)
                                    countingModel.findOneAndUpdate({name: "k12"},
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
                                            if (m.content.toLowerCase() == "stained glass") {
                                                msg.channel.send(`Kestrel had been watching the entire time, her face betraying nothing. But when the detective finished, she rose and approached him; and while before there had been challenge and threat in her stance and tone; it was gone now as she held out a hand for him to shake. When she spoke again, there was a hint of respect and acknowledgement in her voice.\n\n“Andrea ran from the room after her father said some vile things to her in front of everyone there. I knew I hated him then, wanted to confront him immediately… but Andrea needed me. So I followed her just in time to see her slam the door of her bedroom on the second floor. I pleaded with her to let me in. Miss Crane was there as well and tried to assist. But she left and it was just me for who knows how long; listening to the woman I loved crying herself to sleep. Even when I knew she wasn’t awake anymore, I stayed. At least until Miss Crane came back and implored me to take to bed in one of the guest rooms.”\n\nRecounting the events of the evening brought the now familiar scowl to Kestrel’s face. “I understand more and more why Andrea was against coming here. It wasn’t just her father, you know. Lady Cuckoo was just as bad. I saw her. During the entire dinner, even with her husband yelling at Dr. Mallard, and then what happened between Dr. Mallard and Andrea, she just sat there the whole time wearing a shit-eating grin, loving the drama of it all. It was obvious to me and probably everyone else there that she’s heartless.”\n\nAfter one more appraising look at the investigator, Kestrel sat back down, this time in a recliner by the window. “If you need to confirm anything I am telling you, I would suggest that you speak with either Lord Cuckoo or Ms. Gannet next. They were there and witnessed everything happen as well. If you’ve already spoke. With them… well, maybe you ARE capable of solving this mystery.”`)
                                                collector.stop()
                                            }
                                            else if (m.content.toLowerCase() == "i don't know") {
                                                msg.channel.send(`Kestrel, who up until that point had been watching intently, seemed to come to a decision at that point. She turned her back on him and went to look out of the window. “Just as I thought.” Did her shoulders sag a little, and did her voice sound disappointed? It was difficult to tell. But she did not turn back around. “I am done with this conversation. If you wish to get more information, obtain it elsewhere. Lord Cuckoo may be able to assist you more.”  The tone of finality was unmistakable. The Colonel had deemed them unworthy, and would give nothing more.`)
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