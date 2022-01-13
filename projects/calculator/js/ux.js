const ux = {
	init: function () {},
	toast: function (msg) {
		const elem = $(document.createElement('div'));
		elem.attr('class', 'toast').html(msg);
		$('body').append(elem);
		setTimeout(() => { elem.addClass('on') }, 300);
		setTimeout(() => { elem.remove() }, 3000);
	},
};
