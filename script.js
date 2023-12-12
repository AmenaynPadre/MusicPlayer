const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audio = document.getElementById('audio');
const songName = document.getElementById('name');
const img = document.querySelector('.pic');
const buttons = document.querySelectorAll('.btn');

let start = document.querySelector('.start');
let end = document.querySelector('.end');

const songs = ['Dying Slowly' , 'Hu Man' , 'Talk To Me'];

let songIndex = 0;


// /////////////////////////////////////////////////////////

function toggleAudioStatus(){
    if(audio.paused){
        audio.play();
        playBtn.innerHTML= '<i class="fa-solid fa-pause"></i>'
    }else{
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play">'
    }
    console.log(audio);
}

playBtn.addEventListener('click', toggleAudioStatus);


// /////////////////////////////////////////////////////////

function setAudioProgress() {
    audio.currentTime = (this.value * audio.duration) / 100;
}

progress.addEventListener('input', setAudioProgress);


// /////////////////////////////////////////////////////////


function updateProgress(){
    progress.value = (audio.currentTime / audio.duration) * 100
    // console.log(audio.currentTime % 60);

    let mins = Math.floor(audio.currentTime / 60);
    if (mins < 10) {
        mins = '0' + mins;
    }

    let secs = Math.floor(audio.currentTime % 60);
    if (secs < 10) {
        secs = '0' + secs;
    }

    start.innerHTML = `${mins}:${secs}`;
}

audio.addEventListener('timeupdate' , updateProgress);


// /////////////////////////////////////////////////////////

audio.addEventListener('loadedmetadata',()=>{
    let mins = Math.floor(audio.duration / 60);
    if (mins < 10) {
        mins = '0' + mins;
    }

    let secs = Math.floor(audio.duration % 60);
    if (secs < 10) {
        secs = '0' + secs;
    }

    end.innerHTML = `${mins}:${secs}`
    }
)


// /////////////////////////////////////////////////////////


buttons.forEach(function(button){
    button.addEventListener('click' , function(){
        if(button.classList.contains('prev')){
            prev()
        }
        if(button.classList.contains('next')){
            next()
        }
    })
})

audio.addEventListener('ended',next);



// FUNCTIONS HELPERS

function next(){
    songIndex++
    if(songIndex > songs.length - 1 ){
        songIndex = 0;
    }
    progress.value = 0
    audio.currentTime = 0
    songInfo()
    toggleAudioStatus();
}

function prev(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    progress.value = 0
    songInfo();
    toggleAudioStatus();
}

function songInfo(){
    songName.innerHTML = songs[songIndex];
    audio.src = `songs/${songs[songIndex]}.mp3`;
    img.src = `photo/img${songIndex}.jpg`;
}