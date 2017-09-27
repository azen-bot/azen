const Discord = require(`discord.js`);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const msg = await message.channel.send(`Pinging...`);
    const embed = new Discord.RichEmbed()
        .addField(`Pong!`, `Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
        .setColor(0xffffff);

    msg.edit({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: `User`,
};

exports.help = {
    name: `ping`,
    category: `Miscelaneous`,
    description: `Pong! Checks delay time.`,
    extendedDescription: `Pong! I will tell you how long the message took to send!`,
    usage: `ping`,
};
