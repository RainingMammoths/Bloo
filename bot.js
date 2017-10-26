var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var participants = new Array(0);
var participantsString = new String('Participants: ');
var maxRounds;
var currentRound;
var topic;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping 
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
						break;
						case 'participants':
								for (i = 0; i < participants.length; i++) {
										logger.info(participants[i]);
										participantsString.prototype.concat(participants);
										logger.info(participantsString);
								}
								bot.sendMessage({
										to: "372548390606733332",
										message: participantsString
								});
						break;
						case 'join':
								participants.push(userID.toString());
								bot.sendMessage({
										to: "372548390606733332",
										message: user + " is now participating!"
								});
            break;
            // Just add any case commands if you want to..
         }
     }
});