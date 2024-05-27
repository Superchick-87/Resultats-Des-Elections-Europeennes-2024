window.onload = function(){
	var button1 = document.getElementById("button1");
	var button2 = document.getElementById("button2");
	var button3 = document.getElementById("button3");

	var img1 = document.getElementById("img1");
	var img2 = document.getElementById("img2");
	var img3 = document.getElementById("img3");

	button1.addEventListener('click', function(){
		button1.style.opacity = 0.3;
		img1.style.display="block";
		button2.style.opacity = 1;
		img2.style.display="none";
		button3.style.opacity = 1;
		img3.style.display="none";
	})
	button2.addEventListener('click', function(){
		button1.style.opacity = 1;
		img1.style.display="none";
		button2.style.opacity = 0.3;
		img2.style.display="block";
		button3.style.opacity = 1;
		img3.style.display="none";
	})
	button3.addEventListener('click', function(){
		button1.style.opacity = 1;
		img1.style.display="none";
		button2.style.opacity = 1;
		img2.style.display="none";
		button3.style.opacity = 0.3;
		img3.style.display="block";
	})
	
}