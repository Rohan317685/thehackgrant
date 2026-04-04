<script>
  import { carouselImages } from '$lib/carousel';
  import './page.css';

  const loopImages = [...carouselImages, ...carouselImages];
</script>

<div class="carousel-page">
  <div class="carousel-viewport carousel-top">
    <div class="scroll-track top-track">
      {#each [0, 1] as groupIndex (groupIndex)}
        <div class="scrolling-group" aria-hidden={groupIndex > 0}>
          {#each loopImages as src, index (`top-${groupIndex}-${index}`)}
            <div class="image-card">
              <img {src} alt="Carousel item" draggable="false" />
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <div class="carousel-viewport carousel-bottom">
    <div class="scroll-track bottom-track">
      {#each [0, 1] as groupIndex (groupIndex)}
        <div class="scrolling-group" aria-hidden={groupIndex > 0}>
          {#each loopImages as src, index (`bottom-${groupIndex}-${index}`)}
            <div class="image-card">
              <img {src} alt="Carousel item" draggable="false" />
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>

