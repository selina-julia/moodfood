<template>
  <div id="post">
    <div
      class="post-thumbnail"
      :style="{ backgroundImage: 'url(' + image.filename + ')' }"
    ></div>
    <section class="container px-4 pt-8 mx-auto post-content">
      <h1 class="mb-5 text-5xl font-bold">{{ title }}</h1>
      <span v-for="cat in categories" :key="cat">
        <span class="px-2 py-1 mr-3 rounded-md detail-category">{{ cat }}</span>
      </span>
      <p class="mt-5">{{ content }}</p>
    </section>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/blog/' + context.params.postId, {
        version: context.isDev ? 'draft' : 'published',
      })
      .then((res) => {
        return {
          id: res.data.story.content.id,
          image: res.data.story.content.thumbnail,
          title: res.data.story.content.title,
          content: res.data.story.content.content,
          categories: res.data.story.content.categories,
        }
      })
  },
}
</script>

<style>
.post-thumbnail {
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
}

.post-content p {
  white-space: pre-line;
}

.detail-category {
  border: 1px solid #555;
}
</style>
