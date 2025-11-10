
// Wildlife Track Divider (fetch + inline external SVG assets)
// Files expected at:
//   /assets/img/hoofprint.svg
//   /assets/img/pawprint.svg
//   /assets/img/duckprint.svg
// Exposes window.renderAllTracks() for manual re-render after dynamic content loads.

(function () {
  const DEFAULTS = {
  types: ['hoof','paw','duck'],
  size: 18,          // was 36
  spacing: 96,       // was 48 (gives cleaner spacing)
  density: 1.0,
  jitter: 6,         // was 8 
  tilt: 6,           // was 15 (gentler angle)
  srcs: {
    hoof: '/assets/img/hoofprint.svg',
    paw:  '/assets/img/pawprint.svg',
    duck: '/assets/img/duckprint.svg',
  }
};


  const svgNS   = 'http://www.w3.org/2000/svg';
  const xlinkNS = 'http://www.w3.org/1999/xlink';

  // --- helpers
  const parseList = (el, name, fb) =>
    (el.getAttribute('data-'+name)?.split(',').map(s=>s.trim()).filter(Boolean)) || fb.slice();
  const num = (el, name, fb) => {
    const v = parseFloat(el.getAttribute('data-'+name));
    return Number.isFinite(v) ? v : fb;
  };
  const rand = (a,b)=> a + Math.random()*(b-a);
  const choose = arr => arr[Math.floor(Math.random()*arr.length)];

  function getSources(el){
    return {
      hoof: el.getAttribute('data-src-hoof') || DEFAULTS.srcs.hoof,
      paw:  el.getAttribute('data-src-paw')  || DEFAULTS.srcs.paw,
      duck: el.getAttribute('data-src-duck') || DEFAULTS.srcs.duck,
    };
  }

  // Fetch and parse an SVG file, return {viewBox:[x,y,w,h], content:Node[]}
  async function fetchInlineSVG(url){
    const res = await fetch(url, { cache: 'force-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const text = await res.text();

    // Parse
    const p = new DOMParser();
    const doc = p.parseFromString(text, 'image/svg+xml');
    const root = doc.documentElement; // <svg>
    if (!root || root.nodeName.toLowerCase() !== 'svg'){
      throw new Error(`Not an <svg>: ${url}`);
    }

    // viewBox
    let viewBoxAttr = root.getAttribute('viewBox') || root.getAttribute('viewbox');
    let vb = [0,0,100,100];
    if (viewBoxAttr){
      const parts = viewBoxAttr.trim().split(/[\s,]+/).map(Number);
      if (parts.length === 4 && parts.every(Number.isFinite)) {
        vb = parts;
      }
    } else {
      // Fallback from width/height if given
      const w = parseFloat(root.getAttribute('width'));
      const h = parseFloat(root.getAttribute('height'));
      if (Number.isFinite(w) && Number.isFinite(h)){
        vb = [0,0,w,h];
      }
    }

    // Extract child nodes (exclude <defs> from the source file to avoid nested defs)
    const nodes = [];
    [...root.childNodes].forEach(n => {
      if (n.nodeType === 1 /*ELEMENT_NODE*/){
        if (n.nodeName.toLowerCase() === 'defs') return;
        nodes.push(n);
      } else if (n.nodeType === 3 /*TEXT_NODE*/){
        if (n.textContent.trim()) nodes.push(n);
      }
    });

    return { viewBox: vb, nodes };
  }

  // Build <symbol id="fp-KEY"> by inlining file contents; on failure use basic shapes.
  async function addSymbolFromFile(defs, key, url){
    let sym = document.createElementNS(svgNS, 'symbol');
    sym.setAttribute('id', `fp-${key}`);
    sym.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    try{
      const { viewBox, nodes } = await fetchInlineSVG(url);
      sym.setAttribute('viewBox', viewBox.join(' '));
      // default center = middle of viewBox
      sym.setAttribute('data-center-x', String(viewBox[0] + viewBox[2]/2));
      sym.setAttribute('data-center-y', String(viewBox[1] + viewBox[3]/2));
      nodes.forEach(n => sym.appendChild(sym.ownerDocument.importNode(n, true)));
    }catch(err){
      console.warn(`[tracks] Failed to inline ${key} from ${url}:`, err);
      // simple fallback glyphs so you still see something
      if (key === 'hoof'){
        sym.setAttribute('viewBox','0 0 120 60');
        sym.setAttribute('data-center-x','60'); sym.setAttribute('data-center-y','30');
        sym.innerHTML = `<path d="M40 55c-12 0-22-10-22-22 0-17 13-28 22-28s22 11 22 28c0 12-10 22-22 22z" fill="currentColor"/>
                         <path d="M80 55c-12 0-22-10-22-22 0-17 13-28 22-28s22 11 22 28c0 12-10 22-22 22z" fill="currentColor"/>`;
      } else if (key === 'paw'){
        sym.setAttribute('viewBox','0 0 100 100');
        sym.setAttribute('data-center-x','50'); sym.setAttribute('data-center-y','60');
        sym.innerHTML = `<path d="M50 70c15 0 26 10 26 20s-11 10-26 10-26-0-26-10 11-20 26-20z" fill="currentColor"/>
                         <circle cx="25" cy="45" r="10" fill="currentColor"/>
                         <circle cx="42" cy="35" r="10" fill="currentColor"/>
                         <circle cx="58" cy="35" r="10" fill="currentColor"/>
                         <circle cx="75" cy="45" r="10" fill="currentColor"/>`;
      } else {
        sym.setAttribute('viewBox','0 0 120 120');
        sym.setAttribute('data-center-x','60'); sym.setAttribute('data-center-y','70');
        sym.innerHTML = `<path d="M60 20 C55 40,45 55,30 70 C40 72,50 76,60 84 C70 76,80 72,90 70 C75 55,65 40,60 20 Z" fill="currentColor"/>
                         <path d="M60 84 C48 92,40 100,36 110 C52 104,68 104,84 110 C80 100,72 92,60 84 Z" fill="currentColor"/>`;
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
    if (vb && vb.length === 4){
      return [vb[0] + vb[2]/2, vb[1] + vb[3]/2];
    }
    return [50,50];
  }

  async function renderTrack(el, attempt=0){
    const types   = parseList(el, 'types', DEFAULTS.types);
    const size    = num(el, 'size', DEFAULTS.size);
    const spacing = Math.max(8, num(el, 'spacing', DEFAULTS.spacing));
    const density = Math.max(0.2, num(el, 'density', DEFAULTS.density));
    const jitter  = num(el, 'jitter', DEFAULTS.jitter);
    const tilt    = Math.max(0, num(el, 'tilt', DEFAULTS.tilt));

    const rect = el.getBoundingClientRect();
    let width  = Math.max(rect.width, el.clientWidth, 0);
    let height = Math.max(el.clientHeight || 44, 44);

    if (width < 10 && attempt < 10) {
      return requestAnimationFrame(() => renderTrack(el, attempt+1));
    }
    if (width < 10) width = 600;

    const n = Math.max(1, Math.round((width / spacing) * density));

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('xmlns:xlink', xlinkNS);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'none');

    // Build symbols (await because we fetch)
    await buildDefs(svg, el);

    for (let i=0;i<n;i++){
      const t = choose(types);
      const id = `fp-${t}`;
      const xBase = (i + 0.5) * (width / n);
      const x = xBase + rand(-jitter, jitter);
      const y = height/2 + rand(-jitter*0.5, jitter*0.5);
      const r = rand(-tilt, tilt);
      const flip = Math.random() < 0.5 ? -1 : 1;
      const [cx, cy] = getSymbolCenter(svg, id);
      const scale = size / 60;

      const g = document.createElementNS(svgNS, 'g');
      g.setAttribute('transform',
        `translate(${x} ${y}) rotate(${r}) scale(${scale*flip} ${scale}) translate(${-cx} ${-cy})`
      );

      const use = document.createElementNS(svgNS, 'use');
      use.setAttributeNS(xlinkNS, 'xlink:href', `#${id}`); // Safari
      use.setAttribute('href', `#${id}`);                  // modern
      g.appendChild(use);
      svg.appendChild(g);
    }

    el.innerHTML = '';
    el.appendChild(svg);
  }

  async function renderAll(){
    const tracks = document.querySelectorAll('.track-mixed');
    for (const el of tracks){
      // give a guaranteed height and make sure not display:none
      if (!el.style.height) el.style.height = '44px';
      await renderTrack(el);
    }
  }

  function init(){
    // quick debug breadcrumb
    console.log('[tracks] init start');
    const tracks = document.querySelectorAll('.track-mixed');
    console.log('[tracks] found', tracks.length, 'track container(s)');

    if (!tracks.length) return;

    requestAnimationFrame(() => renderAll());

    let t=null;
    addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(() => renderAll(), 120);
    }, { passive: true });

    // expose manual re-render (useful if content injected later)
    window.renderAllTracks = renderAll;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once:true });
  } else { init(); }
})();



