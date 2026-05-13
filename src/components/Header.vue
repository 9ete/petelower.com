<script setup>
import Gravatar from './Gravatar.vue'
import ModeToggle from './ModeToggle.vue'
import Navigation from './Navigation.vue'
</script>

<template>
  <header>
    <Gravatar />
    <Navigation />
    <ModeToggle />
  </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    left: 0;
    right: 0;
    padding: 0 0.75rem;
    gap: 0.75rem;
}
@media (min-width: 640px) {
  header {
    padding: 0 1rem;
    gap: 1rem;
  }
}
</style>
