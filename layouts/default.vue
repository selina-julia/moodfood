<template>
  <div class="">
    <TheHeader />

    <main class="main-content px-16">
      <nuxt />
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader.vue'

export default {
  components: {
    TheHeader,
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: 'Noto Sans', sans-serif;
}
.main-content {
  margin-top: 5.5rem;
}
</style>
