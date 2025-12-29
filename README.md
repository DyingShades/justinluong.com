# Luonglab
Lab Website for Luong Restoration and Rangeland Ecology Lab

# Site Map
# Want to add data to the Seed Germination Library?
Path -> _data/germination_library.yml
Copy and Paste entire block and Apply Changes
Photos go into a subset folder under assets/img/seedgermination/
Renaming photos to have a simpler name can cause metadata issues it is best to leave native name and built path from that.

# What to add more photos in a slide show or just add a slide show element?
Copy and paste this
      - src: BobcatRanchLabTrip2025.jpg
        alt: "Lab group at Bobcat Ranch"
at the top portion of the YAML address (see existing pages for example) and change to appropriate names and paths
# Adding a slide show element
Copy and paste this 
{% include slideshow.html interval=6000 %}



Uses https://jekyllrb.com/
