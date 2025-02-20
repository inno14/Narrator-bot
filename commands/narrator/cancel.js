const { MessageActionRow } = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "cancel",
    narratorOnly: true,
    run: async (message, client, args) => {
        if (db.get(`game`) == null) return message.channel.send("No game is being hosted")

        message.guild.channels.cache.find((c) => c.name === "game-warning").send(`Game was canceled. Sorry for the inconvenience!`)
        let t = client.guilds.cache.get("465795320526274561").roles.cache.get("606123676668133428").members

        t.forEach((e) => {
            e.roles.remove("606123676668133428")
        })
        let mid = db.get("game")
        message.guild.channels.cache
            .get("606123818305585167")
            .messages.fetch(mid)
            .then((m) => {
                let allc = m.components
                let row = allc[0]
                let button = row.components[0]
                button.disabled = true
                m.edit({ components: [new MessageActionRow().addComponents(button)] })
            })
        db.delete(`game`)
    },
}
