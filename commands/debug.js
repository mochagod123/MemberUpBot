const { SlashCommandBuilder, Colors, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('debug')
		.setDescription('デバッグを実行します。'),
	execute: async function(interaction) {
        var nick_edit = "✅";
        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageNicknames)) {
            nick_edit = "❌"
        }
        const debugembed = new EmbedBuilder()
        .setTitle('デバッグ情報')
        .setColor(Colors.Green)
        .setTimestamp()
        .setDescription(`ManageNicknames: ${nick_edit}`)
        await interaction.reply({embeds: [debugembed]});
	},
};