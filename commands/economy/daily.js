const Discord = require("discord.js")
const ms = require("parse-ms")
const config = require("../../config")
const { players } = require("../../db.js")

module.exports = {
    name: "daily",
    run: async (message, args, client) => {
        let item = ""
        let amount = ""
        let cooldown = 86400000
        let emote = ""
        let data = await players.findOne({ user: message.author.id })
        let date = data.daily.day // say that 5 times fast xD

        let lastDaily = data.daily.last
        let extra = ""
        let bonus = 1
        if (client.guilds.cache.get(config.ids.server.sim).members.cache.get(message.author.id).premiumSince) {
            bonus = 2
            extra = "\nBecause you are a booster, you received double the normal rewards amount!"
        }

        if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
            let time = ms(cooldown - (Date.now() - lastDaily))
            let hrs = `${time.hours} hours`
            let min = `${time.minutes} minutes and`
            let sec = `${time.seconds} seconds`
            if (hrs == 0) hrs = ""
            if (min == 0) min = ""
            if (sec == 0) sec = ""
            console.log(hrs)
            message.reply(`No. Come back in ${hrs} ${min} ${sec}`)
        } else {
            if (date == 0) {
                amount = 10 * bonus
                emote = `${config.getRole("coin", client).toString()}`
                item = "coins"
                data.coins += 10 * bonus
            } else if (date == 1) {
                item = "rose"
                emote = `${config.getRole("rosesingle", client).toString()}`
                amount = 1 * bonus
                data.inventory.rose += 1 * bonus
            } else if (date == 2) {
                amount = 1 * bonus
                item = "rose bouquet"
                emote = `${config.getRole("rosebouquet", client).toString()}`
                data.inventory.bouquet += 1 * bonus
            } else if (date == 3) {
                amount = 1 * bonus
                emote = `${config.getRole("lootbox", client).toString()}`
                item = "lootbox!\n\nTo use it, do `+use lootbox`"
                data.inventory.lootbox += 1 * bonus
            } else if (date == 4) {
                item = "coins"
                emote = `${config.getRole("coin", client).toString()}`
                amount = 20 * bonus
                data.coins += 20 * bonus
            } else if (date == 5) {
                item = "roses"
                emote = `${config.getRole("rosesingle", client).toString()}`
                amount = 5 * bonus
                data.inventory.roses += 5 * bonus
            } else if (date == 6) {
                amount = 30 * bonus
                item = "coins"
                emote = `${config.getRole("coin", client).toString()}`
                data.daily.day = -1
                data.coins += 30 * bonus
            }

            let dailymsg = new Discord.MessageEmbed().setTitle("Daily Rewards! Woohooo!").setDescription(`${emote} Nice! You have received ${amount} ${item}!${extra}`)
            message.channel.send({ embeds: [dailymsg] })

            data.daily.day++
            data.daily.last = Date.now()
        }
        data.save()
    },
}
