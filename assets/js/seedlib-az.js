// Highlights the current A–Z letter link while scrolling.
// Safe if JS fails; anchors still work.

document.addEventListener("DOMContentLoaded", () => {
  const sections = Array.from(document.querySelectorAll(".seedlib-letter[id^='letter-']"));
  const links = Array.from(document.querySelectorAll(".seedlib-az__link[href^='#letter-']"));

  if (!sections.length || !links.length) return;

  const linkById = new Map(
    links.map(a => [a.getAttribute("href").replace("#", ""), a])
  );

  const obs = new IntersectionObserver((entries) => {
    // pick the top-most visible section
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    links.forEach(a => a.removeAttribute("aria-current"));
    const id = visible.target.id;
    const a = linkById.get(id);
    if (a) a.setAttribute("aria-current", "true");
  }, {
    root: null,
    threshold: [0.2, 0.35, 0.5],
  });

  sections.forEach(s => obs.observe(s));
});
