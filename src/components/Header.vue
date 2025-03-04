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
    padding: 0 1rem;
}
/* Add any specific button styling if needed */

</style>