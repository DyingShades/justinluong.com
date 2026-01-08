---
layout: page
title: Grassland Restoration Practitioners
permalink: /menu/Grasslandrestorationpractitioners.html


practitioners:
  - name: "Marcela Tayaba"
    role: "Habitat Restoration Specialist"
    location: "Enviromental Department"
    headshot: "Grasslandrestoration/Scottbutterfield.jpeg"
    headshot_alt: "Marcela Tayaba"

   bio: |
      Marcela Resultay-Tayaba is a member of the Shingle Springs Band of Miwok Indians
      and serves as the Habitat Restoration Specialist for her tribe. After serving as a youth
      intern for the tribe’s Environmental Department for five years Marcela went on to obtain
      a bachelor’s degree in environmental sciences with an emphasis on Ecological
      Restoration as well as minors in Forestry and Natural Resources from Cal Poly
      Humboldt.
      Since graduating she has returned to work for her tribe’s Environmental Department
      and has dedicated her efforts to the revitalization of her ancestral language and
      traditional food practices. She hopes to inspire tribal youth and others to connect and
      honor nature through traditional practices and bringing tribal community together for
      cultural burning, and land/water conservation.
      Marcela’s main role is to oversee the implementation of restoration projects lead by
      state, federal, and private agencies both on and off Tribal Lands. Her main duties
      include creating restoration plans and managing the tribal nursery, including collecting
      seeds and growing plants to be used in restoration projects. She is also responsible for
      grant management, overseeing the tribal community garden and managing various
      Clean Water Act projects on tribal land.
      It is important to her that every project incorporates culture, revitalizes traditional
      practices, provides education to the public, and provides Native youth the opportunity to
      learn and take ownership and pride in restoring our lands.

    tags:
      - "Tribal Restoration"
      - "Nursery Operations"
      - "Land and Water Conservation"
      - "Interagency Projects"

    links:
      - label: "Website"
        url: "https://www.scienceforconservation.org/our-team/scott-butterfield"
        primary: true

      - label: "Biography"
        url: "https://www.scienceforconservation.org/our-team/scott-butterfield"
        primary: true
        
  - name: "Scott Butterfield"
    role: "Lead Scientist at The Nature Conservancy in California"
    location: "Land Program"
    headshot: "Grasslandrestoration/Scottbutterfield.jpeg"
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

  - name: "Joshua Scoggin"
    role: "Associate Ecologist"
    location: "Hedgerow Farms / Pacific Coast Seed"
    headshot: "Grasslandrestoration/Joshua Scoggin.JPG"
    headshot_alt: "Joshua Scoggin"

    bio: |
      Joshua Scoggin is a production and collections data manager with NativeSeed Group, supporting Hedgerow Farms' native seed production and wildland collections. Hedgerow Farms supplies native seed for large-scale conservation and habitat restoration. His work focuses on managing production and collection data so that restoration teams receive genetically appropriate and source-identified seeds matched to project needs.

    tags:
      - "Seed Supply & Logistics"
      - "Production & Collections Data"
      - "Restoration Project Support"

    links:
      - label: "Pacific Coast Seed"
        url: "https://nativeseedgroup.com/who-we-are/pacific-coast-seed?utm_source=google&utm_medium=cpc&utm_campaign=22424039451&utm_content=179259462218&utm_term=pacific%20coast%20seed&hsa_acc=6596752727&hsa_cam=22424039451&hsa_grp=179259462218&hsa_ad=747376715984&hsa_src=g&hsa_tgt=kwd-1639578945243&hsa_kw=pacific%20coast%20seed&hsa_mt=p&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=22424039451&gbraid=0AAAAA_S0bXvCAF4QuuK_YtxPRucgdJkk0&gclid=CjwKCAiAmePKBhAfEiwAU3Ko3M8VcxASCk1fWXEpyfNIv9_TxWFByT1548j3zY4PqqcQK5m_iac-JRoCsBwQAvD_BwE"
        primary: true

      - label: "Hedgerow Farms"
        url: "https://nativeseedgroup.com/who-we-are/hedgerow-farms"
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

