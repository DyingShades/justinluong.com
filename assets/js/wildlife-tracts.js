<script>
// Wildlife Track Divider (external SVG assets)
// Uses your own files: hoofprint.svg, pawprint.svg, duckprint.svg
// Works in Safari via xlink:href fallback and retries until width > 10.

(function () {
  const DEFAULTS = {
    types: ['hoof','paw','duck'],
    size: 36,          // approx track size in px (scaled uniformly)
    spacing: 48,
    density: 1.0,
    jitter: 8,
    tilt: 15,
    // default asset paths (override per element with data-src-* attrs)
    srcs: {
      hoof: '/assets/img/hoofprint.svg',
      paw:  '/assets/img/pawprint.svg',
      duck: '/assets/img/duckprint.svg',
    },
    // assume square artboards unless you override viewboxes
    viewBox: { hoof: [0,0,100,100], paw: [0,0,100,100], duck: [0,0,100,100] },
    centers: { hoof: [50,50], paw: [50,50], duck: [50,50] } // center of each artboard
  };

  const svgNS   = 'http://www.w3.org/2000/svg';
  const xlinkNS = 'http://www.w3.org/1999/xlink';

  const parseList = (el, name, fb) =>
    (el.getAttribute('data-'+name)?.split(',').map(s=>s.trim()).filter(Boolean)) || fb.slice();
  const num = (el, name, fb) => {
    const v = parseFloat(el.getAttribute('data-'+name));
    return Number.isFinite(v) ? v : fb;
  };
  const rand = (a,b)=> a + Math.random()*(b-a);
  const choose = arr => arr[Math.floor(Math.random()*arr.length)];

  // Read optional per-element overrides
  function getSources(el){
    return {
      hoof: el.getAttribute('data-src-hoof') || DEFAULTS.srcs.hoof,
      paw:  el.getAttribute('data-src-paw')  || DEFAULTS.srcs.paw,
      duck: el.getAttribute('data-src-duck') || DEFAULTS.srcs.duck,
    };
  }
  function getViewBox(el, key){
    const attr = el.getAttribute(`data-viewbox-${key}`); // e.g. "0 0 120 80"
    if (attr) {
      const parts = attr.split(/[\s,]+/).map(Number).filter(n => Number.isFinite(n));
      if (parts.length === 4) return parts;
    }
    return DEFAULTS.viewBox[key];
  }
  function getCenter(el, key){
    const attr = el.getAttribute(`data-center-${key}`); // e.g. "60 40"
    if (attr) {
      const parts = attr.split(/[\s,]+/).map(Number).filter(n => Number.isFinite(n));
      if (parts.length === 2) return parts;
    }
    return DEFAULTS.centers[key];
  }

  function buildDefs(svg, el){
    const defs = document.createElementNS(svgNS,'defs');
    const srcs = getSources(el);

    // Build a <symbol> that draws your file as an <image>
    function symbolFor(id, src, vb){
      const sym = document.createElementNS(svgNS, 'symbol');
      sym.setAttribute('id', `fp-${id}`);
      sym.setAttribute('viewBox', vb.join(' '));
      sym.setAttribute('preserveAspectRatio', 'xMidYMid meet');

      const img = document.createElementNS(svgNS, 'image');
      img.setAttribute('x', vb[0]);
      img.setAttribute('y', vb[1]);
      img.setAttribute('width', vb[2]);
      img.setAttribute('height', vb[3]);
      // xlink for Safari + href for modern
      img.setAttributeNS(xlinkNS, 'xlink:href', src);
      img.setAttribute('href', src);
      sym.appendChild(img);
      return sym;
    }

    defs.appendChild(symbolFor('hoof', srcs.hoof, getViewBox(el, 'hoof')));
    defs.appendChild(symbolFor('paw',  srcs.paw,  getViewBox(el, 'paw')));
    defs.appendChild(symbolFor('duck', srcs.duck, getViewBox(el, 'duck')));

    svg.appendChild(defs);
  }

  function renderTrack(el, attempt=0){
    const types   = parseList(el, 'types', DEFAULTS.types);
    const size    = num(el, 'size', DEFAULTS.size);
    const spacing = Math.max(8, num(el, 'spacing', DEFAULTS.spacing));
    const density = Math.max(0.2, num(el, 'density', DEFAULTS.density));
    const jitter  = num(el, 'jitter', DEFAULTS.jitter);
    const tilt    = Math.max(0, num(el, 'tilt', DEFAULTS.tilt));

    const rect = el.getBoundingClientRect();
    let width  = Math.max(rect.width, el.clientWidth, 0);
    let height = Math.max(el.clientHeight || 44, 44);

    // Wait for layout to settle
    if (width < 10 && attempt < 10) {
      return requestAnimationFrame(() => renderTrack(el, attempt+1));
    }
    if (width < 10) width = 600; // last resort so something is visible

    const n = Math.max(1, Math.round((width / spacing) * density));
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('xmlns:xlink', xlinkNS);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'none');

    buildDefs(svg, el);

    // Place prints
    for (let i=0;i<n;i++){
      const t = choose(types); // 'hoof' | 'paw' | 'duck'
      const id = `fp-${t}`;
      const href = `#${id}`;

      const xBase = (i + 0.5) * (width / n);
      const x = xBase + rand(-jitter, jitter);
      const y = height/2 + rand(-jitter*0.5, jitter*0.5);
      const r = rand(-tilt, tilt);
      const flip = Math.random() < 0.5 ? -1 : 1;

      // center point in the source symbol's viewBox
      const c = getCenter(el, t); // e.g., [50,50] for 100x100
      // scale: treat 60 units ~= 60px; you can adjust if your art is larger/smaller
      const scale = size / 60;

      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('transform',
        `translate(${x} ${y}) rotate(${r}) scale(${scale*flip} ${scale}) translate(${-c[0]} ${-c[1]})`
      );

      const use = document.createElementNS(svgNS, 'use');
      use.setAttributeNS(xlinkNS, 'xlink:href', href); // Safari
      use.setAttribute('href', href);                   // modern
      g.appendChild(use);
      svg.appendChild(g);
    }

    el.innerHTML = '';
    el.appendChild(svg);
  }

  function init(){
    const tracks = document.querySelectorAll('.track-mixed');
    if (!tracks.length) return;

    tracks.forEach(el => { if (!el.style.height) el.style.height = '44px'; });
    requestAnimationFrame(() => tracks.forEach(el => renderTrack(el)));

    let t=null;
    addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(() => tracks.forEach(el => renderTrack(el)), 120);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else { init(); }
})();

</script>

