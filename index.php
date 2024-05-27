<!DOCTYPE html>
<html>
	<head>
		<link href="css/style.css" rel="stylesheet">
		<link href="css/navigation.css" rel="stylesheet">
		<link href="css/tooltips.css" rel="stylesheet">

		<link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One" rel="stylesheet">
		<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	 	<link rel="stylesheet" href="/resources/demos/style.css">

		<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.1/d3.min.js"></script>
	 	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
		<script src="js/1121_jquery-ui.js"></script>

		<meta name="viewport" content="initial-scale=1.0, user-scalable=yes"/>
		<meta name="viewport" content="width=device-width"/>
		<meta charset="utf-8">

		<title>SudOuest.fr - Infographie Européennes 2024</title>
	</head>
	<body>
		 <section id="desktop">
		 	<hr>
			<h1>Européennes 2024 : tous les résultats</h1>
			<hr>
		 	<br/>
			<p class="consigne">- Cliquez sur un département -</p>
			<div id="navigation">
				<svg id="zonediffusion">
				</svg>
			</div>
			<br/>
		<footer id="signature" class="animate-bottom">
		</footer>
		</section>


		<?php
			echo '<section id="mobile">
				<hr>
				<h1>Européennes 2024</h1>
				<hr>
				<h2 class="sousTitre"><label for="tags">Tous les résultats de votre commune</label></h2>';
			include (dirname(__FILE__).'/includes/recherche.php');
			echo'<img src="css/images/ShootCarte.png" alt="Carte"/>
				<footer id="signature2" class="animate-bottom">
				</footer>
			</section>';
		?>
		
			<script src="js/zonediffusion.js" type="text/javascript"></script>
			<script>zonediffusion();</script>	
	</body>
</html>