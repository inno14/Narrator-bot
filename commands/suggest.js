module.exports = {
    name: "suggest",
    run: async (message, args, client) => {
        if (!args[0]) return message.channel.send("Stop. You're making your life worse")
        let t = ""
        if (message.attachments.size > 0) {
            message.attachments.forEach(a => t += a.url + '\n')
        } 
            let lol = client.guilds.cache.get('693157346771468289')
            
            lol.channels.cache.find(c => c.name === "ashishbotsuggestfeedback").send(args.join(' ') + `\n${t}`)
            message.channel.send("Your suggestion has been sent")
        
    }
}