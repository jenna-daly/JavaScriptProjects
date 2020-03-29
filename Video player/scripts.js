/*Get our elements*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]'); //anything w data-skip attribute
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');

/*Build out functions*/
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
//     if(video.paused) {
//         video.play();
//     }
//     else {
//         video.pause();
//     }
}
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.innerHTML = icon;
}
function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); 
}
function handleRangeUpdate() {
    // console.log(this.value);
    // console.log(this.name);
    video[this.name] = this.value;
}
function handleProgress() {
    //flex basis is where bar is based on %
    const percent = (video.currentTime / video.duration) * 100; 
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
    const scrubtime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubtime;
    console.log(e);
}
function goFullScreen() {
    console.log('fs');
    video.requestFullscreen();
}
/*Hook up the event listeners*/
//pause and play video from button click or video click
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
//change button icon from pause or play
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
//skip 25 secs or go back 10 secs
skipButtons.forEach(button => button.addEventListener('click', skip));
//volume and playback speed
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
//progress bar
video.addEventListener('timeupdate', handleProgress);
//scrub video
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
//full screen
fullScreen.addEventListener('click', goFullScreen);