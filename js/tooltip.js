function tooltip() {
   var toto = document.getElementById('tooltip');
   var largeur = top.innerWidth;
   console.log(toto.offsetLeft)
   if (toto.offsetLeft > largeur / 2) {
      toto.style.left = toto.offsetLeft - 350 + "px";
      toto.style.top = toto.offsetTop + 30 + "px";
   }
   else {
      toto.style.left = toto.offsetLeft + 24 + "px";
      toto.style.top = toto.offsetTop + 30 + "px";
   }
}