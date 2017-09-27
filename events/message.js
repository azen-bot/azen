module.exports = (client, message) => {
    if (message.author.bot) return;

    const settings = message.guild
        ? client.settings.get(message.guild.id)
        : client.config.defaultSettings;

    message.settings = settings;

    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g).slice(1);
    const command = message.content.slice(settings.prefix.length).trim().split(/ +/g)[0];

    const level = client.permlevel(message);

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if (!cmd) return;

    if (cmd && !message.guild && cmd.conf.guildOnly) {
        return message.channel.send(`This command is unavailable via private message. Please run this command in a guild.`);
    }

    if (level < client.levelCache[cmd.conf.permLevel]) {
        if (settings.systemNotice === `true`) {
            return message.author.send(`[**CMD**] You do not have permission to use this command. Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name}). This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
        }
    }
    client.log(`log`, `${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "CMD");
    cmd.run(client, message, args, level);
};
