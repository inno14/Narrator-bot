const db = require("quick.db")

module.exports = {
    name: "night",
    gameOnly: true,
    run: async (message, args, client) => {
        if (message.guild.id != "472261911526768642") return
        let sww = message.guild.channels.cache.filter((c) => c.name === "priv-shadow-wolf").keyArray("id")
        let alive = message.guild.roles.cache.find((r) => r.name === "Alive")
        let dead = message.guild.roles.cache.find((r) => r.name === "Dead")
        let votechat = message.guild.channels.cache.find((c) => c.name === "vote-chat")
        let narrator = message.guild.roles.cache.find((r) => r.name === "Narrator")
        let mininarr = message.guild.roles.cache.find((r) => r.name === "Narrator Trainee")
        let dayChat = message.guild.channels.cache.find((c) => c.name === "day-chat")
        let wwChat = message.guild.channels.cache.find((c) => c.name === "werewolves-chat")
        let lynched = "yes"

        if (!message.member.roles.cache.has(mininarr.id) && !message.member.roles.cache.has(narrator.id)) return

        let allvotes = []
        let votenumber = []
        // getting the votes
        /*for (let j = 1 ; j <= alive.members.size + dead.members.size ; j++) {
      let tempguy = message.guild.members.cache.find(m => m.nickname === j.toString())
      if (tempguy) {
        if (tempguy.roles.cache.has(alive.id)) {
          if (db.get(`vtshadow`) == true) {
            if (db.get(`role_${tempguy.id}`).toLowerCase.includes("wolf") || db.get(`role_${tempguy.id}`) == "Sorcerer") {
              let v = db.get(`vote_${tempguy.id}`) || "0"
              if (v != "0") {
                allvotes.push(v)
                allvotes.push(v)
              }
            } else {
              if (db.get(`role_${tempguy.id}`) == "Mayor") {
                if (db.get(`mayorrev_${tempguy.id}`) == true) {
                  let v = db.get(`vote_${tempguy.id}`) || "0"
                  if (v != "0") {
                    allvotes.push(v)
                    allvotes.push(v)
                  }
                }
              } else {
                let v = db.get(`vote_${tempguy.id}`) || "0"
                if (v != "0") {
                  allvotes.push(v)
                }
              }
            }
          } else {
            let v = db.get(`vote_${tempguy.id}`) || "0"
            if (v != "0") {
              allvotes.push(v)
            }
            if (db.get(`role_${tempguy.id}`) == "Mayor") {
              if (db.get(`mayorrev_${message.author.id}`) == true) {
                allvotes.push(v)
              }
            }
          }
        }
      }
    }
    allvotes.sort((a,b) => a - b)

    let tv = 0
    for (let i = 0 ; i < allvotes.length ; i++) {
      for (let j = i ; j < allvotes.length ; j++) {
        if (!votenumber[tv]) {
          votenumber[tv] = 1
        } 
        if (allvotes[i] == allvotes[j]) {
          votenumber[tv]++
        } else {
          i = j-1
          j = 99
          tv++
        }
      }
    }

    console.log(allvotes)
    console.log(votenumber)

    for (let i = 0 ; i < allvotes.length ; i++) {
      if (allvotes[i] == allvotes[i+1]) {
        allvotes.splice(i, 1)
        i = i + 1
      }
    }

    let requiredvotes = Math.floor(alive.members.size / 2)
    let highestvote = Math.max(...votenumber)
    votenumber.splice(votenumber.indexOf(highestvote), 1)
    let sndvote = Math.max(...votenumber)

    if (highestvote == sndvote || highestvote < requiredvotes) {
      args[0] = "0"
    } else {
      args[0] = allvotes[votenumber.indexOf(highestvote)]
    }
    */

        dayChat.permissionOverwrites.edit(alive.id, {
            SEND_MESSAGES: false,
        })

        if (!args[0]) return message.channel.send("This won't work. Add a number....")
        if (args[0] == "0") {
            dayChat.send("<:votingme:744572471079993445> The Villagers couldn't decide on who to lynch!")
        } else {
            let guy = message.guild.members.cache.find((m) => m.nickname == args[0])

            if (!guy) return message.channel.send("User not found. Please try again!")

            let fc = message.guild.channels.cache.filter((c) => c.name === "priv-flower-child")
            let fcss = fc.keyArray("id")
            for (let i = 0; i < fcss.length; i++) {
                let petal = db.get(`flower_${fcss[i]}`)
                if (petal == args[0]) {
                    if (db.get(`protest_${fcss[i]}`) != "yes") {
                        dayChat.send(`<:votingme:744572471079993445> Player **${guy.nickname} ${guy.user.username}** could not be lynched!`)
                        db.set(`protest_${fcss[i]}`, "no")
                        i = 99
                        lynched = "no"
                    }
                }
            }
            if (lynched == "yes") {
                let gww = message.guild.channels.cache.filter((c) => c.name === "priv-guardian-wolf")
                let gwwss = gww.keyArray("id")
                for (let i = 0; i < gwwss.length; i++) {
                    let guardian = db.get(`guardian_${gwwss[i]}`)
                    if (guardian == args[0]) {
                        if (db.get(`protest_${gwwss[i]}`) != "yes") {
                            dayChat.send(`<:votingme:744572471079993445> Player **${guy.nickname} ${guy.user.username}** could not be lynched!`)
                            db.set(`protest_${gwwss[i]}`, "no")
                            i = 99
                            lynched = "no"
                        }
                    }
                }
            }

            if (lynched == "yes") {
                if (db.get(`role_${guy.id}`) == "Handsome Prince") {
                    lynched = "no"
                    dayChat.send(`<:votingme:744572471079993445> The Villagers tried to lynch **${guy.nickname} ${guy.user.username} (Handsome Prince) but they were too handsome to be killed today.`)
                }
            }

            if (lynched == "yes") {
                if (db.get(`role_${guy.id}`) == "Idiot") {
                    let idiot = message.guild.channels.cache.filter((c) => c.name === "priv-idiot").keyArray("id")
                    for (let k = 0; k < idiot.length; k++) {
                        let chan = message.guild.channels.cache.get(idiot[k])
                        if (chan.permissionsFor(guy).has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])) {
                            k = 99
                            db.set(`idiot_${chan.id}`, "yes")
                        }
                    }
                    lynched = "no"
                    dayChat.send(`<:votingme:744572471079993445> The Villagers tried to lynch **${guy.nickname} ${guy.user.username} (Idiot) but instead made them lose their ability to vote.`)
                }
            }

            if (lynched == "yes") {
                dayChat.send("<:votingme:744572471079993445> The Villagers lynched **" + guy.nickname + " " + guy.user.username + " (" + db.get(`role_${guy.id}`) + ")**!")
                guy.roles.add(dead.id)
                guy.roles.remove(alive.id)
            }
        }
        setTimeout(async () => {
            let corr = message.guild.channels.cache.filter((c) => c.name === "priv-corruptor").keyArray("id")
            let as = message.guild.channels.cache.filter((c) => c.name === "priv-aura-seer").keyArray("id")
            let s = message.guild.channels.cache.filter((c) => c.name === "priv-seer").keyArray("id")
            let det = message.guild.channels.cache.filter((c) => c.name === "priv-detective").keyArray("id")
            let sorc = message.guild.channels.cache.filter((c) => c.name === "priv-sorcerer").keyArray("id")
            let wwseer = message.guild.channels.cache.filter((c) => c.name === "priv-wolf-seer").keyArray("id")
            let healer1 = message.guild.channels.cache.filter((c) => c.name === "priv-doctor").keyArray("id") // doctor
            let healer3 = message.guild.channels.cache.filter((c) => c.name === "priv-doctor").keyArray("id") // witch
            let healer2 = message.guild.channels.cache.filter((c) => c.name === "priv-doctor").keyArray("id") // bodyguard
            let alchemist = message.guild.channels.cache.filter((c) => c.name === "priv-alchemist").keyArray("id")
            let serialkiller = message.guild.channels.cache.filter((c) => c.name === "priv-serial-killer").keyArray("id")
            let nb = message.guild.channels.cache.filter((c) => c.name === "priv-naughty-boy").keyArray("id")
            let gg = message.guild.channels.cache.filter((c) => c.name === "priv-grumpy-grandma").keyArray("id")

            for (let i = 0; i < as.length; i++) {
                db.set(`auraCheck_${as[i]}`, "no")
            }
            for (let i = 0; i < s.length; i++) {
                db.set(`seer_${s[i]}`, "no")
            }
            for (let i = 0; i < det.length; i++) {
                db.set(`detCheck_${det[i]}`, "no")
            }
            for (let i = 0; i < sorc.length; i++) {
                db.set(`sorcerer_${sorc[i]}`, "no")
            }
            for (let i = 0; i < wwseer.length; i++) {
                db.set(`wwseer_${wwseer[i]}`, "no")
            }
            for (let i = 0; i < healer1.length; i++) {
                db.set(`heal_${healer1[i]}`, null)
            }
            for (let i = 0; i < healer2.length; i++) {
                db.set(`potion_${healer2[i]}`, null)
            }
            for (let i = 0; i < healer3.length; i++) {
                db.set(`guard_${healer3[i]}`, null)
            }
            for (let i = 0; i < serialkiller.length; i++) {
                db.set(`stab_${serialkiller[i]}`, null)
            }
            for (let i = 0; i < gg.length; i++) {
                db.set(`mute_${gg[i]}`, null)
            }
            for (let a = 1; a < alive.members.size + dead.members.size; a++) {
                let guy = message.guild.members.cache.find((m) => m.nickname === a.toString())
                if (guy) {
                    let role = db.get(`role_${guy.id}`)
                    if (role != "Drunk") {
                        dayChat.permissionOverwrites.edit(guy.id, {
                            SEND_MESSAGES: null,
                            READ_MESSAGE_HISTORY: null,
                            VIEW_CHANNEL: null,
                        })
                    }
                }
            }

            for (let a = 0; a < corr.length; a++) {
                let glitch = db.get(`corrupt_${corr[a]}`)
                let corruptor = message.guild.channels.cache.get(corr[a])
                if (glitch != null) {
                    let guy = message.guild.members.cache.find((c) => c.nickname === glitch)
                    let role = message.guild.channels.cache.filter((c) => c.name === `priv-${db.get(`role_${guy.id}`).replace(" ", "-").toLowerCase()}`).keyArray("id")
                    for (let b = 0; b < role.length; b++) {
                        let chan = message.guild.channels.cache.get(role[b])
                        if (chan.permissionsFor(guy).has(["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])) {
                            for (let c = 1; c <= alive.members.size + dead.members.size; c++) {
                                let player = message.guild.members.cache.find((m) => m.nickname === c.toString())
                                if (corruptor.permissionsFor(player).has(["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])) {
                                    if (player.roles.cache.has(alive.id) && guy.roles.cache.has(alive.id)) {
                                        db.set(`corrupt_${corr[a]}`, null)
                                        dayChat.send(`<:corrupt:745632706838396989> The Corruptor killed **${guy.nickname} ${guy.user.username}**!`)
                                        guy.roles.add(dead.id)
                                        guy.roles.remove(alive.id)
                                        guy.roles.add("777400587276255262")
                                    }
                                    if (player.roles.cache.has(alive.id)) {
                                        for (let d = 1; d < 17; d++) {
                                            let cguy = message.guild.members.cache.find((m) => m.nickname === d.toString())
                                            if (cguy) {
                                                if (cguy.roles.cache.has(alive.id)) {
                                                    if (db.get(`role_${cguy.id}`) == "Red Lady") {
                                                        let corruptedornot = db.get(`rlcorrupted_${cguy.nickname}`)
                                                        if (corruptedornot == true) {
                                                            dayChat.send(`<:corrupt:745632706838396989> The Corruptor killed **${cguy.nickname} ${cguy.user.username}**!`)
                                                            cguy.roles.add(dead.id)
                                                            cguy.roles.remove(alive.id)
                                                            cguy.roles.add("777400587276255262")
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            for (let a = 0; a < nb.length; a++) {
                let naughty = message.guild.channels.cache.get(nb[a])
                let swich = db.get(`switch_${nb[a]}`)
                if (swich != null) {
                    db.set(`toy_${nb[a]}`, "yes")
                    db.set(`switch_${nb[a]}`, null)
                    let guy1 = message.guild.members.cache.find((m) => m.nickname === swich[0])
                    let guy2 = message.guild.members.cache.find((m) => m.nickname === swich[1])
                    let player
                    for (let i = 1; i <= alive.members.size + dead.members.size; i++) {
                        player = message.guild.members.cache.find((m) => m.nickname === i.toString())
                        if (naughty.permissionsFor(player).has(["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])) {
                            player = player
                            i = 99
                        }
                    }
                    if (guy1.roles.cache.has(alive.id) && guy2.roles.cache.has(alive.id) && player.roles.cache.has(alive.id)) {
                        let nbr1 = db.get(`role_${guy1.id}`)
                        let nbr2 = db.get(`role_${guy2.id}`)
                        db.set(`role_${guy1.id}`, nbr2)
                        db.set(`role_${guy2.id}`, nbr1)
                        let chan1 = message.guild.channels.cache.filter((c) => c.name === `priv-${nbr1.replace(" ", "-").toLowerCase()}`).keyArray("id")
                        let chan2 = message.guild.channels.cache.filter((c) => c.name === `priv-${nbr2.replace(" ", "-").toLowerCase()}`).keyArray("id")
                        for (let d = 0; d < chan1.length; d++) {
                            let chan = message.guild.channels.cache.get(chan1[d])
                            if (chan.permissionsFor(player).has(["VIEW_CHANNEL"])) {
                                chan.permissionOverwrites.edit(guy1.id, {
                                    VIEW_CHANNEL: false,
                                })
                            }
                        }

                        for (let d = 0; d < chan2.length; d++) {
                            let chan = message.guild.channels.cache.get(chan2[d])
                            if (chan.permissionsFor(player).has(["VIEW_CHANNEL"])) {
                                chan2.permissionOverwrites.edit(guy2.id, {
                                    VIEW_CHANNEL: false,
                                })
                            }
                        }

                        let nbrole1 = await message.guild.channels.create(`priv-${nbr2.replace(" ", "-").toLowerCase()}`, {
                            parent: "748959630520090626",
                        })
                        nbrole1.permissionOverwrites.create(guy1.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            READ_MESSAGE_HISTORY: true,
                        })
                        nbrole1.permissionOverwrites.create(message.guild.id, {
                            VIEW_CHANNEL: false,
                        })
                        nbrole1.permissionOverwrites.create(narrator.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            READ_MESSAGE_HISTORY: true,
                            MANAGE_CHANNELS: true,
                            MENTION_EVERYONE: true,
                            ATTACH_FILES: true,
                        })
                        nbrole1.permissionOverwrites.create(narrator.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            READ_MESSAGE_HISTORY: true,
                            MANAGE_CHANNELS: true,
                            MENTION_EVERYONE: true,
                            ATTACH_FILES: true,
                        })
                        await nbrole1.send(db.get(`roleinfo_${nbr2.toLowerCase()}`))
                        await nbrole1.send(`_ _\n\nYou have been switched by the naugty boy!`)
                        await nbrole1.send(`${alive}`)

                        let nbrole2 = await message.guild.channels.create(`priv-${nbr1.replace(" ", "-").toLowerCase()}`, {
                            parent: "748959630520090626",
                        })
                        nbrole2.permissionOverwrites.create(guy2.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            READ_MESSAGE_HISTORY: true,
                        })
                        nbrole2.permissionOverwrites.create(message.guild.id, {
                            VIEW_CHANNEL: false,
                        })
                        nbrole2.permissionOverwrites.create(narrator.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            READ_MESSAGE_HISTORY: true,
                            MANAGE_CHANNELS: true,
                            MENTION_EVERYONE: true,
                            ATTACH_FILES: true,
                        })
                        nbrole2.permissionOverwrites.create(narrator.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            READ_MESSAGE_HISTORY: true,
                            MANAGE_CHANNELS: true,
                            MENTION_EVERYONE: true,
                            ATTACH_FILES: true,
                        })
                        await nbrole2.send(db.get(`roleinfo_${nbr1.toLowerCase()}`))
                        await nbrole2.send(`_ _\n\nYou have been switched by the naugty boy!`)
                        await nbrole2.send(`${alive}`)
                    }
                }
            }
            for (let wwo = 1; wwo <= alive.members.size + dead.members.size; wwo++) {
                let who = message.guild.members.cache.find((m) => m.nickname === wwo.toString())
                if (who) {
                    let rrrr = db.get(`role_${who.id}`).toLowerCase()
                    if (rrrr.includes("wolf")) {
                        if (who.roles.cache.has(alive.id)) {
                            wwChat.permissionOverwrites.edit(who.id, {
                                SEND_MESSAGES: true,
                            })
                        } else {
                            wwChat.permissionOverwrites.edit(who.id, {
                                SEND_MESSAGES: false,
                                VIEW_CHANNEL: false,
                            })
                        }
                    }
                }
            }

            let jailedchat = message.guild.channels.cache.find((c) => c.name === "jailed-chat")
            let jailers = message.guild.channels.cache.filter((c) => c.name === "priv-jailer").keyArray("id")
            for (let q = 0; q < jailers.length; q++) {
                let jailer = message.guild.channels.cache.get(jailers[q])
                for (let j = 1; j <= alive.members.size + dead.members.size; j++) {
                    let who = message.guild.members.cache.find((m) => m.nickname === j.toString())
                    if (who) {
                        let rrrr = db.get(`role_${who.id}`).toLowerCase()
                        if (rrrr.includes("jailer")) {
                            if (who.roles.cache.has(alive.id)) {
                            } else {
                                db.delete(`jail_${jailer.id}`)
                            }
                        }
                    }
                }
                let toJail = db.get(`jail_${jailer.id}`) || "None"
                let prisoner = message.guild.members.cache.find((m) => m.nickname === toJail)
                if (toJail != "None") {
                    if (prisoner && db.get(`role_${prisoner.id}`)) {
                        jailedchat.permissionOverwrites.edit(prisoner.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            READ_MESSAGE_HISTORY: true,
                        })

                        if (db.get(`role_${prisoner.id}`).toLowerCase().includes("wolf")) {
                            wwChat.permissionOverwrites.edit(prisoner.id, {
                                VIEW_CHANNEL: false,
                            })
                            wwChat.send("Your werewolf teammate **" + prisoner.nickname + " " + prisoner.user.username + " (" + db.get(`role_${prisoner.id}`) + ")** has been jailed!")
                        }

                        let rolec = message.guild.channels.cache.filter((c) => c.name === `priv-` + db.get(`role_${prisoner.id}`).toLowerCase().replace(" ", "-")).keyArray("id")

                        for (let jailsch = 0; jailsch < rolec.length; jailsch++) {
                            let tolock = message.guild.channels.cache.get(rolec[jailsch])
                            if (tolock.permissionsFor(prisoner.id).has(["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])) {
                                tolock.permissionOverwrites.edit(prisoner.id, {
                                    SEND_MESSAGES: false,
                                })
                                tolock.send("You have been jailed! You can't do your actions for tonight! Head to <#606251143466713174> to talk with the jailer!")
                            }
                        }

                        setTimeout(function () {
                            jailedchat.send(`${alive} You have been jailed!`)
                        }, 2000)
                    }
                }
            }

            let nmww = message.guild.channels.cache.filter((c) => c.name === "priv-nightmare-werewolf").keyArray("id")
            let nightmares = []
            for (let a = 0; a < nmww.length; a++) {
                // getting the nightmares
                let sleep = db.get(`sleepy_${nmww[a]}`)
                let chan = message.guild.channels.cache.get(nmww[a])
                if (sleep != null) {
                    for (let b = 1; b <= alive.members.size + dead.members.size; b++) {
                        let wolf = message.guild.members.cache.find((m) => m.nickname === b.toString())
                        if (chan.permissionsFor(wolf).has(["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])) {
                            b = 99
                            if (wolf.roles.cache.has(alive.id)) {
                                let guy = message.guild.members.cache.find((m) => m.nickname === sleep)
                                if (guy) {
                                    if (guy.roles.cache.has(alive.id)) {
                                        if (!nightmares.includes(guy.id)) {
                                            nightmares.push(guy.id)
                                            if (db.get(`nightmare_${chan.id}`) == null) {
                                                db.set(`nightmare_${chan.id}`, 2)
                                            }
                                            db.subtract(`nightmare_${chan.id}`, 1)
                                            console.log(guy.nickname)
                                            wwChat.send(`The Nightmare Werewolf put **${guy.nickname} ${guy.user.username}** to sleep!`)
                                            let role = db.get(`role_${guy.id}`)
                                            let temp = message.guild.channels.cache.filter((c) => c.name === `priv-${role.toLowerCase().replace(" ", "-")}`).keyArray("id")
                                            for (let c = 0; c < temp.length; c++) {
                                                let tempchan = message.guild.channels.cache.get(temp[c])
                                                if (tempchan.permissionsFor(guy).has(["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])) {
                                                    tempchan.send(`You are in a deep sleep! You cannot use your abilities this night!`)
                                                    tempchan.permissionOverwrites.edit(guy.id, {
                                                        SEND_MESSAGES: false,
                                                    })
                                                    c = 99
                                                }
                                            }

                                            setTimeout(function () {
                                                // if jailed in chat
                                                if (jailedchat.permissionsFor(guy).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) {
                                                    jailedchat.permissionOverwrites.edit(guy.id, {
                                                        SEND_MESSAGES: false,
                                                    })
                                                    jailedchat.send(`You are in a deep sleep! You cannot use your abilities this night!`)
                                                }
                                            }, 3000)

                                            // zombies
                                            let zc = message.guild.channels.cache.find((c) => c.name === "zombies-chat")
                                            if (role == "Zombie") {
                                                zc.permissionOverwrites.edit(guy.id, {
                                                    SEND_MESSAGES: false,
                                                })
                                            }
                                            // siblings
                                            let sib = message.guild.channels.cache.find((c) => c.name === "siblings-chat")
                                            if (role == "Sibling") {
                                                sib.permissionOverwrites.edit(guy.id, {
                                                    SEND_MESSAGES: false,
                                                })
                                            }
                                            // bandits
                                            let bandits = message.guild.channels.cache.filter((c) => c.name.startsWith("bandits")).keyArray("id")
                                            for (let d = 0; d < bandits.length; d++) {
                                                let thechan = message.guild.channels.cache.get(bandits[d])
                                                if (thechan.permissionsFor(guy).has(["SEND_MESSAGES", "READ_MESSAGE_HISTORY"])) {
                                                    thechan.permissionOverwrites.edit(guy.id, {
                                                        SEND_MESSAGES: false,
                                                    })
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            for (let a = 0; a < nmww.length; a++) {
                db.set(`sleepy_${nmww[a]}`, null)
            }
            message.guild.channels.cache
                .find((c) => c.name === "vote-chat")
                .permissionOverwrites.edit(alive.id, {
                    VIEW_CHANNEL: true,
                })

            let mm = message.guild.channels.cache.filter((c) => c.name === "priv-marksman").keyArray("id")
            for (let a = 0; a < mm.length; a++) {
                if (db.get(`mark_${mm[a]}`) != null) {
                    db.set(`markActive_${mm[a]}`, true)
                }
            }

            // Tough guy

            let tg = message.guild.channels.cache.filter((c) => c.name === "priv-tough-guy").keyArray("id")

            for (let a = 0; a < tg.length; a++) {
                if (db.get(`wounded_${tg[a]}`) == true) {
                    let chan = message.guild.channels.cache.get(tg[a])
                    for (let b = 1; b <= alive.members.size + dead.members.size; b++) {
                        let guy = message.guild.members.cache.find((m) => m.nickname === b.toString())
                        if (chan.permissionsFor(guy).has(["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])) {
                            if (guy.roles.cache.has(alive.id)) {
                                dayChat.send(`<:tough_guy:584182666212016158> Player **${guy.nickname} ${guy.user.username} (Tough Guy)** was wounded last night and has died!`)
                                guy.roles.add(dead.id)
                                guy.roles.remove(alive.id)
                            }
                        }
                    }
                }
            }

            alchemist.forEach((id) => {
                let chan = message.guild.channels.cache.get(id)
                for (let i = 1; i < 17; i++) {
                    let owner = message.guild.members.cache.find((c) => c.nickname === i.toString())
                    if (owner) {
                        if (owner.roles.cache.has(alive.id)) {
                            if (chan.permissionsFor(owner).has(["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])) {
                                let blackpotion = db.get(`blackpotion_${chan.id}`)
                                if (blackpotion) {
                                    let guy = message.guild.members.cache.find((m) => m.nickname === blackpotion)
                                    if (guy) {
                                        if (guy.roles.cache.has(alive.id)) {
                                            dayChat.send(`<:blackp:821920932989239296> The Alchemist killed **${guy.nickname} ${guy.user.username} (${db.get(`role_${guy.id}`)})**!`)
                                            guy.roles.add(dead.id)
                                            guy.roles.remove(alive.id)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                db.delete(`blackpotion_${chan.id}`)
                db.delete(`redpotion_${chan.id}`)
            })

            // zombies chat
            let zombies = message.guild.channels.cache.find((c) => c.name === "zombies")

            for (let i = 1; i < 17; i++) {
                let tempguy = message.guild.members.cache.find((m) => m.nickname === i.toString())
                if (tempguy) {
                    if (tempguy.roles.cache.has(alive.id)) {
                        if (zombies.permissionsFor(tempguy).has(["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"])) {
                            zombies.permissionOverwrites.edit(tempguy.id, {
                                SEND_MESSAGES: true,
                            })
                        }
                    }
                }
            }

            // deleting the vote-chat
            let ms = await votechat.messages.fetch()
            let md = await ms.filter((m) => m.author.id === "744538701522010174")
            if (md.size > 0) {
                await votechat.bulkDelete(md)
            }
            // deleting shamaned if shaman is dead
            let shaman = message.guild.channels.cache.filter((c) => c.name === "priv-wolf-shaman").keyArray("id")
            for (let i = 0; i < shaman.length; i++) {
                let chan = message.guild.channels.cache.get(shaman[i])
                for (let j = 1; j <= 16; j++) {
                    let tempguy = message.guild.members.cache.find((m) => m.nickname === j.toString())
                    if (tempguy) {
                        if (chan.permissionsFor(tempguy).has(["VIEW_CHANNEL"])) {
                            j = 99
                            if (tempguy.roles.cache.has(dead.id)) {
                                db.delete(`shaman_${chan.id}`)
                            }
                        }
                    }
                }
            }
            // deleting bomber bombs if dead
            setTimeout(async function () {
                let bb = message.guild.channels.cache.filter((c) => c.name === "priv-bomber").keyArray("id")
                for (let i = 0; i < bb.length; i++) {
                    let chan = message.guild.channels.cache.get(bb[i])
                    for (let j = 1; j <= 16; j++) {
                        let tempguy = message.guild.members.cache.find((m) => m.nickname === j.toString())
                        if (tempguy) {
                            if (chan.permissionsFor(tempguy).has(["VIEW_CHANNEL"])) {
                                j = 99
                                if (tempguy.roles.cache.has(dead.id)) {
                                    db.delete(`bombs_${chan.id}`)
                                }
                            }
                        }
                    }
                }
            }, 2000)

            // bomber
            setTimeout(async function () {
                let bb = message.guild.channels.cache.filter((c) => c.name === "priv-bomber").keyArray("id")
                for (let i = 0; i < bb.length; i++) {
                    let bombs = db.get(`bombs_${bb[i]}`) || []
                    if (bombs.length > 0) {
                        bombs.forEach((e) => {
                            let goy = message.guild.members.cache.find((m) => m.nickname === e.toString())
                            if (goy) {
                                if (goy.roles.cache.has(alive.id)) {
                                    dayChat.send(`<:explode:745914819353509978> **${goy.nickname} ${goy.user.username} (${db.get(`role_${goy.id}`)})** was killed by an explosion!`)
                                    goy.roles.add(dead.id)
                                    goy.roles.remove(alive.id)
                                }
                            }
                        })
                    }
                    db.delete(`bombs_${bb[i]}`)
                }
            }, 60000)
        }, 3000)
        dayChat.send(`${alive} Night ${db.get(`nightCount`) + 1} has started!`)
        db.set(`isDay`, "no")
        db.set(`isNight`, "yes")
        db.add(`nightCount`, 1)
        db.set(`wwsVote`, "yes")
        db.set(`commandEnabled`, "no")
        console.log(`Night: ${db.get(`nightCount`)}`)
    },
}
