	
(function(){

	var tix = {
		sizes: {
			hour: {tens: 3, ones: 9},
			minute: {tens: 6, ones: 9}
		},
		elements: {
			tix: '.tix',
			hour_tens: '.hour-tens',
			hour_ones: '.hour-ones',
			minute_tens: '.minute-tens',
			minute_ones: '.minute-ones'
		},
		timing: 4

	};

	function get_random_number(min, max) {
		return min + Math.floor(Math.random() * (max - min));
	}

	/*
		Get [amount] values between [min] and [max].
	*/
	function get_random_list(min, max, amount) {
		if ( amount == 0 ) {return [];}
		if ( max < amount ) {amount = max;}
		var list = [];
		while ( list.length < amount ) {
			var r = get_random_number(min, max);
			if ( list.indexOf(r) == -1 ) {
				list.push(r);
			}
		}
		return list;
	}

	function fill(element, list) {
		$(element).each(function(index, el) {
			if ( list.indexOf(index) > -1 ) {
				$(el).addClass("active");
			}
		});
	}

	function element_fill(element, amount){
		var blocks = $(element).children(".block");
		var list = get_random_list(0, blocks.length, amount);
		fill(blocks, list);
	}

	function element_clear(element) {
		$(element).children('.active').each(function(i, el){
			$(el).removeClass('active');
		});
	}

	function element_update(element, amount) {
		element_clear(element);
		element_fill(element, amount);
	}

	function fix_centering() {
		var t = $(tix.elements.tix);
		var height = t.height();
		var width = t.width();
		t.css("width", width);
		t.css("height", height);
		t.css("margin-top", -1 * (height / 2) );
		t.css("margin-left", -1 * (width / 2) );
	}

	function tock() {
		var time = new Date();
		var hours = time.getHours();
		var minutes = time.getMinutes();

		var fix_hours = function(value) {
			if ( value > 12 ) {
				value = value - 12;
			} else if ( value == 0 ) {
				value = 12;
			}
			return value;
		}

		hours = fix_hours(hours);

		var hour_ones = (hours % 10);
		var hour_tens = (hours % 100 / 10) | 0;

		var minute_ones = (minutes % 10);
		var minute_tens = (minutes % 100 / 10) | 0;

		element_update(tix.elements.hour_tens, hour_tens);	
		element_update(tix.elements.hour_ones, hour_ones);
		element_update(tix.elements.minute_tens, minute_tens);	
		element_update(tix.elements.minute_ones, minute_ones);

		fix_centering();
	}

	function initialize() {
		tock();
		setInterval(tock, tix.timing * 1000);
	}

	$(document).ready(initialize);
	window.tix = tix;

})();