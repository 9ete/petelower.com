<script setup>
defineProps({
  videoId: { type: String, required: true },
  title: { type: String, default: 'YouTube video' },
})
</script>

<template>
  <div class="yt-embed">
    <iframe
      :src="`https://www.youtube.com/embed/${videoId}`"
      :title="title"
      loading="lazy"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style scoped>
.yt-embed {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 1rem 0;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}
.yt-embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
