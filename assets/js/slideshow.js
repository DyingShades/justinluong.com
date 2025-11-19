// /assets/js/slideshow.js
(function () {
  function initSlideshow(ss) {
    const slides   = Array.from(ss.querySelectorAll('.slide'));
    if (!slides.length) return;

    const dotsWrap = ss.querySelector('.dots');
    const btnPrev  = ss.querySelector('.prev');
    const btnNext  = ss.querySelector('.next');
    const btnPause = ss.querySelector('.pause');
    const intervalMs = Number(ss.dataset.interval || 5000);

    // starting slide
    let index = slides.findIndex(s => s.classList.contains('is-active'));
    if (index < 0) {
      index = 0;
      slides[0].classList.add('is-active');
    }

    // Use existing dot buttons if present; otherwise create them
    let dots = [];
    if (dotsWrap) {
      dots = Array.from(dotsWrap.querySelectorAll('button'));

      if (!dots.length) {
        // create dots if none were rendered in HTML
        slides.forEach((_, i) => {
          const b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('role', 'tab');
          b.setAttribute('aria-label', 'Slide ' + (i + 1));
          dotsWrap.appendChild(b);
          dots.push(b);
        });
      }

      // wire up dot clicks
      dots.forEach((b, i) => {
        b.addEventListener('click', () => go(i));
      });
    }

    function syncDots() {
      if (!dots.length) return;
      dots.forEach((b, i) => {
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

    // autoplay
    let timer = null;
    let paused = false;

    function start() {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (timer || paused) return;
      timer = setInterval(next, intervalMs);
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }
    function setPaused(p) {
      paused = p;
      if (btnPause) {
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

    // initial sync + start
    syncDots();
    start();
  }

  function initAllSlideshows() {
    document
      .querySelectorAll('.slideshow')
      .forEach(initSlideshow);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllSlideshows);
  } else {
    initAllSlideshows();
  }
})();
