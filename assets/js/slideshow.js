
(function () {
  const ss = document.querySelector('.slideshow');
  if (!ss) return;

  const slides   = Array.from(ss.querySelectorAll('.slide'));
  const dotsWrap = ss.querySelector('.dots');
  const btnPrev  = ss.querySelector('.prev');
  const btnNext  = ss.querySelector('.next');
  const btnPause = ss.querySelector('.pause');
  const intervalMs = Number(ss.dataset.interval || 5000);

  if (!slides.length) return;

  let index = slides.findIndex(s => s.classList.contains('is-active'));
  if (index < 0) { index = 0; slides[0].classList.add('is-active'); }

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

