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

<?php
// use if($_POST) (post[lang]=='en') & Ajax codes from JS. Add a class to the relevant language based on Post to make it look active
$titles_o = fopen("json/title_dict.json", "r");
$titles_r = fread($titles_o, filesize("json/title_dict.json"));
$titles = json_decode($titles_r, true);

$descr_o = fopen("json/descr_dict.json", "r");
$descr_r = fread($descr_o, filesize("json/descr_dict.json"));
$descr = json_decode($descr_r, true);

if ($_POST) {
	$lang = $_POST['lang'];
} else {
	$lang = 'en';
}

?>
	</head>
	<body>
		<div class="language_mini_box">
			<div>EN</div>
			<div>ES</div>
			<div>FR</div>
		</div>
		<ul id="nav">
			<?php foreach (scandir('json') as $json) { if (substr($json, 0, 9) == 'indicator') { ?>
				<?php $json_id = substr($json, 0, strrpos($json, '.')); ?>

				<li class="data_link" id="<?php echo $json; ?>"><?php echo $titles[$json_id]['title_' . $lang]; //NEED THE TITLE HERE?>
					<div class="description_box">
						<?php echo $descr[$json_id]['descr_' . $lang];?>
					</div>
				</li>
			<?php }}	?>
		</ul>
		<div id="world-map"></div>
		<div class="cat_title">
			UNDP Statistic Title Placeholder
		</div>
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