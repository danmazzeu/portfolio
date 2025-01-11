const video = document.querySelector('.presentation-video');
const videos = ['videos/presentation_a.mp4', 'videos/presentation_b.mp4'];

function trocarVideo(newVideo) {
    video.src = newVideo;
}

document.getElementById('logo').addEventListener('click', () => {
    trocarVideo(videos[0]);
    setTimeout(() => {
        trocarVideo(videos[1]);
    }, 19000);
});