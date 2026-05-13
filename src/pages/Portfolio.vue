<script setup>
import { computed } from 'vue'
import { projects, categoryOrder } from '../data/portfolio.js'

const grouped = computed(() => {
  const known = new Map(categoryOrder.map((c) => [c, []]))
  const other = []
  for (const p of projects) {
    if (known.has(p.category)) {
      known.get(p.category).push(p)
    } else {
      other.push(p)
    }
  }
  const result = []
  for (const c of categoryOrder) {
    const items = known.get(c)
    if (items.length) result.push({ category: c, items })
  }
  if (other.length) result.push({ category: 'Other', items: other })
  return result
})
</script>

<template>
  <main class="portfolio">
    <h1>Portfolio</h1>
    <section v-for="group in grouped" :key="group.category" class="category">
      <h2>{{ group.category }}</h2>
      <ul class="cards">
        <li v-for="p in group.items" :key="p.title" class="card">
          <img v-if="p.thumbnail" :src="p.thumbnail" :alt="p.title" class="thumb" />
          <h3>
            <a v-if="p.url" :href="p.url" target="_blank" rel="noopener">{{ p.title }}</a>
            <template v-else>{{ p.title }}</template>
          </h3>
          <p>{{ p.description }}</p>
          <p v-if="p.repo" class="links">
            <a :href="p.repo" target="_blank" rel="noopener">Code</a>
          </p>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.portfolio {
  max-width: 960px;
  margin: 0 auto;
  text-align: left;
  padding: 1rem;
}
.portfolio h1 {
  margin-bottom: 2rem;
}
.category {
  margin-bottom: 2.5rem;
}
.category h2 {
  margin-bottom: 1rem;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.25rem;
  opacity: 0.85;
}
.cards {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}
.card {
  padding: 1rem;
  border: 1px solid currentColor;
  border-radius: 8px;
  background: rgba(127, 127, 127, 0.08);
}
.card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
}
.card p {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
}
.card .thumb {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}
.card .links {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
</style>
