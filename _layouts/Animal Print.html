<script>
/*
  Mixed Wildlife Track Divider
  - Randomly places hoof, paw, and duck prints along a line.
  - No external assets; vectors are here as <symbol>s.
  - Prints inherit CSS 'color' via currentColor.
*/

(function () {
  const DEFAULTS = {
    types: ['hoof', 'paw', 'duck'],
    size: 36,         // px, footprint box (max dimension)
    spacing: 48,      // px, base gap between centers
    density: 1.0,     // multiplier for number of prints
    jitter: 8,        // px, random x/y offset
    tilt: 15          // deg, random rotation
  };

  // Simple vector footprints (normalized ~100x100 viewBox)
  // Fill is 'currentColor' so they theme automatically.
  const SYMBOLS = {
    hoof: `
      <symbol id="fp-hoof" viewBox="0 0 120 60">
        <path d="M40 55c-12 0-22-10-22-22 0-17 13-28 22-28s22 11 22 28c0 12-10 22-22 22z" fill="currentColor"/>
        <path d="M80 55c-12 0-22-10-22-22 0-17 13-28 22-28s22 11 22 28c0 12-10 22-22 22z" fill="currentColor"/>
      </symbol>
    `,
    paw: `
      <symbol id="fp-paw" viewBox="0 0 100 100">
        <!-- pad -->
        <path d="M50 70c15 0 26 10 26 20s-11 10-26 10-26-0-26-10 11-20 26-20z" fill="currentColor"/>
        <!-- toes -->
        <circle cx="25" cy="45" r="10" fill="currentColor"/>
        <circle cx="42" cy="35" r="10" fill="currentColor"/>
        <circle cx="58" cy="35" r="10" fill="currentColor"/>
        <circle cx="75" cy="45" r="10" fill="currentColor"/>
      </symbol>
    `,
    duck: `
      <symbol id="fp-duck" viewBox="0 0 120 120">
        <!-- three-pronged webbed foot -->
        <path d="M60 20
                 C55 40,45 55,30 70
                 C40 72,50 76,60 84
                 C70 76,80 72,90 70
                 C75 55,65 40,60 20 Z"
              fill="currentColor"/>
        <!-- side web lobes -->
        <path d="M60 84 C48 92,40 100,36 110 C52 104,68 104,84 110 C80 100,72 92,60 84 Z"
              fill="currentColor"/>
      </symbol>
    `
  };

  function buildDefs() {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = SYMBOLS.hoof + SYMBOLS.paw + SYMBOLS.duck;
    return defs;
  }

  function parseList(el, name, fallback) {
    const v = el.getAttribute('data-' + name);
    if (!v) return fallback.slice();
    return v.split(',').map(s => s.trim()).filter(Boolean);
  }

  function num(el, name, fallback) {
    const v = parseFloat(el.getAttribute('data-' + name));
    return isFinite(v) ? v : fallback;
  }

  function randRange(min, max) {
    return min + Math.random() * (max - min);
  }

  function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function renderTrack(el) {
    const types = parseList(el, 'types', DEFAULTS.types);
    const size = num(el, 'size', DEFAULTS.size);
    const spacing = Math.max(8, num(el, 'spacing', DEFAULTS.spacing));
    const density = Math.max(0.2, num(el, 'density', DEFAULTS.density));
    const jitter = num(el, 'jitter', DEFAULTS.jitter);
    const tilt = Math.max(0, num(el, 'tilt', DEFAULTS.tilt));

    const width = el.clientWidth || el.getBoundingClientRect().width;
    const height = el.clientHeight || 44;
    const centerY = height / 2;

    // How many placements fit across the width?
    const baseCount = Math.floor(width / spacing);
    const n = Math.max(1, Math.round(baseCount * density));

    // Create SVG
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'none');

    // Add defs once per element
    svg.appendChild(buildDefs());

    // Place mixed prints
    for (let i = 0; i < n; i++) {
      const t = choose(types);
      const href = (t === 'hoof') ? '#fp-hoof' : (t === 'paw' ? '#fp-paw' : '#fp-duck');

      const xBase = (i + 0.5) * (width / n);
      const x = xBase + randRange(-jitter, jitter);
      const y = centerY + randRange(-jitter * 0.5, jitter * 0.5);
      const r = randRange(-tilt, tilt);
      const flip = Math.random() < 0.5 ? -1 : 1; // alternate/reflection for variety

      const g = document.createElementNS(svgNS, 'g');
      // Normalize symbols around their centers:
      // hoof viewBox 120x60, center ~ (60,30)
      // paw viewBox 100x100, center ~ (50,60)
      // duck viewBox 120x120, center ~ (60,70)
      const centers = { hoof:[60,30], paw:[50,60], duck:[60,70] };
      const c = centers[t] || [50,50];

      const scale = size / 60; // consistent visual sizing across symbols
      const transform = `
        translate(${x} ${y})
        rotate(${r})
        scale(${scale * flip}, ${scale})
        translate(${-c[0]} ${-c[1]})
      `.replace(/\s+/g,' ').trim();

      const use = document.createElementNS(svgNS, 'use');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href);
      use.setAttribute('href', href); // for modern browsers
      g.setAttribute('transform', transform);
      g.appendChild(use);
      svg.appendChild(g);
    }

    // Clear previous and insert
    el.innerHTML = '';
    el.appendChild(svg);
  }

  function init() {
    const tracks = document.querySelectorAll('.track-mixed');
    tracks.forEach(renderTrack);

    // Re-render on resize for responsive pages
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => tracks.forEach(renderTrack), 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
