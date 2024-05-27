<!DOCTYPE html>
<html>
	<head>
		<link href="css/style.css" rel="stylesheet">
		<link href="css/tooltips.css" rel="stylesheet">
		<link href="css/aos.css" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One" rel="stylesheet">
		
		<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	 	<link rel="stylesheet" href="/resources/demos/style.css">

	 	<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.9.1/d3.min.js"></script>
	 	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
		<script src="js/1121_jquery-ui.js"></script>

		<meta charset="utf-8">	
		<meta name="viewport" content="initial-scale=1.0, user-scalable=yes" />
		<meta name="viewport" content="width=device-width"/>

		<title>SudOuest.fr - Infographie Européennes 2019</title>
	</head>
	<header>
			<!-- <h2 id="titre">Le détail dans votre commune</h2> -->
	</header>
	<body>
		<section>
		
		<div id="resultat">
		<?php
			include (dirname(__FILE__).'/includes/contenu.php');
			include (dirname(__FILE__).'/includes/datas.php');
			include (dirname(__FILE__).'/includes/ddc.php');
			$gareD=$_GET["commune"];

			
			if (empty($gareD)) {
				echo '<div>Aucune donnée pour cette commune
					</div>';
				}
			else{
					$i=0;
					for ($i=0; $i < count($temps) ; $i++) {
								if ($gareD == $temps[$i][0]){								
									echo '<h2 class="inter">Nouvelle recherche</h2>';
									include (dirname(__FILE__).'/includes/recherche.php');
									echo '<hr class="separationRecherche">';
									 echo'<div id="resultatauto">
										<div data-aos="zoom-in" class="resultat">
											 <span class="tooltiptitre">'.$temps[$i][0].'</span><br/>
										<div>
											 <span class="nomcandidat">'.$temps[$i][4].'</span><br/>
											 <span class="puce code'.$temps[$i][3].'"style="width:'.$temps[$i][6]*1.2.'%;"></span><span class="nomcandidat">'.number_format($temps[$i][6],2,',','').'% ('.$temps[$i][5].' voix)</span><br/>
										</div>
										<div class="vertiEspace">
											 <span class="nomcandidat">'.$temps[$i][8].'</span><br/>
											 <span class="puce code'.$temps[$i][7].'"style="width:'.$temps[$i][10]*1.2.'%;"></span><span class="nomcandidat">'.number_format($temps[$i][10],2,',','').'% ('.$temps[$i][9].' voix)</span><br/>
										</div>
										<div class="vertiEspace">
											 <span class="nomcandidat">'.$temps[$i][12].'</span><br/>
											 <span class="puce code'.$temps[$i][11].'"style="width:'.$temps[$i][14]*1.2.'%;"></span><span class="nomcandidat">'.number_format($temps[$i][14],2,',','').'% ('.$temps[$i][13].' voix)</span><br/>
										</div>
										<div class="vertiEspace">
											 <span class="nomcandidat">Taux d\'abstention</span><br/>
											 <span class="puce abstention"style="width:'.($temps[$i][2])*1.2.'%;"></span><span class="nomcandidat">'.number_format($temps[$i][2],2,',','').'%</span><br/>
										</div>
									</div>
									<hr class="separation">
									<h2 class="inter">Les partis en tête</h2>
									<hr class="separation">
									<div id="legende">
											<span class="tooltippuce tooltipinfosupp code7653"></span><span class="legende">La France Insoumise</span>
											<span class="tooltippuce tooltipinfosupp code7657"></span><span class="legende">La République en Marche</span>
											<span class="tooltippuce tooltipinfosupp code7664"></span><span class="legende">Parti Socialiste (+PP/ND)</span><br/>
											<span class="tooltippuce tooltipinfosupp code7675"></span><span class="legende">Rassemblement National</span>
											<span class="tooltippuce tooltipinfosupp code7681"></span><span class="legende">Les Républicains</span>
											<span class="tooltippuce tooltipinfosupp code7682"></span><span class="legende">Europe Écologie</span>
											<span class="tooltippuce tooltipinfosupp code33"></span><span class="legende">Autre</span>
									</div>
										<legend>Toucher un bouton pour modifier l\'affichage<br/>des partis sur la carte.
										</legend>
										<button id="button1" class="bouttonDefaut">1er</button>
										<button id="button2">2e</button>
										<button id="button3">3e</button>
										<div id="img1" class="image" data-aos="zoom-in">
											<img src="css/images/'.$temps[$i][1].'EnTete1.png" alt="Departement"/>
										</div>
										<div id="img2" class="image" style="display:none;">
											<img src="css/images/'.$temps[$i][1].'EnTete2.png" alt="Departement"/>
										</div>
										<div id="img3" class="image" style="display:none;">
											<img src="css/images/'.$temps[$i][1].'EnTete3.png" alt="Departement"/>
										</div>
										<hr class="separation">
										<h2 class="inter">'.$titrePetitesCartes[0].'</h2>
										<hr class="separation">
										<br/>';
									$a=0;
									for ($a=0; $a < count($chiffresDeps) ; $a++) { 
										if ($temps[$i][1]==$chiffresDeps[$a][0]) {									
											echo'
											<div class="View1">
												<h3>'.$phrasesDeps[0][0].'</h3>
												<p class="chiffre">'.number_format($chiffresDeps[$a][1],2,',','').'%</p>
												<p class="introcartes">'.$phrasesDeps[$a][1].'</p>
												<img src="css/images/'.$chiffresDeps[$a][0].ddc($phrasesDeps[0][0]).'.png" alt=";-(" data-aos="zoom-in"/>
											</div>
											<div class="View2">
												<h3>'.$phrasesDeps[1][0].'</h3>
												<p class="chiffre">'.number_format($chiffresDeps[$a][2],2,',','').'%</p>
												<p class="introcartes">'.$phrasesDeps[1][1].'</p>
												<img src="css/images/'.$chiffresDeps[$a][0].ddc($phrasesDeps[1][0]).'.png" alt=";-(" data-aos="zoom-in"/>
											</div>
											<div class="View3">
												<h3>'.$phrasesDeps[2][0].'</h3>
												<p class="chiffre">'.number_format($chiffresDeps[$a][3],2,',','').'%</p>
												<p class="introcartes">'.$phrasesDeps[2][1].'</p>
												<img src="css/images/'.$chiffresDeps[$a][0].ddc($phrasesDeps[2][0]).'.png" alt=";-(" data-aos="zoom-in"/>
											</div>
											<div class="View4">
												<h3>'.$phrasesDeps[3][0].'</h3>
												<p class="chiffre">'.number_format($chiffresDeps[$a][4],2,',','').'%</p>
												<p class="introcartes">'.$phrasesDeps[3][1].'</p>
												<img src="css/images/'.$chiffresDeps[$a][0].ddc($phrasesDeps[3][0]).'.png" alt=";-(" data-aos="zoom-in"/>
											</div>
											<div class="View5">
												<h3>'.$phrasesDeps[4][0].'</h3>
												<p class="chiffre">'.number_format($chiffresDeps[$a][5],2,',','').'%</p>
												<p class="introcartes">'.$phrasesDeps[4][1].'</p>
												<img src="css/images/'.$chiffresDeps[$a][0].ddc($phrasesDeps[4][0]).'.png" alt=";-(" data-aos="zoom-in"/>
											</div>
											<div class="View6">
												<h3>'.$phrasesDeps[5][0].'</h3>
												<p class="chiffre">'.number_format($chiffresDeps[$a][6],2,',','').'%</p>
												<p class="introcartes">'.$phrasesDeps[5][1].'</p>
												<img src="css/images/'.$chiffresDeps[$a][0].ddc($phrasesDeps[5][0]).'.png" alt=";-(" data-aos="zoom-in"/>
											</div>
											<div class="View7">
												<h3>'.$phrasesDeps[6][0].'</h3>
												<p class="chiffre">'.number_format($chiffresDeps[$a][7],2,',','').'%</p>
												<p class="introcartes">'.$phrasesDeps[6][1].'</p>
												<img src="css/images/'.$chiffresDeps[$a][0].ddc($phrasesDeps[6][0]).'.png" alt=";-(" data-aos="zoom-in"/>
											</div>	
							
											';
										}
										else{
											echo "";
										}
										
									}
									echo '<hr class="separationRecherche">
											<h2 class="inter">Nouvelle recherche</h2>';
									include (dirname(__FILE__).'/includes/recherchebas.php');
								}
					}
			}

		?>
		</div>	
	</section>
		<script src="js/alert.js" type="text/javascript"></script>
		<footer>
		</footer>
	
</body>
<script src="js/swichMobile.js" type="text/javascript"></script>
	<script src="js/aos.js" type="text/javascript"></script>
	<script>
	    AOS.init({
	    easing: 'ease-in-out-sine'
	    });
	</script>
</html>


