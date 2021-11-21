<template>
  <div id="post">
    <div
      class="post-thumbnail"
      :style="{ backgroundImage: 'url(' + image.filename + ')' }"
    ></div>
    <section class="post-content container mx-auto px-4 pt-8">
      <h1 class="text-3xl font-bold mb-5">{{ title }}</h1>
      <p>{{ content }}</p>
      <span v-for="cat in categories" :key="cat">
        <span>{{ cat }}</span>
      </span>
    </section>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/blog/' + context.params.postId, {
        version: 'draft',
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
</style>
