const Commands = require(`../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { parse } = require(`path`);

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace(`.js`, ``),
      description: `Shows guild information on the mentioned user`,
      usage: `UserInfo [Mention/ID]`,
      aliases: [`user`]
    });
  }

  run(client, message, args) {
    if (message.mentions.members.array().size) {
      message.member = message.mentions.members.first();
    } else {
      message.member = message.guild.members.get(args[0]);
    }

    const embed = new MessageEmbed()
      .addField(`User Name`, message.member.user.username, true)
      .addField(`Guild Nickname`, message.member.nickname === null ? `No Nickname` : message.member.nickname, true)

      .addField(`Status`, this.resolveStatus(message.member), true)
      .addField(`Game`, message.member.presence.game ? message.member.presence.game.name : `None`, true)

      .addField(`Roles (A-Z)`, message.member.roles.map(role => `\`${role.name}\``).sort().join(`\n`).replace(/@/g, ``))
      .addField(`Server Join Date`, message.member.joinedAt)
      .addField(`Account Creation Date`, message.member.user.createdAt)

      .setThumbnail(message.member.user.displayAvatarURL())
      .setColor(0x00FF00)
      .setFooter(client.botName)
      .setTimestamp();
    client.send(message, { embed });
  }

  resolveStatus(member) {
    member.user.presence.status
      .replace(`online`, `Online`)
      .replace(`offline`, `Offline`)
      .replace(`idle`, `Away`)
      .replace(`dnd`, `Do Not Disturb`);
  }
}

module.exports = Command;
