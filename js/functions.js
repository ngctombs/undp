$(document).ready(function(){

	var $dataSet = new Object();
	initiateJSON('json/indicator_103106.json');
	$('ul li:nth-child(3)').addClass('active_data_set');
	$('ul li:nth-child(3) .description_box').show();
	$('.cat_title').html($('ul li:nth-child(3) span').html());

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

	//TODO: Make this suck less
	function getISOJSON (code, name) {
		$.getJSON('json/' + code + '.json', function(data) {
			$('.right_nav_inner').html('');
			var fString = '<h1>' + name + '</h1><br />';
			for (x in data) {
				fString += data[x][0] + ' <br /><h2>' + data[x][1] + '</h2><br />';
			}
			$('.right_nav_inner').html(fString);
		}).done(function() {
			$.getJSON('json/title_dict.json', function(data) {
				var x = $('.right_nav_inner').html();
				for (y in data) {
					x = x.replace(y, data[y]['title_en']);
				}
				$('.right_nav_inner').html(x);
				$('.right_nav').show();
			});
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
			zoomOnScroll: true,
			onRegionLabelShow: function(e, el, code){
				//Clean up API call
				y = [];
				for (x in data){
					if (data[x] != undefined){
						y.push(data[x]);
					}
				}
				y.sort().reverse();
				if (data[code] != undefined) {
					rank = ' (# ' +  (y.indexOf(data[code]) + 1)  + ' )';
				} else {
					rank = '';
				}
		    	el.html('<div class="custom_label"><h1>' + el.html() + rank + '</h1><br/>' + $('.cat_title').html() + '<br /><h2>' + data[code]) + '</h2></div>';
		    },
		    onRegionClick: function(e, code){
		    	$('.right_nav').scrollTop(0);	
		    	var map = $('#world-map').vectorMap('get', 'mapObject');
		    	getISOJSON(code, map.getRegionName(code));
		    }
		});
	}

	//scroll in - click on jvectormap-zoomin
	//scroll out - click on jvectormap-zoomout

	/* Footer and navbar jQuery */

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
			$('.right_nav').hide();
			$('.right_nav').scrollTop(0);
		};
	});

	$('.lightbox .escape').click(function() {
		$('.lightbox').addClass('lightbox_mask');
	});

	$('.right_nav .escape').click(function() {
		$('.right_nav').hide();
		$('.right_nav').scrollTop(0);
	});

	$('.light-link').click(function() {
		$('.lightbox').removeClass('lightbox_mask');
	});

	$('.lang_1').click(function() {
		$('.langfield').val('fr');
		$('.langform').submit();
	});

	$('.lang_2').click(function() {
		$('.langfield').val('es');
		$('.langform').submit();
	});

	$('.footab').mouseenter(function() {
		$(this).hide();
		$(this).next('.footext').show();
	});

	$('.footext').mouseleave(function() {
		$(this).hide();
		$(this).prev('.footab').show();
	});
});