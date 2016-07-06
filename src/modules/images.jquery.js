(function($) {

    $.fn.lightbox = function(tag, options) {

        var options = $.extend({
            fadeIn: false,
            speed: 100
        }, options);

        return this.find(tag).click(function(e) {

            if ($('.lightbox').length == 0) {
                e.preventDefault();

                // Get variable
                var _image = $(this).attr('src');
                var _div =
                    '<div class="lightbox">' + // Style: Main Div
                    '<p class="close">x</p>' + // Style: CLOSE BUTTON
                    '<div class="image"></div>' + // Style: Image holder
                    '<img src="' + _image + '"/>' + // Style: Images
                    '</div>' + // Close Image Holder
                    '</div>'; // Close Main Div

                if (options['fadeIn']) {
                    $('.lightbox').css('display', 'none');
                }
                // Add new div to end of page! =))

                $('body').append(_div);

                if (options['fadeIn']) {
                    $('.lightbox').show(options['speed']);
                }

                // Add listener even for hiding
                $('.lightbox p').click(function(e) {
                    $('.lightbox').remove();
                });
            }
        });
    }

})(jQuery);