---
layout: home
permalink: /index.html
slides:
- src: /assets/img/lab_kneeland2024.jpg
    alt: Lab
- src: /assets/img/ylr-shelter.jpg
    alt: Drought Structures for Graduate Projects
- src: /assets/img/LabWork.jpg
    alt: Lab
- src: /assets/img/LAEP-Justin2024.jpg
    alt: Kneeland Solar Pannels
  - src: /assets/img/IMG_7271.jpeg
    alt: Justin
  - src: /assets/img/lab.png
    alt: Lab
  
---
{% include slideshow.html slide=page.slides interval=6000 %}

  
Welcome! 
---
Research in Dr. Luong's lab focuses on adapting restoration practices for changing climates and integrating management and socio-economic perspectives to understand rangeland ecology. Lab members engage in hands-on learning opportunities in the field, greenhouse and with practitioners that inform real-world rangeland restoration and management projects to cultivate a diverse and inclusive learning environment. 


<div align="center">
  <img src="/assets/img/lab.png" alt="Luong Lab from Jan 2024 after Geode training" width="500">
</div>  
---
# Quick Links:  
<hr>
We are part of the [Department of Forestry, Fire and Rangeland Management](https://ffrm.humboldt.edu/why-forestry) at [Cal Poly Humboldt College of Natural Resources & Sciences](https://cnrs.humboldt.edu/)  
<hr>

Check out the [Luong Lab DEI Action Plan](https://docs.google.com/document/d/1RVHRP_jJqwDWBOIRaE78yCK5Q4iO7_UxVKMFNqwbh6c/edit?usp=sharing)  
<hr>
<!-- Responsive YouTube playlist embed -->
<div class="yt-wrap" role="region" aria-label="Video playlist">
  <iframe
    src="https://www.youtube.com/embed/videoseries?list=PL8rW4MwMEcUnzNN4GUIDKIf8Ez9NtSRid&modestbranding=1&rel=0"
    title="YouTube playlist player"
    loading="lazy"
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    referrerpolicy="strict-origin-when-cross-origin">
  </iframe>
</div>

<style>
  /* Make the iframe keep a 16:9 aspect ratio and scale nicely */
  .yt-wrap {
    width: 100%;
    max-width: 960px;       /* tweak to your layout */
    margin: 1rem auto;      /* center on page */
    aspect-ratio: 16 / 9;   /* modern browsers */
    background: #000;       /* nice loading backdrop */
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 24px rgba(0,0,0,.12);
  }
  .yt-wrap iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }

  /* Fallback for older browsers that don't support aspect-ratio */
  @supports not (aspect-ratio: 16 / 9) {
    .yt-wrap { position: relative; padding-top: 56.25%; }
    .yt-wrap iframe { position: absolute; inset: 0; height: 100%; }
  }
</style>
<div align="center">
  <img src="/assets/img/KneelandDroughtNet.jpg" alt="Graduate Students and Lab Manager setting up a drought structure" width="750">
</div>  

<div align="center">
  <img src="/assets/img/about-page.jpg" alt="Description" width="750">
</div>  

<script>
(function () {
  const ss = document.querySelector('.slideshow');
  if (!ss) return;

  const slides   = Array.from(ss.querySelectorAll('.slide'));
  const dotsWrap = ss.querySelector('.dots');
  const btnPrev  = ss.querySelector('.prev');
  const btnNext  = ss.querySelector('.next');
  const btnPause = ss.querySelector('.pause');
  const intervalMs = Number(ss.dataset.interval || 5000);

  if (!slides.length) return;           // nothing to do

  let index = slides.findIndex(s => s.classList.contains('is-active'));
  if (index < 0) index = 0, slides[0].classList.add('is-active');

  if (dotsWrap){
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Slide ' + (i+1));
      b.addEventListener('click', () => go(i));
      dotsWrap.appendChild(b);
    });
  }

  function syncDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('button').forEach((b, i) => {
      b.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
  }

  function go(i) {
    slides[index].classList.remove('is-active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('is-active');
    syncDots();
  }

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  btnNext && btnNext.addEventListener('click', next);
  btnPrev && btnPrev.addEventListener('click', prev);

  ss.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  });
  ss.tabIndex = 0;

  let timer = null, paused = false;
  function start() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (timer || paused) return;
    timer = setInterval(next, intervalMs);
  }
  function stop() { if (timer) clearInterval(timer); timer = null; }
  function setPaused(p) {
    paused = p;
    if (btnPause){
      btnPause.setAttribute('aria-pressed', String(p));
      btnPause.textContent = p ? 'Play' : 'Pause';
    }
    p ? stop() : start();
  }

  ss.addEventListener('mouseenter', stop);
  ss.addEventListener('mouseleave', () => { if (!paused) start(); });
  ss.addEventListener('focusin',  stop);
  ss.addEventListener('focusout', () => { if (!paused) start(); });
  btnPause && btnPause.addEventListener('click', () => setPaused(!paused));

  syncDots();
  start();
})();
</script>

