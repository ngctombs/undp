$(document).ready(function(){

	var $dataSet = new Object();
	initiateJSON('json/indicator_103106.json');
	$('ul li:nth-child(3)').addClass('active_data_set');
	$('ul li:nth-child(3) .description_box').show();

	$('.data_link').click(function() {
		callJSON('json/' + $(this)[0].getAttribute('id'));
		$('.cat_title').html($(this).html());
		$('.data_link').removeClass('active_data_set');
		$(this).addClass('active_data_set')
		$('.description_box').hide();
		$(this).children('.description_box').show();
	});

	function callJSON (url) {
		$.getJSON(url, function(data) {
			var mapObject = $('#world-map').vectorMap('get', 'mapObject');
			console.log(mapObject.series.regions[0]);
			mapObject.remove();
			setMap(data);
		});
	}

	function initiateJSON (url) {
		$.getJSON(url, function(data) {
			setMap(data);
		});
	}

	function setMap (data) {
		$('#world-map').vectorMap({
			map: 'world_mill_en',
			backgroundColor:'#5B92E5',
			regionStyle:{
				initial:{
					fill:'#fff',
					stroke: 'white',
					"stroke-width": 0.3,
					"stroke-opacity": 1	
				}
			},
			series: {
			  regions: [{
				scale: ['#FEEDC8', '#D69304'],
				normalizeFunction: 'polynomial',
				values: data
			  }]
			},	
			onLabelShow: function(event, label, code){
				alert('sda');
				// label.html(label.html() + " (" + 'data[code]' + ")");
			}
		});
	}

	$('.jvectormap-label').css('visibility', 'none');	

	/* Footer and navbar jQuery */

	$('.footab').mouseenter(function() {
		$(this).hide();
		$(this).next('.footext').show();
	});

	$('.footext').mouseleave(function() {
		$('.footext').hide();
		$('.footab').show();
	});

	$('#nav li').mouseenter(function() {
		$(this).css('opacity', '0.7');
	});
	$('#nav li').mouseleave(function() {
		$(this).css('opacity', '1');
	});

	/* Embedded Report Lightbox */
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { 
			$('.lightbox').addClass('lightbox_mask');
		};
	});

	$('.lightbox .escape').click(function() {
		$('.lightbox').addClass('lightbox_mask');
	});

	$('.light-link').click(function() {
		$('.lightbox').removeClass('lightbox_mask');
	});

	$('.footab').mouseenter(function() {
		$('.footab').show();
		$('.footext').hide();
		$(this).hide();
		$(this).next('.footext').show();
	});
	$('.footext').mouseleave(function() {
		$(this).hide();
		$(this).prev('.footab').show();
	})
});