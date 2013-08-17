$(document).ready(function(){
	$.getJSON('json/indicator_100106.json', function(data) {
		element = null;
		console.log('start');
		for (var j in data) {
			console.log(j);
			console.log(data[j]);
  		}
	});
});