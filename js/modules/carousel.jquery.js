(function($) {

    $.fn.carousel = function(options) {

        var options = $.extend({
            transition: 1000,
            delay: 4000
        }, options);

        var div = $(this);
        var li = $('li');

        function items() {
            return div.find(li);
        }

        items().fadeOut();
        items().first().addClass('active').fadeIn(options['transition']);

        setInterval(function() {
            var index = div.find('li.active').index();

            items().eq(index).removeClass('active').fadeOut(options['transition'], function() {
                if (items().length == index + 1) index = -1;
                items().eq(index + 1).fadeIn(options['transition'], function() {
                    items().eq(index + 1).addClass('active');
                })
            })
        }, options['transition'] + options['delay']);
    }

})(jQuery);