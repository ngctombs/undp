$(document).ready(function(){
	var $data;
	$.getJSON('json/indicator_100106.json', function(data) {
		console.log(data);
		$data = data;
	});

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
				values: $data,
				scale: ['#C8EEFF', '#0071A4'],
				normalizeFunction: 'polynomial'
			}]
		}	
		//onLabelShow: function(e, el, code){
		//	el.html(el.html()+' (GDP - '+ $data[code]+')');
		//}
	});
});