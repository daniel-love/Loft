(function($) {
	$.fn.carousel = function(options)
	{
		console.log ("Debug: Called carousel()");
		var options = $.extend({transition_time: 1000, delay_time: 4000, method: 'fade'}, options);

		var object = $(this);
		var step = $('li');

		function steps() {return object.find(step);}

		steps().fadeOut();
		steps().first().addClass('active');
		steps().first().fadeIn(options['transition_time']);

		timer = setInterval(function (){
			var index = object.find('li.active').index();

			steps().eq(index).removeClass('active');

			if (options['method'] == "fade") steps().eq(index).fadeOut(options['transition_time']);

			if (steps().length >= index + 1) index = -1;

			if (options['method'] == 'fade') steps().eq(index+1).fadeIn(options['transition_time']);

			steps().eq(index+1).addClass('active');
		}, options['transition_time']+options['delay_time']);
	}	
})(jQuery);
// To-Do
// Add more methods
//