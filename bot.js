var Discord = require("discord.io");
var logger = require("winston");
var auth = require("./auth.json");

var participants = new Array(0);
var participantsString = new String("");
var accuses = 0;
var topic;
var chameleon;
var round_state = [false, 0];
var maxRounds = 10;
var currentRound = 0;

var topics = [
  ["Lietuva", "Latvija", "Rusija", "Norvegija", "Kanada", "Meksika", "Vokietija", "Pietu Koreja", "Siaures Koreja", "Pietu Afrika", "Egiptas", "Grenlandija","Japonija","Kinija","Austrija","Danija", "Estija", "Prancuzija", "Venesuela", "Kuba", "Hawaju salos", "Lenkija", "Ispanija", "Kinija", "JAV", "Nigerija"],
  ["Casually explained", "Kilian Experience", "dolan Dark", "Filthy Frank", "iDubbbz", "summit1g", "Gigguk", "Pewdiepie", "Jake Paul", "Vsauce", "Keemstar", "Melon pan"],
	["Running in the 90s","Pharrel Williams - Happy","Trance007","Guru project - Infinity", "Freestyler", "Darude sandstorm","Bloodhound Gang - The Bad Touch", "Fort minor - remember the name","Eminem - Lose Yourself","Michael Jackson - Smooth Criminal","a-ha - Take On Me","Queen - Bohemian Rhapsody", "I'm blue", "Gas gas gas"],
	["Akali", "Master Yi", "Lee Sin", "Zed", "Syndra", "Ahri", "Ezreal", "Caitlyn", "Poppy", "Maokai", "Thresh", "Soraka", "Ziggs"],
	["Kebab", "Spaghetti", "Hot Dog", "Pizza", "Croissant", "Hamburger", "Cake", "Cookies", "Bananas with nutella", "Popcorn", "Candy", "French friski", "Potato dumplings stuffed with meat"],
	["Dovis", "Incomirican", "Rainoth", "Jonas(Fenfaril)", "Dakksy", "Xumis", "Modestux", "Cowsusaurus", "IGAnova"],
	["Batman","Superman","Spiderman","The Flash","WonderWamen","Ninja Turtles","Iron Man","Hulk","Thor","Captain America","Wolverine"],
	["Harry Potter", "The Matrix", "Fast and Furiuos", "Pirates of the Carribean", "The Avengers", "Deadpool", "Inception", "Frozen", "Finding Nemo", "The Godfather", "The Lord of the Rings", "Interstellar", "The Lion King", "Toy Story", "Ocean's Eleven", "Up", "Rocky", "Jaws"],
	["League of Legends", "PUBG", "Grand Theft Auto", "Defence of the Ancients", "Warframe", "Counter-Strike", "Mortal Kombat", "The Witcher", "Don't Starve", "The Elder Scrolls", "Fallout", "Super Mario", "Resident Evil", "Assassin's Creed", "FIFA", "The Last of Us", "Dishonored", "Need for Speed", "Overwatch", "Doom", "Dark Souls", "Final Fantasy", "No Man's Sky", "Watch Dogs", "Heroes of Might and Magic", "World of Warcraft", "Runescape", "Club Penguin", "VR Chat", "Legend of Zelda", "DayZ", "Hearthstone", "Worms", "Goat Simulator", "Borderlands", "Mass Effect", "Pokemon", "Outlast", "Amnesia", "Far Cry", "Age of Empires", "Diablo", "Left 4 Dead", "Half-life", "Portal", "Call of Duty", "Halo", "Team Fortress", "Rocket League"]//,
	["Pizza time", "Oh shit wadup", "Boneless pizza", "HuuWudVin","Be Like Bill", "But That's None of My Business", "Grumpy cat", "Doge! Much Wow, Such Fun...", "All Your Base Are Belong to Us", "Good Guy Greg"]
];


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function distributePoints() {
  if (round_state[0] == false) {
    participants[chameleon][3] += 2;
    bot.sendMessage({
    to: "372516469851815937",
    message: "Chameleon wins 2 points!"
    });
  }
  else if (round_state[0] == true && round_state[1] == 2) {
    for (i = 0; i < participants.length; i++) {
      if (participants[i] != participants[chameleon]) {
        participants[i][3] += 2;
      }
    }
    bot.sendMessage({
    to: "372516469851815937",
    message: "All players except for the Chameleon win 2 points!"
    });
  }
  else if (round_state[0] == true && round_state[1] == 1) {
    participants[chameleon][3]++;
    bot.sendMessage({
    to: "372516469851815937",
    message: "Chameleon wins 1 point!"
    });
  }
}

function getParticipants() {
	participantsString = "";
	for (i = 0; i < participants.length; i++) {
		if (i == 0) {
			participantsString = (i+1)+"."+participantsString+participants[i][0]+": "+participants[i][3]+", ";
		}
		else {
			participantsString = participantsString+(i+1)+"."+participants[i][0]+": "+participants[i][3]+", ";
		}
	}
	if (participants.length > 0) {
		participantsString = participantsString.slice(0,-2);
	}
	else {
		participantsString = "There are no participants.";
	}
}

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
								to: "372516469851815937",
								message: 'Pong!'
						});
					break;
					
					case 'test':
						console.log(participants);
					break;
					case 'participants':
						getParticipants();
						bot.sendMessage({
								to: "372516469851815937",
								message: "Participants: "+participantsString
						});
						participantsString = "";
					break;
					case 'next':
							if (currentRound != maxRounds) {
								round_state = [false, 0];
								accuses = 0;
								for (i = 0; i < participants.length; i++) {
									participants[i][2] = 0;
								}
								currentRound++;
								participants = shuffle(participants);
								topic = topics[Math.floor(Math.random() * (topics.length))];
								thing = Math.floor(Math.random() * (topic.length)); 
								chameleon = Math.floor(Math.random() * (participants.length)); 
								for (i = 0; i < participants.length; i++) {
									if (participants[i][1] == participants[chameleon][1]) {
										bot.sendMessage({
										to: participants[i][1],
										message: ("Round: "+currentRound+ "\nYou are the Chameleon")
										});
										continue;
									}
									else {
										bot.sendMessage({
										to: participants[i][1],
										message: ("Round: "+currentRound+ "\nTopic: "+topic[thing])
										});
									}
								}
								getParticipants();
								bot.sendMessage({
									to: "372516469851815937",
									message: ("The order for round "+currentRound+" is: "+participantsString)
								});
								
								var topicString = "Topics: ";
								for (i = 0; i < topic.length; i++) {
									topicString = topicString+(i+1)+"."+topic[i]+" ";
									if (i+1 % 4 == 0) {
										topicString = topicString+"\n";
									}
								}
								topicString = topicString.slice(0,-1);
								
								bot.sendMessage({
										to: "372516469851815937",
										message: topicString
								});
								topicString = "Topics: ";
							}
							else {
								currentRound = 1;
								// new game
							}
					break;
					case 'join':
							var contains = false;
							for (i = 0; i < participants.length; i++) {
								if (participants[i].includes(userID)) {
									bot.sendMessage({
									to: userID,
									message: "You are already participating!"
									});
									contains = true;
								}
							}
							if (contains == false) {
								participants.push([user, userID, 0, 0]);
								bot.sendMessage({
								to: "372516469851815937",
								message: user + " is now participating!"
								});
							}
					break;
					case 'guess':
						console.log(args[0]-1+" "+" "+round_state[1]+" "+thing)
						if (userID == participants[chameleon][1] & accuses == participants.length) {
							if (args[0]-1 == thing) {
								round_state[1] = 1;
							}
							else {
								round_state[1] = 2;
							}
							distributePoints();
						}
						else {
							bot.sendMessage({
							to: userID,
							message: "You are not the Chameleon!"
							});
						}
					break;
					case 'accuse':
						if (args[0]-1 < participants.length) {
							participants[args[0]-1][2]++;
							accuses++;
							if (accuses == participants.length) {
								var max = 0;
								var same = 0;
								for (i = 0; i < participants.length; i++) {
									if (participants[i][2] > max) {
										max = participants[i][2];
									}
								}
								for (i = 0; i < participants.length; i++) {
									if (participants[i][2] == max) {
										same++;
									}
								}
								if (same > 1) {
									round_state[0] = false;
								}
								else {
									for (i = 0; i < participants.length; i++) {
										if (participants[i][2] == max) {
											if (participants[i] == participants[chameleon]) {
												round_state[0] = true;
												bot.sendMessage({
												to: "372516469851815937",
												message: "The players guessed that "+participants[chameleon][0]+" was the Chameleon! Chameleon has to guess the thing now."
												});
											}
											else {
												round_state[0] = false;
												bot.sendMessage({
												to: "372516469851815937",
												message: "The players failed to guess the Chameleon!"
												});
											}
										}
									}
								}
							console.log(round_state[0]+" "+round_state[1]+" "+max+" "+same+" "+participants.length);
							distributePoints();
							}
						}
					break;
					// 1. chameleon neatspetas (+2 cham, 0 kiti) 
					// 2. chameleon atspetas bet thing irgi atspetas (+1 cham, 0 kiti)
					// 3. chameleonas atspetas ir thing neatspetas (0 cham, +1 kiti)
					case 'leave':
							var contains = false;
							for (i = 0; i < participants.length; i++) {
								if (participants[i].includes(userID)) {
									contains = true; 
									participants[i] = participants[participants.length-1];
									participants.pop();
								}
							}

							if (contains == true) {
								bot.sendMessage({
								to: "372516469851815937",
								message: user + " is no longer participating!"
								});
							}
							else {
								bot.sendMessage({
								to: userID,
								message: "You are not even participating!"
								});
							}
					break;
					
			 }
			 bot.deleteMessage({
				 channelID: "372516469851815937",
				 messageID: evt.d.id
			 });
	 }
});