const Commands = require('../Structures/Commands');
const { exec } = require('child_process');
const { parse } = require('path');

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace('.js', ''),
      description: 'Executes bash/batch commands',
      usage: 'Exec [Command]',
      aliases: ['']
    });
  }

  async run(client, message, args) {
    if (args.length < 1) return client.missingArgs(message);
    if (!client.ownerIDs.includes(message.author.id)) return;

    exec(args.join(' '), { cwd: '../../' }, (err, stdout, stderr) => {
      if (err) return client.errorEmbed(message, args.join(' '), err, 'bash');
      if (stderr) return client.errorEmbed(message, args.join(' '), stderr, 'bash');

      client.successEmbed(message, args.join(' '), stdout, 'bash');
    });
  }
}

module.exports = Command;
