<template>
  <header class="main-header backdrop-filter backdrop-blur-lg my-2">
    <div class="flex justify-between items-center px-16">
      <div class="text-2xl font-bold title">Foodie</div>
      <nav class="main-nav">
        <ul class="nav-links">
          <nuxt-link to="/" tag="li" class="nav-link"
            ><a>All Posts</a></nuxt-link
          >
          <nuxt-link to="/about" tag="li" class="nav-link"
            ><a>About</a></nuxt-link
          >
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.5rem;
  background-color: rgba(255, 255, 255, 0.85);
}
.main-nav {
  height: 100%;
}
.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.nav-link {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  padding: 0.3rem;
}
.nav-link.nuxt-link-exact-active {
  border-bottom: 3px solid #f6cc63;
}
.nav-link a {
  display: block;
  text-decoration: none;
}
.nav-link a:hover,
.nav-link a:active,
.nav-link.nuxt-link-exact-active a {
  color: #f6cc63;
}
</style>
