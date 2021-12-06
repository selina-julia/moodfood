<template>
  <header class="z-10 py-2 main-header backdrop-filter backdrop-blur-lg">
    <div
      class="flex items-center justify-between w-screen px-5 md:w-auto md:px-16"
    >
      <div class="text-2xl font-bold">mood<span class="title">food</span></div>
      <object
        class="w-8 h-8 md:hidden"
        data="../../static/icons/menu.svg"
        type="image/svg+xml"
        @click="toggleMobileNav()"
      >
        <img
          class="w-8 h-8 transition duration-200 ease-in-out"
          src="../../static/icons/menu.svg"
        />
      </object>
      <div
        :class="{
          '-left-full -right-full transition-all duration-500 ease-in-out ':
            !isNavVisible,
          'left-0 right-0 transition-all duration-500 ease-in-out ':
            isNavVisible,
        }"
        class="absolute top-0 left-0 right-0 flex justify-between w-screen h-screen px-5 py-5 bg-white  mobile-menu"
      >
        <nav class="w-full main-nav">
          <ul class="flex flex-col items-center justify-center mt-40 gap-y-10">
            <nuxt-link to="/" tag="li" class="nav-link mobile"
              ><a class="text-4xl" @click="closeMobileNav()"
                >All Posts</a
              ></nuxt-link
            >
            <nuxt-link to="/about" tag="li" class="nav-link mobile"
              ><a class="text-4xl" @click="closeMobileNav()"
                >About</a
              ></nuxt-link
            >
            <nuxt-link to="/favorites" tag="li" class="nav-link mobile"
              ><a class="text-4xl" @click="closeMobileNav()"
                >Favoriten</a
              ></nuxt-link
            >
          </ul>
        </nav>
        <object
          class="absolute right-0 w-6 h-6 mr-5 md:hidden"
          data="../../static/icons/close.svg"
          type="image/svg+xml"
          @click="toggleMobileNav()"
        >
          <img
            class="w-6 h-6 transition duration-200 ease-in-out"
            src="../../static/icons/close.svg"
          />
        </object>
      </div>

      <!-- desktop nav -->
      <nav class="hidden main-nav md:block">
        <ul class="nav-links">
          <nuxt-link to="/" tag="li" class="nav-link"
            ><a>All Posts</a></nuxt-link
          >
          <nuxt-link to="/about" tag="li" class="nav-link"
            ><a>About</a></nuxt-link
          >
          <nuxt-link to="/favorites" tag="li" class="nav-link"
            ><a>Favoriten</a></nuxt-link
          >
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isNavVisible: false,
    }
  },

  methods: {
    toggleMobileNav() {
      this.isNavVisible = !this.isNavVisible
    },
    closeMobileNav() {
      this.isNavVisible = false
    },
  },
}
</script>

<style scoped>
.mobile-menu {
  background-color: #f6cc63;
}
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid lightgray;

  @media (min-width: 768px) {
    height: 4.5rem;
    border: 0;
  }
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
  font-weight: bold;
}
.nav-link.nuxt-link-exact-active {
  border-bottom: 3px solid #f6cc63;
}
.mobile.nuxt-link-exact-active {
  border-bottom: 0;
}
.nav-link a {
  display: block;
  text-decoration: none;
}
.nav-link a:hover,
.nav-link a:active,
.nav-link.nuxt-link-exact-active a,
.title {
  color: #f6cc63;
}

.mobile.nuxt-link-exact-active a {
  color: white;
}
</style>
