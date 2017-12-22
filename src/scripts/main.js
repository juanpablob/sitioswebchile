var app = {
	init: function() {
		// Sticky header scrolling
		$(window).on('scroll', function() {
			if ($(window).scrollTop() > 50) {
				$('.header').addClass('header--scrolling');
			}
			else {
				$('.header').removeClass('header--scrolling');
			}
		});

		// Tooltips
		$('[data-toggle="tooltip"]').tooltip();
	}
};

$(document).ready(function() {
	app.init();
});
