const Discord = require(`discord.js`);
const { inspect } = require(`util`);

exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars
    const settings = client.settings.get(message.guild.id);

    console.log(settings);

    if (action === `edit`) {
        if (!key) {
            await client.send(Discord, message.channel, `Error!`, `Please specify a key to edit...`);
            return;
        }
        if (!settings[key]) {
            await client.send(Discord, message.channel, `Error!`, `That key does not exist!`);
            return;
        }
        if (value.length < 1) {
            await client.send(Discord, message.channel, `Error!`, `Please specify a new value!`);
            return;
        }

        settings[key] = value.join(` `);

        client.settings.set(message.guild.id, settings);

        client.send(Discord, message.channel, `Success!`, `\`${key}\` successfully edited to \`${value.join(` `)}\``)
    } else
    if (action === `get`) {
        if (!key) {
            client.send(Discord, message.channel, `Error!`, `Please specify a key to view!`)
            return;
        }
        if (!settings[key]) {
            client.send(Discord, message.channel, `Error!`, `This key does not exist in the settings`)
        }
        message.reply(`The value of ${key} is currently ${settings[key]}`);
    } else {
        message.channel.send(inspect(settings), { code: `json` });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`setting`, `settings`, `conf`],
    permLevel: `Administrator`,
};

exports.help = {
    name: `set`,
    category: `System`,
    Desccription: `Settings for this server`,
    extendedDescription: `I set the settings for this server! Requires perm level 3`,
    usage: `set [view/get/edit] [key] [value]`,
};
