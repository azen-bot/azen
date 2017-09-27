module.exports = (client, guild) => {
    client.settings.set(guild.id, client.config.defaultSettings);
};
