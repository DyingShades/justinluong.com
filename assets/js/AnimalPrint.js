<script>
// Mixed Wildlife Track Divider (hardened)
(function () {
  const DEFAULTS = { types:['hoof','paw','duck'], size:36, spacing:48, density:1.0, jitter:8, tilt:15 };

  const SYMBOLS = {
    hoof: `<symbol id="fp-hoof" viewBox="0 0 120 60">
             <path d="M40 55c-12 0-22-10-22-22 0-17 13-28 22-28s22 11 22 28c0 12-10 22-22 22z" fill="currentColor"/>
             <path d="M80 55c-12 0-22-10-22-22 0-17 13-28 22-28s22 11 22 28c0 12-10 22-22 22z" fill="currentColor"/>
           </symbol>`,
    paw:  `<symbol id="fp-paw" viewBox="0 0 100 100">
             <path d="M50 70c15 0 26 10 26 20s-11 10-26 10-26-0-26-10 11-20 26-20z" fill="currentColor"/>
             <circle cx="25" cy="45" r="10" fill="currentColor"/>
             <circle cx="42" cy="35" r="10" fill="currentColor"/>
             <circle cx="58" cy="35" r="10" fill="currentColor"/>
             <circle cx="75" cy="45" r="10" fill="currentColor"/>
           </symbol>`,
    duck: `<symbol id="fp-duck" viewBox="0 0 120 120">
             <path d="M60 20 C55 40,45 55,30 70 C40 72,50 76,60 84 C70 76,80 72,90 70 C75 55,65 40,60 20 Z" fill="currentColor"/>
             <path d="M60 84 C48 92,40 100,36 110 C52 104,68 104,84 110 C80 100,72 92,60 84 Z" fill="currentColor"/>
           </symbol>`
  };

  function buildDefs(svg){
    const defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
    defs.insertAdjacentHTML('beforeend', SYMBOLS.hoof + SYMBOLS.paw + SYMBOLS.duck);
    svg.appendChild(defs);
  }
  const parseList = (el, name, fb) => (el.getAttribute('data-'+name)?.split(',').map(s=>s.trim()).filter(Boolean)) || fb.slice();
  const num = (el, name, fb) => { const v = parseFloat(el.getAttribute('data-'+name)); return Number.isFinite(v)?v:fb; };
  const rand = (a,b)=> a + Math.random()*(b-a);
  const choose = arr => arr[Math.floor(Math.random()*arr.length)];

  const centers = { hoof:[60,30], paw:[50,60], duck:[60,70] };

  function renderTrack(el){
    const types   = parseList(el, 'types', DEFAULTS.types);
    const size    = num(el, 'size', DEFAULTS.size);
    const spacing = Math.max(8, num(el, 'spacing', DEFAULTS.spacing));
    const density = Math.max(0.2, num(el, 'density', DEFAULTS.density));
    const jitter  = num(el, 'jitter', DEFAULTS.jitter);
    const tilt    = Math.max(0, num(el, 'tilt', DEFAULTS.tilt));

    let width  = Math.max(el.clientWidth, el.getBoundingClientRect().width);
    let height = Math.max(el.clientHeight, 44);

    if (width < 10) {
      // Try again after layout/paint
      requestAnimationFrame(() => renderTrack(el));
      // Log once for debugging
      if (!el.__tracksWarned) { console.warn('[tracks] width=0 for', el); el.__tracksWarned = true; }
      return;
    }

    const n = Math.max(1, Math.round((width / spacing) * density));
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'none');

    buildDefs(svg);

    for (let i=0;i<n;i++){
      const t = choose(types);
      const href = t==='hoof' ? '#fp-hoof' : (t==='paw' ? '#fp-paw' : '#fp-duck');
      const xBase = (i + 0.5) * (width / n);
      const x = xBase + rand(-jitter, jitter);
      const y = height/2 + rand(-jitter*0.5, jitter*0.5);
      const r = rand(-tilt, tilt);
      const flip = Math.random() < 0.5 ? -1 : 1;
      const c = centers[t] || [50,50];
      const scale = size / 60;

      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('transform',
        `translate(${x} ${y}) rotate(${r}) scale(${scale*flip} ${scale}) translate(${-c[0]} ${-c[1]})`
      );

      const use = document.createElementNS(svgNS, 'use');
      use.setAttribute('href', href);
      g.appendChild(use);
      svg.appendChild(g);
    }

    el.innerHTML = '';
    el.appendChild(svg);
  }

  function init(){
    const tracks = document.querySelectorAll('.track-mixed');
    if (!tracks.length) return;

    // initial render after layout
    requestAnimationFrame(() => tracks.forEach(renderTrack));

    // recompute on resize
    let t=null;
    addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(() => tracks.forEach(renderTrack), 120);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
</script>

