$(document).ready(function() {
    let delay = 0;

    $(window).scroll(function() {
        $('.card, .feedcard, .presentation, video').each(function() {
            var $this = $(this);
            var viewportTop = $(window).scrollTop() + $(window).height() / 2 - $this.outerHeight();
            var viewportBottom = viewportTop + $this.outerHeight(); 

            if (viewportBottom >= $this.offset().top && viewportTop <= $this.offset().top + $this.outerHeight()) {
                setTimeout(function() {
                    $this.addClass('active');
                }, delay);

                delay += 150;
            } else {
                $this.removeClass('active');
            }
        });

        delay = 0; 
    });

    $('.card, .feedcard, .gamecard, .presentation, video').each(function() {
        const audio = new Audio('/audios/cards.mp3');

        $(this).mouseover(function() {
            audio.play();
        }).click(function() {
            audio.currentTime = 0;
            audio.play();
        });
    });
});