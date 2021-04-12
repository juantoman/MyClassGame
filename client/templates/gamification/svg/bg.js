function changeBgColor(event) {
  bg=document.getElementById('bg-badge');
  bg.setAttribute('fill',event.target.value);
}

function clickBg(event) {
  btn=document.getElementById('bg-color-btn');
  btn.path=event.target;
  btn.click();
}

function changeStarColor(event) {
  star=document.getElementById('star');
  star.setAttribute('fill',event.target.value);
}

function changeColor(event,element) {
  element.setAttribute('fill',event.target.value);
}

function starcolor(event) {
  event.target.classList.toggle('oculto');
}

function hexagono(event) {
  c=document.getElementById('bg-badge');
  c.setAttribute('class','oculto');
  h=document.getElementById('ghexagono');
  h.setAttribute('class','visible');
}

function circulo(event) {
  c=document.getElementById('bg-badge');
  c.setAttribute('class','visible');
  h=document.getElementById('ghexagono');
  h.setAttribute('class','oculto');
}

function texto(event) {
  t=document.getElementById('tspan53');
  t.textContent=event.target.value;
}

window.onload = function() {
  btn=document.getElementById('bg-color-btn');
  btn.addEventListener('change', function(e) { changeColor(e,btn.path)});
  bg=document.getElementById('bg-badge');
  int=document.getElementById('int-badge');
  med=document.getElementById('med-badge');
  star=document.getElementById('star');
  bg.addEventListener('click', clickBg);
  star.addEventListener('click', clickBg);
  int.addEventListener('click', clickBg);
  med.addEventListener('click', clickBg);
  h=document.getElementById('hexagono');
  h.addEventListener('click', hexagono);
  c=document.getElementById('circulo');
  c.addEventListener('click', circulo);
  t=document.getElementById('texto');
  t.addEventListener('change', texto);
}
