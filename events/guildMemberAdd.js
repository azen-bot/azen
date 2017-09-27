module.exports = (client, member) => {
    const settings = client.settings.get(member.guild.id);

    if (settings.welcomeEnabled !== "true") return;

    const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

    member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};
