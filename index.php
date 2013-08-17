<!DOCTYPE html>
<html>
	<head>
		<title>UN HDI</title>
		<link rel="stylesheet" media="all" href="js/jvectormap/jquery-jvectormap-1.2.2.css"/>
		<link rel="stylesheet" media="all" href="style.css"/>
		<script src="js/jquery-2.0.3.min.js"></script>
		<script src="js/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
		<script src="js/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
		<script src="js/functions.js"></script>


	</head>
	<body>
		<div id="nav">
			<?php foreach (scandir('json') as $json) { if (substr($json, 0, 9) == 'indicator') { ?>
					<a class="data_link" id="<?php echo $json?>"><?php echo $json?></a>
			<?php }}	?>
		</div>
		<div id="world-map"></div>
		<div id="text"></div>

		<footer class="footer">
			<div class="undp_link footab">
			</div>
			<a href = "http://www.undp.org/" target="_blank" class="undp_link footext">
				<div class="text_tag">
					UNDP Home
				</div>
			</a>
		</footer>
	</body>
</html>