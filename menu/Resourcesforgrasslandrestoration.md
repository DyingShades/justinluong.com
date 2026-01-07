---
layout: default
title: Resources for Grassland Restoration
permalink: menu/Resourcesforgrasslandrestoration.html
---

<div class="container reslib">

  <p class="reslib-intro">
    A curated library of restoration-related resources. Filter by category and resource type, or search to find specific methods, tools, and examples.
  </p>

  <!-- Category filter (Soil / Planting / Seed) -->
  <nav class="btn-grid reslib-filters" aria-label="Filter resources by category">
    <a class="btn btn--primary" href="#" data-filter-cat="all">All</a>
    <a class="btn btn--soft" href="#" data-filter-cat="soil">Soil</a>
    <a class="btn btn--soft" href="#" data-filter-cat="planting">Planting</a>
    <a class="btn btn--soft" href="#" data-filter-cat="seed">Seed</a>
  </nav>

  <!-- Type + Search + Reset -->
  <div class="rp-table-head reslib-searchbar" style="margin-bottom: 1rem;">
    <h3 class="rp-table-title" style="margin:0;">Filter</h3>

    <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; justify-content:flex-end;">
      <label class="sr-only" for="resType">Resource type</label>
      <select id="resType" class="rp-filter" style="width:auto; min-width: 220px;">
        <option value="all">All resource types</option>
        <option value="news">News / Article</option>
        <option value="tool">Tool / Approach</option>
        <option value="report">Report / Summary</option>
        <option value="research">Research / Methods</option>
        <option value="place">Place / Preserve</option>
      </select>

      <label class="sr-only" for="resSearch">Search</label>
      <input class="rp-filter" id="resSearch" type="search" placeholder="Search title, org, tags…" />

      <a class="btn btn--outline" href="#" id="resReset" style="width:auto;">Reset</a>
    </div>
  </div>

  <!-- Cards -->
  <div class="reslib-grid" id="reslibGrid">
    {% assign items = site.data.resources %}
    {% for r in items %}
      <article
        class="rescard"
        data-cats="{{ r.categories | join: ' ' | downcase }}"
        data-type="{{ r.resource_type | downcase | replace: ' / ', ' ' | replace: '/', ' ' }}"
      >
        <header class="rescard-head">
          <h3 class="rescard-title">
            <a href="{{ r.url }}" target="_blank" rel="noopener">{{ r.title }}</a>
          </h3>

          <p class="rescard-meta">
            <strong>{{ r.org }}</strong>
            {% if r.resource_type %} · <span>{{ r.resource_type }}</span>{% endif %}
            {% if r.location %} · <span>{{ r.location }}</span>{% endif %}
            {% if r.year %} · <span>{{ r.year }}</span>{% endif %}
          </p>

          {% if r.categories and r.categories.size > 0 %}
            <ul class="rescard-chips" aria-label="Categories">
              {% for c in r.categories %}
                <li class="chip chip--{{ c | downcase }}">{{ c | capitalize }}</li>
              {% endfor %}
            </ul>
          {% endif %}
        </header>

        {% if r.summary %}
          <p class="rescard-summary">{{ r.summary }}</p>
        {% endif %}

        {% if r.highlights and r.highlights.size > 0 %}
          <ul class="rescard-bullets">
            {% for h in r.highlights %}
              <li>{{ h }}</li>
            {% endfor %}
          </ul>
        {% endif %}

        {% if r.tags and r.tags.size > 0 %}
          <ul class="practitioner-tags rescard-tags" aria-label="Tags">
            {% for t in r.tags %}
              <li class="tag">{{ t }}</li>
            {% endfor %}
          </ul>
        {% endif %}

        <div class="practitioner-actions rescard-actions">
          <a class="is-primary" href="{{ r.url }}" target="_blank" rel="noopener">Open resource</a>
          {% if r.pdf_url %}
            <a href="{{ r.pdf_url }}" target="_blank" rel="noopener">PDF</a>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>

  <p class="reslib-empty" id="reslibEmpty" style="display:none; color: var(--muted);">
    No matches. Try a different filter or search term.
  </p>

</div>

<script>
(function(){
  const grid = document.getElementById("reslibGrid");
  const cards = Array.from(grid.querySelectorAll(".rescard"));

  const catButtons = Array.from(document.querySelectorAll(".reslib-filters a[data-filter-cat]"));
  const typeSelect = document.getElementById("resType");
  const searchInput = document.getElementById("resSearch");
  const resetBtn = document.getElementById("resReset");
  const empty = document.getElementById("reslibEmpty");

  let state = { cat: "all", type: "all", q: "" };

  function normalize(s){ return (s || "").toLowerCase().trim(); }

  function setActiveCatButton(cat){
    catButtons.forEach(b => {
      const on = b.dataset.filterCat === cat;
      b.classList.toggle("btn--primary", on);
      b.classList.toggle("btn--soft", !on);
    });
  }

  function cardMatches(card){
    // Category
    if(state.cat !== "all"){
      const cats = (card.getAttribute("data-cats") || "").split(/\s+/).map(normalize);
      if(!cats.includes(state.cat)) return false;
    }

    // Resource type
    if(state.type !== "all"){
      const t = normalize(card.getAttribute("data-type"));
      if(!t.includes(state.type)) return false;
    }

    // Search
    if(state.q){
      const text = normalize(card.innerText);
      if(!text.includes(state.q)) return false;
    }

    return true;
  }

  function apply(){
    let shown = 0;
    cards.forEach(card => {
      const ok = cardMatches(card);
      card.style.display = ok ? "" : "none";
      if(ok) shown++;
    });
    if(empty) empty.style.display = shown ? "none" : "";
  }

  // Optional: keep filters in the URL hash so users can share filtered views.
  function writeHash(){
    const params = new URLSearchParams();
    if(state.cat !== "all") params.set("cat", state.cat);
    if(state.type !== "all") params.set("type", state.type);
    if(state.q) params.set("q", state.q);
    const s = params.toString();
    history.replaceState(null, "", s ? ("#" + s) : " ");
  }

  function readHash(){
    const h = location.hash.replace(/^#/, "");
    if(!h) return;
    const params = new URLSearchParams(h);
    state.cat =
