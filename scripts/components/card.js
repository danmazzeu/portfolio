$(document).ready(function() {
    let delay = 0;

    $(window).scroll(function() {
        $('.card, .card-inverse, img').each(function() {
            var $this = $(this);
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height(); 

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
});