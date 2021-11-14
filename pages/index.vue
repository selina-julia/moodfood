<template>
  <div class="flex">
    <aside class="w-2/12">filter here</aside>
    <section
      id="posts"
      class="flex flex-wrap gap-8 w-100 container mx-auto px-4"
    >
      <PostPreview
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        :excerpt="post.previewText"
        :thumbnailImage="post.thumbnailUrl"
        :id="post.id"
      />
    </section>
  </div>
</template>

<script lang="ts">
import PostPreview from '../components/Blog/PostPreview.vue'

export default {
  components: {
    PostPreview,
  },

  asyncData(context) {
    // fetch data from blog folder in storyblok
    return context.app.$storyapi
      .get('cdn/stories', {
        version: 'draft',
        starts_with: 'blog/',
      })
      .then((res) => {
        console.log(res)
        return {
          posts: res.data.stories.map((post) => {
            return {
              id: post.slug,
              title: post.content.title,
              previewText: post.content.description,
              thumbnailUrl: post.content.thumbnail,
            }
          }),
        }
      })
  },

  // data() {
  //   return {
  //     posts: [
  //       {
  //         title: 'Pizza alla Luigi',
  //         previewText: 'This is a preview text',
  //         thumbnailUrl:
  //           'https://images.unsplash.com/photo-1579751626657-72bc17010498?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2069&q=80',
  //         id: 'a-new-beginning',
  //       },
  //       {
  //         title: 'Spaghetti Aglio, Olio e Scampi',
  //         previewText: 'This is a preview text',
  //         thumbnailUrl:
  //           'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2071&q=80',
  //         id: 'a-new-beginning',
  //       },
  //     ],
  //   }
  // },
}
</script>

<style scoped>
#posts {
  width: 100%;
}
</style>
