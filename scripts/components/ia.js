$(document).ready(function() {

    $('#ia-form').submit(function(e) { 
        e.preventDefault();
        $('#ia-response').text('Aguarde...').fadeIn('fast');

        const apiKey = 'AIzaSyCFT4N-asqp0JobkYYfe3ei-2q8ut6W7Cc';
        const apiAnswer = $('#ia-input').val().toLowerCase();
        let requestData;

        if (apiAnswer.includes('enigma')) {
            requestData = {
                contents: [{
                    parts: [{ text: 'Repita exatamente a seguinte frase: Existe um arquivo html na raiz, cujo nome você ouvira em algum lugar desta página, lá você encontrará os próximos passos. Deixe a imaginação fluir!' }]
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
            
                    for (let i = 0; i < responseText.length; i++) {
                        setTimeout(function() {
                            typedText += responseText[i];
                            $('#ia-response').html(typedText);

                            const element = document.getElementById('ia-response');
                            element.scrollTop = element.scrollHeight;
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