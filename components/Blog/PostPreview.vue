<template>
  <nuxt-link :v-if="isVisible" :to="id">
    <article class="post-preview relative">
      <img class="post-preview-thumbnail mb-3" :src="thumbnailImage" alt="" />

      <div class="post-preview-content flex flex-col justify-between">
        <h1 class="text-2xl font-bold pr-5 mb-2">{{ title }}</h1>

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
      <div
        class="
          post-like-button
          w-14
          h-14
          bg-white
          rounded-xl
          absolute
          -top-2
          -right-2
          flex
          items-center
          justify-center
        "
        @click="setFavorites(title)"
      >
        <object data="../../static/icons/heart.svg" type="image/svg+xml">
          <img class="w-8 h-8" src="../../static/icons/heart.svg" />
        </object>
      </div>
    </article>
  </nuxt-link>
</template>

<script>
export default {
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
    isVisible: {
      type: Boolean,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      iterator: 0,
      favoriteStorage: [],
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
    console.log(this.iterator)
  },

  methods: {
    setFavorites(fav) {
      this.favoriteStorage.push(fav)
      console.log(this.favoriteStorage)
      localStorage.setItem('favorites', JSON.stringify(this.favoriteStorage))
    },
    setFavoritesInLocalStorage() {},
  },
}
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
}

.post-preview-thumbnail {
  width: 100%;
  height: 250px;
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

.post-like-button {
  border: 1px solid lightgray;
}
</style>
