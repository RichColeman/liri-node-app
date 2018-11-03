// node spotify api key/secret
// request
// 
// user input
const userInput = process.argv.slice(2);
// make a decision based on the command
switch (userInput[0]){
    case "concert-this":
    concertThis();
    break;
    case "spotify-this-song":
    spotifyThisSong();
    break;
    default:
    console.log("Hmm, i don't know that one. Try again with a different command.")
}

function concertThis(){
    console.log("CONCERT THIS!");
}

function spotifyThisSong(){
    console.log("SPOTIFY THIS SONG!")
}



