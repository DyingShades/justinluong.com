---
layout: page
title: Restoration Projects
permalink: /menu/Restorationprojects.html
---
<section class="rp">
  <h2 class="section-title">Restoration Projects Map</h2>

  <div class="rp-map-card">
    <div id="rp-map" class="rp-map" aria-label="Restoration projects map"></div>
    <p class="rp-map-note">
      Tip: click a marker to highlight a project below, or click a row to zoom to it.
    </p>
  </div>

  <div class="rp-table-card">
    <div class="rp-table-head">
      <h3 class="rp-table-title">Project Coordinates</h3>
      <input id="rp-filter" class="rp-filter" type="search" placeholder="Filter projects…" aria-label="Filter projects">
    </div>

    <div class="rp-table-wrap" role="region" aria-label="Restoration projects table" tabindex="0">
      <table class="rp-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Region</th>
            <th>Status</th>
            <th>Year</th>
            <th>Lat</th>
            <th>Lon</th>
          </tr>
        </thead>
        <tbody id="rp-tbody">
          {% for p in site.data.restoration_projects %}
          <tr
            class="rp-row"
            data-name="{{ p.name | escape }}"
            data-lat="{{ p.lat }}"
            data-lon="{{ p.lon }}"
            data-link="{{ p.link | relative_url }}"
            data-summary="{{ p.summary | escape }}"
          >
            <td class="rp-project">
              {% if p.link %}
                <a href="{{ p.link | relative_url }}">{{ p.name }}</a>
              {% else %}
                {{ p.name }}
              {% endif %}
            </td>
            <td>{{ p.region }}</td>
            <td>{{ p.status }}</td>
            <td>{{ p.year }}</td>
            <td>{{ p.lat }}</td>
            <td>{{ p.lon }}</td>
          </tr>
          {% endfor %}
        </tbody>
      </table>
    </div>
  </div>
</section>

<script>
document.addEventListener("DOMContentLoaded", () => {
  // --- Guard: Leaflet must be loaded ---
  if (!window.L) return;

  // --- Map init ---
  const mapEl = document.getElementById("rp-map");
  const map = L.map(mapEl, { scrollWheelZoom: false });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // --- Collect rows ---
  const rows = Array.from(document.querySelectorAll(".rp-row"));
  const markersByKey = new Map();

  function key(lat, lon){ return `${lat},${lon}`; }

  function clearRowHighlights(){
    rows.forEach(r => r.classList.remove("is-active"));
  }

  function activateRow(row){
    clearRowHighlights();
    row.classList.add("is-active");
    row.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  // --- Add markers ---
  const bounds = [];
  rows.forEach((row) => {
    const lat = parseFloat(row.dataset.lat);
    const lon = parseFloat(row.dataset.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

    const name = row.dataset.name || "Project";
    const link = row.dataset.link || "";
    const summary = row.dataset.summary || "";

    const popupHtml = `
      <div class="rp-popup">
        <strong>${name}</strong><br>
        ${summary ? `<span>${summary}</span><br>` : ""}
        ${link ? `<a href="${link}">View project</a>` : ""}
      </div>
    `;

    const marker = L.marker([lat, lon]).addTo(map).bindPopup(popupHtml);

    marker.on("click", () => {
      activateRow(row);
    });

    row.addEventListener("click", (e) => {
      // Let normal link clicks behave normally
      if (e.target && e.target.tagName === "A") return;

      activateRow(row);
      map.flyTo([lat, lon], Math.max(map.getZoom(), 10), { duration: 0.6 });
      marker.openPopup();
    });

    markersByKey.set(key(lat, lon), marker);
    bounds.push([lat, lon]);
  });

  // --- Fit view ---
  if (bounds.length) {
    map.fitBounds(bounds, { padding: [24, 24] });
  } else {
    map.setView([37.5, -119.5], 6); // fallback (California-ish)
  }

  // --- Simple filter ---
  const filter = document.getElementById("rp-filter");
  const tbody = document.getElementById("rp-tbody");

  function applyFilter(q){
    const query = (q || "").trim().toLowerCase();
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(query) ? "" : "none";
    });
  }

  filter?.addEventListener("input", (e) => applyFilter(e.target.value));
});
</script>
