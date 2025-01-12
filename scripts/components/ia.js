$(document).ready(function() {

    $('#ia-form').submit(function(e) { 
        e.preventDefault();
        $('#ia-submit').attr('disabled', true).text('Aguarde...');

        const apiKey = 'AIzaSyCFT4N-asqp0JobkYYfe3ei-2q8ut6W7Cc';
        const apiAnswer = $('#ia-input').val().toLowerCase();
        let requestData;
        const shakeElements = document.querySelectorAll('section');
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let audioSource;


        if (apiAnswer.includes('ancestral')) {
            requestData = {
                contents: [{
                    parts: [{ text: 'Repita exatamente a seguinte frase: Eu simplesmente não acredito que você me encontrou! ** Fiquei anos trancada nessa caverna, esperando que um dia, alguém com muita determinação fosse me encontrar. ** Graças a voccê estou libre para proteger a Floresta Labirinto! ** Estou imensamente grata pela sua ajuda, caso precise de proteção um dia, conte comigo! ** Ficarei te devendo um favor. ** Irei solicitar ao Mago da Floresta para que encaminhe algumas Elfas Ancestrais para te guiar até a saída. ** Vá em paz buscador(a).'}]
                }]
            };
            shakeElements.forEach(el => {
                el.classList.add('shake');
            });
            setTimeout(() => {
                shakeElements.forEach(el => {
                    el.classList.remove('shake');
                });
            }, 8000);
            if (audioSource) {
                audioSource.stop(); 
            }
            fetch('/audios/enigma_4.mp3')
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    audioSource = audioContext.createBufferSource();
                    audioSource.buffer = audioBuffer;
                    audioSource.connect(audioContext.destination);
                    audioSource.start();
                });
        } else if (apiAnswer.includes('criatura')) {
            requestData = {
                contents: [{
                    parts: [{ text: 'Repita exatamente a seguinte frase: Existe um arquivo na raiz deste projeto, ele possui um nome. ** Por favor me ajude a lembrar, era alguma coisa envolvendo criaturas místicas, não me lembro bem. ** O som que eu ouço me parece familiar. ** Encontrei um papel, estava escrito isso, talvez essa seja a chave para desvendar o enigma: ** ?criatura=' }]
                }]
            };
            if (audioSource) {
                audioSource.stop(); 
            }
            fetch('/audios/enigma_3.mp3')
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    audioSource = audioContext.createBufferSource();
                    audioSource.buffer = audioBuffer;
                    audioSource.connect(audioContext.destination);
                    audioSource.start();
                });
        } else if (apiAnswer.includes('dica')) {
            requestData = {
                contents: [{
                    parts: [{ text: 'Repita exatamente a seguinte frase: Ei!! Você também ouviu o som assustador? ** O caminho para o enigma possui uma extensão. ** Preste atenção nas palavras, você está próximo(a)! ** Vasculhe o código-fonte, deixei algo escrito lá para você.' }]
                }]
            };
            if (audioSource) {
                audioSource.stop(); 
            }
            fetch('/audios/enigma_2.mp3')
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    audioSource = audioContext.createBufferSource();
                    audioSource.buffer = audioBuffer;
                    audioSource.connect(audioContext.destination);
                    audioSource.start();
                });
        } else if (apiAnswer.includes('enigma')) {
            requestData = {
                contents: [{
                    parts: [{ text: 'Repita exatamente a seguinte frase: Um rugido secreto ecoa nesta página, pronta para conduzi-lo(a) ao seu destino. ** Ouça atentamente, pois uma criatura falsa tentará te seduzir. ** Tenha visão, use sua intuição. ** Deixe a imaginação NAVEGAR. ** Ao final, encontrará os próximos passos.' }]
                }]
            };
            if (audioSource) {
                audioSource.stop(); 
            }
            fetch('/audios/enigma_1.mp3')
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    audioSource = audioContext.createBufferSource();
                    audioSource.buffer = audioBuffer;
                    audioSource.connect(audioContext.destination);
                    audioSource.start();
                });
        } else {
            requestData = {
                contents: [{
                    parts: [{ text: 'Responder em português: ' + apiAnswer }]
                }]
            };
            if (audioSource) {
                audioSource.stop(); 
            }
            fetch('/audios/ia.mp3')
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    audioSource = audioContext.createBufferSource();
                    audioSource.buffer = audioBuffer;
                    audioSource.connect(audioContext.destination);
                    audioSource.start();
                });
        }
    
        $.ajax({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            dataType: 'json',
            data: JSON.stringify(requestData),
            success: function(data) {
                if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                    const responseText = data.candidates[0].content.parts[0].text.replace(/\*\*/g, "<br>");
                    let typedText = "";
                    $('#ia-submit').text('Respondendo...');
                    $('#ia-response').text('').fadeIn('fast');
            
                    for (let i = 0; i < responseText.length; i++) {
                        setTimeout(function() {
                            typedText += responseText[i];
                            $('#ia-response').html(typedText);

                            const element = document.getElementById('ia-response');
                            element.scrollTop = element.scrollHeight;

                            if (i == (responseText.length - 1)) {
                                $('#ia-submit').attr('disabled', false).text('Perguntar');
                            }
                        }, i * 30);
                    }

                } else {
                    console.error("Error: Unexpected response structure from Gemini API");
                }

                $('#ia-input').val('');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);
            }
        });
    });

});