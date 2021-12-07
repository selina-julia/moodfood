<template>
  <div class="md:flex">
    <aside class="px-5 pt-6 pb-5 md:w-2/12 md:mr-5">
      <div class="relative mb-5 rounded-md md:mr-7 search-container">
        <input
          id="search-bar"
          v-model="search"
          type="text"
          class="py-3 my-1 rounded-md md:px-3"
          placeholder="Search title.."
          @change="filteredList()"
        />
        <img
          class="
            absolute
            w-6
            h-6
            lg:w-4 lg:h-4
            transition
            duration-200
            ease-in-out
            right-2.5
            lg:right-3
            top-3.5
          "
          src="../static/icons/search.svg"
        />
      </div>

      <div class="flex overflow-x-scroll md:block gap-x-2">
        <div
          v-for="cat in categories"
          :key="cat"
          class="flex items-center px-3 py-2 mb-3 border-gray-400 rounded-md  md:block mobile-categories md:p-0 md:border-0 md:border-none"
          :class="{ 'selected-category lg:bg-none': isCatSelected(cat) }"
          @click="filter(cat)"
        >
          <input :id="cat" class="hidden md:inline" type="radio" name="cats" />
          <label :for="cat">{{ cat }}</label>
        </div>
      </div>
    </aside>
    <section
      id="posts"
      class="container grid gap-8 px-4 pt-2 mx-auto mb-8  md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-100"
    >
      <PostPreview
        v-for="post in filteredList()"
        :id="post.id"
        :key="post.id"
        :title="post.title"
        :excerpt="post.previewText"
        :thumbnailImage="post.thumbnailUrl"
        :categories="post.categories"
        :selectedCategory="selectedCat"
        :difficulty="post.difficulty"
        :minutes="post.minutes"
        :ingredients="post.ingredients"
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

  // eslint-disable-next-line camelcase
  asyncData(context) {
    // fetch data from blog folder in storyblok
    return context.app.$storyapi
      .get('cdn/stories', {
        version: context.isDev ? 'draft' : 'published',
        starts_with: 'blog/',
      })
      .then((res: { data: { stories: any[] } }) => {
        console.log(res)
        return {
          posts: res.data.stories.map(
            (post: {
              slug: any
              content: {
                title: any
                description: any
                thumbnail: { filename: any }
                categories: any
                difficulty: any
                minutes: any
                ingredients: any
              }
            }) => {
              return {
                id: post.slug,
                title: post.content.title,
                previewText: post.content.description,
                thumbnailUrl: post.content.thumbnail.filename,
                categories: post.content.categories,
                difficulty: post.content.difficulty,
                minutes: post.content.minutes,
                ingredients: post.content.ingredients,
              }
            }
          ),
        }
      })
  },
  data() {
    return {
      isVisible: false,
      selectedCat: '',
      search: '',
      categories: [
        'Alle',
        'Brot',
        'Chinesisch',
        'Hühnerfleisch',
        'Italienisch',
        'Kartoffeln',
        'Meeresfrüchte',
        'Österreichisch',
        'Rindfleisch',
        'Salat',
        'Schweinefleisch',
        'Süßes',
        'Vegetarisch',
      ],
    }
  },

  methods: {
    filter(selectedCat: any): void {
      this.selectedCat = selectedCat
    },
    filteredList(): any {
      return this.posts.filter((post: { title: string }) => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },

    isCatSelected(cat): boolean {
      return cat === this.selectedCat
    },
  },
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

.selected-category {
  background: ;
}

#posts {
  width: 100%;
}

aside {
  position: relative;
  border-radius: 0 20px 20px 0;
}

aside::before {
  @media (min-width: 768px) {
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
}

input#search-bar {
  width: 100%;
  height: 45px;
  font-size: 1rem;
  outline: none;
  position: relative;

  @media (min-width: 768px) {
    border: 1px solid #d0cfce;
    padding: 0 20px;
    margin: 0 auto;
  }
}

.search-container::after {
  @media (max-width: 768px) {
    position: absolute;
    border-bottom: 1px solid lightgray;
    left: -100px;
    right: -100px;
    bottom: 0;
    content: '';
  }
}

input#search-bar:focus::-webkit-input-placeholder {
  transition: opacity 0.45s ease;
  opacity: 0;
}
input#search-bar:focus::-moz-placeholder {
  transition: opacity 0.45s ease;
  opacity: 0;
}
input#search-bar:focus:-ms-placeholder {
  transition: opacity 0.45s ease;
  opacity: 0;
}

.search-icon {
  position: absolute;
  top: 0;
  right: 0;
  height: 45px;
  width: 45px;
}

.mobile-categories {
  border: 1px solid lightgray;

  @media (min-width: 768px) {
    border: 0;
  }
}
.mobile-categories.selected-category {
  border: 2px solid #f6cc63;

  @media (min-width: 768px) {
    border: 0;
  }
}
</style>
