const { SlashCommandBuilder, Colors, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('up')
		.setDescription('メンバーをUpします。')
		.addUserOption(option => option.setName('メンバー').setDescription('Upするメンバー').setRequired(true)),
	execute: async function(interaction) {
        const member_embed = new EmbedBuilder()
          .setTitle('エラーが発生しました。')
          .setColor(Colors.Red)
          .setTimestamp()
          .setDescription("あなたの権限がありません。: メンバー名権限")

        if(!interaction.member.permissions.has(PermissionFlagsBits.ManageNicknames)) return await interaction.reply({
            embeds: [member_embed]
        })

		const bot_embed = new EmbedBuilder()
			.setTitle('エラーが発生しました。')
			.setColor(Colors.Red)
			.setTimestamp()
			.setDescription("Botの権限がありません。: メンバー名権限")

		if(!interaction.guild.members.me.permissionsIn(interaction.channel).has(PermissionFlagsBits.ManageNicknames)) return await interaction.reply({
			embeds: [bot_embed]
		})

		await interaction.deferReply();

		const member = interaction.options.getUser("メンバー");
		try {
			const member_ = await interaction.guild.members.fetch(member.id);
			await member_.setNickname(null);
			await member_.setNickname(`!${member_.displayName}`);
			const edit_ok = new EmbedBuilder()
				.setTitle('メンバーをUpしました。')
				.setColor(Colors.Green)
				.setTimestamp()
			await interaction.editReply({embeds: [edit_ok]});
		} catch(e) {
			const edit_error = new EmbedBuilder()
				.setTitle('メンバーをUpできませんでした。')
				.setColor(Colors.Red)
				.setTimestamp()
				.setDescription("```" + `${e}` + "```")
			await interaction.editReply({embeds: [edit_error]});
		}
	},
};