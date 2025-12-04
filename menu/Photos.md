---
layout: default
title: Photo Gallery
permalink: /menu/photos.html
load_slideshow: true

outings:
  - title: "Bobcat Ranch Field Trip"
    date: "February 2025"
    blurb: |
      Our lab traveled to Bobcat Ranch to explore working rangelands, drought
      resilience, and grazing management. We toured ongoing restoration plots,
      practiced vegetation monitoring, and talked with partners about long-term
      stewardship.

    photos:
      - src: BobcatRanchLabTrip2025.jpg
        alt: "Lab group at Bobcat Ranch"
        caption: "Lab crew at the Bobcat Ranch overlook."
      - src: Justin-Willits-Cattle.jpg
        alt: "Justin and Willits cattle"
        caption: "Discussing grazing impacts with the herd nearby."
      - src: dyecreek baby cow.jpg
        alt: "Baby cow at Dye Creek"
        caption: "Bonus baby cow from a related rangeland visit."

  - title: "Arcata Marsh Sunset Walk"
    date: "October 2024"
    blurb: |
      An evening walk at the Arcata Marsh & Wildlife Sanctuary to unwind after
      a busy week in the lab. We looked at restored wetlands, tidal channels, and
      chatted about blue carbon, birds, and future project ideas.

    photos:
      - src: ArcataMarshSunset.jpg
        alt: "Sunset at Arcata Marsh"
        caption: "Sunset over the restored marsh."
      - src: JustinUmbrella.jpg
        alt: "Justin in the rain at a field site"
        caption: "Never not in the field – rain or shine."
      - src: LabWork.jpg
        alt: "Lab members working together"
        caption: "Back in the lab processing samples."
---

<div class="container gallery-page-intro">
  <h1>Photo Gallery</h1>
  <p>
    A peek into our lab’s field trips, restoration projects, and everyday moments.
    Browse the featured trip, then scroll through photo highlights from across our outings.
  </p>
</div>

{%- assign featured = page.outings[0] -%}

<!-- Featured outing with slideshow (only one) -->
<section class="gallery-outing gallery-outing--featured">
  <div class="container">
    <h2 class="gallery-outing__title">{{ featured.title }}</h2>
    {% if featured.date %}
      <p class="gallery-outing__meta">{{ featured.date }}</p>
    {% endif %}

    <div class="outing-grid">
      <div class="outing-text">
        {{ featured.blurb | markdownify }}
      </div>

      <div class="outing-media">
        <div
          class="slideshow"
          data-autoplay="true"
          data-interval="6000"
        >
          <div class="slides">
            {% for photo in featured.photos %}
            <figure class="slide{% if forloop.first %} is-active{% endif %}">
              <img
                src="{{ site.baseurl }}/assets/img/{{ photo.src }}"
                alt="{{ photo.alt | default: featured.title }}"
              >
              {% if photo.caption %}
              <figcaption>{{ photo.caption }}</figcaption>
              {% endif %}
            </figure>
            {% endfor %}
          </div>

          <!-- Prev / Next buttons -->
          <button class="nav prev" type="button" aria-label="Previous photo">
            &#10094;
          </button>
          <button class="nav next" type="button" aria-label="Next photo">
            &#10095;
          </button>

          <!-- Pause/Play -->
          <button class="pause" type="button">
            Pause
          </button>

          <!-- Dots -->
          <div class="dots" role="tablist" aria-label="Choose photo">
            {% for photo in featured.photos %}
            <button
              type="button"
              role="tab"
              aria-selected="{% if forloop.first %}true{% else %}false{% endif %}"
              aria-label="Show photo {{ forloop.index }} from {{ featured.title }}"
            ></button>
            {% endfor %}
          </div>
        </div>
      </div>
    </div>

    <hr class="section-divider">
  </div>
</section>

<!-- Photo panel: even square tiles from all outings -->
<section class="gallery-mosaic">
  <div class="container">
    <h2 class="gallery-mosaic__title">Photo highlights</h2>
    <p class="gallery-mosaic__intro">
      A mix of field shots, lab moments, and favorite views from across our trips.
    </p>

    <div class="gallery-grid">
      {% for outing in page.outings %}
        {% for photo in outing.photos %}
          <figure class="gallery-grid__item">
            <div class="gallery-grid__img-wrap">
              <img
                src="{{ site.baseurl }}/assets/img/{{ photo.src }}"
                alt="{{ photo.alt | default: outing.title }}"
              >
            </div>
            <figcaption>
              {% if photo.caption %}
                {{ photo.caption }}
              {% else %}
                {{ outing.title }}
              {% endif %}
            </figcaption>
          </figure>
        {% endfor %}
      {% endfor %}
    </div>
  </div>
</section>

