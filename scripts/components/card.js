$(document).ready(function() {
    $(window).scroll(function() {
        $('.card, .card-inverse, img').each(function() {
            var $this = $(this);
            var viewportCenter = $(window).scrollTop() + $(window).height() / 3;

            if (viewportCenter >= $this.offset().top && viewportCenter <= $this.offset().top + $this.outerHeight()) {
                $this.addClass('active');
            } else {
                $this.removeClass('active');
            }
        });
    });
});