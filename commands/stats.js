const Discord = require(`discord.js`);
const { version } = require(`discord.js`);
const moment = require(`moment`);
require(`moment-duration-format`);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");    
    const embed = new Discord.RichEmbed()
        .setAuthor(`Stats for ${client.user.tag}`, client.user.avatarUrl)
        .setDescription(`Here are a few stats!`)
        .addField(`Mem Usage:`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb`, true)
        .addField(`Uptime:`, `${duration}`, true)
        .addField(`Users:`, client.users.size.toLocaleString(), true)
        .addField(`Channels:`, client.channels.size.toLocaleString(), true)
        .addField(`Servers:`, client.guilds.size.toLocaleString(), true)
        .addField(`Discord.js:`, version, true)
        .addField(`Node.js:`, process.version, true)
        .addField(`Azen:`, `v0.0.1`, true)
        .setColor(0xFF2267);
    message.channel.send({ embed });
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: `User`,
};

exports.help = {
    name: `stats`,
    category: `Miscelaneous`,
    description: `Gives some stats about the bot`,
    extendedDescription: `I give some useful stats about myself!`,
    usage: `ping`,
};
