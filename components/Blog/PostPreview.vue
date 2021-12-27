<template>
  <article v-if="filter()" class="relative post-preview">
    <nuxt-link :to="'/blog/' + id">
      <img class="mb-3 post-preview-thumbnail" :src="thumbnailImage" alt="" />

      <div class="flex flex-col justify-between post-preview-content">
        <h1 class="pr-5 mb-2 text-2xl font-bold line-clamp-2">{{ title }}</h1>

        <div class="flex justify-between">
          <span class="flex">
            <span v-for="i in iterator" :key="i" class="mr-1">
              <img
                class="difficulty-icon"
                src="../../static/icons/cooking-hat.svg"
                alt=""
              />
            </span>
          </span>
          <span>{{ minutes }} min</span>
        </div>
      </div>
    </nuxt-link>
    <div
      class="absolute flex items-center justify-center bg-white  w-14 h-14 rounded-xl -top-2 -right-2"
      :class="{
        'post-like-button__default': !isFavoritesClicked,
        'post-like-button__clicked': isFavoritesClicked,
      }"
      @click="setFavorites(title)"
    >
      <object
        v-if="!isFavoritesClicked"
        data="../../static/icons/heart.svg"
        type="image/svg+xml"
      >
        <img
          class="w-8 h-8 transition duration-200 ease-in-out"
          src="../../static/icons/heart.svg"
        />
      </object>
      <object
        v-if="isFavoritesClicked"
        data="../../static/icons/heart.svg"
        type="image/svg+xml"
      >
        <img
          class="w-8 h-8 transition duration-200 ease-in-out"
          src="../../static/icons/heart-full.svg"
        />
      </object>
    </div>
  </article>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    thumbnailImage: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    categories: {
      type: String[{}],
      required: true,
    },
    selectedCategory: {
      type: String,
      required: true,
    },
    minutes: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String[{}],
      required: true,
    },
  },

  data() {
    return {
      iterator: 0,
      favoriteStorage: [],
      isFavoritesClicked: false,
      isVisible: true,
    }
  },

  mounted() {
    switch (this.difficulty) {
      case 'einfach':
        this.iterator = 1
        break
      case 'mittel':
        this.iterator = 2
        break
      case 'schwierig':
        this.iterator = 3
        break
    }
  },

  methods: {
    getFavorites() {
      const fav = localStorage.getItem('favorites')
      console.log(fav)
      return fav
    },

    setFavorites(fav) {
      this.getFavorites()
      this.favoriteStorage.push(fav)
      localStorage.setItem('favorites', JSON.stringify(this.favoriteStorage))
      this.isFavoritesClicked = !this.isFavoritesClicked
    },
    filter() {
      if (!this.selectedCategory || this.selectedCategory === 'Alle') {
        return true
      }
      const x = Object.values(this.categories)

      return !!x.find((el) => el === this.selectedCategory)
    },
  },
})
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.post-preview {
  border: 1px solid lightgray;
  border-radius: 15%;
  height: 100%;
  padding: 6%;
  max-height: 25rem;
  min-height: 25rem;
}

.post-preview-thumbnail {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 25%;
  box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.15);
}

.post-preview-content {
  padding: 0 1rem;
  height: 25%;
}

.difficulty-icon {
  width: 25px;
}

.post-like-button__default {
  border: 1px solid lightgray;
  transition: 200ms ease-in;
}

.post-like-button__clicked {
  background: #f6cc63;
  transition: 200ms ease-in;
}
</style>
