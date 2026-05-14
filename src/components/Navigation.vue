<template>
    <nav class="site-nav">
      <router-link to="/music">Music</router-link>
      <router-link to="/portfolio">Portfolio</router-link>
      <router-link to="/contact">Contact</router-link>
      <a href="https://github.com/9ete" target="_blank" rel="noopener">Code</a>
      <a href="https://www.linkedin.com/in/pete-l-39448a42" target="_blank" rel="noopener">LinkedIn</a>
    </nav>
</template>

<style scoped>
.site-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.95rem;
}
.site-nav a {
  color: inherit;
  text-decoration: none;
}
.site-nav a:hover {
  text-decoration: underline;
}
.site-nav a.router-link-active {
  font-weight: 700;
  text-decoration: underline;
}
@media (min-width: 640px) {
  .site-nav {
    gap: 1rem;
    font-size: 1rem;
  }
}
</style>
