			var resultat = document.getElementById('resultat').innerHTML;
			var newPara = document.createElement('div');
			var texte = document.createTextNode('Nous n\'avons pas de résultat pour votre recherche');
			
			var form = document.createElement('form');
			var input = document.createElement('input');

			if (resultat == false) {
			newPara.id='alerte';
			newPara.appendChild(texte);
			document.body.appendChild(newPara);
			
			form.id='formulaire';
			form.action='index.php';

			input.type='submit';
			input.id='formulaire';
			input.value='Retour';
			form.appendChild(input);
			document.body.appendChild(form);
			}