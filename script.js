const listen_btn = document.getElementById("listen-btn");
const player = document.getElementById("player");
const played_button = document.getElementById("play-btn");
const audio_position = document.getElementById("audio-position");
const controlBtn = document.getElementById("play-pause");
const seeker = document.getElementById("audio-position");
const time = document.getElementById("current-time");
const audio = new Audio("Space Farming Dome Intro.mp3");

function playPause() {
  if (audio.paused) {
    audio.play();
    controlBtn.className = "pause";
    played_button.classList.toggle("active");
    player.style.opacity = 1;
  } else {
    audio.pause();
    played_button.classList.toggle("active");

    controlBtn.className = "play";
  }
}
listen_btn.addEventListener("click", playPause);
played_button.addEventListener("click", playPause);
audio.addEventListener("ended", function () {
  controlBtn.className = "play";
  played_button.classList.toggle("active");
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  seeker.value = percent;
});

// Allow seeking
audio_position.addEventListener("input", (e) => {
  audio.currentTime = (e.target.value / 100) * audio.duration;
});

audio.ontimeupdate = function () {
  const totalNumberOfSeconds = Math.floor(audio.currentTime);
  const hours = parseInt(totalNumberOfSeconds / 3600);
  const minutes = parseInt((totalNumberOfSeconds - hours * 3600) / 60);
  const seconds = Math.floor(
    totalNumberOfSeconds - (hours * 3600 + minutes * 60)
  );
  const result =
    (minutes < 10 ? +minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  time.innerHTML = result;
};
