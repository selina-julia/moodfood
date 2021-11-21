<template>
  <div class="flex">
    <aside class="w-2/12 pt-6 mr-5">
      <div
        v-for="cat in categories"
        :key="cat"
        class="mb-3"
        @click="filter(cat)"
      >
        <input :id="cat" type="checkbox" :name="cat" />
        <label :for="cat">{{ cat }}</label>
      </div>
    </aside>
    <section
      id="posts"
      class="
        grid
        md:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-8
        w-100
        container
        mx-auto
        px-4
        mb-8
      "
    >
      <PostPreview
        v-for="post in posts"
        :id="post.id"
        :key="post.id"
        :title="post.title"
        :excerpt="post.previewText"
        :thumbnailImage="post.thumbnailUrl"
        :categories="post.categories"
        :isVisible="isVisible"
        :difficulty="post.difficulty"
        :minutes="post.minutes"
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
              thumbnailUrl: post.content.thumbnail.filename,
              categories: post.content.categories,
              difficulty: post.content.difficulty,
              minutes: post.content.minutes,
            }
          }),
        }
      })
  },

  data() {
    return {
      categories: ['Chinesisch', 'Italienisch', 'Österreichisch'],
      isVisible: true,
    }
  },

  // mounted() {
  //   console.log(this.posts)
  // },

  methods: {
    filter(selectedCat): void {
      this.posts.forEach((post) => {
        if (!post.categories) {
          return
        }

        post.categories.forEach((cats) => {
          if (cats === selectedCat) {
            this.isVisible = true
          } else {
            this.isVisible = false
          }
        })
        console.log(this.isVisible)
      })
    },
  },
}
</script>

<style scoped>
#posts {
  width: 100%;
}

aside {
  background: #fdf9f4;
  position: relative;
  border-radius: 0 20px 20px 0;
}

aside::before {
  position: absolute;
  left: -200px;
  right: 0;
  top: 0;
  bottom: 0;
  background: #fdf9f4;
  content: '';
  z-index: -1;
  border-radius: 0 20px 20px 0;
}
</style>
