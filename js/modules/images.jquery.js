(function($) {

    $.fn.lightbox = function(tag) {

        return this.find(tag).click(function(e) {

            if ($('.lightbox').length == 0) {
                e.preventDefault();

                // Get variable
                var _image = $(this).attr('src');
                var _div =
                    '<div class="lightbox">' + // Style: Main Div
                    '<p>x</p>' + // Style: CLOSE BUTTON
                    '<div class="image"></div>' + // Style: Image holder
                    '<img src="' + _image + '"/>' + // Style: Images
                    '</div>' + // Close Image Holder
                    '</div>'; // Close Main Div

                // Add new div to end of page! =))
                $('body').append(_div);

                // Add listener even for hiding
                $('.lightbox p').click(function(e) {
                    $('.lightbox').hide();
                });
            }
        });
    }

})(jQuery);