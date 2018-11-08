// require all of the docs and keys
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const bandsintown = keys.bandsintown;
const request = require("request");
const https = require("https");

// define commands and userInput
const command = process.argv[2];
const userInput = process.argv.slice(3).join(" ");

// create SpotifyThis function
const spotifyThisSong = function() {
  spotify.search(
    {
      type: "track",
      query: userInput,
      limit: 1
    },
    function(err, data) {
      if (err) {
        console.log(
          "Error occurred: " + err + `\nLooks like you need some Ace of Base!\n`
        );
        spotify.search(
          {
            type: "track",
            query: `I Saw The Sign`,
            artists: "Ace of Base",
            limit: 1
          },
          function(err, data) {
            if (err) {
              console.log("whoops");
            }
            const spotifyArtist = data.tracks.items[0].artists[0].name;
            const spotifySong = data.tracks.items[0].name;
            const spotifyAlbum = data.tracks.items[0].album.name;
            const spotifyURL = data.tracks.items[0].external_urls.spotify;
            console.log(
              `========================\nArtist: ${spotifyArtist}\nSong: ${spotifySong}\nAlbum: ${spotifyAlbum}\nSpotify Link: ${spotifyURL}\n========================\n`
            );
          }
        );
      } else {
        // console.log(JSON.stringify(data, null, 2));
        const spotifyArtist = data.tracks.items[0].artists[0].name;
        const spotifySong = data.tracks.items[0].name;
        const spotifyAlbum = data.tracks.items[0].album.name;
        const spotifyURL = data.tracks.items[0].external_urls.spotify;
        console.log(
          `\nHELLO, THANK YOU FOR USING LIRI! SEE INFO BELOW:\n\n========================\nArtist: ${spotifyArtist}\nSong: ${spotifySong}\nAlbum: ${spotifyAlbum}\nSpotify Link: ${spotifyURL}\n========================\n`
        );
      }
    }
  );
};

const concertThis = function() {
  const queryURL =
    "https://rest.bandsintown.com/artists/" +
    userInput +
    "/events?app_id=" +
    bandsintown;
  request(
    queryURL,
    {
      json: true
    },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      } else {
        console.log(`\nHELLO, THANK YOU FOR USING LIRI! SEE INFO BELOW:\n`);
        for (let i = 0; i < body.length && i < 5; i++) {
          let bitVenue = body[i].venue.name;
          let bitArtist = body[i].lineup[0];
          let bitLocation =
            body[i].venue.city +
            ", " +
            body[i].venue.region +
            ", " +
            body[i].venue.country;
          let bitDate = body[i].datetime;
          console.log(
            `========================\n${bitArtist} will be performing on ${bitDate} at:\n${bitVenue}\n${bitLocation}\n========================\n`
          );
        }
      }
    }
  );

  // console.log(body, `Venue: ` + bitVenue, "Artist: " + bitArtist, "Location: " + bitLocation)
};

const movieThis = function() {
  const movieURL = `http://www.omdbapi.com/?apikey=trilogy&t=` + userInput;
  request(
    movieURL,
    {
      json: true
    },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      } else {
        console.log(`\nHELLO, THANK YOU FOR USING LIRI! SEE INFO BELOW:\n`);
        console.log(body);
      }
    }
  );
};

// make a decision based on the command
switch (command) {
  case "concert-this":
    concertThis(userInput);
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    movieThis();
    break;
  default:
    console.log(
      "Hmm, i don't know that one. Try again with a different command."
    );
}
