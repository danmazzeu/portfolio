$(document).ready(function() {
    let delay = 0;

    $(window).scroll(function() {
        $('.card, .card-inverse, img').each(function() {
            var $this = $(this);
            var viewportCenter = $(window).scrollTop() + $(window).height() / 3;

            if (viewportCenter >= $this.offset().top && viewportCenter <= $this.offset().top + $this.outerHeight()) {
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