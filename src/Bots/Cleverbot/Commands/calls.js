const Commands = require(`../../../__Global/Structures/Commands`);
const { basename } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownAmount: 1,
			cooldownTime: 3,
			limit: false,
			limitAmount: 3,
			limitTime: 86400,
			name: basename(__filename, `.js`),
			description: `Lists Used API Calls vs Total API Calls`,
			usage: `Calls`,
			aliases: []
		});
	}

	run(client, message) {
		client.database.find({}).then(data => {
			client.send(message, `${data[0].USED_API_CALLS} / ${data[0].TOTAL_API_CALLS}\n`);
		});
	}
}

module.exports = Command;
