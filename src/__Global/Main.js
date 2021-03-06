const Client = require(`./Structures/Client`);
const Util = require(`./Structures/Util`);
const { resolve, join } = require(`path`);
const Options = require(join(resolve(`.`), `./Options`));

const client = new Client(Options);
const Loader = new Util;

Loader.init(client).then(() => {
	client.login(process.env[client.botName]).catch(error => { throw error; });
}).catch(error => { throw error; });

process.on(`uncaughtException`, error => {
	client.error(error.stack.replace(new RegExp(`${__dirname}/`, `g`), `./`));
	process.exit();
});

process.on(`unhandledRejection`, error => {
	client.error(error.stack.replace(new RegExp(`${__dirname}/`, `g`), `./`));
});
