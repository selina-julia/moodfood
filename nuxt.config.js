// eslint-disable-next-line nuxt/no-cjs-in-config
const axios = require('axios')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,
  buildDir: 'dist',
  mode: 'universal',

  env: {
    baseUrl: process.env.BASE_URL,
    nodeEnv: process.env.NODE_ENV,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-storyblok-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    [
      'storyblok-nuxt',
      {
        accessToken:
          process.env.NODE_ENV === 'production'
            ? 'CNcDIsYZIc8wra17Qv4lVAtt'
            : 'KMOedrBdDc9YBnvirhovagtt',
        cacheProvider: 'memory',
      },
    ],
  ],

  generate: {
    fallback: true,
    routes() {
      return axios
        .get(
          'https://api.storyblok.com/v1/cdn/stories?version=published&token=CNcDIsYZIc8wra17Qv4lVAtt&starts_with=blog&cv=' +
            Math.floor(Date.now() / 1e3)
        )
        .then((res) => {
          const blogPosts = res.data.stories.map((bp) => bp.full_slug)
          return ['/', '/blog', '/about', ...blogPosts]
        })
    },
  },

  // router: {
  //   middleware: ['auth'],
  // },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
