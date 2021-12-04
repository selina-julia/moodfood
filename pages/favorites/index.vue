<template>
  <span>
    <span>{{ favs }}</span>
  </span>
</template>

<script>
export default {
  data() {
    return {
      favs: '',
    }
  },
  mounted() {
    this.getItemsFromLocalStorage()
  },
  methods: {
    getItemsFromLocalStorage() {
      this.favs = JSON.parse(localStorage.getItem('favorites'))
    },
  },
}
</script>
