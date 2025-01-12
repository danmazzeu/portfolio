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

    $('#logo').click(function() {
        clickCounter++;

        if (clickCounter === 3) {
            let blackScreen = $('<div class="black-screen"></div>');
            $('body').append(blackScreen);

            blackScreen.fadeIn(500, function() {
                let phrase = "Não insista, você já sabe o CAMINHO...";
                let i = 0;
                let elementPhrase = $('<p></p>');
                blackScreen.append(elementPhrase);

                function typer() {
                    if (i < phrase.length) {
                        elementPhrase.append(phrase[i]);
                        i++;
                        setTimeout(typer, 100);
                    }
                }

                typer();

                setTimeout(function() {
                    blackScreen.fadeOut(10000, function() {
                        blackScreen.remove();
                        elementPhrase.remove();
                    });
                }, (phrase.length * 100) + 500);
            });

            clickCounter = 0;
        }
    });

});