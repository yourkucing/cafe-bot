const Discord = require('discord.js');
const answers = require('./answers.json');

module.exports.run = async(client, msg, args) => {
    tempguild = msg.guild
    let hooman = msg.author.id
    const birthdayboy = tempguild.members.cache.get(hooman)
    birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849153855325339680"), "")
    msg.channel.send(`Oh, let's hope you survive >.< Good luck!`)
    entrance = tempguild.channels.cache.get("848888985794641920")
    hallway = tempguild.channels.cache.get("848889042112217148")
    livingroom = client.channels.cache.get("848889021265608724")
    bedroom = client.channels.cache.get("848889152623869952")
    diningroom = client.channels.cache.get("848889177445629983")
    kitchen = client.channels.cache.get("848889068771344394")
    winecellar = client.channels.cache.get("849130748602089472")
    ballroom = client.channels.cache.get("849131077180194866")
    pool = client.channels.cache.get("849131448907989023")
    cabana = client.channels.cache.get("849131906170880020")
    garden = client.channels.cache.get("849132312275845131")
    campfire = client.channels.cache.get("849132622558396437")
    dungeon = client.channels.cache.get("849132940503810068")
    tower = client.channels.cache.get("849133385565470730")
    bathroom = client.channels.cache.get("849137221985501215")
    pantry = client.channels.cache.get("849138049647378523")
    sittingroom = client.channels.cache.get("849138791511490590")
    stable = client.channels.cache.get("849141611135762452")
    servant = client.channels.cache.get("849142098045435924")
    catroom = client.channels.cache.get("849143190305112084")
    throne = client.channels.cache.get("849143623592574986")
    bonus = client.channels.cache.get("849211609591447562")


    const collector1 = entrance.createMessageCollector(
        m => m.author.id == hooman
    );
    collector1.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[0].answer) {
            entrance.send(answers[0].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849153932822708236"), "")
            collector1.stop()
        }
    });
    const collector2 = hallway.createMessageCollector(
        m => m.author.id == hooman
    );
    collector2.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[1].answer) {
            hallway.send(answers[1].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849153972790099968"), "")
            collector2.stop()
        }
    });
    const collector3 = livingroom.createMessageCollector(
        m => m.author.id == hooman
    );
    collector3.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[2].answer) {
            livingroom.send(answers[2].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154016326713374"), "")
            collector3.stop()
        }
    });
    const collector4 = bedroom.createMessageCollector(
        m => m.author.id == hooman
    );
    collector4.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[3].answer) {
            bedroom.send(answers[3].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154061218873344"), "")
            collector4.stop()
        }
    });
    const collector5 = diningroom.createMessageCollector(
        m => m.author.id == hooman
    );
    collector5.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[4].answer) {
            diningroom.send(answers[4].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154095268364318"), "")
            collector5.stop()
        }
    });
    const collector6 = kitchen.createMessageCollector(
        m => m.author.id == hooman
    );
    collector6.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[5].answer) {
            kitchen.send(answers[5].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154133256175637"), "")
            collector6.stop()
        }
    });
    const collector7 = winecellar.createMessageCollector(
        m => m.author.id == hooman
    );
    collector7.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[6].answer) {
            winecellar.send(answers[6].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154165338931260"), "")
            collector7.stop()
        }
    });
    const collector8 = ballroom.createMessageCollector(
        m => m.author.id == hooman
    );
    collector8.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[7].answer) {
            ballroom.send(answers[7].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154200822743040"), "")
            collector8.stop()
        }
    });
    const collector9 = pool.createMessageCollector(
        m => m.author.id == hooman
    );
    collector9.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[8].answer) {
            pool.send(answers[8].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154233860751400"), "")
            collector9.stop()
        }
    });
    const collector10 = cabana.createMessageCollector(
        m => m.author.id == hooman
    );
    collector10.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[9].answer) {
            cabana.send(answers[9].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154274272477214"), "")
            collector10.stop()
        }
    });
    const collector11 = garden.createMessageCollector(
        m => m.author.id == hooman
    );
    collector11.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[10].answer) {
            garden.send(answers[10].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154325628321822"), "")
            collector11.stop()
        }
    });
    const collector12 = campfire.createMessageCollector(
        m => m.author.id == hooman
    );
    collector12.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[11].answer) {
            campfire.send(answers[11].message[0])
            campfire.send(answers[11].message[1])
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154363984838707"), "")
            collector12.stop()
        }
    });
    const collector13 = dungeon.createMessageCollector(
        m => m.author.id == hooman
    );
    collector13.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[12].answer) {
            dungeon.send(answers[12].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154400265437234"), "")
            collector13.stop()
        }
    });
    const collector14 = tower.createMessageCollector(
        m => m.author.id == hooman
    );
    collector14.on('collect', m => {
        console.log(m.content)
        if (answers[13].answer.includes(m.content.toLowerCase())) {
            tower.send(answers[13].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154439800422472"), "")
            collector14.stop()
        }
    });
    const collector15 = bathroom.createMessageCollector(
        m => m.author.id == hooman
    );
    collector15.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[14].answer) {
            bathroom.send(answers[14].message[0])
            bathroom.send(answers[14].message[1])
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154476517752832"), "")
            collector15.stop()
        }
    });
    const collector16 = pantry.createMessageCollector(
        m => m.author.id == hooman
    );
    collector16.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[15].answer) {
            pantry.send(answers[15].message[0])
            pantry.send(answers[15].message[1])
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154550173532160"), "")
            collector16.stop()
        }
    });
    const collector17 = sittingroom.createMessageCollector(
        m => m.author.id == hooman
    );
    collector17.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[16].answer) {
            sittingroom.send(answers[16].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154585402015794"), "")
            collector17.stop()
        }
    });
    const collector18 = stable.createMessageCollector(
        m => m.author.id == hooman
    );
    collector18.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[17].answer) {
            stable.send(answers[17].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154611214286868"), "")
            collector18.stop()
        }
    });
    const collector19 = servant.createMessageCollector(
        m => m.author.id == hooman
    );
    collector19.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[18].answer) {
            servant.send(answers[18].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154687143378964"), "")
            collector19.stop()
        }
    });
    const collector20 = catroom.createMessageCollector(
        m => m.author.id == hooman
    );
    collector20.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[19].answer) {
            catroom.send(answers[19].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154733951156245"), "")
            collector20.stop()
        }
    });
    const collector21 = throne.createMessageCollector(
        m => m.author.id == hooman
    );
    collector21.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[20].answer) {
            throne.send(answers[20].message)
            birthdayboy.roles.add(tempguild.roles.cache.find(x => x.id == "849154769594613770"), "")
            collector21.stop()
        }
    });

    const collector22 = bonus.createMessageCollector(
        m => m.author.id == hooman
    );
    collector22.on('collect', m => {
        console.log(m.content)
        if (m.content.toLowerCase() == answers[21].answer) {
            bonus.send(answers[21].message)
            
            const collector23 = bonus.createMessageCollector(
                m => m.author.id == hooman
            );
            collector23.on('collect', m => {
                if (m.content.toLowerCase() == answers[22].answer) {
                    bonus.send(answers[22].message)

                    const collector24 = bonus.createMessageCollector(
                        m => m.author.id == hooman
                    );
                    collector24.on('collect', m => {
                        if (m.content.toLowerCase() == answers[23].answer) {
                            bonus.send(answers[23].message)

                            const collector25 = bonus.createMessageCollector(
                                m => m.author.id == hooman
                            );

                            collector25.on('collect', m => {
                                if (m.content.toLowerCase() == answers[24].answer) {
                                    bonus.send(answers[23].message)
                                    collector25.stop()
                                    collector24.stop()
                                    collector23.stop()
                                    collector22.stop()
                                }
                            })
                        }
                    })
                }
            })

        }
    })

}