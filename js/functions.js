$(document).ready(function(){
	var $dataSet = new Object();
	callJSON('json/indicator_100106.json');
	function callJSON (url) {
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
	        }
	    });
    }
});