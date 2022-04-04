const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
    .setName("wuerfel")
    .setDescription("Würfel werfen")
    .addIntegerOption(option =>
        option
            .setName("anzahl")
            .setDescription("Die Anzahl der Würfel!")
            .setRequired(true)
        )
    .addStringOption(option => 
        option
            .setName("seitenzahl")
            .setDescription("Die Seitenzahl des Würfels!")
            .setRequired(true)
        ),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * 
     */
    run: async (client, interaction, args) => {

        const dices = interaction.options.getInteger("anzahl");
        const sites = interaction.options.getString("seitenzahl");

        if (!sites.startsWith("D")) return interaction.followUp("Die **Seitenzahl** muss mit **D** anfangen!");
        
        const splittedSites = sites.split("D");
        const sitesNumber = parseInt(splittedSites[1]);
        
        if (isNaN(sitesNumber)) return interaction.followUp("Die **Seitenzahl** ist ungültig!");
        if (sitesNumber > 20 || sitesNumber < 4) return interaction.followUp("Minimale Seitenzahl: 4\nMaximale Seitenzahl: 20");

        let results = [];

        for (let i=0; i<dices; i++) {

            const number = Math.floor(Math.random() * sitesNumber + 1);
            results.push(number);
        }

        const embed = new Discord.MessageEmbed()
        .setTitle(`🎲 Ergebnisse 🎲`)
        .setColor("BLUE")
        .setFooter("Bot developed by F.O.X.Y", "https://bilderupload.org/image/813735985-foxy-original.png");

        results.forEach((result, index) => {
            embed.addFields({name: `${index+1}. Würfel`, value: `${result}`});
        });
        return interaction.followUp({embeds: [embed]});
    },
};
