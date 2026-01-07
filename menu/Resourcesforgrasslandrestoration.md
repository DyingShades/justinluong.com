---
layout: default
title: Resources for Grassland Restoration
permalink: menu/Resourcesforgrasslandrestoration.html
---


<div class="container reslib">

  <p class="reslib-intro">
    A curated library of restoration-related resources. Filter by category and search to quickly find what you need.
  </p>

  <!-- Category selector -->
  <nav class="btn-grid reslib-filters" aria-label="Filter resources">
    <a class="btn btn--primary" href="#" data-filter="all">All</a>
    <a class="btn btn--soft" href="#" data-filter="soil">Soil</a>
    <a class="btn btn--soft" href="#" data-filter="planting">Planting</a>
    <a class="btn btn--soft" href="#" data-filter="seed">Seed</a>
  </nav>

  <!-- Search -->
  <div class="rp-table-head reslib-searchbar" style="margin-bottom: 1rem;">
    <h3 class="rp-table-title" style="margin:0;">Search</h3>
    <input class="rp-filter" id="reslibSearch" type="search" placeholder="Search title, org, type, tags…" />
  </div>

  <!-- Cards -->
  <div class="reslib-grid" id="reslibGrid">
    {% assign items = site.data.resources %}
    {% for r in items %}
      <article class="rescard" data-cats="{{ r.categories | join: ' ' }}">
        <header class="rescard-head">
          <h3 class="rescard-title">
            <a href="{{ r.url }}" target="_blank" rel="noopener">{{ r.title }}</a>
          </h3>

          <p class="rescard-meta">
            <strong>{{ r.org }}</strong>
            {% if r.resource_type %} · <span>{{ r.resource_type }}</span>{% endif %}
            {% if r.location %} · <span>{{ r.location }}</span>{% endif %}
          </p>

          <ul class="rescard-chips" aria-label="Categories">
            {% for c in r.categories %}
              <li class="chip chip--{{ c }}">{{ c | capitalize }}</li>
            {% endfor %}
          </ul>
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
  const buttons = Array.from(document.querySelectorAll(".reslib-filters a[data-filter]"));
  const search = document.getElementById("reslibSearch");
  const empty = document.getElementById("reslibEmpty");

  let active = "all";

  function setActiveButton(filter){
    buttons.forEach(b => {
      const on = b.dataset.filter === filter;
      b.classList.toggle("btn--primary", on);
      b.classList.toggle("btn--soft", !on);
    });
  }

  function matchesFilter(card){
    if(active === "all") return true;
    const cats = (card.getAttribute("data-cats") || "").split(/\s+/);
    return cats.includes(active);
  }

  function matchesSearch(card){
    const q = (search.value || "").trim().toLowerCase();
    if(!q) return true;
    return card.innerText.toLowerCase().includes(q);
  }

  function apply(){
    let shown = 0;
    cards.forEach(card => {
      const ok = matchesFilter(card) && matchesSearch(card);
      card.style.display = ok ? "" : "none";
      if(ok) shown++;
    });
    empty.style.display = shown ? "none" : "";
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      active = btn.dataset.filter;
      setActiveButton(active);
      apply();
    });
  });

  search.addEventListener("input", apply);

  setActiveButton(active);
  apply();
})();
</script>
