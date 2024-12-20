$(document).ready(function() {

    const audio = document.getElementById('audioPlayer');
    const playPauseBtn = $('#playPause');
    const prevBtn = $('#prev');
    const nextBtn = $('#next');
    const volumeSlider = $('#volumeControl');
    const musicNameLabel = $('#musicName');
  
    const musicList = [
        'musics/Orbit - Friday Night.mp3', 
        'musics/PVRIS - My House.mp3'
    ];
  
    let currentSongIndex = 0;
  
    function playPause() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.html('<i class="bi bi-pause-fill"></i>');
        } else {
            audio.pause();
            playPauseBtn.html('<i class="bi bi-play-fill"></i>');
        }
    }
  
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % musicList.length;
        audio.src = musicList[currentSongIndex];
        audio.play();
        updateMusicName();
    }
  
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + musicList.length) % musicList.length;
        audio.src = musicList[currentSongIndex];
        audio.play();
        updateMusicName();
    }
  
    function updateMusicName() {
        const currentSong = musicList[currentSongIndex];
        const songName = currentSong.split('/').pop().split('.')[0];
        musicNameLabel.text(songName);
    }
  
    playPauseBtn.click(playPause);
    prevBtn.click(prevSong);
    nextBtn.click(nextSong);
  
    volumeSlider.on('input', function() {
        audio.volume = this.value / 100;
    });
  
    audio.addEventListener('loadedmetadata', updateMusicName);
    audio.src = musicList[currentSongIndex];
    // audio.play();
});