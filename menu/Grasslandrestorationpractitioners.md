---
layout: page
title: Grassland Restoration Practitioners
permalink: /menu/Grasslandrestorationpractitioners.html

# Copy/paste a new block under practitioners: to add another person.
practitioners:
  - name: "Scott Butterfield"
    role: "Lead Scientist at The Nature Conservancy in California"
    location: "Land Program"
    headshot: "ScottButterfield-bio-tb.jpg"
    headshot_alt: "H. Scott Butterfield"

    bio: |
      In The Nature Conservancy's California Chapter, Scott serves as a Lead Scientist in the Land Program, overseeing science, stewardship, including, cattle grazing, and land protection across TNC's more than 400,000-acre grassland and oak woodland conservation estate. Scott is also the lead scientist for the Strategic Restoration Scientist in the San Joaquin Valley and TNC's lead for participation as a management partner at the Carrizo Plain National Monument. 

    tags:
      - "Rangeland Restoration"
      - "Remote Sensing"
      - "Wildlife Monitoring"

    links:
      - label: "Website"
        url: "https://www.scienceforconservation.org/our-team/scott-butterfield"
        primary: true
        
      - label: "Biography"
        url: "https://www.scienceforconservation.org/our-team/scott-butterfield"
        primary: true

        practitioners:
  - name: "Joshua Scoggin"
    role: "Associate Ecologist"
    location: "Hedgerow Farms / Pacific Coast Seed"
    headshot: "/Grasslandrestoration/Joshua Scoggin.JPG"
    headshot_alt: "Joshua Scoggin"

    bio: |
      Joshua Scoggin is a production and collections data manager with NativeSeed Group, Supporting Hedgerow Farms' natice seed production and wildland collections. Hedgerow Farms supplies native seed for large-scale conservation, habatitat restoration, His work focuses on managing production and collection data so that restoration teams recieve genetically appropriate, source identifies seed matched to project needs.

    tags:
      - "Rangeland Restoration"
      - "Remote Sensing"
      - "Wildlife Monitoring"

    links:
      - label: "Website"
        url: "https://www.scienceforconservation.org/our-team/scott-butterfield"
        primary: true
        
      - label: "Biography"
        url: "https://www.scienceforconservation.org/our-team/scott-butterfield"
        primary: true

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

 
</article>
{% endfor %}

