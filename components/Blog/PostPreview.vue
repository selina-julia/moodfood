<template>
  <nuxt-link :to="id">
    <article class="post-preview">
      <!-- <div
        :style="{ backgroundImage: 'url(' + thumbnailImage.filename + ')' }"
        class="post-preview-thumbnail"
      ></div> -->
      <img
        class="post-preview-thumbnail"
        :src="thumbnailImage.filename"
        alt=""
      />
      <div class="post-preview-content mb-10">
        <h1 class="text-2xl font-bold pr-5 mb-2">{{ title }}</h1>

        <div class="flex justify-between">
          <span>Easy</span>
          <span>30 min</span>
        </div>
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
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
  width: 23%;
}

.post-preview {
  border: 1px solid lightgray;
  border-radius: 15%;
  height: 100%;
}

.post-preview-thumbnail {
  width: 100%;
  height: 270px;
  object-fit: cover;
  padding: 6%;
  border-radius: 25%;
}

.post-preview-content {
  padding: 0 2rem;
}
</style>
