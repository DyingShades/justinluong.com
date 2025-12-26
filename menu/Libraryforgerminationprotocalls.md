---
layout: page
title: Seed Germination Library
permalink: /menu/seed-germination-library.html
---

<p>
A community-built reference for seed handling and germination protocols.
Entries are grouped A–Z by <em>scientific name</em>. Click a letter to jump.
</p>

<div class="seedlib">
  {%- assign letters = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z" | split: "," -%}
  {%- assign entries = site.data.germination_library | sort: "scientific_name" -%}

  <!-- Sticky A–Z bar -->
  <nav class="seedlib-az" aria-label="A to Z index">
    {%- for L in letters -%}
      {%- assign has_letter = false -%}
      {%- for e in entries -%}
        {%- assign first = e.scientific_name | slice: 0, 1 | upcase -%}
        {%- if first == L -%}
          {%- assign has_letter = true -%}
          {%- break -%}
        {%- endif -%}
      {%- endfor -%}

      {%- if has_letter -%}
        <a class="seedlib-az__link" href="#letter-{{ L }}">{{ L }}</a>
      {%- else -%}
        <span class="seedlib-az__link is-disabled" aria-disabled="true">{{ L }}</span>
      {%- endif -%}
    {%- endfor -%}
  </nav>

  <!-- Sections A–Z -->
  {%- for L in letters -%}
    {%- assign any = false -%}
    {%- for e in entries -%}
      {%- assign first = e.scientific_name | slice: 0, 1 | upcase -%}
      {%- if first == L -%}{%- assign any = true -%}{%- break -%}{%- endif -%}
    {%- endfor -%}

    {%- if any -%}
      <section class="seedlib-letter" id="letter-{{ L }}">
        <h2 class="seedlib-letter__title">{{ L }}</h2>

        <div class="seedlib-grid">
          {%- for e in entries -%}
            {%- assign first = e.scientific_name | slice: 0, 1 | upcase -%}
            {%- if first == L -%}
              <article class="seedcard">
                <div class="seedcard-media">
                  {%- if e.photo and e.photo != "" -%}
                    <img
                      src="{{ site.baseurl }}/assets/img/{{ e.photo }}"
                      alt="{{ e.photo_alt | default: e.scientific_name }}"
                      loading="lazy">
                  {%- else -%}
                    <div class="seedcard-media__placeholder" aria-hidden="true">Photo</div>
                  {%- endif -%}
                </div>

                <div class="seedcard-body">
                  <header class="seedcard-header">
                    <h3 class="seedcard-common">{{ e.common_name | default: "Common name" }}</h3>
                    <p class="seedcard-latin"><em>{{ e.scientific_name }}</em>{% if e.family %} · {{ e.family }}{% endif %}</p>
                  </header>

                  {%- if e.short_bio -%}
                    <p class="seedcard-bio">{{ e.short_bio }}</p>
                  {%- else -%}
                    <p class="seedcard-bio is-muted">Short bio placeholder.</p>
                  {%- endif -%}

                  <ul class="seedcard-facts" aria-label="Quick germination facts">
                    {%- if e.pretreatment -%}<li><strong>Pre:</strong> {{ e.pretreatment }}</li>{%- endif -%}
                    {%- if e.stratification -%}<li><strong>Strat:</strong> {{ e.stratification }}</li>{%- endif -%}
                    {%- if e.light -%}<li><strong>Light:</strong> {{ e.light }}</li>{%- endif -%}
                    {%- if e.temp -%}<li><strong>Temp:</strong> {{ e.temp }}</li>{%- endif -%}
                    {%- if e.days_to_germinate -%}<li><strong>Days:</strong> {{ e.days_to_germinate }}</li>{%- endif -%}
                    {%- if e.germination_rate -%}<li><strong>Rate:</strong> {{ e.germination_rate }}</li>{%- endif -%}
                  </ul>

                  <details class="seedcard-details">
                    <summary class="seedcard-details__summary">Germination details</summary>

                    <div class="seedcard-details__content">
                      {%- if e.region or e.habitat -%}
                        <p class="seedcard-meta">
                          {%- if e.region -%}<strong>Region:</strong> {{ e.region }}{% endif -%}
                          {%- if e.region and e.habitat -%} · {% endif -%}
                          {%- if e.habitat -%}<strong>Habitat:</strong> {{ e.habitat }}{% endif -%}
                        </p>
                      {%- endif -%}

                      {%- if e.sowing_notes -%}
                        <p><strong>Sowing notes:</strong> {{ e.sowing_notes }}</p>
                      {%- endif -%}

                      {%- if e.sources and e.sources.size > 0 -%}
                        <p><strong>Sources:</strong></p>
                        <ul class="seedcard-sources">
                          {%- for s in e.sources -%}
                            <li>
                              {%- if s.url and s.url != "" -%}
                                <a href="{{ s.url }}">{{ s.label | default: s.url }}</a>
                              {%- else -%}
                                {{ s.label | default: "Source placeholder" }}
                              {%- endif -%}
                            </li>
                          {%- endfor -%}
                        </ul>
                      {%- endif -%}
                    </div>
                  </details>
                </div>
              </article>
            {%- endif -%}
          {%- endfor -%}
        </div>
      </section>
    {%- endif -%}
  {%- endfor -%}
</div>

<script src="{{ '/assets/js/seedlib-az.js' | relative_url }}" defer></script>
