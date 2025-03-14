const { SlashCommandBuilder, Colors, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('メンバーのUpをリセットします。')
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

		const member = interaction.options.getUser("メンバー");
        await interaction.deferReply();

		try {
			const member_ = await interaction.guild.members.fetch(member.id);
			await member_.setNickname(null);
			const edit_ok = new EmbedBuilder()
				.setTitle('メンバーのUpをリセットしました。')
				.setColor(Colors.Green)
				.setTimestamp()
			await interaction.editReply({embeds: [edit_ok]});
		} catch(e) {
			const edit_error = new EmbedBuilder()
				.setTitle('メンバーのUpをリセットできませんでした。')
				.setColor(Colors.Red)
				.setTimestamp()
				.setDescription("```" + `${e}` + "```")
			await interaction.editReply({embeds: [edit_error]});
		}
	},
};