# Luonglab
Lab Website for Luong Restoration and Rangeland Ecology Lab

# Site Map
# Important Pages
index.md is the home page
<br>
CSS is the code backbone for this site any rendering, color, sizing issues are generally thoguh this
<br>
_data/settings is where menu paths are set
<br>
_data/germination_library is the data set for the GRASSNet germination library page
<br>
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

# Analytics
I have run google analytics through my own accounts so I can see user metrics. There are many ways to do usere metrics so look around but I would like to keep the block in /head there. Thx!



Uses https://jekyllrb.com/
