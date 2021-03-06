(function($) {

    // Carousel
    $.fn.carousel = function(options) {
        console.log("Debug: Called carousel()");
        var options = $.extend({
            transition_time: 1000,
            delay_time: 4000
        }, options);

        var object = $(this);
        var step = $('li');

        function steps() {
            return object.find(step);
        }

        steps().fadeOut();
        steps().first().addClass('active');
        steps().first().fadeIn(options['transition_time']);

        timer = setInterval(function() {
            var index = object.find('li.active').index();

            steps().eq(index).removeClass('active');
            steps().eq(index).fadeOut(options['transition_time']);

            if (steps().length == index + 1) index = -1;

            steps().eq(index + 1).fadeIn(options['transition_time']);
            steps().eq(index + 1).addClass('active');

        }, options['transition_time'] + options['delay_time']);
    }

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

    $.fn.scrollTo = function(options) {

        var options = $.extend({
            speed: 2000,
            ease: 'swing' //Accepts easing such as easein, swing, linear blahj blahblahb!
        }, options);

        $("html, body").animate({
            scrollTop: $(this).offset().top
        }, options['speed'], options['ease']);
    }

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
                '<p>x</p>' + // Style: CLOSE BUTTON
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
                    $('.lightbox').hide();
                });
            }
        });
    }

})(jQuery);
/*! http://mths.be/placeholder v2.0.7 by @mathias */
(function(window, document, $) {

    var isInputSupported = 'placeholder' in document.createElement('input');
    var isTextareaSupported = 'placeholder' in document.createElement('textarea');
    var prototype = $.fn;
    var valHooks = $.valHooks;
    var propHooks = $.propHooks;
    var hooks;
    var placeholder;

    if (isInputSupported && isTextareaSupported) {

        placeholder = prototype.placeholder = function() {
            return this;
        };

        placeholder.input = placeholder.textarea = true;

    } else {

        placeholder = prototype.placeholder = function() {
            var $this = this;
            $this
                .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
                .not('.placeholder')
                .bind({
                    'focus.placeholder': clearPlaceholder,
                    'blur.placeholder': setPlaceholder
                })
                .data('placeholder-enabled', true)
                .trigger('blur.placeholder');
            return $this;
        };

        placeholder.input = isInputSupported;
        placeholder.textarea = isTextareaSupported;

        hooks = {
            'get': function(element) {
                var $element = $(element);

                var $passwordInput = $element.data('placeholder-password');
                if ($passwordInput) {
                    return $passwordInput[0].value;
                }

                return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
            },
            'set': function(element, value) {
                var $element = $(element);

                var $passwordInput = $element.data('placeholder-password');
                if ($passwordInput) {
                    return $passwordInput[0].value = value;
                }

                if (!$element.data('placeholder-enabled')) {
                    return element.value = value;
                }
                if (value == '') {
                    element.value = value;
                    // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
                    if (element != safeActiveElement()) {
                        // We can't use `triggerHandler` here because of dummy text/password inputs :(
                        setPlaceholder.call(element);
                    }
                } else if ($element.hasClass('placeholder')) {
                    clearPlaceholder.call(element, true, value) || (element.value = value);
                } else {
                    element.value = value;
                }
                // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                return $element;
            }
        };

        if (!isInputSupported) {
            valHooks.input = hooks;
            propHooks.value = hooks;
        }
        if (!isTextareaSupported) {
            valHooks.textarea = hooks;
            propHooks.value = hooks;
        }

        $(function() {
            // Look for forms
            $(document).delegate('form', 'submit.placeholder', function() {
                // Clear the placeholder values so they don't get submitted
                var $inputs = $('.placeholder', this).each(clearPlaceholder);
                setTimeout(function() {
                    $inputs.each(setPlaceholder);
                }, 10);
            });
        });

        // Clear placeholder values upon page reload
        $(window).bind('beforeunload.placeholder', function() {
            $('.placeholder').each(function() {
                this.value = '';
            });
        });

    }

    function args(elem) {
        // Return an object of element attributes
        var newAttrs = {};
        var rinlinejQuery = /^jQuery\d+$/;
        $.each(elem.attributes, function(i, attr) {
            if (attr.specified && !rinlinejQuery.test(attr.name)) {
                newAttrs[attr.name] = attr.value;
            }
        });
        return newAttrs;
    }

    function clearPlaceholder(event, value) {
        var input = this;
        var $input = $(input);
        if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
            if ($input.data('placeholder-password')) {
                $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                // If `clearPlaceholder` was called from `$.valHooks.input.set`
                if (event === true) {
                    return $input[0].value = value;
                }
                $input.focus();
            } else {
                input.value = '';
                $input.removeClass('placeholder');
                input == safeActiveElement() && input.select();
            }
        }
    }

    function setPlaceholder() {
        var $replacement;
        var input = this;
        var $input = $(input);
        var id = this.id;
        if (input.value == '') {
            if (input.type == 'password') {
                if (!$input.data('placeholder-textinput')) {
                    try {
                        $replacement = $input.clone().attr({
                            'type': 'text'
                        });
                    } catch (e) {
                        $replacement = $('<input>').attr($.extend(args(this), {
                            'type': 'text'
                        }));
                    }
                    $replacement
                        .removeAttr('name')
                        .data({
                            'placeholder-password': $input,
                            'placeholder-id': id
                        })
                        .bind('focus.placeholder', clearPlaceholder);
                    $input
                        .data({
                            'placeholder-textinput': $replacement,
                            'placeholder-id': id
                        })
                        .before($replacement);
                }
                $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
                // Note: `$input[0] != input` now!
            }
            $input.addClass('placeholder');
            $input[0].value = $input.attr('placeholder');
        } else {
            $input.removeClass('placeholder');
        }
    }

    function safeActiveElement() {
        // Avoid IE9 `document.activeElement` of death
        // https://github.com/mathiasbynens/jquery-placeholder/pull/99
        try {
            return document.activeElement;
        } catch (err) {}
    }

}(this, document, jQuery));
