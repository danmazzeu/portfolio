$(document).ready(function() {
    let delay = 0;

    $(window).scroll(function() {
        $('.card, .card-inverse, img').each(function() {
            var $this = $(this);
            var viewportTop = $(window).scrollTop() + $(window).height() / 2 - $this.outerHeight() / 1.5;
            var viewportBottom = viewportTop + $this.outerHeight(); 

            if (viewportBottom >= $this.offset().top && viewportTop <= $this.offset().top + $this.outerHeight()) {
                setTimeout(function() {
                    $this.addClass('active');

                    setTimeout(function() {
                        $this.removeClass('active');
                    }, 1600); 
                }, delay);

                delay += 150;
            } else {
                $this.removeClass('active');
            }
        });

        delay = 0; 
    });
});