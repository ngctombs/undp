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
//STACK: Make buttons post to url (bot bar)
//Load during book
//make it responsive
//add chose colour buttons
//Add tooltips
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
			HDI: Human Development Index (HDI) value
		</div>
		<div id="text"></div>

<div class="foobar">
	<div class="undp_link footab"></div>
	<a href = "http://www.undp.org/" target="_blank" class="undp_link footext">
		<div class="text_tag">
			UNDP Home
		</div>
	</a>
	<div class="read_report footab"></div>
	<div class="light-link read_report footext">
		<a class="text_tag">
			Read the 2013 UNDP report
		</a>
	</div>
	<div class="lightbox lightbox_mask">
		<div class="escape">x</div>
		<div data-configid="0/1298910" class="issuuembed"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script>
	</div>

	<div class="lang_1 footab" <?php if ($lang == 'fr') {echo 'style="display:none;"';}?>></div>
	<a href="" target="_blank" class="lang_1 footext">
		<div class="text_tag">
			French
		</div>
	</a>
	<div class="lang_2 footab" <?php if ($lang == 'es') {echo 'style="display:none;"';}?>></div>
	<a href="" target="_blank" class="lang_2 footext">
		<div class="text_tag">
			Spanish
		</div>
	</a>
	<div class="lang_3 footab" <?php if ($lang == 'en') {echo 'style="display:none;"';}?>></div>
	<a href="" target="_blank" class="lang_1 footext">
		<div class="text_tag">
			English
		</div>
	</a>
</div>
</body>
</html>
