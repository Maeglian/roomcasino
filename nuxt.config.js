const target =
  process.env.NUXT_ENV_MODE === 'sandbox' || process.env.NUXT_ENV_MODE === 'stage'
    ? 'static'
    : 'server';

const ssr = !(process.env.NUXT_ENV_MODE === 'sandbox' || process.env.NUXT_ENV_MODE === 'stage');

const plugins =
  process.env.NUXT_ENV_MODE === 'sandbox' || process.env.NUXT_ENV_MODE === 'stage'
    ? [
        '@/plugins/globals',
        '@/plugins/axios',
        '@/plugins/globals.client',
        '@/plugins/onNuxtReady.client',
        '@/plugins/stageClientInit.client',
      ]
    : [
        '@/plugins/globals',
        '@/plugins/axios',
        '@/plugins/globals.client',
        '@/plugins/onNuxtReady.client',
      ];

export default {
  target,
  ssr,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'roomcasino',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preload',
        as: 'style',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&display=swap',
        media: 'print',
        onload: "this.media='all'",
      },
    ],
    script: [
      {
        src: 'https://static.paymentiq.io/cashier/cashier.js',
      },
      {
        src: '/js/liveChat.js',
        defer: true,
      },
    ],
    noscript: [
      {
        innerHTML:
          '<a href="https://www.livechatinc.com/chat-with/12226866/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechatinc.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a>',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins,

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/style-resources'],

  styleResources: {
    scss: ['@/assets/styles/variables.scss'],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    extend(config) {
      config.resolve.alias.vue = 'vue/dist/vue.common';
    },
  },

  router: { middleware: ['closeNav'] },
  generate: {
    fallback: 'index.html',
  },
};
