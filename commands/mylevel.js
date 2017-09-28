const Discord = require(`discord.js`);

exports.run = async (client, message, args, level) => {
    const friendly = client.config.permLevels.find(l => l.level === level).name;
    client.send(Discord, message.channel, `Permissions Level:`, `Your permission level is: ${level} - ${friendly}`);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: `User`,
};

exports.help = {
    name: `mylevel`,
    category: `Miscelaneous`,
    description: `Tells you your permission level`,
    extendedDescription: `Tells you your permission level for the current message location.`,
    usage: `mylevel`,
};
