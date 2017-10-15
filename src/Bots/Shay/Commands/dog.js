const Commands = require(`../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { get } = require(`snekfetch`);
const { parse } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownTime: 3,
			name: parse(__filename).base.replace(`.js`, ``),
			description: `Random dog picture`,
			usage: `Dog`,
			aliases: []
		});
	}

	run(client, message) {
		get(`https://random.dog/woof`).then(data => {
			const embed = new MessageEmbed()
				.setImage(`http://random.dog/${data.text}`);
			client.send(message, { embed });
		});
	}
}

module.exports = Command;