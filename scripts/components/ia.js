$(document).ready(function() {

    $('#ia-form').submit(function(e) { 
        e.preventDefault();
        $('#ia-submit').attr('disabled', true).text('Aguarde...');

        const apiKey = 'AIzaSyCFT4N-asqp0JobkYYfe3ei-2q8ut6W7Cc';
        const apiAnswer = $('#ia-input').val().toLowerCase();
        let requestData;

        if (apiAnswer.includes('enigma')) {
            requestData = {
                contents: [{
                    parts: [{ text: 'Repita exatamente a seguinte frase: Existe uma criatura, que ao navegar por ela você irá chegar em seu destino, seu som pode ser ouvido clicando em algum lugar desta página, lá você encontrará os próximos passos. Deixe a imaginação fluir!' }]
                }]
            };
          } else {
            requestData = {
                contents: [{
                    parts: [{ text: 'Responder em português: ' + apiAnswer }]
                }]
            };
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
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);
            }
        });
    });

});