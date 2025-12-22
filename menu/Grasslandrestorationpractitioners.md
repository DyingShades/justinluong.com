---
layout: page
title: Grassland Restoration Practitioners
permalink: /menu/Grasslandrestorationpractitioners.html

# Copy/paste a new block under practitioners: to add another person.
practitioners:
  - name: "Scott Butterfield"
    role: "Lead Scientist at The Nature Conservancy in California (e.g., Land Program)"
    location: "Organization • Region"
    headshot: "placeholder-headshot.jpg"
    headshot_alt: "H. Scott Butterfield"
    headshot_caption: "Optional caption (e.g., Field site, year)"

    bio: |
      In The Nature Conservancy's California Chapter, Scott is a Lead Scientist in the Land Program, helping to oversee science, stewardship, including cattle grazing, and land protection across TNC's more than 400,000 acre grassland and oak woodland conservation estate. Scott is also the lead scientist for the Strategic Restoration Scientist in the San Joaquin Valley and TNC's lead for participation as a management partner at the Carrizo Plain National Monumnet. Read more here (https://www.scienceforconservation.org/our-team/scott-butterfield)

    tags:
      - "Seed collection"
      - "Prescribed grazing"
      - "Monitoring"
      - "Invasive management"

    links:
      - label: "Website"
        url: "https://example.com"
        primary: true

    gallery_title: "Fieldwork & Projects"
    gallery_intro: "A few images showing typical restoration activities and sites."
    gallery:
      - src: "placeholder-1.jpg"
        alt: "Placeholder image showing restoration work"
        caption: "Short caption (optional)"
      - src: "placeholder-2.jpg"
        alt: "Placeholder image showing monitoring"
        caption: "Short caption (optional)"
      - src: "placeholder-3.jpg"
        alt: "Placeholder image showing native plant work"
        caption: "Short caption (optional)"
---

<div class="practitioners-intro">
  <p>
    This page highlights practitioners working in grassland restoration. Each profile includes a short description of their work and a photo library of typical projects and field activities.
  </p>
</div>

{% for p in page.practitioners %}
<article class="practitioner">
  <h2 class="practitioner__name">{{ p.name }}</h2>
  <p class="practitioner__kicker">
    {{ p.role }}{% if p.location %} • {{ p.location }}{% endif %}
  </p>

  <div class="practitioner-grid">
    <div class="practitioner__bio">
      {{ p.bio | markdownify }}

      {% if p.tags %}
      <ul class="practitioner-tags" aria-label="Focus areas">
        {% for t in p.tags %}
          <li class="tag">{{ t }}</li>
        {% endfor %}
      </ul>
      {% endif %}

      {% if p.links %}
      <nav class="practitioner-actions" aria-label="Profile links for {{ p.name }}">
        {% for l in p.links %}
          <a
            href="{{ l.url }}"
            {% if l.primary %}class="is-primary"{% endif %}
            {% if l.url contains 'http' %}target="_blank" rel="noopener"{% endif %}
          >
            {{ l.label }}
          </a>
        {% endfor %}
      </nav>
      {% endif %}
    </div>

    <figure class="practitioner__headshot">
      <img
        src="{{ '/assets/img/' | append: p.headshot | relative_url }}"
        alt="{{ p.headshot_alt | default: p.name }}"
        loading="lazy"
      >
      {% if p.headshot_caption %}
      <figcaption>{{ p.headshot_caption }}</figcaption>
      {% endif %}
    </figure>
  </div>

  {% if p.gallery and p.gallery.size > 0 %}
  <div class="gallery-mosaic">
    <h3 class="gallery-mosaic__title">{{ p.gallery_title | default: "Photo Library" }}</h3>
    {% if p.gallery_intro %}
      <p class="gallery-mosaic__intro">{{ p.gallery_intro }}</p>
    {% endif %}

    <div class="gallery-grid">
      {% for ph in p.gallery %}
      <figure class="gallery-grid__item">
        <div class="gallery-grid__img-wrap">
          <img
            src="{{ '/assets/img/' | append: ph.src | relative_url }}"
            alt="{{ ph.alt | default: '' }}"
            loading="lazy"
          >
        </div>
        {% if ph.caption %}
          <figcaption>{{ ph.caption }}</figcaption>
        {% endif %}
      </figure>
      {% endfor %}
    </div>
  </div>
  {% endif %}

  <div class="track-mixed" aria-hidden="true"></div>
</article>
{% endfor %}

