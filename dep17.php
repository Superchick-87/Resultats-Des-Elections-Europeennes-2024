<!DOCTYPE html>
<html>
<head>
	<link href="css/style.css" rel="stylesheet">
	<link href="css/navigation.css" rel="stylesheet">
	<link href="css/tooltips.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One" rel="stylesheet">
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.1/d3.min.js"></script>
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="js/1121_jquery-ui.js"></script>

	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<!-- <meta name="viewport" content="width=device-width"/> -->
	<meta charset="utf-8">

	<title>SudOuest.fr - Infographie Européennes 2019</title>
</head>
<body>

<?php
	 include (dirname(__FILE__).'/includes/ddc.php');
	 include 'titreLegende.html';
	 include (dirname(__FILE__).'/includes/contenu.php');
	// echo'<input id="parti01" value="'.ddc($phrasesDeps[0][0]).'"/>';
	// echo'<input id="parti02" value="'.ddc($phrasesDeps[1][0]).'"/>';
	echo '<br/>
		<div id="departement" style="">
			<svg id="entete" viewBox="0 0 640 775">
			 <defs>
                    <pattern id="hach_grise" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                      <line x1="6" y1="0" x2="6" y2="50" stroke="#999898" stroke-width="6" />
                    </pattern>
                    <pattern id="hach_bleuemarine" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                      <line x1="6" y1="0" x2="6" y2="50" stroke="#14387F" stroke-width="6" />
                    </pattern>
                    <pattern id="hach_bleue" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                      <line x1="6" y1="0" x2="6" y2="50" stroke="#0091D8" stroke-width="6" />
                    </pattern>
                    <pattern id="hach_bleueclaire" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                      <line x1="6" y1="0" x2="6" y2="50" stroke=#0091D8" stroke-width="6" />
                    </pattern>
                    <pattern id="hach_verte" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                      <line x1="6" y1="0" x2="6" y2="50" stroke="##AFCA0B" stroke-width="6" />
                    </pattern>
                    </pattern>
                    <pattern id="hach_rose" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                      <line x1="6" y1="0" x2="6" y2="50" stroke="#ed6ea7" stroke-width="6" />
                    </pattern>
                    <pattern id="hach_orange" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                      <line x1="6" y1="0" x2="6" y2="50" stroke="#FBBA00" stroke-width="6" />
                    </pattern>
                    <pattern id="hach_rouge" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                      <line x1="6" y1="0" x2="6" y2="50" stroke="#B51F1F" stroke-width="6" />
                    </pattern>
                    <pattern id="hach_violette" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                      <line x1="6" y1="0" x2="6" y2="50" stroke="#B60F80" stroke-width="6" />
                    </pattern>
                    <pattern id="hach_marron" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                      <line x1="6" y1="0" x2="6" y2="50" stroke="#654519" stroke-width="6" />
                    </pattern>
                  </defs>
			</svg>
		</div>
	<br>
	<hr class="separation">
	<h2 class="inter">'.$titrePetitesCartes[0].'</h2>
	<hr class="separation">		
	<div class="flex">
		<div id="dept'.ddc($phrasesDeps[0][0]).'" class="PetitesCartes View1">
			<h3>'.$phrasesDeps[0][0].'</h3>
			<p class="chiffre">'.number_format($chiffresDeps[1][1],1,',','').'%</p>
			<p class="introcartes">'.$phrasesDeps[0][1].'</p>
			<svg id="'.ddc($phrasesDeps[0][0]).'"></svg>
		</div>		
		<div id="dept'.ddc($phrasesDeps[1][0]).'" class="PetitesCartes View2">
			<h3>'.$phrasesDeps[1][0].'</h3>
			<p class="chiffre">'.number_format($chiffresDeps[1][2],1,',','').'%</p>
			<p class="introcartes">'.$phrasesDeps[1][1].'</p>
			<svg id="'.ddc($phrasesDeps[1][0]).'"></svg>
		</div>
		<div id="dept'.ddc($phrasesDeps[2][0]).'" class="PetitesCartes View3">
			<h3>'.$phrasesDeps[2][0].'</h3>
			<p class="chiffre">'.number_format($chiffresDeps[1][3],1,',','').'%</p>
			<p class="introcartes">'.$phrasesDeps[2][1].'</p>
			<svg id="'.ddc($phrasesDeps[2][0]).'"></svg>
		</div>		
		<div id="dept'.ddc($phrasesDeps[3][0]).'" class="PetitesCartes View4">
			<h3>'.$phrasesDeps[3][0].'</h3>
			<p class="chiffre">'.number_format($chiffresDeps[1][4],1,',','').'%</p>
			<p class="introcartes">'.$phrasesDeps[3][1].'</p>
			<svg id="'.ddc($phrasesDeps[3][0]).'"></svg>			
		</div>
		<div id="dept'.ddc($phrasesDeps[4][0]).'" class="PetitesCartes View5">
			<h3>'.$phrasesDeps[4][0].'</h3>
			<p class="chiffre">'.number_format($chiffresDeps[1][5],1,',','').'%</p>
			<p class="introcartes">'.$phrasesDeps[4][1].'</p>
			<svg id="'.ddc($phrasesDeps[4][0]).'"></svg>
		</div>		
		<div id="dept'.ddc($phrasesDeps[5][0]).'" class="PetitesCartes View6">
			<h3>'.$phrasesDeps[5][0].'</h3>
			<p class="chiffre">'.number_format($chiffresDeps[1][6],1,',','').'%</p>
			<p class="introcartes">'.$phrasesDeps[5][1].'</p>
			<svg id="'.ddc($phrasesDeps[5][0]).'"></svg>			
		</div>
		<div id="dept'.ddc($phrasesDeps[6][0]).'" class="PetitesCartes View7">
			<h3>'.$phrasesDeps[6][0].'</h3>
			<p class="chiffre">'.number_format($chiffresDeps[1][7],1,',','').'%</p>
			<p class="introcartes">'.$phrasesDeps[6][1].'</p>
			<svg id="'.ddc($phrasesDeps[6][0]).'"></svg>			
		</div>
	</div>';
?>
	<br/>
	<hr class="navigation separation">
	<p class="consigne">- Cliquez pour changer de département -</p>
	<div id="navigation" class="navigationCarte">
		<svg id="zonediffusion">
		</svg>
	</div>
	<br/>
	<footer></footer>
</body>
	
	<script src="js/charente-maritime.js" type="text/javascript"></script>
	<script>entete();</script>
	<script>Labstention();</script>
	<script>RassemblementNational();</script>
	<script>LaRepubliqueEnMarche();</script>
	<script>PartiSocialiste();</script>
	<script>LesRepublicains();</script>
	<script>EuropeEcologie();</script>
	<script>FranceInsoumise();</script>
	

	<script src="js/zonediffusion.js" type="text/javascript"></script>
	<script>zonediffusion();</script>

</html>