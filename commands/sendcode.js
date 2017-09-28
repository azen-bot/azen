const Discord = require(`discord.js`);
const fs = require(`fs`);

exports.run = async (client, message, args) => {
    let command;
    if (client.commands.has(args[0])) {
        command = client.commands.get(args[0]);
    } else if (client.aliases.has(args[0])) {
        command = client.commands.get(client.aliases.get(args[0]));
    }
    if (!command) {
        client.send(Discord, message.channel, `Error!`, `The command \`${args[0]}\` doesn't seem to exist...`);
        return;
    }

    command = command.help.name;

    const body = fs.readFileSync(`./commands/${command}.js`);

    if (body.length < 2000) {
        message.channel.send(`\`\`\`js\n${body}\n\`\`\``);
    } else {
        message.channel.send({ files: [`./commands/${command}.js`] });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: `Bot Owner`,
};

exports.help = {
    name: `sendcode`,
    category: `System`,
    description: `Sends the code of the command`,
    extendedDescription: `I send the code of an command so I can show people how spaghetti my code is!`,
    usage: `sendcode [command]`,
};
