	
		var myVar;

		function functionLoader() {
		  myVar = setTimeout(showPage, 100);
		}

		function showPage() {
		  document.getElementById("loader").style.display = "none";
		  document.getElementById("navigation").style.display = "block";
		  document.getElementById("signature").style.display = "block";
		  // document.getElementById("legend").style.display = "block";
		  // document.getElementById("Mobile").style.display = "block";
		}