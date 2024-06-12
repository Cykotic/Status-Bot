require('dotenv').config();
const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    Partials,
    ActivityType,
    time
} = require('discord.js');

const botToken = process.env.TOKEN;
const monitoredBotIds = process.env.MONITORED_BOT_IDS.split(',').map(id => id.trim());
const channelId = process.env.CHANNEL_ID;

const BOT_NAME = "Status Bot";
const STATUS_OFFLINE = "offline";
const STATUS_DND = "dnd";
const COLOR_OFFLINE = '#808080'; // Grey
const COLOR_ONLINE = '#FF0000'; // Red

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)]
})

client.on('ready', async () => {
    console.log(`${BOT_NAME} is now online!`);
    await client.user.setPresence({
        activities: [{
            name: `6 Bots`,
            type: ActivityType.Watching
        }],
        status: "dnd"
    });
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    if (!newPresence || !newPresence.userId || oldPresence ?.status === newPresence.status) return;
    if (!monitoredBotIds.includes(newPresence.userId)) return;

    const bot = client.users.cache.get(newPresence.userId);
    const channel = client.channels.cache.get(channelId);
    if (!channel || !bot) {
        console.error("Channel or bot not found");
        return;
    }

    const guild = channel.guild;
    const guildName = guild.name;
    const guildIconURL = guild.iconURL();

    let title, color, fields;

    switch (newPresence.status) {
        case STATUS_OFFLINE:
            title = `${bot.username} is offline.`;
            color = COLOR_OFFLINE;
            fields = [{
                name: 'Last Seen:',
                value: time(new Date(), 'R')
            }];
            break;
        case STATUS_DND:
            title = `${bot.username} is now Online`;
            color = COLOR_ONLINE;
            fields = [{
                name: 'Date/Time:',
                value: time(new Date(), 'R')
            }];
            break;
        default:
            return;
    }

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setColor(color)
        .addFields(fields)
        .setFooter({
            text: guildName,
            iconURL: guildIconURL
        })
        .setTimestamp();

    channel.send({
        embeds: [embed]
    }).catch(console.error);
});

client.login(botToken);