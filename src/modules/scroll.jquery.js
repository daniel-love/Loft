(function($) {
    $.fn.scrollTo = function(options) {

        var options = $.extend({
            speed: 2000,
            ease: 'swing' //Accepts easing such as easein, swing, linear blahj blahblahb!
        }, options);

        $("html, body").animate({
            scrollTop: $(this).offset().top
        }, options['speed'], options['ease']);
    }
})(jQuery);