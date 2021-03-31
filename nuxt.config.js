import axios from 'axios';
import { API_HOST } from './config';

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
    title: 'ninecasino',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
        src: 'https://dga.pragmaticplaylive.net/dgaAPI.js',
      },
      {
        src: 'https://global.localizecdn.com/localize.js',
      },
      {
        innerHTML: `!function(a){if(!a.Localize){a.Localize={};for(var e=["translate","untranslate","phrase","initialize","translatePage","setLanguage","getLanguage","getSourceLanguage","detectLanguage","getAvailableLanguages","untranslatePage","bootstrap","prefetch","on","off","hideWidget","showWidget"],t=0;t<e.length;t++)a.Localize[e[t]]=function(){}}}(window);`,
      },
      {
        innerHTML: `Localize.initialize({
          key: 'b3wmJhfoSOL7q',
          rememberLanguage: true
        });`,
      },
      {
        src: '/js/liveChat.js',
        defer: true,
      },
      {
        src: 'https://034906ca-0989-44fa-8bff-6a0fdffc45bb.snippet.antillephone.com/apg-seal.js',
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
  modules: ['@nuxtjs/style-resources', '@nuxtjs/gtm', 'nuxt-i18n'],

  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json',
        icon: 'en.png',
      },
      {
        code: 'de',
        file: 'de.json',
        icon: 'de.png',
      },
      {
        code: 'cs',
        file: 'cs.json',
        icon: 'cs.png',
      },
    ],
    defaultLocale: 'en',
    lazy: true,
    langDir: '~/locales/',
    vueI18n: {
      fallbackLocale: 'en',
    },
  },

  gtm: {
    enabled: process.env.NUXT_ENV_MODE === 'production',
    id: 'GTM-WGL6JVV',
  },

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
    routes() {
      const routes = [
        '/cabinet/history/game',
        '/cabinet/history/transaction',
        '/cabinet/history/bonus',
      ];
      const categories = axios.get(`${API_HOST}/categoryList`).then(res => {
        res.data.data.forEach(category => {
          routes.push(`/games/${category.slug}`);
        });
      });
      const providers = axios.get(`${API_HOST}/gameProducerList`).then(res => {
        res.data.data.forEach(provider => {
          routes.push(`/providers/${provider.name}`);
        });
      });

      return Promise.all([categories, providers]).then(() => {
        return routes;
      });
    },
  },
};
