(function($) {
    $.fn.tabs = function() {
        $('ul.tabs').each(function() {
            var _current, _body, _hrefs;

            _hrefs = $(this).find('a');
            _current = $(_hrefs.filter('[href="' + location.hash + '"]')[0] || _hrefs[0]);

            _current.addClass('active');
            _body = $(_current.attr('href'));

            _hrefs.not(_current).each(function() {
                $($(this).attr('href')).hide();
            });

            $(this).on('click', 'a', function(_e) {
                _e.preventDefault();

                _current.removeClass('active');
                _body.hide();

                _current = $(this);
                _body = $($(this).attr('href'));

                _current.addClass('active');
                _body.show();
            });
        });
    }
})(jQuery);