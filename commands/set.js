const Discord = require(`discord.js`);
const { inspect } = require(`util`);

exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars
    const settings = client.settings.get(message.guild.id);

    console.log(settings);

    if (action === `edit`) {
        if (!key) {
            await message.channel.sendEmbed(new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `Please specify a key to edit...`)
                .setColor(0xffffff));
            return;
        }
        if (!settings[key]) {
            await message.channel.sendEmbed(new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `That key does not exist!`)
                .setColor(0xffffff));
            return;
        }
        if (value.length < 1) {
            await message.channel.sendEmbed(new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `Please specify a new value`)
                .setColor(0xffffff));
            return;
        }

        settings[key] = value.join(` `);

        client.settings.set(message.guild.id, settings);
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField(`Success!`, `${key} successfully edited to ${value.join(` `)}`)
            .setColor(0xffffff));
    } else
    if (action === `get`) {
        if (!key) {
            message.channel.sendEmbed(new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `Please specify a key to view`)
                .setColor(0xffffff));
            return;
        }
        if (!settings[key]) {
            await message.channel.sendEmbed(new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `This key does not exist in the settings`)
                .setColor(0xff5454));
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
