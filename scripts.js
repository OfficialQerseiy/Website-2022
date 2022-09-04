import { getAccessToken, getNowPlaying, getData } from "./spotify.js";

const spotifyContainer = document.querySelector(".spotify-container");
const songImageHtml = document.querySelector(".song-image");
const authorNameHtml = document.querySelector(".author-name");
const songNameHtml = document.querySelector(".song-name");

getAccessToken();
getNowPlaying();
let songDetails = await getData();

if (songDetails != false && songDetails.is_playing == true) {
  spotifyContainer.style.display = "flex";
  songImageHtml.src = songDetails.item.album.images[1].url;
  authorNameHtml.innerHTML = songDetails.item.album.artists[0].name;
  songNameHtml.innerHTML = songDetails.item.name;
}

const musicBars = document.querySelectorAll(".bar");

let delay = 0;

musicBars.forEach((bar) => {
  delay = delay + 0.5 + Math.floor(Math.random() * 2);
  let barId = document.querySelector(`#${bar.id}`);

  barId.style.animationDelay = `${delay}s`;
});
