const logo = document.getElementById('logo');
const shakeElements = document.querySelectorAll('section');
const audioContext = new (window.AudioContext || window.AudioContext)();
let audioSource;

logo.addEventListener('click', () => {
    if (audioSource) {
        audioSource.stop();
    }

    fetch('/audios/logo.mp3')
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
        audioSource = audioContext.createBufferSource();
        audioSource.buffer = audioBuffer;
        audioSource.connect(audioContext.destination);
        audioSource.start();
    });

    shakeElements.forEach(el => {
        el.classList.add('shake');
    });

    setTimeout(() => {
        shakeElements.forEach(el => {
            el.classList.remove('shake');
        });
    }, 2000);
});