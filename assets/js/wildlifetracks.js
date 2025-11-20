
// Wildlife Track Divider (fetch + inline external SVG assets)
// Files expected at:
//   /assets/img/hoofprint.svg
//   /assets/img/pawprint.svg
//   /assets/img/duckprint.svg
// Exposes window.renderAllTracks() for manual re-render after dynamic content loads.

// /assets/js/wildlife-tracks.js
(function () {
  const DEFAULTS = {
    types: ['hoof','paw','duck'],
    size: 15,           // print height (px)
    stride: 60,        // distance between steps (px)
    offset: 0.3,          // left/right step offset from center (px)
    amp: 0.15,             // sine amplitude (px)
    waves: 0.5,         // sine waves across divider
    tilt: 6,            // small random foot tilt (deg)
    jitter: 6, 
    toe: 1,    
    dir: 1,
    srcs: {
      hoof: '/assets/img/hoofprint.svg',
      paw:  '/assets/img/pawprint.svg',
      duck: '/assets/img/duckprint.svg',
    }
  };

  const svgNS   = 'http://www.w3.org/2000/svg';
  const xlinkNS = 'http://www.w3.org/1999/xlink';

  // ---------- helpers ----------
  const parseList = (el, name, fb) =>
    (el.getAttribute('data-'+name)?.split(',').map(s=>s.trim()).filter(Boolean)) || fb.slice();
  const num = (el, name, fb) => {
    const v = parseFloat(el.getAttribute('data-'+name));
    return Number.isFinite(v) ? v : fb;
  };
  function getSources(el){
    return {
      hoof: el.getAttribute('data-src-hoof') || DEFAULTS.srcs.hoof,
      paw:  el.getAttribute('data-src-paw')  || DEFAULTS.srcs.paw,
      duck: el.getAttribute('data-src-duck') || DEFAULTS.srcs.duck,
    };
  }

  async function fetchInlineSVG(url){
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const text = await res.text();

    // Parse as XML
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'image/svg+xml');
    const svg = doc.documentElement;
    if (svg.nodeName.toLowerCase() !== 'svg') throw new Error('Not an <svg>');

    // viewBox
    let vb = svg.getAttribute('viewBox');
    if (!vb){
      const w = parseFloat(svg.getAttribute('width'))  || 100;
      const h = parseFloat(svg.getAttribute('height')) || 100;
      vb = `0 0 ${w} ${h}`;
    }
    const viewBox = vb.trim().split(/[\s,]+/).map(Number);

    // Children (skip nested <defs>)
    const nodes = [];
    [...svg.childNodes].forEach(n => {
      if (n.nodeType === 1 && n.nodeName.toLowerCase() === 'defs') return;
      if (n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim())){
        nodes.push(n);
      }
    });

    return { viewBox, nodes };
  }

  async function addSymbolFromFile(defs, key, url){
    const sym = document.createElementNS(svgNS, 'symbol');
    sym.setAttribute('id', `fp-${key}`);
    sym.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    try{
      const { viewBox, nodes } = await fetchInlineSVG(url);
      sym.setAttribute('viewBox', viewBox.join(' '));
      sym.setAttribute('data-center-x', String(viewBox[0] + viewBox[2]/2));
      sym.setAttribute('data-center-y', String(viewBox[1] + viewBox[3]/2));
      nodes.forEach(n => sym.appendChild(sym.ownerDocument.importNode(n, true)));
    }catch(err){
      console.warn(`[tracks] fallback for ${key} (${url}):`, err);
      // simple glyph fallbacks so you still see something
      if (key === 'hoof'){
        sym.setAttribute('viewBox','0 0 120 60');
        sym.setAttribute('data-center-x','60'); sym.setAttribute('data-center-y','30');
        sym.innerHTML = `<path d="M40 55c-12 0-22-10-22-22 0-17 13-28 22-28s22 11 22 28c0 12-10 22-22 22z"/>
                         <path d="M80 55c-12 0-22-10-22-22 0-17 13-28 22-28s22 11 22 28c0 12-10 22-22 22z"/>`;
      } else if (key === 'paw'){
        sym.setAttribute('viewBox','0 0 100 100');
        sym.setAttribute('data-center-x','50'); sym.setAttribute('data-center-y','60');
        sym.innerHTML = `<path d="M50 70c15 0 26 10 26 20s-11 10-26 10-26-0-26-10 11-20 26-20z"/>
                         <circle cx="25" cy="45" r="10"/>
                         <circle cx="42" cy="35" r="10"/>
                         <circle cx="58" cy="35" r="10"/>
                         <circle cx="75" cy="45" r="10"/>`;
      } else {
        sym.setAttribute('viewBox','0 0 120 120');
        sym.setAttribute('data-center-x','60'); sym.setAttribute('data-center-y','70');
        sym.innerHTML = `<path d="M60 20 C55 40,45 55,30 70 C40 72,50 76,60 84 C70 76,80 72,90 70 C75 55,65 40,60 20 Z"/>
                         <path d="M60 84 C48 92,40 100,36 110 C52 104,68 104,84 110 C80 100,72 92,60 84 Z"/>`;
      }
    }

    defs.appendChild(sym);
  }

  async function buildDefs(svg, el){
    const defs = document.createElementNS(svgNS,'defs');
    svg.appendChild(defs);
    const srcs = getSources(el);
    await Promise.all([
      addSymbolFromFile(defs, 'hoof', srcs.hoof),
      addSymbolFromFile(defs, 'paw',  srcs.paw),
      addSymbolFromFile(defs, 'duck', srcs.duck),
    ]);
  }

  function getSymbolCenter(svg, id){
    const sym = svg.querySelector(`symbol#${id}`);
    const vb = (sym && sym.getAttribute('viewBox')) ? sym.getAttribute('viewBox').trim().split(/[\s,]+/).map(Number) : null;
    let cx = Number(sym?.getAttribute('data-center-x'));
    let cy = Number(sym?.getAttribute('data-center-y'));
    if (Number.isFinite(cx) && Number.isFinite(cy)) return [cx, cy];
    if (vb && vb.length === 4) return [vb[0] + vb[2]/2, vb[1] + vb[3]/2];
    return [50,50];
  }

  async function renderTrack(el, attempt=0){
    const types   = parseList(el, 'types', DEFAULTS.types);
    const size    = num(el, 'size', DEFAULTS.size);
    const stride  = Math.max(24, num(el, 'stride', DEFAULTS.stride));
    const offset  = num(el, 'offset', DEFAULTS.offset);
    const amp     = num(el, 'amp', DEFAULTS.amp);
    const waves   = num(el, 'waves', DEFAULTS.waves);
    const tiltMax = num(el, 'tilt', DEFAULTS.tilt);
    const jitter  = num(el, 'jitter', DEFAULTS.jitter);
    const toeDeg  = num(el, 'toe',   DEFAULTS.toe);  
    const dir     = Math.sign(num(el,'dir',DEFAULTS.dir)) || 1;
    const baseRot = num(el, 'rotate', 90);   // rotate whole footprint so 'forward' points →


    // pick ONE type and keep it stable across re-renders
    let chosen = el.dataset.chosenType;
    if (!chosen){
      chosen = types[Math.floor(Math.random()*types.length)];
      el.dataset.chosenType = chosen;
    }
    const symbolId = `fp-${chosen}`;

    // ensure we have dimensions
    const rect = el.getBoundingClientRect();
    let width  = Math.max(rect.width, el.clientWidth, 0);
    let height = Math.max(el.clientHeight || 44, 44);

    if (width < 10 && attempt < 10) {
      return requestAnimationFrame(() => renderTrack(el, attempt+1));
    }
    if (width < 10) width = 600;

    // how many steps across
    const steps = Math.max(1, Math.round(width / stride));

    // Build SVG
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('xmlns:xlink', xlinkNS);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'none');

    await buildDefs(svg, el);

    // centerline wave
    const midY = height / 2;
    const tau = Math.PI * 2;
    const centerY = t => midY + amp * Math.sin(tau * waves * t);
    const dy_dt   = t => amp * tau * waves * Math.cos(tau * waves * t);

    const [cx, cy] = getSymbolCenter(svg, symbolId);
    const baseScale = size / 60; // normalize to ~60px glyph height

   for (let i = 0; i < steps; i++){
  const t  = (i + 0.5) / steps;
  const x0 = (dir === 1 ? t : (1 - t)) * width;   // direction applied
  const y0 = centerY(t);

  // tangent angle for natural heading
  const theta    = Math.atan2(dy_dt(t), width);
  const thetaDeg = theta * 180/Math.PI;

  // alternate left/right
  const lr = (i % 2 === 0 ? 1 : -1);
  const ox =  lr * offset * Math.sin(theta);
  const oy = -lr * offset * Math.cos(theta);

  const x = x0 + ox + (Math.random()*2-1) * (jitter*0.3);
  const y = y0 + oy + (Math.random()*2-1) * (jitter*0.3);
  const rJitter = (Math.random()*2-1) * tiltMax;
  const toe     = (lr === 1 ? -toeDeg : toeDeg);  // toe-out / toe-in
  const mirror  = lr === 1 ? 1 : -1;

  const g = document.createElementNS(svgNS, 'g');
  g.setAttribute('transform',
    `translate(${x} ${y}) rotate(${thetaDeg + toe + rJitter + baseRot}) ` +
    `scale(${baseScale*mirror} ${baseScale}) translate(${-cx} ${-cy})`
  );

  const use = document.createElementNS(svgNS, 'use');
  use.setAttributeNS(xlinkNS, 'xlink:href', `#${symbolId}`);
  use.setAttribute('href', `#${symbolId}`);
  g.appendChild(use);
  svg.appendChild(g);
}


    el.innerHTML = '';
    el.appendChild(svg);
  }

  async function renderAll(){
    const tracks = document.querySelectorAll('.track-mixed');
    for (const el of tracks){
      if (!el.style.height) el.style.height = '44px'; // guarantee a box
      await renderTrack(el);
    }
  }

  function init(){
    const tracks = document.querySelectorAll('.track-mixed');
    if (!tracks.length) return;
    requestAnimationFrame(renderAll);

    let t=null;
    addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(renderAll, 120);
    }, { passive: true });

    // expose manual re-render if you inject content later
    window.renderAllTracks = renderAll;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else { init(); }
})();



