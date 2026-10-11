/* ==========================================================
   Menü-Linie: zeigt beim Scrollen, in welchem Abschnitt man ist
   ========================================================== */

// Alles einsammeln, was wir brauchen
const header = document.querySelector('.site-header');
const links = document.querySelectorAll('.nav-links a');
const indicator = document.querySelector('.nav-indicator');

function updateIndicator() {
  // Ein Abschnitt zählt als "aktiv", sobald seine Oberkante
  // knapp unter dem Menü angekommen ist
  const grenze = header.offsetHeight + 80;
  let aktiv = null;

  links.forEach(function (link) {
    const abschnitt = document.querySelector(link.getAttribute('href'));
    if (abschnitt.getBoundingClientRect().top <= grenze) {
      aktiv = link;
    }
  });

  // Ganz unten angekommen? Dann ist immer der letzte Punkt (Kontakt) aktiv
  const ganzUnten = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (ganzUnten) {
    aktiv = links[links.length - 1];
  }

  // Aktiven Link hervorheben
  links.forEach(function (link) {
    link.classList.toggle('active', link === aktiv);
  });

  // Linie unter den aktiven Link schieben – oder ausblenden (ganz oben)
  if (aktiv) {
    indicator.style.width = aktiv.offsetWidth + 'px';
    indicator.style.transform =
      'translate(' + aktiv.offsetLeft + 'px, ' + (aktiv.offsetTop + aktiv.offsetHeight + 4) + 'px)';
    indicator.style.opacity = '1';
  } else {
    indicator.style.opacity = '0';
  }
}

// Bei jedem Scrollen, beim Drehen/Ändern des Fensters und nach dem Laden prüfen
window.addEventListener('scroll', updateIndicator, { passive: true });
window.addEventListener('resize', updateIndicator);
window.addEventListener('load', updateIndicator);
updateIndicator();
