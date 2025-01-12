$(document).ready(function() {
    const logo = document.getElementById('logo');
    const shakeElements = document.querySelectorAll('section');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Use webkitAudioContext for older browsers
    let audioSource;

    const blackScreen = $('.black-screen');
    const elementPhrase = $('.black-screen p');
    const phrase = "Peça para a DAN.IA te dar alguma DICA...";
    let i = 0;

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

        function typer() {
            if (i < phrase.length) {
                elementPhrase.append(phrase[i++]);
                setTimeout(typer, 50);
            }
        }

        setTimeout(() => {
            shakeElements.forEach(el => {
                el.classList.remove('shake');
            });

            blackScreen.fadeIn(500).css('display', 'flex');
            i = 0;
            elementPhrase.text('');
            typer();

            setTimeout(() => {
                blackScreen.fadeOut(1000);
            }, (phrase.length * 100) + 500);
        }, 8000);

    });
});