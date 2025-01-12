$(document).ready(function() {
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
        }, 8000);
    });

    let clickCounter = 0;
    const blackScreen = $('.black-screen');
    const elementPhrase = $('.black-screen p');
    const phrase = "Não insista, você já sabe o CAMINHO...";

    $('#logo').click(function() {
        clickCounter++;

        if (clickCounter === 3) {
            let i = 0;

            function typer() {
                if (i < phrase.length) {
                    elementPhrase.append(phrase[i++]);
                    setTimeout(typer, 50);
                }
            }

            typer();

            blackScreen.css('display', 'flex');

            setTimeout(() => {
                blackScreen.fadeOut(10000);
            }, (phrase.length * 100) + 500);

            clickCounter = 0;
        }
    });

});