const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: ["filter", "bass"],
    description: "เปิดโหมด bass filter",
    category: "Filter",
    permissions: {
        channel: [],
        bot: [],
        user: []
    },
    settings: {
        isPremium: false,
        isPlayer: true,
        isOwner: false,
        inVoice: false,
        sameVoice: true,
    },
    run: async (interaction, client, user, language, player) => {
        await interaction.deferReply({ ephemeral: false });

        const msg = await interaction.editReply(`${client.i18n.get(language, "filters", "filter_loading", {
            name: "bass"
        })}`);

        const data = {
            op: 'filters',
            guildId: interaction.guild.id,
            equalizer: [
                { band: 0, gain: 0.10 },
                { band: 1, gain: 0.10 },
                { band: 2, gain: 0.05 },
                { band: 3, gain: 0.05 },
                { band: 4, gain: -0.05 },
                { band: 5, gain: -0.05 },
                { band: 6, gain: 0 },
                { band: 7, gain: -0.05 },
                { band: 8, gain: -0.05 },
                { band: 9, gain: 0 },
                { band: 10, gain: 0.05 },
                { band: 11, gain: 0.05 },
                { band: 12, gain: 0.10 },
                { band: 13, gain: 0.10 },
            ],
        }
        
        await player.node.send(data);

        const bassed = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "filters", "filter_on", {
                name: "bass"
            })}`)
            .setColor(client.color);

        await delay(2000);
        msg.edit({ content: " ", embeds: [bassed] });
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}