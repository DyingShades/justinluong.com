---
layout: page
permalink: /menu/presentations.html

<!-- Responsive YouTube playlist embed -->
<div class="yt-wrap" role="region" aria-label="Video playlist">
  <iframe
    src="https://www.youtube.com/embed/videoseries?list=PL8rW4MwMEcUnzNN4GUIDKIf8Ez9NtSRid&modestbranding=1&rel=0"
    title="YouTube playlist player"
    loading="lazy"
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    referrerpolicy="strict-origin-when-cross-origin">
  </iframe>
</div>

<style>
  /* Make the iframe keep a 16:9 aspect ratio and scale nicely */
  .yt-wrap {
    width: 100%;
    max-width: 960px;       /* tweak to your layout */
    margin: 1rem auto;      /* center on page */
    aspect-ratio: 16 / 9;   /* modern browsers */
    background: #000;       /* nice loading backdrop */
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 24px rgba(0,0,0,.12);
  }
  .yt-wrap iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }

  /* Fallback for older browsers that don't support aspect-ratio */
  @supports not (aspect-ratio: 16 / 9) {
    .yt-wrap { position: relative; padding-top: 56.25%; }
    .yt-wrap iframe { position: absolute; inset: 0; height: 100%; }
  }
</style>

<!-- (Optional) Privacy-enhanced mode:
     swap the iframe src to https://www.youtube-nocookie.com/embed/videoseries?list=... -->
---
