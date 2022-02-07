const ux = {
	init: function () {},
	toast: function (msg) {
		const elem = $(document.createElement('div'));
		elem.attr('class', 'toast bt200').html(msg);
		$('body').append(elem);
		setTimeout(() => { elem.addClass('on') }, 100);
		setTimeout(() => { elem.remove() }, 1000);
	},
};
