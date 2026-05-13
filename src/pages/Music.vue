<script setup>
import YouTubeEmbed from '../components/YouTubeEmbed.vue'
</script>

<template>
  <main class="music">
    <h1>Music</h1>

    <section class="band">
      <h2>Kadillac Black</h2>
      <p>
        <a href="https://kadillacblack.com" target="_blank" rel="noopener">kadillacblack.com</a>
      </p>
      <!-- Add YouTube videos here, e.g.: <YouTubeEmbed video-id="VIDEO_ID" title="Kadillac Black — Song" /> -->
    </section>

    <section class="band">
      <h2>Item9 and the Mad Hatters</h2>
      <p>
        <a href="https://soundcloud.com/item9andthemadhatters" target="_blank" rel="noopener">
          soundcloud.com/item9andthemadhatters
        </a>
      </p>
      <!-- Add YouTube videos here, e.g.: <YouTubeEmbed video-id="VIDEO_ID" title="Item9 — Song" /> -->
    </section>
  </main>
</template>

<style scoped>
.music {
  max-width: 720px;
  margin: 0 auto;
  text-align: left;
  padding: 1rem;
}
.music h1 {
  margin-bottom: 2rem;
}
.band {
  margin-bottom: 3rem;
}
.band h2 {
  margin-bottom: 0.25rem;
}
.band p {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
}
</style>
