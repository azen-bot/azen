const hastebin = require(`hastebin-gen`);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const Discord = require(`discord.js`);

    const code = args.join(` `);
    try {
        const evaled = eval(code);
        const clean = await client.clean(client, evaled);
        if (clean.length > 1024) {
            hastebin(clean, `txt`).then((link) => {
                message.channel.sendEmbed(new Discord.RichEmbed()
                    .addField(`Input:`, `\`\`\`js\n${code}\n\`\`\``)
                    .addField(`Output:`, `\`\`\`The output was too long, so I've posted it to hastebin: ${link}\`\`\``)
                    .setColor(0xffffff));
            }).catch(console.error);
            return;
        }
        await message.channel.sendEmbed(new Discord.RichEmbed()
            .addField(`Input:`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`Output:`, `\`\`\`js\n${clean}\n\`\`\``)
            .setColor(0xffffff));
    } catch (err) {
        const errClean = await client.clean(client, err);
        if (errClean.length > 1024) {
            hastebin(errClean, `txt`).then((link) => {
                message.channel.sendEmbed(new Discord.RichEmbed()
                    .addField(`Input:`, `\`\`\`js\n${code}\n\`\`\``)
                    .addField(`Output:`, `\`\`\`The output was too long, so I've posted it to hastebin: ${link}\`\`\``)
                    .setColor(0xffffff));
            }).catch(console.error);
            return;
        }
        await message.channel.sendEmbed(new Discord.RichEmbed()
            .addField(`Input:`, `\`\`\`js\n${code}\n\`\`\``)
            .addField(`:no_entry_sign: | Error!`, `\`\`\`xl\n${errClean}\n\`\`\``)
            .setColor(0xffffff));
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: `Bot Owner`,
};

exports.help = {
    name: `eval`,
    category: `System`,
    description: `Evaluates javascript.`,
    extendedDescription: `I evaluate any arbitrary javascript you give me and I give you the output!`,
    usage: `eval [code]`,
};
