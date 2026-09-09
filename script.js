// mobile nav toggle
var toggle = document.getElementById('navToggle');
var nav = document.getElementById('primaryNav');
if (toggle && nav) {
  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// index rail active state
var railLinks = document.querySelectorAll('#indexRail a');
var sections = Array.prototype.map.call(railLinks, function(a){
  return document.getElementById(a.dataset.target);
}).filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        railLinks.forEach(function(a){ a.classList.remove('active'); });
        var match = document.querySelector('#indexRail a[data-target="' + entry.target.id + '"]');
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function(s){ io.observe(s); });
}

// scroll reveal
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var revealEls = document.querySelectorAll('.reveal');
if (!reduceMotion && 'IntersectionObserver' in window) {
  var ro = new IntersectionObserver(function(entries, obs){
    entries.forEach(function(entry){
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function(el){ ro.observe(el); });
} else {
  revealEls.forEach(function(el){ el.classList.add('in'); });
}
