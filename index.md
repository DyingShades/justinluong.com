---
layout: home
permalink: /index.html
title: Welcome!
show_slideshow: false
slides: 
  - src: /assets/img/burningluong.jpg
    alt: Justin On Fire
  - src: /assets/img/lab_kneeland2024.jpg
    alt: Lab
  - src: /assets/img/ylr-shelter.jpg
    alt: Drought Structures for Graduate Projects
  - src: /assets/img/LabWork.jpg
    alt: Lab
  - src: /assets/img/IMG_7271.jpeg
    alt: Justin
  - src: /assets/img/lab.png
    alt: Lab
  
---

<div class="intro-wrap">
  <div class="intro-text">
    <p>
      Dr. Luong's lab focuses on adapting restoration practices for changing climates, integrating management, and socio-economic perspectives to understand rangeland ecology. Lab members engage in hands-on, in-field learning opportunities in greenhouses and with practitioners that inform real-world rangeland restoration and management projects to cultivate a diverse and inclusive learning environment.
    </p>
    <ul class="intro-bullets">
  <li>Climate Restoration: We study how restoration can adapt to changing climates and addressing real management needs.</li>
      <br>
  <li>GRASS - Net: a practitioner community focused on seed sourcing, invasion control and sharing what works across California grasslands.</li>
      <br>
  <li>Research with Impact: from long term evaluations of 37 restored coastal grasslands to cliamte stress responses.</li>
</ul>

  </div>

  <figure class="intro-media">
    <img src="/assets/img/LabPhoto2025.jpg"
         alt="Luong Lab Potluck Spring 2025">
    <!-- <figcaption>Justin using a LI-COR instrument during field work</figcaption> -->
  </figure>
</div>


_Rangelands are globally distributed habitats with high potential for supporting nature-based climate solutions. Yet, rangelands will be affected by human disturbances that result in severe habitat degradation and may need intervention to sufficiently recover._
<hr>
___

# Restoration Science Meets Working Landscapes
Dr. Justin Luong’s program spans current research at UC Berkeley and for the past few years hands-on work with the Rangeland Resource Science community at Cal Poly Humboldt. The main focus is building climate-ready, invasion-resistant restoration for California’s grasslands and shrublands through experiments, manager driven collaborations, and open, reproducible tools. This site ties those threads together: ideas tested in the field, evidence published in journals, code and datasets you can reuse, and opportunities for students and partners to get involved.
Use the buttons below to explore each part of the program research themes, the Humboldt lab, teaching, publications, outreach, datasets, and ways to collaborate.

<nav class="btn-grid" aria-label="Site sections">
  <a class="btn btn--primary" href="/menu/berkeley.html">UC Berkeley Work+</a>
  <a class="btn btn--primary" href="/menu/aboutgrassnet.html">GRASS-Net</a>
  <a class="btn btn--primary" href="/menu/currentpeople.html">Range & Resource Lab</a>
  test text
  <br>

  <a class="btn btn--outline" href="/menu/currentresearch.html">Research Themes</a>
  <a class="btn btn--outline" href="/menu/teaching.html">Teaching+</a>
  <a class="btn btn--outline" href="/menu/publications.html">Publications</a>
  test text
  <br>

  <a class="btn btn--soft" href="/menu/outreach.html">DEI Action Plan</a>
  <a class="btn btn--soft" href="/menu/datasets.html">Berkeley</a>
  <a class="btn btn--soft" href="/menu/contact.html">Collaborate / Contact</a>
</nav>


# Quick Links:  
<hr>
We are part of the [Environmental Science, Policy & Management Department](https://ourenvironment.berkeley.edu/) at [Rausser College of Natural Resources](https://nature.berkeley.edu/)

<!-- Basic mixed track -->
<div class="track-mixed" aria-hidden="true"></div>

<div class="track-mixed"
     data-types="hoof,paw,duck"   
     data-size="40"               
     data-spacing="56"            
     data-density="1.0"          
     data-jitter="10"            
     data-tilt="20"              
     aria-hidden="true"></div>


Check out the [Luong Lab DEI Action Plan](https://docs.google.com/document/d/1RVHRP_jJqwDWBOIRaE78yCK5Q4iO7_UxVKMFNqwbh6c/edit?usp=sharing)  
<hr>

{% include slideshow.html interval=6000 %}

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

