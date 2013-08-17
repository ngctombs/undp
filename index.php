<!DOCTYPE html>
<html>
	<head>
		<title>UN HDI</title>
		<link rel="stylesheet" media="all" href="js/jvectormap/jquery-jvectormap-1.2.2.css"/>
		<link rel="stylesheet" media="all" href="css/jquery-ui-1.8.21.custom.css"/>
		<script src="js/jquery-1.8.2.min.js"></script>
		<script src="js/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
		<script src="js/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
		<script src="js/jquery-ui-1.8.21.custom.min.js"></script>
		<script src="js/functions.js"></script>


	</head>
	<body>
		<div id="world-map" style="width: 1200px; height: 800px"></div>
		<script>
		$(function(){
			$('#world-map').vectorMap();
		});
		</script>
	</body>
</html>